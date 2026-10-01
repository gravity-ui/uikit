'use client';

import * as React from 'react';

import {useForkRef} from '../../hooks/useForkRef';
import {ListVirtualizationContext} from '../List/VirtualizationContext';
import type {
    ListEstimateItemSize,
    ListVirtualizationContextValue,
    ListVirtualizedRootProps,
} from '../List/VirtualizationContext';

import {Virtualizer} from './Virtualizer';
import type {VirtualizerApi} from './Virtualizer';

const DEFAULT_OVERSCAN = 5;

/**
 * The `apiRef` of the wrapper on its way to the root the list renders. A context of the layer
 * itself: the context of the core cannot carry a type of the engine
 */
const ListVirtualizerApiRefContext = React.createContext<React.Ref<VirtualizerApi> | undefined>(
    undefined,
);

/**
 * The root renderer of the list under virtualization: tanstack is pulled in here only. The list
 * root and the scroll container are one element; a row is wrapped in a positioned
 * role="presentation" div and measured through it.
 */
function VirtualizedListRoot({
    containerProps,
    rowIds,
    persistedIndexes: persistedRowIndexes,
    renderRow,
    getItemSize,
    measure,
    overscan,
    scrollToIndexRef,
}: ListVirtualizedRootProps) {
    const {ref, ...restContainerProps} = containerProps;

    const setScrollToIndex = React.useCallback(
        (api: VirtualizerApi | null) => {
            // eslint-disable-next-line no-param-reassign
            scrollToIndexRef.current = api ? api.scrollToIndex : null;
        },
        [scrollToIndexRef],
    );
    const apiRef = useForkRef(setScrollToIndex, React.useContext(ListVirtualizerApiRefContext));

    const persistedIndexes = React.useMemo(
        () => persistedRowIndexes.map((index) => [index]),
        [persistedRowIndexes],
    );

    return (
        <Virtualizer
            {...restContainerProps}
            apiRef={apiRef}
            containerRef={ref}
            count={rowIds.length}
            getItemKey={(index) => rowIds[index]}
            getItemSize={getItemSize}
            overscan={overscan}
            measure={measure}
            persistedIndexes={persistedIndexes}
            renderRow={({index}) => renderRow(rowIds[index])}
        />
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ListVirtualizerProps<T = any> {
    /** The `<List>` inside (the list context passes through the wrapper) */
    children: React.ReactNode;
    /**
     * The estimated height of a row before it is rendered: a constant or a function of the row
     * context — `(ctx) => (ctx.item.description ? 56 : 36)`; section headers arrive with
     * `ctx.kind === 'section'`. default — based on the `size` of the list
     */
    estimateItemSize?: ListEstimateItemSize<T>;
    /**
     * Measure the actual row heights after mount (ResizeObserver); turning it off is an
     * optimization for rows known to be identical. default true
     */
    measure?: boolean;
    /** The buffer of rows outside the window. default 5 */
    overscan?: number;
    /**
     * Ref to the imperative API of the engine: `scrollToIndex`, `scrollToOffset`, `scrollOffset`,
     * `scrollRect`. An index is the position of a row in the list as it is displayed — section
     * headers are rows as well
     */
    apiRef?: React.Ref<VirtualizerApi>;
}

/**
 * The virtualization layer of List: it wraps a `<List>`, and the list renders
 * only the visible window of rows. The scroll container is the root of the
 * List itself (it gets `overflow: auto` automatically); limiting the height
 * (height/max-height) is up to the consumer — otherwise the window degenerates
 * into the full list.
 *
 * SSR: on the server the virtualizer does not know the viewport size and
 * produces an empty window — not a single row makes it into the HTML, and the
 * content appears after hydration (a flicker is possible).
 *
 * ```tsx
 * <ListVirtualizer estimateItemSize={(ctx) => (ctx.item.description ? 56 : 36)}>
 *     <List aria-label="Logs" style={{maxHeight: 400}} items={thousands} />
 * </ListVirtualizer>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ListVirtualizer<T = any>({
    children,
    estimateItemSize,
    measure = true,
    overscan = DEFAULT_OVERSCAN,
    apiRef,
}: ListVirtualizerProps<T>) {
    const value = React.useMemo<ListVirtualizationContextValue>(
        () => ({Root: VirtualizedListRoot, estimateItemSize, measure, overscan}),
        [estimateItemSize, measure, overscan],
    );
    return (
        <ListVirtualizerApiRefContext.Provider value={apiRef}>
            <ListVirtualizationContext.Provider value={value}>
                {children}
            </ListVirtualizationContext.Provider>
        </ListVirtualizerApiRefContext.Provider>
    );
}
