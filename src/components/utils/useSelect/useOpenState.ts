import React from 'react';
import type {UseOpenProps} from './types';

export const useOpenState = (props: UseOpenProps) => {
    const [open, setOpenState] = React.useState(props.defaultOpen || false);
    const {onOpenChange} = props;
    const isControlled = typeof props.open === 'boolean';
    const openValue = isControlled ? (props.open as boolean) : open;

    const toggleOpen = React.useCallback(
        (val?: boolean) => {
            const newOpen = typeof val === 'boolean' ? val : !openValue;
            if (newOpen !== openValue) {
                onOpenChange?.(newOpen);
                if (!isControlled) {
                    setOpenState(newOpen);
                }
            }
        },
        [openValue, onOpenChange, isControlled],
    );

    return {
        open: openValue,
        toggleOpen,
    };
};
