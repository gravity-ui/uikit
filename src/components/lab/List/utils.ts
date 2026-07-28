import type * as React from 'react';

import {warnOnce} from '../../utils/warn';

import type {ListItemGetters} from './types';

export const TYPEAHEAD_TIMEOUT = 500;

export interface ListRow<T> {
    id: string;
    domId: string;
    item: T;
    index: number;
    kind: 'item' | 'section';
    disabled: boolean;
    content?: React.ReactNode;
    textValue: string;
    /**
     * The position among the options, starting at 1 (section headers do not
     * count) — the source of aria-posinset under virtualization; absent on
     * sections
     */
    posInSet?: number;
    /**
     * The DOM id of the header of the section the option belongs to — the
     * target of aria-describedby: the header itself is hidden from the tree
     * (presentation + aria-hidden), but an explicit reference legitimately
     * brings it into the description computation, so a screen reader announces
     * the option together with the name of its section. Absent on sections and
     * on top-level options
     */
    sectionDomId?: string;
}

export interface FlattenResult<T> {
    rows: ListRow<T>[];
    rowById: Map<string, ListRow<T>>;
    domIdToId: Map<string, string>;
    /** The number of options (section headers excluded) — the source of aria-setsize */
    optionsCount: number;
}

/** The encoding is injective: `"a b"` and `"a_b"` must not collapse into one id */
export function getItemDomId(listId: string, itemId: string) {
    return `${listId}-item-${encodeURIComponent(itemId)}`;
}

function defaultGetItemId(item: unknown): string | undefined {
    if (typeof item === 'string') {
        return item;
    }
    return (item as {id?: string} | null | undefined)?.id;
}

function defaultGetItemDisabled(item: unknown): boolean {
    return Boolean((item as {disabled?: boolean} | null | undefined)?.disabled);
}

function defaultGetItemChildren<T>(item: T): readonly T[] | undefined {
    // A real array only: without the guard, a children string (foreign data)
    // would be flattened character by character
    const children = (item as {children?: unknown} | null | undefined)?.children;
    return Array.isArray(children) ? (children as readonly T[]) : undefined;
}

function defaultGetItemContent(item: unknown): React.ReactNode {
    return typeof item === 'string' ? item : undefined;
}

export function flattenItems<T>(
    listId: string,
    items: readonly T[],
    getters: ListItemGetters<T>,
): FlattenResult<T> {
    const {getItemId, getItemDisabled, getItemChildren, getItemContent, getItemTextValue} = getters;

    const rows: ListRow<T>[] = [];
    const rowById = new Map<string, ListRow<T>>();
    const domIdToId = new Map<string, string>();
    let optionsCount = 0;

    const pushRow = (item: T, kind: 'item' | 'section', sectionDomId?: string): ListRow<T> => {
        const rawId = getItemId ? getItemId(item) : defaultGetItemId(item);
        if (rawId === undefined || rawId === null) {
            // There are no positional fallbacks — hidden instability is worse
            // than an explicit error
            warnOnce(
                `[List] Item at position ${rows.length} has no id. Provide \`getItemId\` or an \`id\` field on the item.`,
            );
        }
        const id = String(rawId);
        if (rowById.has(id)) {
            warnOnce(`[List] Duplicate item id "${id}". Item ids must be unique within the list.`);
        }

        const content = getItemContent ? getItemContent(item) : defaultGetItemContent(item);

        let textValue = '';
        if (getItemTextValue) {
            textValue = getItemTextValue(item);
        } else if (typeof content === 'string') {
            textValue = content;
        } else if (kind === 'item') {
            warnOnce(
                `[List] Item "${id}" has non-string content and no \`getItemTextValue\` — typeahead will not find it. The option also needs an accessible name for screen readers (visible text or aria-label).`,
            );
        }

        if (kind === 'item') {
            optionsCount += 1;
        }
        const row: ListRow<T> = {
            id,
            domId: getItemDomId(listId, id),
            item,
            index: rows.length,
            kind,
            disabled:
                kind === 'item' &&
                (getItemDisabled ? Boolean(getItemDisabled(item)) : defaultGetItemDisabled(item)),
            content,
            textValue,
            ...(kind === 'item' ? {posInSet: optionsCount} : undefined),
            ...(sectionDomId === undefined ? undefined : {sectionDomId}),
        };
        rows.push(row);
        rowById.set(id, row);
        domIdToId.set(row.domId, id);
        return row;
    };

    for (const item of items) {
        const children = getItemChildren ? getItemChildren(item) : defaultGetItemChildren(item);
        if (children) {
            const sectionRow = pushRow(item, 'section');
            for (const child of children) {
                const nested = getItemChildren
                    ? getItemChildren(child)
                    : defaultGetItemChildren(child);
                if (nested) {
                    warnOnce(
                        '[List] Nested sections are not supported: children of a section item are rendered as plain options.',
                    );
                }
                pushRow(child, 'item', sectionRow.domId);
            }
        } else {
            pushRow(item, 'item');
        }
    }

    return {rows, rowById, domIdToId, optionsCount};
}

export type ListNavigationCommand = 'next' | 'prev' | 'first' | 'last';

/**
 * The pure computation of an activity transition (step "a" of the keyboard
 * machinery). Only non-disabled options (kind === 'item') are navigable:
 * disabled rows take neither the activity nor focus, from the keyboard or from
 * the mouse (the react-aria / React Spectrum model); section headers are not
 * navigable either. next/prev cycle; with no active row navigation starts from
 * the first navigable one.
 *
 * `wrap: false` turns the cycling of next/prev off (at the edge the result is
 * undefined): the Shift+arrow gestures of range selection do not wrap —
 * wrapping around the edge would throw the range to the other end of the list.
 */
export function getNextActiveId<T>(
    command: ListNavigationCommand,
    rows: readonly ListRow<T>[],
    activeId: string | undefined,
    {wrap = true}: {wrap?: boolean} = {},
): string | undefined {
    const navigable = rows.filter((row) => row.kind === 'item' && !row.disabled);
    if (navigable.length === 0) {
        return undefined;
    }

    const currentIndex =
        activeId === undefined ? -1 : navigable.findIndex((row) => row.id === activeId);

    switch (command) {
        case 'first':
            return navigable[0].id;
        case 'last':
            return navigable[navigable.length - 1].id;
        case 'next':
            if (currentIndex === -1) {
                return navigable[0].id;
            }
            if (!wrap && currentIndex === navigable.length - 1) {
                return undefined;
            }
            return navigable[(currentIndex + 1) % navigable.length].id;
        case 'prev':
            if (currentIndex === -1) {
                return navigable[0].id;
            }
            if (!wrap && currentIndex === 0) {
                return undefined;
            }
            return navigable[(currentIndex - 1 + navigable.length) % navigable.length].id;
        default:
            return undefined;
    }
}

/**
 * A prefix search starting from the active row and wrapping around. A single
 * character, as well as a buffer made of repetitions of one character, search
 * from the next row (repeating a key cycles through the matches for that
 * character, as in APG), while a growing prefix searches from the current one
 * (the active row is not lost while it still matches).
 * Disabled options do not take part — typeahead moves the activity, and the
 * activity never lands on a disabled row (see getNextActiveId).
 */
export function findTypeaheadMatch<T>(
    rows: readonly ListRow<T>[],
    activeId: string | undefined,
    query: string,
): string | undefined {
    const navigable = rows.filter((row) => row.kind === 'item' && !row.disabled);
    if (navigable.length === 0 || query.length === 0) {
        return undefined;
    }

    let normalizedQuery = query.toLowerCase();
    const isRepeatedChar =
        normalizedQuery.length > 1 &&
        normalizedQuery.split('').every((char) => char === normalizedQuery[0]);
    if (isRepeatedChar) {
        normalizedQuery = normalizedQuery[0];
    }

    const currentIndex =
        activeId === undefined ? -1 : navigable.findIndex((row) => row.id === activeId);
    const searchFromNext = query.length === 1 || isRepeatedChar;
    let start = 0;
    if (currentIndex !== -1) {
        start = searchFromNext ? currentIndex + 1 : currentIndex;
    }

    for (let step = 0; step < navigable.length; step += 1) {
        const row = navigable[(start + step) % navigable.length];
        if (row.textValue.toLowerCase().startsWith(normalizedQuery)) {
            return row.id;
        }
    }

    return undefined;
}
