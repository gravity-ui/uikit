'use client';

import React from 'react';

import type {Range, Rect, VirtualItem} from '@tanstack/react-virtual';
import {defaultRangeExtractor, useVirtualizer} from '@tanstack/react-virtual';

import {useForkRef} from '../../../hooks';
import type {Key} from '../../types';
import type {Loadable} from '../Collection/Collection';

import {useLoadMore} from './useLoadMore';

type Item = {index: number; key: Key};

export type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';

export interface VirtualizerRef {
    scrollToOffset: (offset: number, align?: ScrollAlignment) => void;
    scrollOffset: number | null;
    scrollRect: Rect | null;
}

interface VirtualizerProps extends Loadable {
    listRef?: React.Ref<VirtualizerRef>;
    containerRef?: React.Ref<HTMLElement>;
    size: number;
    getItemSize: (index: number, key?: Key) => number;
    getItemKey: (index: number, key?: Key) => Key;
    disableVirtualization?: boolean;
    renderRow: (
        item: Item,
        parentKey: Key | undefined,
        renderChildren: ({size, height}: {size: number; height: number}) => React.ReactNode,
    ) => React.ReactNode;
    persistedIndexes?: Array<number[]>;
}

export function Virtualizer({
    listRef,
    containerRef,
    size,
    getItemSize,
    getItemKey,
    disableVirtualization,
    renderRow,
    loading,
    onLoadMore,
    persistedIndexes,
}: VirtualizerProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const ref = useForkRef(containerRef, scrollContainerRef);

    const {rangeExtractor, persistedChildren} =
        getRangeExtractorAndChildrenIndexes(persistedIndexes);
    const virtualizer = useVirtualizer({
        count: size,
        getScrollElement: () => scrollContainerRef.current,
        getItemKey,
        estimateSize: getItemSize,
        rangeExtractor,
        overscan: disableVirtualization ? size : 0,
    });

    React.useImperativeHandle(
        listRef,
        () => ({
            scrollToOffset: (offset: number, align: ScrollAlignment = 'auto') => {
                virtualizer.scrollToOffset(virtualizer.getOffsetForAlignment(offset, align));
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
            ref={ref}
            role="presentation"
            style={{
                overflow: 'auto',
                contain: disableVirtualization ? undefined : 'strict',
                height: '100%',
            }}
        >
            {renderChildren({
                height: virtualizer.getTotalSize(),
                start: 0,
                items: visibleItems,
                scrollContainer: virtualizer.scrollElement,
                parentKey: undefined,
                renderRow,
                getItemSize,
                getItemKey,
                disableVirtualization,
                persistedChildren,
            })}
        </div>
    );
}

function renderChildren({
    height,
    start,
    parentKey,
    getItemSize,
    getItemKey,
    renderRow,
    items,
    scrollContainer,
    disableVirtualization,
    persistedChildren,
}: {
    height: number;
    start: number;
    parentKey?: Key;
    getItemSize: (index: number, key?: Key) => number;
    getItemKey: (index: number, key?: Key) => Key;
    renderRow: (
        item: Item,
        parentKey: Key | undefined,
        renderChildren: ({size, height}: {size: number; height: number}) => React.ReactNode,
    ) => React.ReactNode;
    items: VirtualItem[];
    scrollContainer: HTMLElement | null;
    disableVirtualization?: boolean;
    persistedChildren?: Map<number, Array<number[]>>;
}) {
    return (
        <div
            role="presentation"
            style={
                disableVirtualization
                    ? {contentVisibility: 'auto', containIntrinsicBlockSize: height}
                    : {
                          height,
                          width: '100%',
                          position: 'relative',
                      }
            }
        >
            {items.map((virtualRow) => (
                <div
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
                    {renderRow(virtualRow as Item, parentKey, ({height, size}) => (
                        <ChildrenVirtualizer
                            key={virtualRow.key}
                            size={size}
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
    size: number;
    getItemSize: (index: number, key?: Key) => number;
    getItemKey: (index: number, key?: Key) => Key;
    parentKey: Key;
    renderRow: (
        item: Item,
        parentKey: Key | undefined,
        renderChildren: ({size, height}: {size: number; height: number}) => React.ReactNode,
    ) => React.ReactNode;
    disableVirtualization?: boolean;
    persistedIndexes?: Array<number[]>;
}) {
    const {
        start,
        scrollContainer,
        size,
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
        count: size,
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
        items = new Array(size).fill(0).map((_, index) => {
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

    return renderChildren({
        getItemKey,
        getItemSize,
        height,
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
