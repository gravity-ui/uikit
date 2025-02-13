import * as React from 'react';

import {useResizeObserver} from '../../useResizeObserver';

export interface UseAnimateHeightResult {
    onTransitionEnd: (event: React.TransitionEvent<HTMLElement>) => void;
}

export function useAnimateHeight(
    ref?: React.RefObject<HTMLElement | null | undefined>,
): UseAnimateHeightResult {
    const previousHeight = React.useRef<number | null>(null);
    const isTransitioningHeight = React.useRef(false);

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
                    // eslint-disable-next-line no-param-reassign
                    ref.current.style.overflowY = '';
                    isTransitioningHeight.current = false;
                }
            }, 0);
        },
        [ref],
    );

    const handleResize = React.useCallback(() => {
        if (!ref?.current || isTransitioningHeight.current) {
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
        // Set overflow to hidden so that scrollbar doesn't appear while transitioning
        // eslint-disable-next-line no-param-reassign
        ref.current.style.overflowY = 'hidden';
        isTransitioningHeight.current = true;

        requestAnimationFrame(() => {
            if (ref.current) {
                // eslint-disable-next-line no-param-reassign
                ref.current.style.height = `${contentHeight}px`;
                previousHeight.current = contentHeight;
            }
        });
    }, []);

    useResizeObserver({ref, onResize: handleResize});

    const result = React.useMemo<UseAnimateHeightResult>(
        () => ({onTransitionEnd: handleContentTransitionEnd}),
        [handleContentTransitionEnd],
    );

    return result;
}
