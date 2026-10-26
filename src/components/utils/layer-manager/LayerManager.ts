'use client';

import type {VirtualElement} from '@floating-ui/react';

import {KeyCode} from '../../../constants';
import {eventBroker} from '../event-broker';

export type LayerCloseReason = 'outsideClick' | 'escapeKeyDown';

export interface LayerExtendableProps {
    /**
     * Do not handle click outside
     */
    disableOutsideClick?: boolean;
    /**
     * Do not handle Escape key press on keyboard
     */
    disableEscapeKeyDown?: boolean;
    /**
     * This callback will be called when Escape key pressed on keyboard
     * This behaviour could be disabled with `disableEscapeKeyDown` option
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when Enter key is pressed on keyboard
     */
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when click is outside of elements of "top layer"
     * This behaviour could be disabled with `disableOutsideClick` option
     */
    onOutsideClick?: (event: MouseEvent) => void;
    /**
     * This callback will be called when Escape key pressed on keyboard, or click outside was made
     * This behaviour could be disabled with `disableEscapeKeyDown`
     * and `disableOutsideClick` options
     */
    onClose?: (event: MouseEvent | KeyboardEvent, reason: LayerCloseReason) => void;
    /**
     * Type of layer, returns from `getLayers`
     */
    type?: string;
}

type ContentElement = Element | (VirtualElement & {contains?: (other: Node | null) => boolean});

export interface LayerConfig extends LayerExtendableProps {
    contentRefs?: Array<React.RefObject<ContentElement | null> | undefined>;
    /** The layer this one is rendered in: a nested layer is always above it */
    parent?: LayerConfig | null;
    /** The element that the layers below must leave to assistive technology */
    getElement?: () => Element | null;
    /** Takes part only in the order of the layers: no Escape, clicks or layer count */
    passive?: boolean;
}

function isNestedIn(layer: LayerConfig, ancestor: LayerConfig) {
    for (let parent = layer.parent; parent; parent = parent.parent) {
        if (parent === ancestor) {
            return true;
        }
    }

    return false;
}

class LayerManager {
    /** The open layers from the bottom up, the passive ones included */
    private stack: LayerConfig[] = [];
    private mouseDownLayerTarget?: {layer: LayerConfig; target: HTMLElement};

    add(config: LayerConfig) {
        // A layer opened in the same update as the one it is nested in registers first
        const nestedIndex = this.stack.findIndex((layer) => isNestedIn(layer, config));

        if (nestedIndex === -1) {
            this.stack.push(config);
        } else {
            this.stack.splice(nestedIndex, 0, config);
        }

        if (config.passive) {
            return;
        }

        if (this.getActiveLayers().length === 1) {
            this.addListeners();
        }

        this.notifyLayersChange();
    }

    remove(config: LayerConfig) {
        const index = this.stack.indexOf(config);

        if (index === -1) {
            return;
        }

        this.stack.splice(index, 1);

        if (config.passive) {
            return;
        }

        if (this.getActiveLayers().length === 0) {
            this.removeListeners();
        }

        this.notifyLayersChange();
    }

    getLayersCount() {
        return this.getActiveLayers().length;
    }

    getLayers() {
        return this.getActiveLayers().map(({type}) => ({type}));
    }

    /** The elements of the layers above the given one: it must not hide them from assistive technology */
    getElementsAbove(config: LayerConfig) {
        const index = this.stack.indexOf(config);

        if (index === -1) {
            return [];
        }

        return this.stack
            .slice(index + 1)
            .map((layer) => layer.getElement?.())
            .filter((element): element is Element => Boolean(element));
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

    private notifyLayersChange() {
        eventBroker.publish({
            componentId: 'LayerManager',
            eventId: 'layerschange',
            meta: {
                layers: this.getLayers(),
            },
        });
    }

    private handleDocumentKeyDown = (event: KeyboardEvent) => {
        if (event.code === KeyCode.ESCAPE) {
            const topLayer = this.getTopLayer();

            if (!topLayer.disableEscapeKeyDown) {
                topLayer.onEscapeKeyDown?.(event);
                topLayer.onClose?.(event, 'escapeKeyDown');
            }
        }

        if (event.code === KeyCode.ENTER) {
            const topLayer = this.getTopLayer();
            topLayer.onEnterKeyDown?.(event);
        }
    };

    private handleDocumentClick = (event: MouseEvent) => {
        if (this.isToastClick(event)) {
            return;
        }

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

    private getActiveLayers() {
        return this.stack.filter((layer) => !layer.passive);
    }

    private getTopLayer() {
        const layers = this.getActiveLayers();

        return layers[layers.length - 1];
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

    private isToastClick(event: MouseEvent) {
        const composedPath = typeof event.composedPath === 'function' ? event.composedPath() : [];

        return composedPath.some((el) => {
            return Boolean((el as HTMLElement)?.dataset?.toast);
        });
    }
}

export const layerManager = new LayerManager();

export const getLayersCount = () => {
    return layerManager.getLayersCount();
};
