'use client';
import * as React from 'react';

import type {ListItemContext} from './types';
import type {ListContainerDOMProps} from './useList';

/** The estimated height of a row before it is rendered: a constant or a function of the row context */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListEstimateItemSize<T = any> = number | ((ctx: ListItemContext<T>) => number);

/**
 * Scrolls the row at the index in `rowIds` into view. The virtualization layer implements it: a row
 * outside the window has no place in the DOM yet, so only the layer knows where to scroll to
 */
export type ListScrollToIndex = (
    index: number,
    align?: 'auto' | 'start' | 'center' | 'end',
) => void;

/** Props the core passes to the root renderer of the virtualization layer (it renders the list root) */
export interface ListVirtualizedRootProps {
    /** Props of the list root from getContainerProps — the list root and the scroll container are one element */
    containerProps: ListContainerDOMProps;
    /** The row ids in display order (options and section headers) */
    rowIds: string[];
    /** See ListInstance.persistedRowIndexes */
    persistedIndexes: readonly number[];
    /** Renders a row by its id (the result already has a key) */
    renderRow: (id: string) => React.ReactNode;
    /** The estimated height of a row by its index in `rowIds` (the consumer's estimate/default already resolved) */
    getItemSize: (index: number) => number;
    /** Measure the actual row heights after mount */
    measure: boolean;
    /** The buffer of rows outside the window */
    overscan: number;
    /** Filled by the root for as long as it is mounted: the core scrolls to the active row through it */
    scrollToIndexRef: React.MutableRefObject<ListScrollToIndex | null>;
}

export interface ListVirtualizationContextValue {
    Root: React.ComponentType<ListVirtualizedRootProps>;
    estimateItemSize?: ListEstimateItemSize;
    measure: boolean;
    overscan: number;
}

/**
 * Defined in the core, provided by Virtualizer/ListVirtualizer: the core never imports tanstack
 */
export const ListVirtualizationContext = React.createContext<ListVirtualizationContextValue | null>(
    null,
);
