import type * as React from 'react';

import {warnOnce} from '../utils/warn';

import type {ListItemGetters} from './types';

/** How long the typed query lives after the last key (APG: "the buffer resets after a pause") */
export const TYPEAHEAD_TIMEOUT = 1000;

/** How many navigable rows PageUp/PageDown step over (APG recommends "about 10") */
export const PAGE_STEP = 10;

const NON_TEXT_INPUT_TYPES = new Set([
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit',
]);

/**
 * Whether the event target holds a text caret: such a target keeps the keys that move the caret
 * (APG editable combobox — there Home/End belong to the text, not to the activity of the list)
 */
export function isTextInputTarget(target: EventTarget | null): boolean {
    if (target instanceof HTMLTextAreaElement) {
        return true;
    }
    if (target instanceof HTMLInputElement) {
        return !NON_TEXT_INPUT_TYPES.has(target.type);
    }
    // A rich text field is a caret as much as an input is
    return target instanceof HTMLElement && target.isContentEditable;
}

/**
 * Whether a press lands inside a native drag source: such a press keeps the default of the browser,
 * since a drag starts from `mousedown` (a `draggable="false"` handle of a drag-and-drop library
 * counts too — its sensor drops a press whose default was prevented)
 */
export function isDragTarget(target: EventTarget | null): boolean {
    return target instanceof HTMLElement && target.closest('[draggable]') !== null;
}

/**
 * The distance from the top of the scrollable content of the root to the top of the row. It is
 * summed along the `offsetParent` chain: under virtualization the row sits in an absolutely
 * positioned wrapper, so a single `offsetTop` is not the whole way. A root that is not positioned
 * is not a link of that chain — the chain steps over it, and the offset of the root itself is
 * taken off instead. Offsets rather than rects: a popup that scales in while it opens would skew
 * the latter
 */
function getRowOffsetTop(container: HTMLElement, element: HTMLElement): number {
    let top = 0;
    let current: HTMLElement | null = element;
    while (current && current !== container) {
        top += current.offsetTop;
        const offsetParent: Element | null = current.offsetParent;
        if (offsetParent === container) {
            break;
        }
        if (!(offsetParent instanceof HTMLElement)) {
            break;
        }
        if (offsetParent.contains(container)) {
            top -= container.offsetTop + container.clientTop;
            break;
        }
        top += offsetParent.clientTop;
        current = offsetParent;
    }
    return top;
}

/**
 * Whether the root clips and scrolls its rows. A root that does not — a list laid out on the page
 * at its full height — has nothing to scroll, and the row is out of view only as far as the page is
 */
export function isScrollContainer(container: HTMLElement): boolean {
    const {overflowY} = getComputedStyle(container);
    return overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'hidden';
}

/**
 * Scrolls the row into view inside the list root and nowhere else, by the nearest edge — unlike
 * `scrollIntoView`, a list hanging off the viewport edge never drags the page along
 */
export function scrollRowIntoView(container: HTMLElement, element: HTMLElement) {
    const height = container.offsetHeight;
    const scrollTop = container.scrollTop;
    const top = getRowOffsetTop(container, element);
    const bottom = top + element.offsetHeight;

    const above = top < scrollTop;
    const below = bottom > scrollTop + height;
    // A row taller than the root shows its start when it comes from below, its end from above
    const fits = bottom - top <= height;

    let nextScrollTop: number | undefined;
    if (above && !below) {
        nextScrollTop = fits ? top : bottom - height;
    } else if (below && !above) {
        nextScrollTop = fits ? bottom - height : top;
    }

    if (nextScrollTop !== undefined) {
        // scrollTop rather than scrollTo: the same instant scroll, and jsdom implements it
        // eslint-disable-next-line no-param-reassign
        container.scrollTop = nextScrollTop;
    }
}

/**
 * Whether the row is in view inside the list root. A pixel of slack: the scroll offset may be
 * fractional, the offsets of the rows never are. A row taller than the root is in view once it
 * covers the root
 */
export function isRowInView(container: HTMLElement, element: HTMLElement): boolean {
    const viewportTop = container.scrollTop;
    const viewportBottom = viewportTop + container.offsetHeight;
    const top = getRowOffsetTop(container, element);
    const bottom = top + element.offsetHeight;

    return (
        (top >= viewportTop - 1 && bottom <= viewportBottom + 1) ||
        (top <= viewportTop + 1 && bottom >= viewportBottom - 1)
    );
}

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

const UNSAFE_DOM_ID_CHAR = /[^A-Za-z0-9-]/g;

/**
 * The id of an item is the id of the consumer — any string at all — and it has to become a part of
 * a DOM id. The escaping is total and one-to-one: every character outside the safe set becomes its
 * code unit between underscores, and the underscore is escaped along with the rest, so two ids
 * cannot meet in one DOM id. `encodeURIComponent` is neither: a lone surrogate makes it throw
 */
function escapeDomId(itemId: string) {
    return itemId.replace(UNSAFE_DOM_ID_CHAR, (char) => `_${char.charCodeAt(0).toString(16)}_`);
}

export function getItemDomId(listId: string, itemId: string) {
    return `${listId}-item-${escapeDomId(itemId)}`;
}

export function isNavigable<T>(row: ListRow<T>): boolean {
    return row.kind === 'item' && !row.disabled;
}

export function defaultGetItemId(item: unknown): string | undefined {
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

export type ListNavigationCommand = 'next' | 'prev' | 'first' | 'last' | 'pageNext' | 'pagePrev';

/**
 * Navigable = non-disabled options. next/prev wrap unless `wrap: false` (Shift+arrow range
 * gestures); the page commands never wrap and stop at the edges
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
        case 'pageNext':
            if (currentIndex === -1) {
                return navigable[0].id;
            }
            return navigable[Math.min(currentIndex + PAGE_STEP, navigable.length - 1)].id;
        case 'pagePrev':
            if (currentIndex === -1) {
                // A page up from nowhere enters the list from its end, the way ArrowUp does
                return navigable[navigable.length - 1].id;
            }
            return navigable[Math.max(currentIndex - PAGE_STEP, 0)].id;
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
