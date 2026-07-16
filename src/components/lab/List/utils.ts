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
}

export interface FlattenResult<T> {
    rows: ListRow<T>[];
    rowById: Map<string, ListRow<T>>;
    domIdToId: Map<string, string>;
}

/** Кодирование инъективное: `"a b"` и `"a_b"` не должны схлопнуться */
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
    return (item as {children?: readonly T[]} | null | undefined)?.children;
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

    const pushRow = (item: T, kind: 'item' | 'section') => {
        const rawId = getItemId ? getItemId(item) : defaultGetItemId(item);
        if (rawId === undefined || rawId === null) {
            // Позиционных фолбэков нет — скрытая нестабильность хуже явной ошибки
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
        };
        rows.push(row);
        rowById.set(id, row);
        domIdToId.set(row.domId, id);
    };

    for (const item of items) {
        const children = getItemChildren ? getItemChildren(item) : defaultGetItemChildren(item);
        if (children) {
            pushRow(item, 'section');
            for (const child of children) {
                const nested = getItemChildren
                    ? getItemChildren(child)
                    : defaultGetItemChildren(child);
                if (nested) {
                    // Глубина секций ровно одна; вложенные группы появятся с TreeList
                    warnOnce(
                        '[List] Nested sections are not supported: children of a section item are rendered as plain options.',
                    );
                }
                pushRow(child, 'item');
            }
        } else {
            pushRow(item, 'item');
        }
    }

    return {rows, rowById, domIdToId};
}

export type ListNavigationCommand = 'next' | 'prev' | 'first' | 'last';

/**
 * Чистое вычисление перехода активности (шаг «а» клавиатурной машины, §5 плана).
 * Навигируемы только опции (kind === 'item'), включая disabled (APG:
 * discoverability); заголовки секций — нет. next/prev зациклены; при
 * отсутствии активного навигация стартует с первой навигабельной строки.
 */
export function getNextActiveId<T>(
    command: ListNavigationCommand,
    rows: readonly ListRow<T>[],
    activeId: string | undefined,
): string | undefined {
    const navigable = rows.filter((row) => row.kind === 'item');
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
            return currentIndex === -1
                ? navigable[0].id
                : navigable[(currentIndex + 1) % navigable.length].id;
        case 'prev':
            return currentIndex === -1
                ? navigable[0].id
                : navigable[(currentIndex - 1 + navigable.length) % navigable.length].id;
        default:
            return undefined;
    }
}

/**
 * Поиск по префиксу от активного, по кругу. Первый символ и буфер из
 * повторов одного символа ищут со следующей строки (повторное нажатие
 * перебирает совпадения по этому символу, как в APG), растущий префикс —
 * с текущей (активная строка не теряется, пока совпадает).
 */
export function findTypeaheadMatch<T>(
    rows: readonly ListRow<T>[],
    activeId: string | undefined,
    query: string,
): string | undefined {
    const navigable = rows.filter((row) => row.kind === 'item');
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
