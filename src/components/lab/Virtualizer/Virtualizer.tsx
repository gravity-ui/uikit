'use client';

import * as React from 'react';

import type {
    Range,
    Rect,
    VirtualItem,
    Virtualizer as VirtualizerInstance,
} from '@tanstack/react-virtual';
import {defaultRangeExtractor, useVirtualizer} from '@tanstack/react-virtual';

import {useForkRef} from '../../../hooks';
import type {Key} from '../../types';

import {useLoadMore} from './useLoadMore';
import type {Loadable} from './useLoadMore';

type Item = {index: number; key: Key};

export type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';

export interface VirtualizerApi {
    scrollToOffset: (offset: number, align?: ScrollAlignment) => void;
    scrollToIndex: (index: number, align?: ScrollAlignment) => void;
    scrollOffset: number | null;
    scrollRect: Rect | null;
}

interface VirtualizerProps extends Loadable, React.HTMLAttributes<HTMLDivElement> {
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
    /** Renders the row of the list. */
    renderRow: (
        /** The item of the row.
         * @param item.index The index of the item in current level.
         * @param item.key The key of the item in the list.
         */
        item: Item,
        /** The key of the parent item in the list. */
        parentKey: Key | undefined,
        /** Renders the children of the row.
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
    renderRow,
    loading,
    onLoadMore,
    persistedIndexes,
    ...props
}: VirtualizerProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const ref = useForkRef(containerRef, scrollContainerRef);

    const {rangeExtractor, persistedChildren} =
        getRangeExtractorAndChildrenIndexes(persistedIndexes);
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => scrollContainerRef.current,
        getItemKey,
        estimateSize: getItemSize,
        rangeExtractor,
        overscan: disableVirtualization ? count : 0,
    });

    React.useImperativeHandle(
        apiRef,
        () => ({
            scrollToOffset: (offset: number, align: ScrollAlignment = 'auto') => {
                virtualizer.scrollToOffset(virtualizer.getOffsetForAlignment(offset, align));
            },
            scrollToIndex: (index: number, align: ScrollAlignment = 'auto') => {
                virtualizer.scrollToIndex(index, {align});
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
                contain: disableVirtualization ? undefined : 'strict',
            }}
        >
            {renderRows({
                totalHeight: virtualizer.getTotalSize(),
                start: 0,
                items: visibleItems,
                scrollContainer: virtualizer.scrollElement,
                parentKey: undefined,
                renderRow,
                getItemSize,
                getItemKey,
                disableVirtualization,
                persistedChildren,
                measureElement: virtualizer.measureElement,
            })}
        </div>
    );
}

function renderRows({
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
    totalHeight: number;
    start: number;
    parentKey?: Key;
    getItemSize: (index: number, key?: Key) => number;
    getItemKey: (index: number, key?: Key) => Key;
    renderRow: (
        item: Item,
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
            role="presentation"
            style={
                disableVirtualization
                    ? {contentVisibility: 'auto', containIntrinsicBlockSize: totalHeight}
                    : {
                          height: totalHeight,
                          width: '100%',
                          position: 'relative',
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
                    {renderRow(virtualRow as Item, parentKey, ({height, count}) => (
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
        item: Item,
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
