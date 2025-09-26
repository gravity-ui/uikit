import * as React from 'react';

import {useResizeObserver} from '../useResizeObserver';

export interface UseCollapseChildrenProps {
    enabled?: boolean;
    containerRef: React.RefObject<HTMLElement | null>;
    preservedRefs?: Array<React.RefObject<HTMLElement | null>>;
    minCount?: number;
    maxCount?: number;
    direction?: 'start' | 'end';
    gap?: number;
    childSelector?: string;
    getChildWidth?: (child: HTMLElement) => number;
}

export interface UseCollapseChildrenResult {
    calculated: boolean;
    recalculate: () => void;
    visibleCount: number;
}

export function useCollapseChildren({
    enabled = true,
    containerRef,
    preservedRefs = [],
    minCount = 0,
    maxCount = Infinity,
    direction = 'end',
    gap = 0,
    childSelector = '*',
    getChildWidth = (child) => child.getBoundingClientRect().width,
}: UseCollapseChildrenProps): UseCollapseChildrenResult {
    const [calculated, setCalculated] = React.useState(false);
    const [visibleCount, setVisibleCount] = React.useState<number>(maxCount);

    const calculate = (desiredVisibleCount: number) => {
        const container = containerRef.current;
        if (!container) return;

        // Batch elements measurement to optimize performance
        const containerChildren = Array.from(
            container.querySelectorAll<HTMLElement>(`:scope > ${childSelector}`),
        );
        const containerWidth = container.getBoundingClientRect().width;
        const itemWidthMap = new WeakMap<HTMLElement, number>(
            containerChildren.map((child) => [child, getChildWidth(child)]),
        );

        const preservedItems = preservedRefs.flatMap((ref) => ref.current ?? []);
        const allItems = direction === 'start' ? containerChildren.reverse() : containerChildren;

        // Place preserved items at the beginning to calculate them first
        allItems.sort((itemA, itemB) => {
            const valueA = preservedItems.includes(itemA) ? 1 : 0;
            const valueB = preservedItems.includes(itemB) ? 1 : 0;
            return valueB - valueA;
        });

        let availableWidth = containerWidth;
        let newVisibleCount = 0;

        for (const item of allItems) {
            if (newVisibleCount >= maxCount) {
                break;
            }

            availableWidth -= itemWidthMap.get(item) ?? 0;
            if (availableWidth < 0) break;
            availableWidth -= gap;

            if (!preservedItems.includes(item)) {
                newVisibleCount++;
            }
        }

        const minNewVisibleCount = Math.max(newVisibleCount, minCount);
        if (minNewVisibleCount === desiredVisibleCount) {
            setCalculated(true);
        } else {
            setVisibleCount(minNewVisibleCount);
        }
    };

    const recalculate = React.useCallback(() => {
        if (enabled) {
            setVisibleCount(Infinity);
            setCalculated(false);
        }
    }, [enabled]);

    useResizeObserver({
        ref: containerRef,
        onResize: recalculate,
    });

    React.useLayoutEffect(() => {
        if (enabled && !calculated) {
            calculate(visibleCount);
        }

        if (!enabled && !calculated) {
            setVisibleCount(Infinity);
            setCalculated(true);
        }
    });

    React.useLayoutEffect(() => {
        if (calculated) {
            setVisibleCount(Infinity);
            setCalculated(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, minCount, maxCount, direction, gap]);

    return {calculated, recalculate, visibleCount};
}
