import {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import {useUpdateEffect} from '../../utils/useUpdateEffect';
import {delayByBehavior, PopoverBehavior} from '../config';

export type UseOpenProps = {
    initialOpen: boolean;
    disabled: boolean;
    autoclosable: boolean;
    onOpenChange?: (open: boolean) => void;
    delayOpening?: number;
    delayClosing?: number;
    behavior: PopoverBehavior;
    shouldBeOpen: MutableRefObject<boolean>;
};

export const useOpen = ({
    initialOpen,
    disabled,
    autoclosable,
    onOpenChange,
    delayOpening,
    delayClosing,
    behavior,
    shouldBeOpen,
}: UseOpenProps) => {
    const openingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isOpen, setIsOpen] = useState(initialOpen);

    const unsetOpeningTimeout = useCallback(() => {
        if (openingTimeout.current) {
            clearTimeout(openingTimeout.current);
            openingTimeout.current = null;
        }
    }, []);

    const unsetClosingTimeout = useCallback(() => {
        if (closingTimeout.current) {
            clearTimeout(closingTimeout.current);
            closingTimeout.current = null;
        }
    }, []);

    useEffect(() => {
        return () => {
            unsetOpeningTimeout();
            unsetClosingTimeout();
        };
    }, [unsetClosingTimeout, unsetOpeningTimeout]);

    const setTooltipOpen = useCallback(
        (open: boolean) => {
            setIsOpen(open);
            shouldBeOpen.current = open;
            onOpenChange?.(open);
        },
        [onOpenChange, shouldBeOpen],
    );

    const openTooltip = useCallback(() => {
        unsetOpeningTimeout();
        setTooltipOpen(true);
    }, [setTooltipOpen, unsetOpeningTimeout]);

    const closeTooltip = useCallback(() => {
        unsetClosingTimeout();
        setTooltipOpen(false);
    }, [setTooltipOpen, unsetClosingTimeout]);

    useEffect(() => {
        if (disabled) {
            closeTooltip();
        }
    }, [disabled, closeTooltip]);

    useUpdateEffect(() => {
        if (autoclosable && !shouldBeOpen.current) {
            closeTooltip();
        }
    }, [autoclosable, closeTooltip, shouldBeOpen]);

    const [defaultDelayOpening, defaultDelayClosing] = delayByBehavior[behavior];

    const openTooltipDelayed = useCallback(() => {
        openingTimeout.current = setTimeout(() => {
            openingTimeout.current = null;
            openTooltip();
        }, delayOpening ?? defaultDelayOpening);
    }, [defaultDelayOpening, delayOpening, openTooltip]);

    const closeTooltipDelayed = useCallback(() => {
        closingTimeout.current = setTimeout(() => {
            closingTimeout.current = null;
            closeTooltip();
        }, delayClosing ?? defaultDelayClosing);
    }, [closeTooltip, defaultDelayClosing, delayClosing]);

    return {
        isOpen,
        closingTimeout,
        openTooltip,
        openTooltipDelayed,
        unsetOpeningTimeout,
        closeTooltip,
        closeTooltipDelayed,
        unsetClosingTimeout,
    };
};
