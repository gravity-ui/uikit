import React from 'react';

import {useControlledState} from '../useControlledState';

import type {UseOpenProps} from './types';

export const useOpenState = (props: UseOpenProps) => {
    const {onOpenChange, onClose} = props;
    const [open, setOpenState, isControlled] = useControlledState(
        props.open,
        props.defaultOpen || false,
    );

    const toggleOpen = React.useCallback(
        (val?: boolean) => {
            const newOpen = typeof val === 'boolean' ? val : !open;

            if (newOpen !== open) {
                onOpenChange?.(newOpen);

                if (!isControlled) {
                    setOpenState(newOpen);
                }
            }

            if (newOpen === false && onClose) {
                onClose();
            }
        },
        [open, onOpenChange, isControlled, onClose],
    );

    return {
        open,
        toggleOpen,
    };
};
