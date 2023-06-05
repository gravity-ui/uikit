import React from 'react';

import {isFocusable, isTabbable} from 'tabbable';

interface UseRestoreFocusProps {
    enabled: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    focusTrapped?: boolean;
}
export function useRestoreFocus({enabled, restoreFocusRef, focusTrapped}: UseRestoreFocusProps) {
    const ref = React.useRef<HTMLElement | null>(null);

    const initialActiveElementRef = React.useRef<HTMLElement | null>(null);
    const lastActiveElementRef = React.useRef<HTMLElement | null>(null);

    const handleFocus = (event: React.FocusEvent) => {
        if (enabled && initialActiveElementRef.current === null) {
            initialActiveElementRef.current = event.relatedTarget as HTMLElement | null;
            lastActiveElementRef.current = initialActiveElementRef.current;
        }
    };

    React.useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        const handleFocusIn = (event: FocusEvent) => {
            const element = event.target;
            if (!focusTrapped && element instanceof HTMLElement && isTabbable(element)) {
                lastActiveElementRef.current = element;
            }
        };
        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const element = event.target;
            if (element instanceof HTMLElement && isTabbable(element)) {
                lastActiveElementRef.current = element;
            } else {
                lastActiveElementRef.current = null;
            }
        };

        window.addEventListener('focusin', handleFocusIn);
        window.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('touchstart', handlePointerDown);
        return () => {
            window.removeEventListener('focusin', handleFocusIn);
            window.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('touchstart', handlePointerDown);
        };
    }, [enabled, focusTrapped]);

    React.useEffect(() => {
        ref.current = (restoreFocusRef?.current || initialActiveElementRef.current) ?? null;
    });

    React.useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        return () => {
            let element = ref.current;
            const lastActive = lastActiveElementRef.current;
            if (lastActive && document.contains(lastActive) && isTabbable(lastActive)) {
                element = lastActive;
            }
            if (
                element &&
                typeof element.focus === 'function' &&
                document.contains(element) &&
                isFocusable(element)
            ) {
                if (element !== document.activeElement) {
                    setTimeout(() => {
                        element?.focus();
                    }, 0);
                }
                initialActiveElementRef.current = null;
                lastActiveElementRef.current = null;
            }
        };
    }, [enabled]);

    return {onFocus: handleFocus};
}
