'use client';

import * as React from 'react';

import {ListVirtualizationContext} from '../List/VirtualizationContext';
import type {
    ListEstimateItemSize,
    ListVirtualizationContextValue,
    ListVirtualizedRootProps,
} from '../List/VirtualizationContext';

import {Virtualizer} from './Virtualizer';

const DEFAULT_OVERSCAN = 5;

/**
 * The root renderer of the list while virtualization is on. The list core does
 * not import tanstack — it is pulled in by this module only; the component
 * boundary legalizes the hooks of the virtualizer.
 *
 * The scroll container is the root div of the Virtualizer itself, and all the
 * props of the list root reach it (role="listbox", the keyboard machinery, the
 * consumer's className/style), i.e. the list root and the scroll container are
 * one and the same element. A row is wrapped by the Virtualizer into its own
 * positioned div (role="presentation" — transparent for the a11y tree) and is
 * measured through it.
 */
function VirtualizedListRoot({
    containerProps,
    rowIds,
    persistedIndexes: persistedRowIndexes,
    renderRow,
    getItemSize,
    measure,
    overscan,
}: ListVirtualizedRootProps) {
    const {ref, ...restContainerProps} = containerProps;

    // The row with the roving tab stop and the section headers always stay in
    // the window: unmounting the tab stop either drops focus to the body (the
    // keyboard dies) or throws the list out of the Tab order, and unmounting a
    // header leaves the aria-describedby of the visible options of its section
    // dangling
    const persistedIndexes = React.useMemo(
        () =>
            persistedRowIndexes.length > 0
                ? persistedRowIndexes.map((index) => [index])
                : undefined,
        [persistedRowIndexes],
    );

    return (
        <Virtualizer
            {...restContainerProps}
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
     * The estimated height of a row BEFORE it is rendered: either a constant
     * or a function of the row context — `(ctx) => (ctx.item.description ? 56
     * : 36)`; section headers arrive with `ctx.kind === 'section'`. The spread
     * of the actual heights is covered by `measure`. default — based on the
     * `size` of the list
     */
    estimateItemSize?: ListEstimateItemSize<T>;
    /**
     * Measure the actual row heights after mount (ResizeObserver).
     * default: true — rows of variable height (a section is not an option)
     * work out of the box; turning it off is an optimization for rows that are
     * known to be identical
     */
    measure?: boolean;
    /** The buffer of rows outside the window. default 5 */
    overscan?: number;
}

/**
 * The virtualization layer of List: it wraps a `<List>`, and the list renders
 * only the visible window of rows. The scroll container is the root of the
 * List itself (it gets `overflow: auto` automatically); limiting the height
 * (height/max-height) is up to the consumer — otherwise the window degenerates
 * into the full list.
 *
 * It is exported from `/unstable` as `unstable_ListVirtualizer` (the core of
 * the list itself never imports this module); a separate entry point with
 * `@tanstack/react-virtual` as an optional peer is still ahead.
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
}: ListVirtualizerProps<T>) {
    const value = React.useMemo<ListVirtualizationContextValue>(
        () => ({Root: VirtualizedListRoot, estimateItemSize, measure, overscan}),
        [estimateItemSize, measure, overscan],
    );
    return (
        <ListVirtualizationContext.Provider value={value}>
            {children}
        </ListVirtualizationContext.Provider>
    );
}
