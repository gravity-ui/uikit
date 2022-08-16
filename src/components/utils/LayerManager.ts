import React from 'react';
import type {VirtualElement} from '@popperjs/core';
import {createFocusTrap, FocusTrap, Options as FocusTrapOptions} from 'focus-trap';

export type LayerCloseReason = 'outsideClick' | 'escapeKeyDown';

export interface LayerExtendableProps {
    disableOutsideClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    onOutsideClick?: (event: MouseEvent) => void;
    onClose?: (event: MouseEvent | KeyboardEvent, reason: LayerCloseReason) => void;
    enableFocusTrap?: boolean;
    focusTrapOptions?: FocusTrapOptions;
    focusTrapRef?: React.MutableRefObject<FocusTrap | null>;
}

export type ContentElement =
    | Element
    | (VirtualElement & {contains?: (other: Node | null) => boolean});

export interface LayerConfig extends LayerExtendableProps {
    contentRefs?: Array<React.RefObject<ContentElement> | undefined>;
    focusTrapContainersRefs?: React.RefObject<HTMLElement>[];
}

export interface AddResult {
    focusTrap?: FocusTrap;
}

function isNonNullable<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

class LayerManager {
    private stack: LayerConfig[] = [];
    private mouseDownTarget: HTMLElement | null = null;
    private focusTraps = new WeakMap<LayerConfig, FocusTrap>();

    add(config: LayerConfig): AddResult {
        this.stack.push(config);
        const focusTrap = this.setFocusTrap(config) ?? undefined;

        if (this.stack.length === 1) {
            this.addListeners();
        }

        return {
            focusTrap,
        };
    }

    remove(config: LayerConfig) {
        const index = this.stack.indexOf(config);
        this.stack.splice(index, 1);
        this.removeFocusTrap(config);

        if (this.stack.length === 0) {
            this.removeListeners();
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

    private getTopConfigWithFocusTrap(): LayerConfig | null {
        let result = null;

        for (let i = this.stack.length - 1; i >= 0; i--) {
            const config = this.stack[i];
            if (this.focusTraps.has(config)) {
                result = config;
            }
        }

        return result;
    }

    private getTopFocusTrap(): FocusTrap | null {
        const topConfig = this.getTopConfigWithFocusTrap();
        if (!topConfig) {
            return null;
        }

        return this.focusTraps.get(topConfig) ?? null;
    }

    private setFocusTrap(config: LayerConfig): FocusTrap | null {
        if (
            !config.enableFocusTrap ||
            !config.focusTrapContainersRefs ||
            config.focusTrapContainersRefs.length === 0
        ) {
            return null;
        }

        const topTrap = this.getTopFocusTrap();
        const currentTrap = this.focusTraps.get(config);

        if (topTrap && topTrap !== currentTrap) {
            topTrap.pause();
        }

        if (currentTrap) {
            currentTrap.unpause();
            return currentTrap;
        }

        const elements = config.focusTrapContainersRefs
            .map((ref) => ref?.current)
            .filter(isNonNullable);

        const trap = createFocusTrap(elements, {
            returnFocusOnDeactivate: true,
            escapeDeactivates: false,
            ...(config.focusTrapOptions ?? {}),
        });
        trap.activate();
        this.focusTraps.set(config, trap);

        return trap;
    }

    private removeFocusTrap(config: LayerConfig) {
        const currentTrap = this.focusTraps.get(config);
        let currentTrapActive = false;

        if (currentTrap) {
            currentTrapActive = currentTrap.active && !currentTrap.paused;
            currentTrap.deactivate();
            this.focusTraps.delete(config);
        }

        if (!currentTrapActive) {
            return;
        }

        const topLayerWithFocusTrap = this.getTopConfigWithFocusTrap();
        if (topLayerWithFocusTrap) {
            this.setFocusTrap(topLayerWithFocusTrap);
        }
    }
}

export const layerManager = new LayerManager();
