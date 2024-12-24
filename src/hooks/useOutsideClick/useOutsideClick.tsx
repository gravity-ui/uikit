import * as React from 'react';

export interface UseOutsideClickProps<T> {
    ref: React.RefObject<T>;
    handler?: (e: MouseEvent | TouchEvent) => void;
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
        const callback = (e: MouseEvent | TouchEvent) => {
            const elem = ref?.current;

            if (elem && !elem.contains(e.target as Node) && handler) {
                handler(e);
            }
        };

        window.addEventListener('mouseup', callback, {capture: true});
        window.addEventListener('touchend', callback, {capture: true});

        return () => {
            window.removeEventListener('mouseup', callback, {capture: true});
            window.removeEventListener('touchend', callback, {capture: true});
        };
    }, [handler, ref]);
};
