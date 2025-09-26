import * as React from 'react';

import {useLayoutEffect} from '../useLayoutEffect';
import {useResizeObserver} from '../useResizeObserver';

export interface UseCollapseChildrenProps {
    /**
     * Whether the hook is enabled
     * @default true
     */
    enabled?: boolean;
    /**
     * React ref for the container element
     */
    containerRef: React.RefObject<HTMLElement | null>;
    /**
     * React refs for elements that should not participate in calculation
     */
    preservedRefs?: Array<React.RefObject<HTMLElement | null>>;
    /**
     * The minimum count of items to be visible
     * @default 0
     */
    minCount?: number;
    /**
     * The maximum count of items to be visible
     * @default Infinity
     */
    maxCount?: number;
    /**
     * Collapse direction of items
     * @default 'end'
     */
    direction?: 'start' | 'end';
    /**
     * The distance between items
     * @default 0
     */
    gap?: number;
    /**
     * CSS-selector to pick child items in the container
     * @default '*'
     */
    childSelector?: string;
    /**
     * Custom measure function of item's width
     * @param child HTMLElement
     * @returns number
     */
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
        const childWidthMap = new WeakMap<HTMLElement, number>(
            containerChildren.map((child) => [child, getChildWidth(child)]),
        );

        if (direction === 'start') {
            containerChildren.reverse();
        }

        // Place preserved items at the beginning to calculate them first
        const preservedItems = preservedRefs.flatMap((ref) => ref.current ?? []);
        containerChildren.sort((itemA, itemB) => {
            const valueA = preservedItems.includes(itemA) ? 1 : 0;
            const valueB = preservedItems.includes(itemB) ? 1 : 0;
            return valueB - valueA;
        });

        let availableWidth = containerWidth;
        let newVisibleCount = 0;

        for (const item of containerChildren) {
            if (newVisibleCount >= maxCount) {
                break;
            }

            availableWidth -= childWidthMap.get(item) ?? 0;
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
            setVisibleCount(maxCount);
            setCalculated(false);
        }
    }, [enabled, maxCount]);

    useResizeObserver({
        ref: containerRef,
        onResize: recalculate,
    });

    // Recalculate on changing props
    // Should be placed before the main hook so it won't override the state
    useLayoutEffect(() => {
        recalculate();
    }, [recalculate, minCount, maxCount, direction, gap, childSelector]);

    useLayoutEffect(() => {
        if (calculated) {
            return;
        }

        if (enabled) {
            calculate(visibleCount);
        } else {
            setVisibleCount(Infinity);
            setCalculated(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, calculated, visibleCount]);

    return {calculated, recalculate, visibleCount};
}
