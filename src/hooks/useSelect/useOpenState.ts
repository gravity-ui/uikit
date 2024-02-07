import React from 'react';

import {useControlledState} from '../useControlledState/useControlledState';

import type {UseOpenProps} from './types';

export const useOpenState = (props: UseOpenProps) => {
    const [open, setOpenState] = useControlledState(
        props.open,
        props.defaultOpen ?? false,
        props.onOpenChange,
    );

    const {onClose} = props;
    const toggleOpen = React.useCallback(
        (val?: boolean) => {
            const newOpen = typeof val === 'boolean' ? val : !open;
            if (newOpen !== open) {
                setOpenState(newOpen);
            }

            if (newOpen === false && onClose) {
                onClose();
            }
        },
        [open, setOpenState, onClose],
    );

    return {
        open,
        toggleOpen,
    };
};
