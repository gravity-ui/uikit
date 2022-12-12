import React from 'react';
import type {VirtualElement} from '@popperjs/core';

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
    category?: 'user-driven' | 'code-driven' | 'promo-driven';
    contentRefs?: Array<React.RefObject<ContentElement> | undefined>;
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

class LayerManager {
    private stack: LayerConfig[] = [];
    private preStack: {config: LayerConfig; promise: Promise<void>; resolve: () => void}[] = [];
    private mouseDownTarget: HTMLElement | null = null;

    add(config: LayerConfig, usePrestacking = true): Promise<void> {
        if (config.category === 'promo-driven' && usePrestacking) {
            for (const entry of this.preStack) {
                if (entry.config === config) {
                    return entry.promise;
                }
            }

            const {promise, resolve} = createPromise();
            this.preStack.push({config, promise, resolve});

            this.checkPreStack();
            return promise;
        } else {
            this.stack.push(config);

            if (this.stack.length === 1) {
                this.addListeners();
            }
        }

        return Promise.resolve();
    }

    remove(config: LayerConfig) {
        const index = this.stack.indexOf(config);
        this.stack.splice(index, 1);

        if (this.stack.length === 0) {
            this.removeListeners();
            this.checkPreStack();
        }
    }

    private checkPreStack() {
        if (this.stack.length !== 0) {
            return;
        }

        // TODO: add a timeout here so that promotional
        // popups are less distracting.

        // TODO: decide which candidate to pick if there
        // are multiple candidates. Maybe we should add
        // some prop for priority?
        const candidate = this.preStack.pop();

        if (!candidate) {
            return;
        }

        this.add(candidate.config, false);
        candidate.resolve();
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
        const topLayer = this.getTopLayer();

        if (!topLayer.disableOutsideClick && this.isOutsideClick(topLayer, event)) {
            topLayer.onOutsideClick?.(event);
            topLayer.onClose?.(event, 'outsideClick');
        }
    };

    private handleDocumentMouseDown = (event: MouseEvent) => {
        this.mouseDownTarget = event.target as HTMLElement;
    };

    private getTopLayer() {
        return this.stack[this.stack.length - 1];
    }

    private isOutsideClick(layer: LayerConfig, event: MouseEvent) {
        const contentElements = layer.contentRefs || [];
        const {target} = event;
        const composedPath = typeof event.composedPath === 'function' ? event.composedPath() : [];

        if (contentElements.length > 0) {
            const isClickOnContentElements = contentElements.some(
                (el) =>
                    el?.current?.contains?.(target as Element) ||
                    el?.current?.contains?.(this.mouseDownTarget) ||
                    composedPath.includes(el?.current as EventTarget),
            );

            return !isClickOnContentElements;
        }

        return false;
    }
}

export const layerManager = new LayerManager();
