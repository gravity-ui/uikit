import * as React from 'react';

import {useResizeObserver} from '../../useResizeObserver';

export interface UseAnimateHeightResult {
    onTransitionEnd: (event: React.TransitionEvent<HTMLElement>) => void;
}

export function useAnimateHeight({
    ref,
    enabled,
}: {
    ref?: React.RefObject<HTMLElement | null | undefined>;
    enabled: boolean;
}): UseAnimateHeightResult {
    const previousHeight = React.useRef<number | null>(null);
    const isTransitioningHeight = React.useRef(false);

    React.useEffect(() => {
        if (!enabled) {
            previousHeight.current = null;
            isTransitioningHeight.current = false;
        }
    }, [enabled]);

    const handleContentTransitionEnd = React.useCallback(
        (event: React.TransitionEvent<HTMLElement>) => {
            if (event.propertyName !== 'height') {
                return;
            }

            // ResizeObserver final resize event fires before this, so we have to delay with timeout
            setTimeout(() => {
                if (ref?.current) {
                    // eslint-disable-next-line no-param-reassign
                    ref.current.style.height = 'auto';
                    isTransitioningHeight.current = false;
                }
            }, 0);
        },
        [ref],
    );

    const handleResize = React.useCallback(() => {
        if (!ref?.current || isTransitioningHeight.current || !enabled) {
            return;
        }

        const contentHeight = ref.current.clientHeight;
        if (!previousHeight.current) {
            previousHeight.current = contentHeight;
            return;
        }

        // Set previous height first for the transition to work, because it doesn't work with 'auto'
        // eslint-disable-next-line no-param-reassign
        ref.current.style.height = `${previousHeight.current}px`;
        isTransitioningHeight.current = true;

        requestAnimationFrame(() => {
            if (ref.current) {
                // eslint-disable-next-line no-param-reassign
                ref.current.style.height = `${contentHeight}px`;
                previousHeight.current = contentHeight;
            }
        });
    }, [ref, enabled]);

    useResizeObserver({ref, onResize: handleResize});

    const result = React.useMemo<UseAnimateHeightResult>(
        () => ({onTransitionEnd: handleContentTransitionEnd}),
        [handleContentTransitionEnd],
    );

    return result;
}
