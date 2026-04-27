import * as React from 'react';

import {useLayoutEffect} from '../../../hooks/useLayoutEffect';
import {useResizeObserver} from '../../../hooks/useResizeObserver';

function getTabListGapFromContainer(container: HTMLElement, childSelector: string): number {
    const directChildren = Array.from(
        container.querySelectorAll<HTMLElement>(`:scope > :where(${childSelector})`),
    );

    for (const child of directChildren) {
        if (child === container.lastElementChild) {
            continue;
        }

        return parseFloat(getComputedStyle(child).marginInlineEnd) || 0;
    }

    return 0;
}

/**
 * Resolves the horizontal gap between tabs
 */
export function useTabListGapFromContainer(
    containerRef: React.RefObject<HTMLElement | null>,
    {
        enabled,
        childrenHash,
        childSelector,
    }: {enabled: boolean; childrenHash: string; childSelector: string},
): number {
    const [gap, setGap] = React.useState(0);

    const calculateGap = React.useCallback(() => {
        const el = containerRef.current;

        if (!el) {
            return;
        }

        setGap((prev) => {
            const next = getTabListGapFromContainer(el, childSelector);
            return next === prev ? prev : next;
        });
    }, [containerRef, childSelector]);

    useLayoutEffect(() => {
        if (enabled) {
            calculateGap();
        } else {
            setGap(0);
        }
    }, [childrenHash, enabled, calculateGap]);

    useResizeObserver({
        ref: containerRef,
        onResize: calculateGap,
    });

    return gap;
}
