import * as React from 'react';

import {useResizeObserver} from '../../useResizeObserver';
import type {ResizeInfo} from '../../useResizeObserver/useResizeObserver';
import {useMatchMedia} from '../useMatchMedia';

export function useAnimateHeight({
    ref,
    enabled: enabledProp,
}: {
    ref?: React.RefObject<HTMLElement | null | undefined>;
    enabled: boolean;
}): void {
    const isPrefersReducedMotion = useMatchMedia({media: '(prefers-reduced-motion: reduce)'});
    const enabled = enabledProp && !isPrefersReducedMotion;
    const previousHeight = React.useRef<number | null>(null);
    const isTransitioningHeight = React.useRef(false);
    const overflowY = React.useRef<string>('');
    const animationFrame = React.useRef<number>(-1);

    React.useEffect(() => {
        let mutationObserver: MutationObserver | undefined;
        const node = ref?.current;

        if (node && enabled) {
            mutationObserver = new MutationObserver((mutations) => {
                if (!mutations.length || !isTransitioningHeight.current) return;

                // If node content changes mid animation, we reset height to immediately animate towards the new height
                previousHeight.current = calculateNodeHeight(node);
                isTransitioningHeight.current = false;
                node.style.height = '';
                node.style.overflowY = overflowY.current;
                cancelAnimationFrame(animationFrame.current);
            });

            mutationObserver.observe(node, {
                childList: true,
                subtree: true,
            });
        }

        return () => {
            mutationObserver?.disconnect();
        };
    }, [ref, enabled]);

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

            const contentHeight = calculateNodeHeight(node);
            if (!previousHeight.current && !overflowY.current) {
                previousHeight.current = contentHeight;
                overflowY.current = node.style.overflowY;
                return;
            }

            // Skip animation if height hasn't changed (avoids heading margin collapsing issues)
            if (previousHeight.current && contentHeight === previousHeight.current) {
                return;
            }

            // Avoid "ResizeObserver loop completed with undelivered notifications" error
            resizeInfo.observer?.unobserve(node);

            // Set previous height first for the transition to work, because it doesn't work with 'auto'
            node.style.height = `${previousHeight.current}px`;
            isTransitioningHeight.current = true;
            node.style.overflowY = 'clip';

            const handleTransitionEnd = (event: TransitionEvent) => {
                if (event.propertyName !== 'height') {
                    return;
                }

                node.removeEventListener('transitionend', handleTransitionEnd);

                // ResizeObserver final resize event fires before this, so we have to delay with timeout
                setTimeout(() => {
                    node.style.height = '';
                    node.style.overflowY = overflowY.current;
                    isTransitioningHeight.current = false;
                }, 0);
            };

            node.addEventListener('transitionend', handleTransitionEnd);

            animationFrame.current = requestAnimationFrame(() => {
                resizeInfo.observer?.observe(node);
                node.style.height = `${contentHeight}px`;
                previousHeight.current = contentHeight;
            });
        },
        [ref, enabled],
    );

    useResizeObserver({ref: enabled ? ref : undefined, onResize: handleResize});
}

function calculateNodeHeight(node: HTMLElement) {
    const computedStyle = window.getComputedStyle(node, null);
    if (computedStyle.getPropertyValue('box-sizing') === 'border-box') {
        return node.clientHeight;
    }

    const paddingTop = parseInt(computedStyle.getPropertyValue('padding-top'), 10);
    const paddingBottom = parseInt(computedStyle.getPropertyValue('padding-bottom'), 10);

    return node.clientHeight - paddingTop - paddingBottom;
}
