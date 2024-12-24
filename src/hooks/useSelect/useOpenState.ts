import {useCallback} from 'react';

import {useControlledState} from '../useControlledState/useControlledState';

import type {UseOpenProps} from './types';

export const useOpenState = (props: UseOpenProps) => {
    const {onOpenChange, onClose} = props;
    const handleOpenChange = useCallback(
        (newOpen: boolean) => {
            onOpenChange?.(newOpen);
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

    const toggleOpen = useCallback(
        (val?: boolean) => {
            const newOpen = typeof val === 'boolean' ? val : !open;
            setOpenState(newOpen);
        },
        [open, setOpenState],
    );

    return {
        open,
        toggleOpen,
    };
};
