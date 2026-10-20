'use client';
import * as React from 'react';

import type {ListItemContext} from './types';
import type {ListContainerDOMProps} from './useList';

/** The estimated height of a row before it is rendered: a constant or a function of the row context */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListEstimateItemSize<T = any> = number | ((ctx: ListItemContext<T>) => number);

/**
 * Scrolls the row at the index in `rowIds` into view by the nearest edge. Implemented by the
 * virtualization layer: a row outside the window is not in the DOM, only the layer knows its place
 */
export type ListScrollToIndex = (index: number) => void;

/**
 * The rows a virtualized list shows as plain DOM while the window cannot be rendered yet: the chunk
 * of the layer is loading, or the markup comes from the server. Enough to fill a tall popup of the
 * smallest rows — the rest of the list appears with the window
 */
export const LIST_VIRTUALIZATION_FALLBACK_ROWS_COUNT = 50;

/** Props the core passes to the root renderer of the virtualization layer (it renders the list root) */
export interface ListVirtualizedRootProps {
    /** Props of the list root from getContainerProps — the list root and the scroll container are one element */
    containerProps: ListContainerDOMProps;
    /**
     * The first rows in a plain root: what the root renders where the viewport cannot be measured —
     * on the server and until the page is hydrated
     */
    fallback: React.ReactNode;
    /** The estimated height of a row by its index in `rowIds` (the consumer's estimate/default already resolved) */
    getItemSize: (index: number) => number;
    /** Measure the actual row heights after mount */
    measure: boolean;
    /** The buffer of rows outside the window */
    overscan: number;
    /** See ListInstance.persistedRowIndexes */
    persistedIndexes: readonly number[];
    /** Renders a row by its id (the result already has a key) */
    renderRow: (id: string) => React.ReactNode;
    /** The row ids in display order (options and section headers) */
    rowIds: string[];
    /**
     * Called by the root with its scroll once the window is mounted, and with null when it is gone:
     * the core scrolls to the active row through it
     */
    setScrollToIndex: (scrollToIndex: ListScrollToIndex | null) => void;
}

export interface ListVirtualizationContextValue {
    Root: React.ComponentType<ListVirtualizedRootProps>;
    estimateItemSize?: ListEstimateItemSize;
    measure: boolean;
    /** A list of fewer rows renders as if there were no wrapper */
    minItemsCount: number;
    overscan: number;
    /** Starts loading the code of `Root` ahead of the first list that needs it */
    preload: () => void;
}

/**
 * Defined in the core, provided by Virtualizer/ListVirtualizer: the core never imports tanstack
 */
export const ListVirtualizationContext = React.createContext<ListVirtualizationContextValue | null>(
    null,
);

/**
 * Whether a list of `itemsCount` rows is virtualized: the layer above it, if its threshold is met.
 * The one place the decision is made — a list below `minItemsCount` renders as if there were no
 * wrapper, so every reader of the context asks here instead of checking the context itself
 */
export function useListVirtualization(itemsCount: number): ListVirtualizationContextValue | null {
    const virtualization = React.useContext(ListVirtualizationContext);
    return virtualization && itemsCount >= virtualization.minItemsCount ? virtualization : null;
}
