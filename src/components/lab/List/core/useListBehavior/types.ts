import type * as React from 'react';

import type {ListChildrenState} from '../types';
import type {ListSelection} from '../useListSelection';
import type {ListState} from '../useListState';

/**
 * Container role, one per keyboard pattern:
 *
 * - `listbox` — https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
 * - `tree` — https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
 * - `grid` — the GridList pattern (rows with widgets), not a 2D data grid:
 *   https://www.w3.org/WAI/ARIA/apg/patterns/grid/
 */
export type ListRole = 'listbox' | 'tree' | 'grid';

/**
 * Everything a row renderer, an action handler or a drag adapter needs about a single node — the
 * shared currency between the behavior layer and its consumers.
 *
 * `C` (the shape of `content`) is inferred from the item-content getter downstream; the behavior
 * layer itself never fills `content`, so here it is always `undefined`.
 */
export interface ListItemContext<T, C = unknown> {
    /** Renderable content; always `undefined` here — filled by the view layer. */
    content: C | undefined;
    id: string;
    /** Index among the node's siblings (`0`-based within its own level). */
    index: number;
    /** The raw consumer item. */
    item: T;
    /** Nesting depth; `0` for a flat list. */
    level: number;
    /** Imperative access to the list. */
    list: ListApi;
    /** Parent id, or `undefined` for a root node. */
    parentId?: string;
    /**
     * Ready-made DOM props — role, id, `aria-*`, tabIndex, handlers, ref. Spreading them on the row's
     * root element is mandatory: this is the accessibility contract.
     */
    props: React.HTMLAttributes<HTMLElement> & {ref: React.Ref<HTMLElement>};
    state: {
        /** Highlighted by keyboard or hover (the roving/active row). */
        active: boolean;
        childrenState?: ListChildrenState;
        disabled: boolean;
        /** Expansion of a node that can have children; `undefined` for a leaf. */
        expanded?: boolean;
        selected: boolean;
    };
}

/** How a visible item is reported by `getVisibleItems`. */
export interface ListVisibleItem {
    id: string;
    index: number;
    level: number;
    parentId?: string;
    /** The row's bounding rect, or `null` when it is not mounted. */
    selfRect: DOMRect | null;
}

/**
 * Imperative handle over the list: focus, structure and scrolling. Not generic yet — the item type
 * parameter returns once item-typed methods (the drag-and-drop namespace) are added.
 */
export interface ListApi {
    /** Collapses a node; under controlled expansion only emits `onExpandedUpdate`. */
    collapse(id: string): void;
    /** Expands a node; under controlled expansion only emits `onExpandedUpdate`. */
    expand(id: string): void;
    /** Moves the active row (roving DOM focus); a no-op for a non-navigable id. */
    focusItem(id: string): void;
    getActiveItemId(): string | undefined;
    getElementById(id: string): HTMLElement | null;
    getItemIdByElement(el: Element): string | undefined;
    getVisibleItems(): ListVisibleItem[];
    /** Forwards a keyboard event into the list's state machine (external key handling). */
    handleKeyDown(e: React.KeyboardEvent | KeyboardEvent): void;
    scrollToItem(id: string, opts?: {align?: 'start' | 'center' | 'end' | 'auto'}): void;
    setActiveItemId(id: string | undefined): void;
}

export interface UseListBehaviorProps<T> {
    /**
     * How pointer hover moves the active row: `keep` leaves it, `reset-on-leave` clears it on leave,
     * `false` disables hover activation.
     * @default 'reset-on-leave'
     */
    activateOnHover?: 'keep' | 'reset-on-leave' | false;
    /** Active (highlighted) row id, controlled. */
    activeItemId?: string;
    /** Initially active row id, uncontrolled; defaults to the first selected enabled item. */
    defaultActiveItemId?: string;
    /**
     * Disables the whole list as a form control: `aria-disabled`, no tab stop, keyboard / clicks /
     * selection / typeahead muted. Distinct from per-item disabled, which keeps the list interactive.
     */
    disabled?: boolean;
    /**
     * What expands a node by pointer. Keyboard expansion is always the arrow keys on the row itself.
     * @default 'item'
     */
    expandTrigger?: 'chevron' | 'item';
    /**
     * Focus projection. `roving` keeps real DOM focus on the rows; `virtual` (activedescendant) is
     * not implemented yet and falls back to `roving`.
     * @default {mode: 'roving'}
     */
    focus?: {mode: 'roving'} | {mode: 'virtual'};
    /** Derives the text value for typeahead; defaults to the item itself for string items. */
    getItemTextValue?: (item: T) => string;
    /**
     * DOM id of the role container; item ids derive from it (`{id}-item-{itemId}`). Generated via a
     * SSR-safe id when omitted.
     */
    id?: string;
    /** Whether the list is loading more rows. */
    loading?: boolean;
    onActiveItemUpdate?: (id: string | undefined) => void;
    /**
     * "Apply" a row — distinct from selection: Enter, double-click, and (without a selection mode) a
     * single click.
     */
    onItemAction?: (ctx: ListItemContext<T>) => void;
    /** Called on the first expand of a `lazy` node so the consumer can load its children. */
    onLoadChildren?: (ctx: ListItemContext<T>) => void | Promise<void>;
    /** Called when the load-more sentinel is reached. */
    onLoadMore?: () => void;
    /**
     * Container role — selects the keyboard pattern. One shared machine serves the whole family: the
     * `listbox` machine is implemented, and `tree` / `grid` extend the same hook.
     */
    role: ListRole;
    /** Selection from `useListSelection`; omit for a list without selection. */
    selection?: ListSelection;
    /** Structural state from `useListState`. */
    state: ListState<T>;
    /**
     * Typing characters activates the first item whose text value starts with the typed prefix; the
     * buffer resets after a short pause.
     * @default true
     */
    typeahead?: boolean;
}

export interface ListBehavior<T> {
    api: ListApi;
    /** Props for the role container — role, `aria-*`, tabIndex, handlers, ref. */
    containerProps: React.HTMLAttributes<HTMLElement> & {ref: React.Ref<HTMLElement>};
    getItemContext(id: string): ListItemContext<T>;
    /** Only in `virtual` focus mode; `undefined` here (roving). */
    virtualFocusTargetProps?: {
        'aria-activedescendant'?: string;
        onKeyDown: (e: React.KeyboardEvent) => void;
    };
}
