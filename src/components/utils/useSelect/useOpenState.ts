import React from 'react';
import type {UseOpenProps} from './types';

export const useOpenState = (props: UseOpenProps) => {
    const [open, setOpenState] = React.useState(props.defaultOpen || false);
    const {onOpenChange} = props;

    const openValue = typeof props.open === 'boolean' ? props.open : open;

    const toggleOpen = React.useCallback(
        (val?: boolean) => {
            const invertedOpen = typeof props.open === 'boolean' ? !props.open : !open;
            const newOpen = typeof val === 'boolean' ? val : invertedOpen;

            if (typeof props.open === 'boolean') {
                if (newOpen !== props.open) {
                    onOpenChange?.(newOpen);
                }
            } else if (newOpen !== open) {
                setOpenState(newOpen);
                onOpenChange?.(newOpen);
            }
        },
        [setOpenState, open, onOpenChange, props.open],
    );

    return {
        open: openValue,
        /**
         * @deprecated use on onEnterKeyDown on Dialog component
         */
        setOpen: toggleOpen,
        toggleOpen,
    };
};
