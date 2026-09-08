'use client';
import * as React from 'react';

import type {ListItemContext} from './types';
import type {ListContainerDOMProps} from './useList';

/** The estimated height of a row before it is rendered: a constant or a function of the row context */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListEstimateItemSize<T = any> = number | ((ctx: ListItemContext<T>) => number);

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
}

export interface ListVirtualizationContextValue {
    Root: React.ComponentType<ListVirtualizedRootProps>;
    estimateItemSize?: ListEstimateItemSize;
    measure: boolean;
    overscan: number;
}

/**
 * Defined in the core, provided by lab/Virtualizer/ListVirtualizer: the core never imports tanstack
 */
export const ListVirtualizationContext = React.createContext<ListVirtualizationContextValue | null>(
    null,
);
