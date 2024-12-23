import * as React from 'react';

import round from 'lodash/round';
import throttle from 'lodash/throttle';

const RESIZE_THROTTLE = 16;
const ROUND_PRECISION = 2;

export interface UseElementSizeResult {
    width: number;
    height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(
    ref: React.MutableRefObject<T | null> | null,
    // can be used, when it is needed to force reassign observer to element
    // in order to get correct measures. might be related to below
    // https://github.com/WICG/resize-observer/issues/65
    key?: string,
) {
    const [size, setSize] = React.useState<UseElementSizeResult>({
        width: 0,
        height: 0,
    });

    React.useLayoutEffect(() => {
        const element = ref?.current;
        if (!element) {
            return undefined;
        }

        setSize({
            width: round(element.offsetWidth, ROUND_PRECISION),
            height: round(element.offsetHeight, ROUND_PRECISION),
        });

        const handleResize: ResizeObserverCallback = (entries) => {
            if (!Array.isArray(entries)) {
                return;
            }

            const entry = entries[0];
            if (entry.borderBoxSize) {
                const borderBoxSize = entry.borderBoxSize[0]
                    ? entry.borderBoxSize[0]
                    : (entry.borderBoxSize as unknown as ResizeObserverSize);
                // ...but old versions of Firefox treat it as a single item
                // https://github.com/mdn/dom-examples/blob/main/resize-observer/resize-observer-text.html#L88

                setSize({
                    width: round(borderBoxSize.inlineSize, ROUND_PRECISION),
                    height: round(borderBoxSize.blockSize, ROUND_PRECISION),
                });
            } else {
                const target = entry.target as HTMLElement;
                setSize({
                    width: round(target.offsetWidth, ROUND_PRECISION),
                    height: round(target.offsetHeight, ROUND_PRECISION),
                });
            }
        };

        const observer = new ResizeObserver(throttle(handleResize, RESIZE_THROTTLE));
        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [ref, key]);

    return size;
}
