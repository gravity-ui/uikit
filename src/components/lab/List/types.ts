import type * as React from 'react';

import type {QAProps} from '../../types';

import type {LIST_FOCUS_OWNER_CHANNEL, ListFocusOwnerChannel} from './focusOwnerChannel';

export type ListSize = 's' | 'm' | 'l' | 'xl';

/**
 * ARIA role of the list — and at the same time the role model of its rows and
 *  cells. It is chosen by the row content: interactive descendants are valid
 *  in the grid model only
 */
export type ListRole =
    /**
     * A list of options: the container is `listbox`, a row is `option`.
     *  `option` is a LEAF ARIA role: interactive descendants (a button, a
     *  checkbox, a link) inside it are invalid, and there are no cells —
     *  `getCellProps()` is empty.
     *  Keyboard: `↑`/`↓`/`Home`/`End`/typeahead, plus
     *  `aria-setsize`/`aria-posinset` under virtualization
     */
    | 'listbox'
    /**
     * Rows with interactive content: the container is `grid`, a row is `row`,
     *  its content is a `gridcell` (`getCellProps()`). A cell LEGITIMATELY
     *  contains interactive elements (a drag handle, a checkbox, a row
     *  action), while `aria-selected` lives on the row.
     *  Keyboard: `←`/`→` are added to row navigation — entering the
     *  interactive content of a cell and returning to the row; under
     *  virtualization — `aria-rowcount`/`aria-rowindex`
     */
    | 'grid';

/**
 * The strategy that keeps focus in sync with the active row — step "b" of the
 *  keyboard machinery. It is not exposed as a prop: `activedescendant` is
 *  turned on by the `focusOwner` prop — DOM focus then stays with the
 *  external owner (an input)
 */
export type ListFocusStrategy = 'roving' | 'activedescendant';

export interface ListItemGetters<T> {
    /** Unique item id. default: `(i) => i.id`; for a string item — the string itself */
    getItemId?: (item: T) => string;
    /** default: `(i) => Boolean(i.disabled)` */
    getItemDisabled?: (item: T) => boolean;
    /**
     * Sections: a node with children renders as a header plus its options.
     *  default: `(i) => i.children`
     */
    getItemChildren?: (item: T) => readonly T[] | undefined;
    /**
     * WHAT to show: the children of a row. A string item is its own content.
     *  The structure (description, slots) comes from renderItem, not from
     *  this getter.
     */
    getItemContent?: (item: T) => React.ReactNode;
    /**
     * Text for typeahead. default: the content, if it is a string.
     *  This getter does NOT define the accessible name of an option:
     *  non-string content still needs its own text or an aria-label
     */
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
         * Whether the active row shows the keyboard cursor — the dark active
         *  color of the default render. Present on the active row only (a
         *  change does not re-render the others). It is a fact about THIS
         *  list rather than about the input modality of the page: working
         *  with the pointer inside the list and losing DOM focus put the
         *  cursor out, while a key pressed in the list, the focus coming
         *  back and an activation that arrived from the outside (controlled
         *  `activeItemId`, `defaultActiveItemId`) bring it back. The activity
         *  itself is the same either way — only the indication differs: with
         *  the cursor out, the row under the mouse is highlighted by the
         *  plain CSS `:hover`, so the dark trail does not follow the mouse
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

/**
 * Overrides merged into the props of a row or of the container. Composition:
 *  `on*` handlers are chained (the passed one runs after the base one),
 *  className is concatenated, ref is forked, style is shallow-merged; keys
 *  whose value is `undefined` are ignored.
 *
 * The composition chain is not gated by state: on a disabled row the base
 *  core handler bails out on its own, while the one passed after it is still
 *  called — as far as the event reaches the row at all. With custom markup
 *  that is always the case; the default view (`List.ItemView`) takes no
 *  pointer events on a disabled row (`pointer-events: none`) and does not
 *  call `onClick` there, so with it only the keyboard and focus handlers of
 *  the overrides fire on a disabled row. Check `ctx.state.disabled` in your
 *  handler if that matters.
 *
 * `role`/`id`/`tabIndex` belong to the core (the ARIA model, the DOM id of a
 *  row, the roving tab stop). In overrides they are applied as passed — a
 *  deliberate escape hatch (a custom row role before roles are officially
 *  parameterized, for example), but overwriting them silently breaks the
 *  keyboard machinery, so a dev warning is logged. Unlike overrides, dnd
 *  adapter props do not carry these keys through at all (`ListDndProps`).
 *
 * `draggable` is excluded: the native attribute does not go through the props
 *  contract at all — ref-based dnd libraries set it on the element themselves
 *  (pragmatic-dnd), and the others do not need it. The core never emits the
 *  key, so the view's slot prop of the same name (it renders a drag handle)
 *  does not conflict with the getItemProps spread
 */
export type ListPropsOverrides = Omit<React.HTMLAttributes<HTMLElement>, 'draggable'> & {
    ref?: React.Ref<HTMLElement>;
} & {
    [key: `data-${string}`]: string | undefined;
};

/** `draggable` is excluded — see ListPropsOverrides */
export type ListItemDOMProps = Omit<React.HTMLAttributes<HTMLElement>, 'draggable'> &
    React.AriaAttributes & {role: string; ref: React.RefCallback<HTMLElement>} & {
        [key: `data-${string}`]: string | undefined;
    };

/**
 * Props of a row cell. In the listbox mode `role` is absent (there are no
 *  cells), in the grid mode it is `role="gridcell"`: one and the same
 *  `renderItem` works in both role models
 */
export type ListCellDOMProps = Omit<React.HTMLAttributes<HTMLElement>, 'draggable'> &
    React.AriaAttributes & {role?: string; ref?: React.RefCallback<HTMLElement>} & {
        [key: `data-${string}`]: string | undefined;
    };

/**
 * ctx.state in terms of the props of the view. For a section header the
 *  getter carries `size` only: a header has no state, and the object spreads
 *  on `List.SectionHeader` as it is
 */
export interface ListItemViewStateProps {
    size?: ListSize;
    /**
     * The dark "cursor" indication (the active color of the view): the active
     *  row in the keyboard modality. In the pointer modality the active row
     *  is painted by the plain CSS `:hover` as long as the mouse is over it —
     *  the dark trail does not follow the mouse (the react-aria model)
     */
    active?: boolean;
    disabled?: boolean;
    selected?: boolean;
    selectionStyle?: 'check' | 'highlight' | 'none';
    /**
     * While a drag is in progress (the dnd layer) the core passes `false` —
     *  it suppresses the CSS `:hover` of the view: the cursor positions the
     *  insertion point instead of choosing a row
     */
    hovered?: boolean;
}

export interface ListItemHelpers {
    /**
     * DOM/a11y props of the row with its id already bound. The behavior
     *  belongs to the core: neither the view nor custom markup adds logic of
     *  its own on top
     */
    getItemProps(overrides?: ListPropsOverrides): ListItemDOMProps;
    /**
     * ctx.state in terms of the props of the view — so that a custom
     *  renderItem does not have to re-bind active/selected/disabled by hand
     */
    getItemViewProps(): ListItemViewStateProps;
    /**
     * DOM/a11y props of a row CELL (the role model axis). With `role="grid"`
     *  it is `role="gridcell"`: interactive content (a drag handle, a
     *  checkbox, a row action) is valid inside a cell only. In the listbox
     *  mode the getter returns an empty object, so one and the same cell
     *  wrapper in `renderItem` works in both role models
     */
    getCellProps(overrides?: ListPropsOverrides): ListCellDOMProps;
}

/**
 * Props of the external focus owner — the element that holds DOM focus on
 *  behalf of the list: the input of a combobox, or the trigger button of a
 *  select-only one. They are element-agnostic (`HTMLAttributes` of a plain
 *  `HTMLElement`), so one and the same getter spreads on an `<input>` and on
 *  a `<button>`
 */
export type ListFocusOwnerInputProps = React.HTMLAttributes<HTMLElement> & {
    role: string;
};

/**
 * The external owner of the list DOM focus — the object returned by
 *  `useListFocusOwner()`. Until the `focusOwner` prop is passed, the list
 *  lives in the roving strategy: DOM focus travels to the rows.
 *
 * The channel is designed for the mount/unmount model of a popup:
 *  `aria-expanded` is derived from the list being mounted, and the keyboard
 *  machinery goes away together with it. Keeping a closed popup mounted
 *  (keepMounted) is not supported: in a hidden list the arrows would keep
 *  moving the active row while `aria-expanded` stayed `true`
 */
export interface ListFocusOwner {
    /**
     * Props of the owner element — an input or a trigger button:
     *  `role="combobox"`, `aria-expanded`, `aria-controls`,
     *  `aria-activedescendant`, `onKeyDown` (the keyboard machinery of the
     *  list). Overrides are composed by the common contract (a custom
     *  `onKeyDown` runs after the machinery); `role` and `aria-expanded` can
     *  be overridden — an escape hatch for non-popup patterns (a permanently
     *  visible filterable list). The `ref` of the element is set on the
     *  element itself
     */
    getInputProps(overrides?: Omit<ListPropsOverrides, 'ref'>): ListFocusOwnerInputProps;
    /**
     * The core channel — reachable through a module-private symbol only
     * @internal
     */
    readonly [LIST_FOCUS_OWNER_CHANNEL]: ListFocusOwnerChannel;
}

/**
 * The event of the applying gesture: the click on a row, or the keydown of
 *  `Enter`/`Space`. `'key' in event` tells the two apart
 */
export type ListItemActionEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;

export interface ListCoreProps<T> extends ListItemGetters<T>, QAProps {
    items: readonly T[];
    'aria-label'?: string;
    'aria-labelledby'?: string;

    /**
     * The active (highlighted) item — controlled/uncontrolled.
     *  This is navigation (roving focus), not selection — it always exists.
     *  `null` is the controlled "nothing is active"; `undefined` is
     *  uncontrolled
     */
    activeItemId?: string | null;
    defaultActiveItemId?: string;
    onActiveItemUpdate?: (id: string | null) => void;

    /**
     * "Applying" an item: a click, Enter, and Space with the selection layer
     *  on. The event of the gesture comes third: it tells a click from a key
     *  (`'key' in event`), carries the modifiers of a click (on a link row a
     *  Ctrl/Cmd/Shift+click is the browser's own "open in a new tab") and
     *  lets the native default be suppressed
     */
    onItemAction?: (id: string, item: T, event: ListItemActionEvent) => void;

    /** Activation on hover. default: true */
    activateOnHover?: boolean;

    /**
     * The ARIA role of the list (the role model axis). default: `'listbox'`;
     *  `'grid'` — when the rows contain interactive content (a drag handle
     *  button, a checkbox, a row action): inside `option` it is invalid,
     *  inside `gridcell` it is valid. Each role is described in the JSDoc of
     *  `ListRole`.
     *
     * The role is set explicitly instead of being inferred from the row
     *  content: interactive content can only be discovered by scanning the
     *  DOM AFTER mount — the container role would have already reached the
     *  screen reader as `listbox` and would then change on the fly
     */
    role?: ListRole;

    /**
     * The external owner of the DOM focus — the object returned by
     *  `useListFocusOwner()`. It turns on the `aria-activedescendant`
     *  strategy: focus stays in the owner's input, and the list only
     *  highlights the active row and scrolls it into view. Character keys go
     *  to the owner in this mode (filtering instead of typeahead)
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
     * DOM props of the root element beyond the dedicated ones — `onScroll`,
     *  `data-*`, an external `onFocus`. They are composed with the props of
     *  the list by the contract of the getters (`ListPropsOverrides`):
     *  handlers are chained after the ones of the core, `className` and
     *  `style` are merged with the props of the same name. The `ref` of the
     *  root is the `ref` of the component
     */
    containerProps?: Omit<ListPropsOverrides, 'ref'>;
}

/**
 * The selection layer. Until `selectionMode` is passed there is no layer:
 *  no `aria-selected`/`aria-multiselectable`, no `ctx.state.selected`, no
 *  selection by Space ("not selected" ≠ "not selectable" for a screen reader)
 */
export interface ListSelectionProps {
    /** Turns the layer on. There is no separate `'none'` — the absence of the prop expresses it */
    selectionMode?: 'single' | 'multiple';
    /** An array on the outside (serializable), a Set inside */
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
 * Props returned by a dnd adapter. On top of the common `ListPropsOverrides`
 *  restrictions, `role`, `id` and `tabIndex` are excluded: they belong to the
 *  core (the listbox ARIA model, the DOM id of a row, the roving tab stop),
 *  while composition of non-`on*` keys follows the "last one wins" rule — an
 *  adapter would overwrite them silently. The practical case is the
 *  `attributes` object of `useSortable` (dnd-kit): `{role: 'button',
 *  tabIndex: 0, ...}`; spread it yourself instead of passing it through the
 *  adapter — and only where that is deliberate
 */
export type ListDndProps = Omit<ListPropsOverrides, 'role' | 'id' | 'tabIndex'>;

/**
 * The dnd layer: a contract that is not tied to a dnd library — the consumer
 *  brings their own, the adapter translates it into props and state; the data
 *  is moved by the consumer (`moveItem`), the core only reflects the state
 *  and merges the props. The scope is ref/props-based libraries (references:
 *  pragmatic-drag-and-drop and dnd-kit); libraries built around wrapper
 *  components with mandatory slots inside the container (hello-pangea) cannot
 *  be expressed by the contract.
 *
 * Both getters are optional: a "state-only adapter" is legal (the dnd-kit
 *  pattern — the props half is covered by the consumer with a per-item hook
 *  in their own row component through renderItem, and the adapter carries
 *  draggingId/dropTarget only).
 *
 * What an adapter must guarantee:
 *  - the refs of BOTH getters are stable (per id in getItemDndProps): the
 *    core composition caches forks by identity, so a new callback on every
 *    render would re-register the element in the library — and while
 *    dragging the list re-renders on every dropTarget update;
 *  - props from the getters DO NOT CLOSE OVER render state: rows are memoized
 *    by their ctx slice (a performance obligation of the layer) and may not
 *    read the getter again after the list re-renders. A handler that needs
 *    fresh data (`items`, `draggingId` at the moment of the drop) has to read
 *    it through a ref rather than from the render closure;
 *  - dropTarget updates are deduplicated before setState (otherwise every
 *    dragover pixel causes a re-render);
 *  - the state half (draggingId, and dropTarget as well with the indicator
 *    model) is filled in EVEN for a purely compositional integration where
 *    the props bypass the adapter (wrappers/hooks in renderItem): without
 *    draggingId the core will neither suspend activation on hover nor
 *    suppress the hover indication of the view while dragging.
 */
export interface ListDndAdapter {
    /**
     * Props for the list root (the drop zone). ref — for libraries that
     *  register the element (pragmatic-dnd returns no props at all)
     */
    getContainerDndProps?(): ListDndProps;
    /**
     * Props for a row; they are merged into getItemProps by the composition
     *  contract (after the base core props, before the consumer overrides) —
     *  options only, section headers do not take part in dnd
     */
    getItemDndProps?(id: string): ListDndProps;
    /** Who is being dragged — the source of ctx.state.dragging and data-dragging */
    draggingId?: string | null;
    /**
     * The insertion target — the source of ctx.state.dropTarget and
     *  data-drop-target; the list draws the insertion indicator itself.
     *  Declarative: the library updates its state → a new adapter object
     *  (there is no imperative setDropTarget)
     */
    dropTarget?: ListDropTarget | null;
}

export interface ListProps<T> extends ListCoreProps<T>, ListSelectionProps {
    /**
     * The dnd layer. Until the prop is passed the layer does not exist:
     *  neither dragging/dropTarget fields in ctx.state nor data attributes
     */
    dnd?: ListDndAdapter;
}
