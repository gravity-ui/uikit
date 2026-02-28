import * as React from 'react';

import {useControlledState} from '../useControlledState/useControlledState';

import type {OnOpenChangeOptions, UseOpenProps} from './types';

export const useOpenState = (props: UseOpenProps) => {
    const {onOpenChange, onClose} = props;
    const handleOpenChange = React.useCallback(
        (newOpen: boolean, options: OnOpenChangeOptions = {reason: 'outside-click'}) => {
            onOpenChange?.(newOpen, options);
            if (newOpen === false && onClose) {
                onClose();
            }
        },
        [onOpenChange, onClose],
    );

    const [open, setOpenState] = useControlledState(
        props.open,
        props.defaultOpen ?? false,
        handleOpenChange,
    );

    const toggleOpen = React.useCallback(
        (val?: boolean, options?: OnOpenChangeOptions) => {
            const newOpen = typeof val === 'boolean' ? val : !open;
            setOpenState(newOpen, options);
        },
        [open, setOpenState],
    );

    return {
        open,
        toggleOpen,
    };
};
