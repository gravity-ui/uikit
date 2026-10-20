'use client';

import * as React from 'react';

import {ListVirtualizationContext} from '../List/VirtualizationContext';
import type {
    ListEstimateItemSize,
    ListVirtualizationContextValue,
    ListVirtualizedRootProps,
} from '../List/VirtualizationContext';

import {getLoadedVirtualizedListRoot, loadVirtualizedListRoot} from './loadVirtualizedListRoot';

const DEFAULT_OVERSCAN = 5;

type RootModule = {default: React.ComponentType<ListVirtualizedRootProps>};

/**
 * The root of the list under virtualization, loaded on its first render: tanstack is not a part of
 * the chunk that imports ListVirtualizer. A module that has already loaded (the Select preloads it
 * on mount) is handed to React.lazy synchronously — a thenable that resolves inside `then` does not
 * suspend, so the fallback of the list is not shown for a code that is already there
 */
const LazyVirtualizedListRoot = React.lazy(() => {
    const loaded = getLoadedVirtualizedListRoot();
    if (loaded) {
        const resolved = {
            then: (resolve: (module: RootModule) => void) =>
                resolve({default: loaded.VirtualizedListRoot}),
        };
        return resolved as unknown as Promise<RootModule>;
    }
    return loadVirtualizedListRoot().then((module) => ({default: module.VirtualizedListRoot}));
});

function preloadVirtualizedListRoot() {
    // A failure is reported by the list that renders the root, through the nearest error boundary
    loadVirtualizedListRoot().catch(() => {});
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
    /**
     * A list of fewer rows renders as if there were no wrapper — every row in the DOM, and the
     * chunk of the virtualizer is not loaded for it. A `List` counts its rows, section headers
     * included; a `Select` counts its options without the group headers and without the filter, so
     * typing does not switch the list. default 0 — every list is virtualized
     */
    minItemsCount?: number;
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
 * The code of the window — tanstack included — is a chunk of its own, loaded
 * when the first list long enough for `minItemsCount` renders; until then the
 * list shows its first rows. One wrapper next to the theme `Provider` can
 * cover the whole app: `<ListVirtualizer minItemsCount={50}>` virtualizes the
 * lists and `Select`s of 50 rows or more and leaves the shorter ones as they
 * are.
 *
 * SSR: on the server the virtualizer does not know the viewport size, so the
 * HTML gets the first rows of the list; the window replaces them after
 * hydration.
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
    minItemsCount = 0,
    overscan = DEFAULT_OVERSCAN,
}: ListVirtualizerProps<T>) {
    const value = React.useMemo<ListVirtualizationContextValue>(
        () => ({
            Root: LazyVirtualizedListRoot,
            estimateItemSize,
            measure,
            minItemsCount,
            overscan,
            preload: preloadVirtualizedListRoot,
        }),
        [estimateItemSize, measure, minItemsCount, overscan],
    );
    return (
        <ListVirtualizationContext.Provider value={value}>
            {children}
        </ListVirtualizationContext.Provider>
    );
}
