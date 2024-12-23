import {useEffect, useRef} from 'react';

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
    enabled = true,
    type,
}: LayerProps) {
    const layerConfigRef = useRef<LayerConfig>({
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs,
        type,
    });

    useEffect(() => {
        Object.assign(layerConfigRef.current, {
            disableEscapeKeyDown,
            disableOutsideClick,
            onEscapeKeyDown,
            onEnterKeyDown,
            onOutsideClick,
            onClose,
            contentRefs,
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
        enabled,
    ]);

    useEffect(() => {
        if (open && enabled) {
            const layerConfig = layerConfigRef.current;
            layerManager.add(layerConfig);

            return () => {
                layerManager.remove(layerConfig);
            };
        }

        return undefined;
    }, [open, enabled]);
}
