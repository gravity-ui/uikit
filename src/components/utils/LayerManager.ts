import React from 'react';
import type {VirtualElement} from '@popperjs/core';
import _debounce from 'lodash/debounce';

export type LayerCloseReason = 'outsideClick' | 'escapeKeyDown';

export interface LayerExtendableProps {
    disableOutsideClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    onOutsideClick?: (event: MouseEvent) => void;
    onClose?: (event: MouseEvent | KeyboardEvent, reason: LayerCloseReason) => void;
}

export type ContentElement =
    | Element
    | (VirtualElement & {contains?: (other: Node | null) => boolean});

export interface LayerConfig extends LayerExtendableProps {
    idle?: boolean;
    idleTimeout?: number;
    idlePriority?: number;
    contentRefs?: Array<React.RefObject<ContentElement> | undefined>;
    onRemove?: () => void;
}

const createPromise = (): {promise: Promise<void>; resolve: () => void; reject: () => void} => {
    let resolve!: () => void;
    let reject!: () => void;

    const promise = new Promise<void>((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    return {promise, resolve, reject};
};

type LayerCandidate = {
    config: LayerConfig;
    promise: Promise<void>;
    resolve: () => void;
    reject: () => void;
};

const defaultIdleTimeout = 1000;

const compareCandidatesByPriority = (candA: LayerCandidate, candB: LayerCandidate) => {
    const priorityA = candA.config.idlePriority;
    const priorityB = candB.config.idlePriority;
    const isAInt = Number.isInteger(priorityA);
    const isBInt = Number.isInteger(priorityB);

    if ((priorityA === undefined && priorityB === undefined) || (!isAInt && !isBInt)) {
        return 0;
    }

    if (priorityA === undefined || (isBInt && !isAInt)) {
        return 1;
    }

    if (priorityB === undefined || (isAInt && !isBInt)) {
        return -1;
    }

    return Math.sign(priorityB - priorityA);
};

export class LayerManager {
    private stack: LayerConfig[] = [];
    private preStack: LayerCandidate[] = [];
    private mouseDownLayerTarget?: {layer: LayerConfig; target: HTMLElement};
    private scheduleAddTimeoutId: ReturnType<typeof setTimeout> | undefined;
    private scheduledCandidate: LayerCandidate | undefined;

    private checkPreStack = _debounce(() => {
        if (this.stack.length !== 0) {
            return;
        }

        const sortedByPriorityDesc = this.preStack.slice();
        sortedByPriorityDesc.sort(compareCandidatesByPriority);
        const candidate = sortedByPriorityDesc.shift();

        if (!candidate || candidate === this.scheduledCandidate) {
            return;
        }

        this.unscheduleCandidate();

        const scheduledAdd = (scheduledCandidate: LayerCandidate) => {
            const index = this.preStack.indexOf(scheduledCandidate);
            this.preStack.splice(index, 1);
            this.addToStack(scheduledCandidate.config);
            scheduledCandidate.resolve();
            this.unscheduleCandidate();
        };

        const timeout = Number.isInteger(candidate.config.idleTimeout)
            ? candidate.config.idleTimeout
            : defaultIdleTimeout;

        this.scheduleAddTimeoutId = setTimeout(scheduledAdd.bind(null, candidate), timeout);
        this.scheduledCandidate = candidate;
    }, 100);

    add(config: LayerConfig): Promise<void> {
        if (config.idle) {
            for (const entry of this.preStack) {
                if (entry.config === config) {
                    return entry.promise;
                }
            }

            return this.addToPreStack(config);
        }

        this.addToStack(config);

        return Promise.resolve();
    }

    remove(config: LayerConfig) {
        const index = this.stack.indexOf(config);

        if (index >= 0) {
            this.stack.splice(index, 1);
            config.onRemove?.();
        }

        const preStackIndex = this.preStack.findIndex((item) => item.config === config);

        if (preStackIndex >= 0) {
            this.preStack[preStackIndex].reject();
            this.preStack.splice(preStackIndex, 1);
        }

        if (this.stack.length === 0) {
            this.removeListeners();
            this.checkPreStack();
        }
    }

    private addToPreStack(config: LayerConfig): Promise<void> {
        const {promise, resolve, reject} = createPromise();
        this.preStack.push({config, promise, resolve, reject});

        if (this.stack.length === 0) {
            this.checkPreStack();
        }

        return promise;
    }

    private addToStack(config: LayerConfig): void {
        this.stack.push(config);
        this.unscheduleCandidate();

        if (this.stack.length === 1) {
            this.addListeners();
        }
    }

    private unscheduleCandidate() {
        if (this.scheduledCandidate) {
            this.scheduledCandidate = undefined;
        }
        if (this.scheduleAddTimeoutId) {
            clearTimeout(this.scheduleAddTimeoutId);
            this.scheduleAddTimeoutId = undefined;
        }
    }

    private addListeners() {
        document.addEventListener('keydown', this.handleDocumentKeyDown);
        document.addEventListener('click', this.handleDocumentClick, true);
        document.addEventListener('mousedown', this.handleDocumentMouseDown, true);
    }

    private removeListeners() {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
        document.removeEventListener('click', this.handleDocumentClick, true);
        document.removeEventListener('mousedown', this.handleDocumentMouseDown, true);
    }

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'Escape') {
            const topLayer = this.getTopLayer();

            if (!topLayer.disableEscapeKeyDown) {
                topLayer.onEscapeKeyDown?.(event);
                topLayer.onClose?.(event, 'escapeKeyDown');
            }
        }

        if (event.code === 'Enter') {
            const topLayer = this.getTopLayer();
            topLayer.onEnterKeyDown?.(event);
        }
    };

    private handleDocumentClick = (event: MouseEvent) => {
        let layer: LayerConfig;
        let mouseDownTarget: HTMLElement | null = null;
        if (this.mouseDownLayerTarget) {
            layer = this.mouseDownLayerTarget.layer;
            mouseDownTarget = this.mouseDownLayerTarget.target;
            this.mouseDownLayerTarget = undefined;
            if (!this.stack.includes(layer)) {
                return;
            }
        } else {
            layer = this.getTopLayer();
        }

        if (!layer.disableOutsideClick && this.isOutsideClick(layer, event, mouseDownTarget)) {
            layer.onOutsideClick?.(event);
            layer.onClose?.(event, 'outsideClick');
        }
    };

    private handleDocumentMouseDown = (event: MouseEvent) => {
        const layer = this.getTopLayer();
        if (layer) {
            this.mouseDownLayerTarget = {layer, target: event.target as HTMLElement};
        }
    };

    private getTopLayer() {
        return this.stack[this.stack.length - 1];
    }

    private isOutsideClick(
        layer: LayerConfig,
        event: MouseEvent,
        mouseDownTarget: HTMLElement | null = null,
    ) {
        const contentElements = layer.contentRefs || [];
        const {target} = event;
        const composedPath = typeof event.composedPath === 'function' ? event.composedPath() : [];

        if (contentElements.length > 0) {
            const isClickOnContentElements = contentElements.some(
                (el) =>
                    el?.current?.contains?.(target as Element) ||
                    el?.current?.contains?.(mouseDownTarget) ||
                    composedPath.includes(el?.current as EventTarget),
            );

            return !isClickOnContentElements;
        }

        return false;
    }
}

export const layerManager = new LayerManager();
