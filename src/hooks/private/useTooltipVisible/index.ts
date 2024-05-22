import React from 'react';

import {KeyCode} from '../../../constants';
import {useBoolean} from '../useBoolean';

export interface TooltipDelayProps {
    openDelay?: number;
    closeDelay?: number;
}

export const useTooltipVisible = (
    anchor: HTMLElement | null,
    {
        openDelay = 250,
        closeDelay,
        preventTriggerOnFocus = false,
    }: TooltipDelayProps & {preventTriggerOnFocus?: boolean},
) => {
    const [tooltipVisible, showTooltip, hideTooltip] = useBoolean(false);
    const timeoutRef = React.useRef<number>();
    const isFocusWithinRef = React.useRef(false);

    React.useEffect(() => {
        if (!anchor) {
            return undefined;
        }

        function handleMouseEnter() {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(showTooltip, openDelay);
        }

        function handleMouseLeave() {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(hideTooltip, closeDelay);
        }

        function handleFocusWithin(event: FocusEvent) {
            if (!isFocusWithinRef.current && document.activeElement === event.target) {
                isFocusWithinRef.current = true;
                clearTimeout(timeoutRef.current);
                showTooltip();
            }
        }

        function handleBlurWithin(event: FocusEvent) {
            if (
                isFocusWithinRef.current &&
                !(event.currentTarget as Element).contains(event.relatedTarget as Element)
            ) {
                isFocusWithinRef.current = false;
                clearTimeout(timeoutRef.current);
                hideTooltip();
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === KeyCode.ESCAPE) {
                clearTimeout(timeoutRef.current);
                hideTooltip();
            }
        }

        anchor.addEventListener('mouseenter', handleMouseEnter);
        anchor.addEventListener('mouseleave', handleMouseLeave);
        anchor.addEventListener('keydown', handleKeyDown);

        if (!preventTriggerOnFocus) {
            anchor.addEventListener('focus', handleFocusWithin);
            anchor.addEventListener('blur', handleBlurWithin);
        }
        return () => {
            anchor.removeEventListener('mouseenter', handleMouseEnter);
            anchor.removeEventListener('mouseleave', handleMouseLeave);
            anchor.removeEventListener('focus', handleFocusWithin);
            anchor.removeEventListener('blur', handleBlurWithin);
            anchor.removeEventListener('keydown', handleKeyDown);
        };
    }, [anchor, showTooltip, hideTooltip, openDelay, closeDelay, preventTriggerOnFocus]);

    return tooltipVisible;
};
