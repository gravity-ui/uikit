import * as React from 'react';

import {SyntheticFocusEvent} from './SyntheticFocusEvent';

interface State {
    isFocused: boolean;
    observer: MutationObserver | null;
}

// React does not fire onBlur when an element is disabled https://github.com/facebook/react/issues/9142
export function useSyntheticBlurEvent(onBlur?: React.FocusEventHandler) {
    const stateRef = React.useRef<State>({
        isFocused: false,
        observer: null,
    });

    React.useEffect(() => {
        const state = stateRef.current;
        return () => {
            if (state.observer) {
                state.observer.disconnect();
                state.observer = null;
            }
        };
    }, []);

    const handleFocus = React.useCallback(
        (event: React.FocusEvent) => {
            const target = event.target;
            if (
                target instanceof HTMLButtonElement ||
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement ||
                target instanceof HTMLSelectElement
            ) {
                stateRef.current.isFocused = true;

                const handleBlur = (e: FocusEvent) => {
                    stateRef.current.isFocused = false;

                    if (target.disabled) {
                        onBlur?.(new SyntheticFocusEvent('blur', e));
                    }

                    if (stateRef.current.observer) {
                        stateRef.current.observer.disconnect();
                        stateRef.current.observer = null;
                    }
                };

                // TS can't resolve correct definition for addEventListener when target is union type
                // @ts-expect-error
                target.addEventListener('focusout', handleBlur, {once: true});

                const observer = new MutationObserver(() => {
                    if (stateRef.current.isFocused && target.disabled) {
                        observer.disconnect();
                        stateRef.current.observer = null;
                        const relatedTarget =
                            target === document.activeElement ? null : document.activeElement;
                        target.dispatchEvent(new FocusEvent('blur', {relatedTarget}));
                        target.dispatchEvent(
                            new FocusEvent('focusout', {relatedTarget, bubbles: true}),
                        );
                    }
                });
                observer.observe(target, {attributes: true, attributeFilter: ['disabled']});
                stateRef.current.observer = observer;
            }
        },
        [onBlur],
    );

    return handleFocus;
}
