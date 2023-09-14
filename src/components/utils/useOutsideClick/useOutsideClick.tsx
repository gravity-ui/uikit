import React from 'react';

export interface UseOutsideClickProps<T> {
    ref: React.RefObject<T>;
    handler?: () => void;
}

type UseOutsideClickType = <K extends HTMLElement>(props: UseOutsideClickProps<K>) => void;

/**
 * Hook for observing clicks outside a given target
 *
 * @param ref - purpose of observation
 * @param handler - callback when a click is triggered outside the observation target
 *
 * @return - nothing
 */
export const useOutsideClick: UseOutsideClickType = ({ref, handler}) => {
    React.useEffect(() => {
        if (ref) {
            const callback = (e: MouseEvent | TouchEvent) => {
                const elem = ref?.current;

                if (elem && !elem.contains(e.target as Node) && handler) {
                    handler();
                }
            };

            window.addEventListener('click', callback, {capture: true});
            window.addEventListener('touchstart', callback, {capture: true});

            return () => {
                window.removeEventListener('click', callback, {capture: true});
                window.removeEventListener('touchstart', callback, {capture: true});
            };
        }

        return undefined;
    }, [handler, ref]);
};
