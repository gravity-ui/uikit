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
    contentRefs?: Array<React.RefObject<ContentElement> | undefined>;
}

class LayerManager {
    private stack: LayerConfig[] = [];
    private mouseDownLayerTarget?: {layer: LayerConfig; target: HTMLElement};

    add(config: LayerConfig) {
        this.stack.push(config);

        if (this.stack.length === 1) {
            this.addListeners();
        }
    }

    remove(config: LayerConfig) {
        const index = this.stack.indexOf(config);
        this.stack.splice(index, 1);

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
