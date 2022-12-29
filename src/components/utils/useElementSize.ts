import {useLayoutEffect, useState, MutableRefObject} from 'react';
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

    useLayoutEffect(() => {
        if (!ref?.current) {
            return undefined;
        }

        const handleResize: ResizeObserverCallback = (entries) => {
            if (!Array.isArray(entries)) {
                return;
            }

            const entry = entries[0];
            if (entry.borderBoxSize?.length > 0) {
                setSize({
                    width: Math.round(entry.borderBoxSize[0].inlineSize),
                    height: Math.round(entry.borderBoxSize[0].blockSize),
                });
            } else {
                const target = entry.target as HTMLElement;
                setSize({
                    width: Math.round(target.offsetWidth),
                    height: Math.round(target.offsetHeight),
                });
            }
        };

        const observer = new ResizeObserver(_throttle(handleResize, RESIZE_THROTTLE));
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return size;
}
