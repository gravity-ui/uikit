import * as React from 'react';

import {useLayoutEffect} from '../../../hooks/useLayoutEffect';

import {LayerContext} from './LayerContext';
import {layerManager} from './LayerManager';
import type {LayerCloseReason, LayerConfig, LayerExtendableProps} from './LayerManager';

export type {LayerCloseReason, LayerExtendableProps};

export interface LayerProps extends LayerConfig {
    open?: boolean;
    enabled?: boolean;
}

export function useLayer({
    open,
    disableEscapeKeyDown,
    disableOutsideClick,
    onEscapeKeyDown,
    onEnterKeyDown,
    onOutsideClick,
    onClose,
    contentRefs,
    getElement,
    enabled = true,
    type,
}: LayerProps) {
    const parent = React.useContext(LayerContext);
    const layerConfigRef = React.useRef<LayerConfig>({
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs,
        getElement,
        type,
    });

    React.useEffect(() => {
        Object.assign(layerConfigRef.current, {
            disableEscapeKeyDown,
            disableOutsideClick,
            onEscapeKeyDown,
            onEnterKeyDown,
            onOutsideClick,
            onClose,
            contentRefs,
            getElement,
            enabled,
        });
    }, [
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs,
        getElement,
        enabled,
    ]);

    // Registered before the focus managers hide the rest of the page: they leave the layers above.
    // A disabled layer still takes part in that order
    useLayoutEffect(() => {
        if (!open) {
            return undefined;
        }

        const layerConfig = layerConfigRef.current;
        layerConfig.parent = parent;
        layerConfig.passive = !enabled;
        layerManager.add(layerConfig);

        return () => {
            layerManager.remove(layerConfig);
        };
    }, [open, enabled, parent]);

    return layerConfigRef.current;
}
