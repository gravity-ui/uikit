import React from 'react';

export type UseOnClickOutsideType = <T extends HTMLElement>({
    observedRef,
    enabled,
}: {
    observedRef: React.RefObject<T>;
    enabled?: boolean;
    handleCallback?: () => void;
}) => void;

/**
 * Hook for observing clicks outside a given target
 *
 * @param observedRef - purpose of observation
 * @param enabled - enabled/disable flag
 * @param handleCallback - callback when a click is triggered outside the observation target
 *
 * @return - nothing
 */
export const useOnClickOutside: UseOnClickOutsideType = ({
    observedRef,
    enabled = true,
    handleCallback,
}) => {
    React.useEffect(() => {
        if (enabled && observedRef) {
            const handler = (e: MouseEvent) => {
                const elem = observedRef?.current;

                if (elem && !elem.contains(e.target as Node) && handleCallback) {
                    handleCallback();
                }
            };

            window.addEventListener('click', handler, {capture: true});

            return () => {
                window.removeEventListener('click', handler, {capture: true});
            };
        }

        return undefined;
    }, [enabled, handleCallback, observedRef]);
};
