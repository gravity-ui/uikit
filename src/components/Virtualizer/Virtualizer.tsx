'use client';

import * as React from 'react';

// eslint-disable-next-line no-restricted-imports
import type {
    Range,
    Rect,
    VirtualItem,
    Virtualizer as VirtualizerInstance,
} from '@tanstack/react-virtual';
// eslint-disable-next-line no-restricted-imports
import {
    defaultRangeExtractor,
    measureElement as measureElementDefault,
    useVirtualizer,
} from '@tanstack/react-virtual';

import {useForkRef} from '../../hooks/useForkRef';
import {useLayoutEffect} from '../../hooks/useLayoutEffect';
import type {Key} from '../types';
import {getNearestEdgeScrollOffset, getOffsetTopWithin} from '../utils/scrollIntoContainer';

import type {Loadable} from './useLoadMore';
import {useLoadMore} from './useLoadMore';

export type VirtualizerItem = {index: number; key: Key};

/** How many quiet frames end the watch of `scrollToIndex`, and how many frames it lasts at most */
const SCROLL_SETTLED_FRAMES = 3;
const SCROLL_MAX_FRAMES = 20;

export type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';

export interface VirtualizerApi {
    scrollToOffset: (offset: number, align?: ScrollAlignment) => void;
    scrollToIndex: (index: number, align?: ScrollAlignment) => void;
    scrollOffset: number | null;
    scrollRect: Rect | null;
}

export interface VirtualizerProps extends Loadable, React.HTMLAttributes<HTMLDivElement> {
    /** The ref of the virtualizer api. */
    apiRef?: React.Ref<VirtualizerApi>;
    /** The ref of the scroll container element. */
    containerRef?: React.Ref<HTMLElement>;
    /** The number of first level items in the list. */
    count: number;
    /** The size of the item in the list. Size should include all children. For children items parentKey is passed. */
    getItemSize: (index: number, parentKey?: Key) => number;
    /** The key of the item in the list. For children items parentKey is passed. */
    getItemKey: (index: number, parentKey?: Key) => Key;
    /** Disables virtualization of the list. This might be useful for small lists. */
    disableVirtualization?: boolean;
    /** The number of items to render above and below the visible area. */
    overscan?: number;
    /**
     * Whether to measure rendered rows and use their actual sizes instead of
     * the `getItemSize` estimation. Only top-level rows are measured.
     */
    measure?: boolean;
    /** Renders the row of the list. */
    renderRow: (
        /**
         * The item of the row.
         * @param item.index The index of the item in current level.
         * @param item.key The key of the item in the list.
         */
        item: VirtualizerItem,
        /** The key of the parent item in the list. */
        parentKey: Key | undefined,
        /**
         * Renders the children of the row.
         * @param options.count The number of children items.
         * @param options.height The self height of the row.
         */
        renderChildren: (options: {count: number; height: number}) => React.ReactNode,
    ) => React.ReactNode;
    /** The indexes of the persisted items. Each item is an array of indexes in the hierarchy. */
    persistedIndexes?: Array<number[]>;
}

export function Virtualizer({
    apiRef,
    containerRef,
    count,
    getItemSize,
    getItemKey,
    disableVirtualization,
    overscan = 0,
    measure = true,
    renderRow,
    loading,
    onLoadMore,
    persistedIndexes,
    ...props
}: VirtualizerProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const ref = useForkRef(containerRef, scrollContainerRef);

    // The total scroll size is only as honest as the estimation: until a row
    // is measured its height is `getItemSize`. Scaling the estimation of the
    // not-yet-measured rows by the measured/estimated ratio of the already
    // measured ones makes the total size (and the scrollbar) match the real
    // content right after the first window is measured, instead of "growing"
    // while the user scrolls through an underestimated list.
    const getItemSizeRef = React.useRef(getItemSize);
    const getItemKeyRef = React.useRef(getItemKey);
    getItemKeyRef.current = getItemKey;
    const estimateCorrectionRef = React.useRef({
        sizes: new Map<string, number>(),
        measuredTotal: 0,
        estimatedTotal: 0,
    });
    // A new getItemSize identity means the estimates themselves changed (the
    // size of the rows, the consumer's estimate function): the accumulated
    // measured/estimated ratio belongs to the old estimates and would skew the
    // unmeasured tail, so the correction starts over
    if (getItemSizeRef.current !== getItemSize) {
        estimateCorrectionRef.current = {sizes: new Map(), measuredTotal: 0, estimatedTotal: 0};
    }
    getItemSizeRef.current = getItemSize;
    const estimateSize = React.useCallback((index: number) => {
        const correction = estimateCorrectionRef.current;
        // A row that has already been measured is estimated with its actual
        // size: tanstack does not cache a measurement that matched the current
        // estimation, so without this its size would drift along with the ratio
        const measuredSize = correction.sizes.get(String(getItemKeyRef.current(index)));
        if (measuredSize !== undefined) {
            return measuredSize;
        }
        const estimate = getItemSizeRef.current(index);
        return correction.estimatedTotal > 0
            ? Math.round((estimate * correction.measuredTotal) / correction.estimatedTotal)
            : estimate;
    }, []);

    // The rows do not start where the scroll does: the padding of the container comes first. The
    // engine has to be told, or a row it scrolls to the bottom edge ends up cut by that padding.
    // Measured after every render — the padding may change with any of them.
    //
    // The state is set only when the offset has changed, never "to the same value": while a
    // low-priority render of tanstack is pending (it asks for one from a timer when a scroll
    // ends), React cannot drop an equal update early and renders again — and tanstack's reducer
    // returns a new object every time it is replayed, so that render commits, this effect runs
    // again, and the pair never stops ("Maximum update depth exceeded")
    const sizerRef = React.useRef<HTMLDivElement>(null);
    const [scrollMargin, setScrollMargin] = React.useState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        const container = scrollContainerRef.current;
        const sizer = sizerRef.current;
        if (!container || !sizer) {
            return;
        }
        const offset = getOffsetTopWithin(container, sizer);
        if (offset !== scrollMargin) {
            setScrollMargin(offset);
        }
    });

    const {rangeExtractor, persistedChildren} =
        getRangeExtractorAndChildrenIndexes(persistedIndexes);
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => scrollContainerRef.current,
        getItemKey,
        estimateSize,
        scrollMargin,
        // scrollTop rather than the scrollTo the engine calls by default: the same instant scroll,
        // and jsdom implements it
        scrollToFn: (offset, {adjustments = 0}, instance) => {
            if (instance.scrollElement) {
                // eslint-disable-next-line no-param-reassign
                instance.scrollElement.scrollTop = offset + adjustments;
            }
        },
        rangeExtractor,
        overscan: disableVirtualization ? count : overscan,
        measureElement: (element, entry, instance) => {
            const size = measureElementDefault(element, entry, instance);
            // Rows are identified by the data-key/data-index attributes set
            // by renderRows on the measured wrappers
            const {key, index} = (element as HTMLElement).dataset;
            if (key !== undefined && index !== undefined) {
                const correction = estimateCorrectionRef.current;
                // A row that has been measured before and now measures 0 has no
                // content to measure right now (a dnd library hides the original
                // row while its clone/overlay is dragged) — it is not a 0px tall
                // row. Recording the zero would collapse the slot and visibly
                // shift every row below, so report the previous measurement:
                // tanstack sees no delta and leaves its cache untouched, while
                // the wrapper stays observed and re-measures itself once the
                // content comes back. Rows that never measured non-zero fall
                // through — those can legitimately be empty (a custom renderItem
                // returning null), and collapsing them is correct.
                const lastMeasured = correction.sizes.get(key);
                if (size === 0 && lastMeasured !== undefined) {
                    return lastMeasured;
                }
                // A stable dataset can hold at most `count` distinct keys; more
                // than that means the data shrank or got replaced and the cache
                // now carries orphaned keys — their sizes skew the ratio and
                // leak memory, so drop the whole cache and rebuild it from the
                // current window. Append-only growth (infinite scroll) keeps
                // size <= count and is preserved.
                if (correction.sizes.size > count) {
                    correction.sizes.clear();
                    correction.measuredTotal = 0;
                    correction.estimatedTotal = 0;
                }
                const prevSize = correction.sizes.get(key);
                if (prevSize === undefined) {
                    correction.estimatedTotal += getItemSizeRef.current(Number(index));
                    correction.measuredTotal += size;
                    correction.sizes.set(key, size);
                } else if (prevSize !== size) {
                    correction.measuredTotal += size - prevSize;
                    correction.sizes.set(key, size);
                }
            }
            return size;
        },
    });

    const scrollFrameRef = React.useRef(0);
    React.useEffect(() => () => cancelAnimationFrame(scrollFrameRef.current), []);

    React.useImperativeHandle(
        apiRef,
        () => ({
            scrollToOffset: (offset: number, align: ScrollAlignment = 'auto') => {
                virtualizer.scrollToOffset(virtualizer.getOffsetForAlignment(offset, align));
            },
            /**
             * Where a row is, is known for certain only once the rows above it are measured, and
             * they are measured only once the scroll gets near them: the first scroll lands by the
             * estimates, the measurements move the row, and the scroll is repeated until the row
             * stays in place for a few frames. The watch is a single one — a new call ends the
             * previous: the retry loop of `scrollToIndex` of tanstack cannot be cancelled, and
             * calls that come faster than it settles (a key held down) leave the list at a row of
             * an earlier call
             */
            scrollToIndex: (index: number, align: ScrollAlignment = 'auto') => {
                cancelAnimationFrame(scrollFrameRef.current);
                let frames = 0;
                let settledFrames = 0;
                const tick = () => {
                    const container = scrollContainerRef.current;
                    if (!container) {
                        return;
                    }
                    const offset = getOffsetToRow(virtualizer, container, index, align);
                    if (offset === undefined) {
                        settledFrames += 1;
                    } else {
                        settledFrames = 0;
                        virtualizer.scrollToOffset(offset);
                    }
                    frames += 1;
                    if (settledFrames < SCROLL_SETTLED_FRAMES && frames <= SCROLL_MAX_FRAMES) {
                        scrollFrameRef.current = requestAnimationFrame(tick);
                    }
                };
                tick();
            },
            get scrollOffset() {
                return virtualizer.scrollOffset;
            },
            get scrollRect() {
                return virtualizer.scrollRect;
            },
        }),
        [virtualizer],
    );

    const visibleItems = virtualizer.getVirtualItems();

    useLoadMore(scrollContainerRef, {onLoadMore, loading});

    return (
        <div
            {...props}
            ref={ref}
            style={{
                ...props.style,
                overflow: 'auto',
                // 'content' instead of 'strict': size containment collapses
                // containers whose height is bounded only by max-height
                contain: disableVirtualization ? undefined : 'content',
            }}
        >
            {renderRows({
                sizerRef,
                totalHeight: virtualizer.getTotalSize(),
                start: scrollMargin,
                items: visibleItems,
                scrollContainer: virtualizer.scrollElement,
                parentKey: undefined,
                renderRow,
                getItemSize,
                getItemKey,
                disableVirtualization,
                persistedChildren,
                measureElement: measure ? virtualizer.measureElement : undefined,
            })}
        </div>
    );
}

/**
 * The offset that brings the row where `align` wants it, `undefined` once it is there. `auto` is
 * the nearest edge, and a row in view stays where it is. It is decided by the scroll offset the
 * container has right now: the one the engine holds lags behind by a scroll event
 */
function getOffsetToRow(
    virtualizer: VirtualizerInstance<HTMLDivElement, Element>,
    container: HTMLElement,
    index: number,
    align: ScrollAlignment,
): number | undefined {
    const scrollTop = container.scrollTop;

    if (align !== 'auto') {
        const offset = virtualizer.getOffsetForIndex(index, align)?.[0];
        return offset === undefined || Math.abs(offset - scrollTop) <= 1 ? undefined : offset;
    }

    const item =
        virtualizer.measurementsCache[Math.max(0, Math.min(index, virtualizer.options.count - 1))];
    if (!item) {
        return undefined;
    }
    return getNearestEdgeScrollOffset({
        start: item.start,
        end: item.end,
        scrollOffset: scrollTop,
        viewportSize: container.offsetHeight,
    });
}

function renderRows({
    sizerRef,
    totalHeight,
    start,
    parentKey,
    getItemSize,
    getItemKey,
    renderRow,
    items,
    scrollContainer,
    disableVirtualization,
    persistedChildren,
    measureElement,
}: {
    sizerRef?: React.Ref<HTMLDivElement>;
    totalHeight: number;
    start: number;
    parentKey?: Key;
    getItemSize: (index: number, key?: Key) => number;
    getItemKey: (index: number, key?: Key) => Key;
    renderRow: (
        item: VirtualizerItem,
        parentKey: Key | undefined,
        renderChildren: (options: {count: number; height: number}) => React.ReactNode,
    ) => React.ReactNode;
    items: VirtualItem[];
    scrollContainer: HTMLElement | null;
    disableVirtualization?: boolean;
    persistedChildren?: Map<number, Array<number[]>>;
    measureElement?: VirtualizerInstance<HTMLElement, Element>['measureElement'];
}) {
    return (
        <div
            ref={sizerRef}
            role="presentation"
            style={
                disableVirtualization
                    ? {contentVisibility: 'auto', containIntrinsicBlockSize: totalHeight}
                    : {
                          height: totalHeight,
                          width: '100%',
                          position: 'relative',
                          // The scroll container may turn out to be a flex one
                          // (the List root is a flex column): without
                          // forbidding the shrink, the spacer collapses (its
                          // min-content is 0 — the rows are positioned
                          // absolutely) and the full scroll height is lost
                          flex: 'none',
                      }
            }
        >
            {items.map((virtualRow) => (
                <div
                    ref={measureElement}
                    data-key={virtualRow.key}
                    data-index={virtualRow.index}
                    key={virtualRow.key}
                    role="presentation"
                    style={
                        disableVirtualization
                            ? undefined
                            : {
                                  position: 'absolute',
                                  top: virtualRow.start - start,
                                  left: 0,
                                  width: '100%',
                              }
                    }
                >
                    {renderRow(virtualRow as VirtualizerItem, parentKey, ({height, count}) => (
                        <ChildrenVirtualizer
                            key={virtualRow.key}
                            count={count}
                            parentKey={virtualRow.key as Key}
                            start={virtualRow.start + height}
                            getItemSize={getItemSize}
                            getItemKey={getItemKey}
                            renderRow={renderRow}
                            scrollContainer={scrollContainer}
                            disableVirtualization={disableVirtualization}
                            persistedIndexes={persistedChildren?.get(virtualRow.index)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function ChildrenVirtualizer(props: {
    start: number;
    scrollContainer: HTMLElement | null;
    count: number;
    getItemSize: (index: number, key?: Key) => number;
    getItemKey: (index: number, key?: Key) => Key;
    parentKey: Key;
    renderRow: (
        item: VirtualizerItem,
        parentKey: Key | undefined,
        renderChildren: (options: {count: number; height: number}) => React.ReactNode,
    ) => React.ReactNode;
    disableVirtualization?: boolean;
    persistedIndexes?: Array<number[]>;
}) {
    const {
        start,
        scrollContainer,
        count,
        getItemSize,
        getItemKey,
        renderRow,
        parentKey,
        disableVirtualization,
        persistedIndexes,
    } = props;
    const {rangeExtractor, persistedChildren} =
        getRangeExtractorAndChildrenIndexes(persistedIndexes);
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => scrollContainer,
        estimateSize: (index) => getItemSize(index, parentKey),
        getItemKey: (index) => getItemKey(index, parentKey),
        scrollToFn: () => {}, // parent element controls scroll, so disable it here
        paddingStart: start,
        rangeExtractor,
        overscan: 0,
        enabled: !disableVirtualization,
    });

    let items = virtualizer.getVirtualItems();
    let height = virtualizer.getTotalSize() - start;
    if (disableVirtualization) {
        height = 0;
        items = new Array(count).fill(0).map((_, index) => {
            height += getItemSize(index, parentKey);
            return {
                index,
                key: getItemKey(index),
                start: 0,
                end: 0,
                size: 0,
                lane: 0,
            };
        });
    }

    return renderRows({
        getItemKey,
        getItemSize,
        totalHeight: height,
        start,
        items,
        scrollContainer,
        parentKey,
        renderRow,
        disableVirtualization,
        persistedChildren,
    });
}

function getRangeExtractorAndChildrenIndexes(persistedIndexes?: Array<number[]>) {
    if (!persistedIndexes) {
        return {};
    }
    const persistedChildren = new Map<number, Array<number[]>>();
    const persist: number[] = [];
    for (const [index, ...childrenIndexes] of persistedIndexes) {
        if (index >= 0) {
            persist.push(index);
            const children = persistedChildren.get(index) ?? [];
            children.push(childrenIndexes);
            persistedChildren.set(index, children);
        }
    }

    if (persist.length === 0) {
        return {};
    }

    const rangeExtractor = (range: Range) => {
        const next = new Set(
            persist.filter((i) => i < range.count).concat(defaultRangeExtractor(range)),
        );
        return Array.from(next).sort((a, b) => a - b);
    };

    return {rangeExtractor, persistedChildren};
}
