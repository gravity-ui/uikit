import {useLayoutEffect, useState, MutableRefObject, useCallback} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import _throttle from 'lodash/throttle';

const RESIZE_THROTTLE = 16;

interface ElementSize {
    width: number;
    height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(
    ref: MutableRefObject<T | null> | null,
) {
    const [size, setSize] = useState<ElementSize>({
        width: 0,
        height: 0,
    });

    const handleResize = useCallback<ResizeObserverCallback>((entries) => {
        if (!Array.isArray(entries)) {
            return;
        }

        const entry = entries[0];
        setSize({width: entry.contentRect.width, height: entry.contentRect.height});
    }, []);

    useLayoutEffect(() => {
        if (!ref?.current) {
            return undefined;
        }

        const observer = new ResizeObserver(_throttle(handleResize, RESIZE_THROTTLE));
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, handleResize]);

    return size;
}
