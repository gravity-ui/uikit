import React from 'react';

import type {Rect, VirtualItem} from '@tanstack/react-virtual';
import {useVirtualizer} from '@tanstack/react-virtual';

import {useForkRef} from '../../../hooks';
import type {Key} from '../../types';

type Item = {index: number; key: Key};

export type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';

export interface VirtualizerRef {
    scrollToOffset: (offset: number, align?: ScrollAlignment) => void;
    scrollOffset: number | null;
    scrollRect: Rect | null;
}

export function Virtualizer({
    listRef,
    containerRef,
    size,
    getItemSize,
    getItemKey,
    disableVirtualization,
    renderRow,
}: {
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
}) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const ref = useForkRef(containerRef, scrollContainerRef);

    const virtualizer = useVirtualizer({
        count: size,
        getScrollElement: () => scrollContainerRef.current,
        getItemKey,
        estimateSize: getItemSize,
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
    } = props;
    const virtualizer = useVirtualizer({
        count: size,
        getScrollElement: () => scrollContainer,
        estimateSize: (index) => getItemSize(index, parentKey),
        getItemKey: (index) => getItemKey(index, parentKey),
        scrollToFn: () => {}, // parent element controls scroll, so disable it here
        paddingStart: start,
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
    });
}
