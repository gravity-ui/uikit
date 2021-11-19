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
    private mouseDownTarget: HTMLElement | null = null;

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

        if (contentElements.length > 0) {
            const isClickOnContentElements = contentElements.some(
                (el) =>
                    el?.current?.contains?.(target as Element) ||
                    el?.current?.contains?.(this.mouseDownTarget),
            );

            return !isClickOnContentElements;
        }

        return false;
    }
}

export const layerManager = new LayerManager();
