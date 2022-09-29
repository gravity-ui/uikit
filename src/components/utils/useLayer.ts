import React from 'react';

import {layerManager, LayerCloseReason, LayerExtendableProps, LayerConfig} from './LayerManager';

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
    enableFocusTrap,
    focusTrapContainersRefs,
    focusTrapOptions,
}: LayerProps) {
    const layerConfigRef = React.useRef<LayerConfig>({
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs,
        enableFocusTrap,
        focusTrapContainersRefs,
        focusTrapOptions,
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
            enabled,
            enableFocusTrap,
            focusTrapContainersRefs,
            focusTrapOptions,
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
        enableFocusTrap,
        focusTrapContainersRefs,
        focusTrapOptions,
    ]);

    React.useEffect(() => {
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
