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
    /** 1-based position among options (aria-posinset) */
    posInSet?: number;
    /** DOM id of the section header — the aria-describedby target */
    sectionDomId?: string;
}

export interface FlattenResult<T> {
    rows: ListRow<T>[];
    rowById: Map<string, ListRow<T>>;
    domIdToId: Map<string, string>;
    /** The number of options (section headers excluded) — the source of aria-setsize */
    optionsCount: number;
}

export function getItemDomId(listId: string, itemId: string) {
    return `${listId}-item-${encodeURIComponent(itemId)}`;
}

export function isNavigable<T>(row: ListRow<T>): boolean {
    return row.kind === 'item' && !row.disabled;
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
    const {getItemTextValue} = getters;
    const resolveId: (item: T) => string | undefined = getters.getItemId ?? defaultGetItemId;
    const resolveDisabled: (item: T) => boolean = getters.getItemDisabled ?? defaultGetItemDisabled;
    const resolveChildren: (item: T) => readonly T[] | undefined =
        getters.getItemChildren ?? defaultGetItemChildren;
    const resolveContent: (item: T) => React.ReactNode =
        getters.getItemContent ?? defaultGetItemContent;

    const rows: ListRow<T>[] = [];
    const rowById = new Map<string, ListRow<T>>();
    const domIdToId = new Map<string, string>();
    let optionsCount = 0;

    const pushRow = (item: T, kind: 'item' | 'section', sectionDomId?: string): ListRow<T> => {
        const rawId = resolveId(item);
        if (rawId === undefined || rawId === null) {
            warnOnce(
                `[List] Item at position ${rows.length} has no id. Provide \`getItemId\` or an \`id\` field on the item.`,
            );
        }
        const id = String(rawId);
        if (rowById.has(id)) {
            warnOnce(`[List] Duplicate item id "${id}". Item ids must be unique within the list.`);
        }

        const content = resolveContent(item);

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
            disabled: kind === 'item' && Boolean(resolveDisabled(item)),
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
        const children = resolveChildren(item);
        if (children) {
            const sectionRow = pushRow(item, 'section');
            for (const child of children) {
                if (resolveChildren(child)) {
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
 * Navigable = non-disabled options. next/prev wrap unless `wrap: false` (Shift+arrow range
 * gestures)
 */
export function getNextActiveId<T>(
    command: ListNavigationCommand,
    rows: readonly ListRow<T>[],
    activeId: string | undefined,
    {wrap = true}: {wrap?: boolean} = {},
): string | undefined {
    const navigable = rows.filter(isNavigable);
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
 * Prefix search from the active row, wrapping. A single/repeated character searches from the
 * next row (APG cycling), a growing prefix from the current one
 */
export function findTypeaheadMatch<T>(
    rows: readonly ListRow<T>[],
    activeId: string | undefined,
    query: string,
): string | undefined {
    const navigable = rows.filter(isNavigable);
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
