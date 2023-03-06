import React from 'react';
import type {UseOpenProps} from './types';

export const useOpenState = (props: UseOpenProps) => {
    const [open, setOpenState] = React.useState(props.defaultOpen || false);
    const isOpenControlled = typeof props.open === 'boolean';
    const {onOpenChange, onClose} = props;

    React.useEffect(() => {
        if (!isOpenControlled) return;

        setOpenState(props.open as boolean);
    }, [props.open, isOpenControlled]);

    const setOpen = React.useCallback(() => {
        if (isOpenControlled || open) return;
        setOpenState(true);
        onOpenChange?.(true);
    }, [setOpenState, isOpenControlled, onOpenChange, open]);

    const setClose = React.useCallback(() => {
        if (!open) return;
        onClose?.();
        if (isOpenControlled) return;
        setOpenState(false);
        onOpenChange?.(false);
    }, [setOpenState, onClose, onOpenChange, isOpenControlled, open]);

    const toggleOpen = React.useCallback(() => {
        if (open) {
            setClose();
        } else {
            setOpen();
        }
    }, [setClose, open, setOpen]);

    return {open, setOpen, setClose, toggleOpen};
};
