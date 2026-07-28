'use client';
import * as React from 'react';

import type {ListItemContext} from './types';
import type {ListContainerDOMProps} from './useList';

/**
 * The estimated height of a row BEFORE it is rendered: either a constant or a
 * function of the row context (the consumer knows the shape of their item;
 * section headers arrive with `ctx.kind === 'section'`). The spread of the
 * actual heights is covered by `measure`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListEstimateItemSize<T = any> = number | ((ctx: ListItemContext<T>) => number);

/**
 * The props the list core passes to the root renderer of the virtualization
 * layer: the virtualizer renders the scroll container itself, so the context
 * carries the renderer of the list ROOT rather than a renderer of rows. The
 * core does not know how the renderer is implemented — it only hands over the
 * container props, the data and the row render function.
 */
export interface ListVirtualizedRootProps {
    /**
     * The props of the list root from getContainerProps (role="listbox", id,
     * onKeyDown, aria-*, className, style, ref) — the renderer must deliver
     * them to its scroll container: the list root AND the scroll container are
     * one and the same element
     */
    containerProps: ListContainerDOMProps;
    /** The row ids in display order (options and section headers) */
    rowIds: string[];
    /**
     * The indexes of the rows in `rowIds` that the renderer must always keep
     * mounted: the row with the roving tab stop (unmounting the focused row
     * drops focus to the body, and unmounting the tab stop makes the list
     * unreachable with Tab) and the section headers (the targets of the
     * options' aria-describedby — an unmounted header would turn the reference
     * into a dangling IDREF)
     */
    persistedIndexes: readonly number[];
    /** Renders a row by its id (the result already has a key) */
    renderRow: (id: string) => React.ReactNode;
    /**
     * The estimated height of a row by its index in `rowIds` — the core has
     * already resolved the consumer's constant/function and the default based
     * on `size`
     */
    getItemSize: (index: number) => number;
    /** Measure the actual row heights after mount */
    measure: boolean;
    /** The buffer of rows outside the window */
    overscan: number;
}

export interface ListVirtualizationContextValue {
    /** The list root renderer coming from the virtualization layer */
    Root: React.ComponentType<ListVirtualizedRootProps>;
    estimateItemSize?: ListEstimateItemSize;
    measure: boolean;
    overscan: number;
}

/**
 * The context of the virtualization layer. The definition lives in the core
 * and does not import tanstack; the provider and the root renderer live in
 * `lab/Virtualizer/ListVirtualizer` (not imported by the core; it will be
 * published through a separate entry point). By the presence of the context
 * the core picks either the flat render (the default, zero dependencies) or
 * the Root from the context — the component boundary legalizes the hooks of
 * the virtualizer.
 */
export const ListVirtualizationContext = React.createContext<ListVirtualizationContextValue | null>(
    null,
);
