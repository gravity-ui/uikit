import type * as React from 'react';

import type {QAProps} from '../../types';

import type {LIST_FOCUS_OWNER_CHANNEL, ListFocusOwnerChannel} from './focusOwnerChannel';

export type ListSize = 's' | 'm' | 'l' | 'xl';

/** ARIA role of the list and of its rows/cells */
export type ListRole =
    /**
     * `listbox`/`option` — a leaf role: no interactive descendants, `getCellProps()` is empty.
     *  Keys: ↑/↓/Home/End/typeahead
     */
    | 'listbox'
    /**
     * `grid`/`row`/`gridcell` — interactive content is valid inside a cell, `aria-selected`
     *  stays on the row. Keys: + ←/→ into the cell content and back
     */
    | 'grid';

export interface ListItemGetters<T> {
    /** Unique item id. default: `(i) => i.id`; for a string item — the string itself */
    getItemId?: (item: T) => string;
    /** default: `(i) => Boolean(i.disabled)` */
    getItemDisabled?: (item: T) => boolean;
    /** Sections: children render as a header plus its options. default: `(i) => i.children` */
    getItemChildren?: (item: T) => readonly T[] | undefined;
    /** WHAT to show: the children of a row; a string item is its own content */
    getItemContent?: (item: T) => React.ReactNode;
    /** Typeahead text. default: string content; does NOT define the accessible name of an option */
    getItemTextValue?: (item: T) => string;
}

export interface ListItemContext<T> {
    id: string;
    item: T;
    /** Position in visibleIds, section headers included */
    index: number;
    kind: 'item' | 'section';
    /** The result of getItemContent */
    content?: React.ReactNode;
    state: {
        /** Highlighted by the keyboard or by hover */
        active: boolean;
        disabled: boolean;
        /**
         * Whether the active row shows the keyboard cursor; present on the active row only.
         *  Goes out while the mouse works in the list or the list loses DOM focus; comes back
         *  on a key in the list, focus returning, or an activation from the outside
         *  (controlled/default activeItemId)
         */
        cursorVisible?: boolean;
        /** Filled in only while the selection layer is on */
        selected?: boolean;
        /** Filled in only while the dnd layer is on */
        dragging?: boolean;
        /** Filled in only while the dnd layer is on */
        dropTarget?: 'before' | 'after' | null;
    };
}

/** `draggable` is excluded — see ListPropsOverrides */
type ListDOMAttributes = Omit<React.HTMLAttributes<HTMLElement>, 'draggable'> & {
    [key: `data-${string}`]: string | undefined;
};

/**
 * Overrides merged into the props of a row or of the container: `on*` handlers are chained
 *  after the base one, className is concatenated, ref is forked, style is shallow-merged,
 *  `undefined` values are ignored. Not gated by state: on a disabled row overrides still
 *  fire — but the default view has `pointer-events: none` there, so only keyboard/focus
 *  handlers do. `role`/`id`/`tabIndex` are applied as passed with a dev warning; dnd props
 *  drop them (`ListDndProps`). `draggable` is excluded: the native attribute is set by
 *  ref-based libraries, and the view has a slot prop of that name
 */
export type ListPropsOverrides = ListDOMAttributes & {ref?: React.Ref<HTMLElement>};

export type ListItemDOMProps = ListDOMAttributes &
    React.AriaAttributes & {role: string; ref: React.RefCallback<HTMLElement>};

/** Props of a row cell: `role="gridcell"` in grid, no `role` in listbox — one renderItem for both */
export type ListCellDOMProps = ListDOMAttributes &
    React.AriaAttributes & {role?: string; ref?: React.RefCallback<HTMLElement>};

/** ctx.state in terms of the props of the view; a section header gets `size` only */
export interface ListItemViewStateProps {
    size?: ListSize;
    /** The dark cursor indication: the active row while `ctx.state.cursorVisible` is true */
    active?: boolean;
    disabled?: boolean;
    selected?: boolean;
    selectionStyle?: 'check' | 'highlight' | 'none';
    /** `false` while a drag is in progress: suppresses the CSS `:hover` of the view */
    hovered?: boolean;
}

export interface ListItemHelpers {
    /** DOM/a11y props of the row with its id already bound; the behavior belongs to the core */
    getItemProps(overrides?: ListPropsOverrides): ListItemDOMProps;
    /** ctx.state in terms of the props of the view */
    getItemViewProps(): ListItemViewStateProps;
    /**
     * DOM/a11y props of a row cell: `role="gridcell"` in grid — interactive content is valid
     *  inside a cell only; an empty object in listbox, so one cell wrapper works in both
     */
    getCellProps(overrides?: ListPropsOverrides): ListCellDOMProps;
}

/** Props of the external focus owner; element-agnostic: they fit an input and a button alike */
export type ListFocusOwnerInputProps = React.HTMLAttributes<HTMLElement> & {
    role: string;
};

/**
 * Returned by `useListFocusOwner()`. Turns on the activedescendant strategy: rows are not
 *  focusable, a click applies without moving focus. Designed for a popup that unmounts when
 *  closed (keepMounted is not supported)
 */
export interface ListFocusOwner {
    /**
     * Props of the owner element (`role="combobox"`, `aria-expanded`/`controls`/`activedescendant`,
     *  `onKeyDown`). Overrides compose by the common contract; `role`/`aria-expanded` may be
     *  overridden for non-popup patterns
     */
    getInputProps(overrides?: Omit<ListPropsOverrides, 'ref'>): ListFocusOwnerInputProps;
    /**
     * The core channel — reachable through a module-private symbol only
     * @internal
     */
    readonly [LIST_FOCUS_OWNER_CHANNEL]: ListFocusOwnerChannel;
}

/** The event of the applying gesture: a click or the keydown of Enter/Space (`'key' in event`) */
export type ListItemActionEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;

export interface ListCoreProps<T> extends ListItemGetters<T>, QAProps {
    items: readonly T[];
    'aria-label'?: string;
    'aria-labelledby'?: string;

    /**
     * The active (highlighted) item — navigation, not selection. `null` is the controlled
     *  "nothing is active", `undefined` is uncontrolled
     */
    activeItemId?: string | null;
    defaultActiveItemId?: string;
    onActiveItemUpdate?: (id: string | null) => void;

    /**
     * "Applying" an item: a click, Enter, and Space with the selection layer on. The event
     *  tells a click from a key (`'key' in event`), carries the modifiers of a click and lets
     *  the native default be suppressed
     */
    onItemAction?: (id: string, item: T, event: ListItemActionEvent) => void;

    /** default: true. Hover moves the highlight; focus follows only while a row holds it */
    activateOnHover?: boolean;

    /**
     * The ARIA role of the list (see `ListRole`). default: `'listbox'`; `'grid'` — when the
     *  rows contain interactive content (a drag handle, a checkbox, a row action)
     */
    role?: ListRole;

    /**
     * The object returned by `useListFocusOwner()`: turns on the `aria-activedescendant`
     *  strategy — focus stays with the owner, character keys go to it (filtering instead of typeahead)
     */
    focusOwner?: ListFocusOwner;

    /** Custom row render; the default is List.ItemView / List.SectionHeader */
    renderItem?: (ctx: ListItemContext<T>, helpers: ListItemHelpers) => React.ReactNode;

    /** The base of row ids and the target of an external aria-controls; default — an auto id */
    id?: string;
    size?: ListSize;
    className?: string;
    style?: React.CSSProperties;
    /**
     * DOM props of the root beyond the dedicated ones (`onScroll`, `data-*`, an external
     *  `onFocus`), composed by the contract of `ListPropsOverrides`; the `ref` of the root is
     *  the `ref` of the component
     */
    containerProps?: Omit<ListPropsOverrides, 'ref'>;
}

/** The selection layer; absent until `selectionMode` is passed (no aria-selected, no Space) */
export interface ListSelectionProps {
    /** Turns the layer on. There is no separate `'none'` — the absence of the prop expresses it */
    selectionMode?: 'single' | 'multiple';
    selectedIds?: readonly string[];
    defaultSelectedIds?: readonly string[];
    onSelectedUpdate?: (ids: string[]) => void;
}

/** The insertion target: the row and the edge the indicator is drawn at */
export interface ListDropTarget {
    id: string;
    position: 'before' | 'after';
}

/**
 * Props returned by a dnd adapter: `role`/`id`/`tabIndex` are excluded — they belong to the
 *  core. Spread the `attributes` of `useSortable` (dnd-kit) yourself instead of passing them through
 */
export type ListDndProps = Omit<ListPropsOverrides, 'role' | 'id' | 'tabIndex'>;

/**
 * A library-agnostic contract: the consumer moves the data (moveItem), the core reflects the
 *  state and merges the props. Both getters are optional (state-only adapters). Obligations —
 *  stable refs per id, no render-state closures, deduplicated dropTarget, state filled in even
 *  when the props bypass the adapter — see README "Any other library"
 */
export interface ListDndAdapter {
    /** Props for the list root (the drop zone); ref — for libraries that register the element */
    getContainerDndProps?(): ListDndProps;
    /** Props for a row, merged after the core props and before the overrides; options only */
    getItemDndProps?(id: string): ListDndProps;
    /** Who is being dragged — the source of ctx.state.dragging and data-dragging */
    draggingId?: string | null;
    /** The insertion target — the source of ctx.state.dropTarget and data-drop-target; declarative */
    dropTarget?: ListDropTarget | null;
}

export interface ListProps<T> extends ListCoreProps<T>, ListSelectionProps {
    /** The dnd layer; absent until passed: no dragging/dropTarget in ctx.state, no data attributes */
    dnd?: ListDndAdapter;
}
