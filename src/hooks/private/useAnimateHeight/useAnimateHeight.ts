import * as React from 'react';

import type {ResizeInfo} from 'src/hooks/useResizeObserver/useResizeObserver';

import {useResizeObserver} from '../../useResizeObserver';

export function useAnimateHeight({
    ref,
    enabled,
}: {
    ref?: React.RefObject<HTMLElement | null | undefined>;
    enabled: boolean;
}): void {
    const previousHeight = React.useRef<number | null>(null);
    const isTransitioningHeight = React.useRef(false);

    React.useEffect(() => {
        if (!enabled) {
            previousHeight.current = null;
            isTransitioningHeight.current = false;
        }
    }, [enabled]);

    const handleResize = React.useCallback(
        (resizeInfo: ResizeInfo) => {
            const node = ref?.current;
            if (!node || isTransitioningHeight.current || !enabled) {
                return;
            }

            const contentHeight = node.clientHeight;
            if (!previousHeight.current || previousHeight.current === contentHeight) {
                previousHeight.current = contentHeight;
                return;
            }

            // Avoid "ResizeObserver loop completed with undelivered notifications" error
            resizeInfo.observer?.unobserve(node);

            // Set previous height first for the transition to work, because it doesn't work with 'auto'
            node.style.height = `${previousHeight.current}px`;
            isTransitioningHeight.current = true;
            const overflowY = node.style.overflowY;
            node.style.overflowY = 'clip';

            const handleTransitionEnd = (event: TransitionEvent) => {
                if (event.propertyName !== 'height') {
                    return;
                }

                node.removeEventListener('transitionend', handleTransitionEnd);

                // ResizeObserver final resize event fires before this, so we have to delay with timeout
                setTimeout(() => {
                    node.style.height = 'auto';
                    node.style.overflowY = overflowY;
                    isTransitioningHeight.current = false;
                }, 0);
            };

            node.addEventListener('transitionend', handleTransitionEnd);

            requestAnimationFrame(() => {
                resizeInfo.observer?.observe(node);
                node.style.height = `${contentHeight}px`;
                previousHeight.current = contentHeight;
            });
        },
        [ref, enabled],
    );

    useResizeObserver({ref: enabled ? ref : undefined, onResize: handleResize});
}
