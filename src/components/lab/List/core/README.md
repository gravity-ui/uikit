# List core (headless)

Headless building blocks of the `List` / `TreeList` / `GridList` family — state, selection and
behavior hooks for component authors (Select, custom assemblies). Regular consumers use the
component API.

## useListState

Normalizes `items` (objects or plain strings) into a flat structural index — id, level, parent,
children ids, disabled state and structural type (`item` / `section`) per node — and derives the
ordered `visibleIds` slice from the current expansion. Expansion is controlled when `expandedIds` is
passed, uncontrolled otherwise.

The index is rebuilt on each new `items` reference, reusing unchanged subtrees so getters run
only for changed nodes. Structural getters must be pure functions of the item — pass a new
`items` reference to apply data changes.

### Properties

| Name                 | Description                                 | Type                                          | Default                      |
| :------------------- | :------------------------------------------ | :-------------------------------------------- | :--------------------------- |
| defaultExpandedIds   | Initially expanded node ids (uncontrolled)  | `string[]`                                    | `[]`                         |
| expandedIds          | Expanded node ids (controlled)              | `string[]`                                    |                              |
| getItemChildren      | Derives child nodes                         | `(item: T) => T[] \| undefined`               | `(i) => i.children`          |
| getItemChildrenState | Derives async subtree state                 | `(item: T) => ListChildrenState \| undefined` | `(i) => i.childrenState`     |
| getItemContent       | Renderable content for a node               | `(item: T) => C`                              |                              |
| getItemDisabled      | Derives disabled state                      | `(item: T) => boolean`                        | `(i) => Boolean(i.disabled)` |
| getItemId            | Derives a node id                           | `(item: T) => string`                         | `(i) => i.id`                |
| getItemTextValue     | Text value for typeahead and screen readers | `(item: T) => string`                         | content, if a plain string   |
| getItemType          | Structural role — `item` or `section` label | `(item: T) => 'item' \| 'section'`            | `(i) => 'item'`              |
| items                | Source data — objects or plain strings      | `T[]`                                         |                              |
| onExpandedUpdate     | Called when expansion changes               | `(ids: string[]) => void`                     |                              |

For primitive string items every default closes over the string itself (id, text and content),
so no getters are needed; strings must be unique, otherwise `getItemId` is required.
`getItemTextValue` falls back to the item content only when that content is a plain string —
provide it explicitly when the content is richer, otherwise there is no default and typeahead
and screen readers have no text to work with.

### Returns

`useListState` returns a `ListState<T>` object:

| Name             | Description                                                        | Type                                             |
| :--------------- | :----------------------------------------------------------------- | :----------------------------------------------- |
| getChildrenIds   | Loaded child ids (`[]` empty folder, `undefined` leaf or unloaded) | `(id: string) => string[] \| undefined`          |
| getChildrenState | Async subtree state                                                | `(id: string) => ListChildrenState \| undefined` |
| getItemById      | Source item for an id                                              | `(id: string) => T \| undefined`                 |
| getItemType      | Structural role — `item` or non-interactive `section` label        | `(id: string) => 'item' \| 'section'`            |
| getLevel         | Nesting depth (`0` for roots)                                      | `(id: string) => number`                         |
| getParentId      | Parent id, or `undefined` for roots                                | `(id: string) => string \| undefined`            |
| isDisabled       | Whether a node is disabled                                         | `(id: string) => boolean`                        |
| isExpanded       | Whether a node is expanded                                         | `(id: string) => boolean`                        |
| setExpanded      | Expands or collapses a node; emits `onExpandedUpdate`              | `(id: string, expanded: boolean) => void`        |
| visibleIds       | Ordered ids of the currently visible (expanded) nodes              | `string[]`                                       |

## useListSelection

Tracks which nodes of a `useListState` are selected and exposes the selection gestures
(`select` / `toggle` / `extendTo` / `selectAll` / `clear`). Returns `undefined` when `selectionMode`
is omitted, so the list has no selection. Selection is controlled when `selectedIds` is passed,
uncontrolled otherwise.

### Notes

- **Selectable nodes** — only enabled `item`s. `section` labels (`getItemType`) and disabled rows
  (`isDisabled`) are skipped by every gesture; a range still spans their positions but never selects
  them. The `item` / `section` split is decided upstream via `getItemType`, so this hook needs no
  role of its own.
- **Anchor** — `extendTo` builds an inclusive range along `visibleIds` from the anchor (set by the
  last `select` / `toggle`, or by `extendTo` itself when it has none); in single mode it falls back
  to `select`.
- **Controlled ids are taken as-is** — `selectedIds` / `defaultSelectedIds` are not filtered against
  selectability; a non-selectable id stays selected until the owner removes it.
- **`trigger`** — labels the input source (`'keyboard'` / `'pointer'`) in `onSelectedUpdate`;
  defaults to `'pointer'`.
- **Serializable** — `selectedIds` is always a `string[]`, safe to persist to URL / storage /
  external state.

### Properties

| Name               | Description                                                   | Type                                                                   | Default |
| :----------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------- | :------ |
| defaultSelectedIds | Initially selected ids (uncontrolled)                         | `string[]`                                                             | `[]`    |
| onSelectedUpdate   | Called when the selection changes                             | `(ids: string[], details: {trigger: 'keyboard' \| 'pointer'}) => void` |         |
| selectedIds        | Selected ids (controlled)                                     | `string[]`                                                             |         |
| selectionMode      | At most one selected node or many; omit to turn selection off | `'single' \| 'multiple'`                                               |         |

### Returns

`useListSelection` returns a `ListSelection` object, or `undefined` when `selectionMode` is omitted:

| Name        | Description                                                                                  | Type                                                      |
| :---------- | :------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| clear       | Clears the selection and resets the range anchor                                             | `(trigger?: 'keyboard' \| 'pointer') => void`             |
| extendTo    | Extends the selection to a node as an inclusive range from the anchor along `visibleIds`     | `(id: string, trigger?: 'keyboard' \| 'pointer') => void` |
| isSelected  | Whether a node is selected (`O(1)`)                                                          | `(id: string) => boolean`                                 |
| mode        | The active selection mode                                                                    | `'single' \| 'multiple'`                                  |
| select      | Selects a node, replacing the selection, and moves the anchor to it; a no-op if unselectable | `(id: string, trigger?: 'keyboard' \| 'pointer') => void` |
| selectAll   | Selects every visible, selectable node; a no-op in single mode                               | `(trigger?: 'keyboard' \| 'pointer') => void`             |
| selectedIds | Selected node ids, in selection order                                                        | `string[]`                                                |
| toggle      | Toggles a node's selection and moves the anchor to it; a no-op if unselectable               | `(id: string, trigger?: 'keyboard' \| 'pointer') => void` |

## useListBehavior

Adds roles, keyboard navigation and roving focus over a `useListState` / `useListSelection` pair.
It produces the DOM props for the role container (`containerProps`) and for each row
(`getItemContext(id).props`) — spreading them on the rendered elements is the accessibility contract —
plus an imperative `api`. This layer implements the `listbox` keyboard machine in roving-tabindex
focus mode.

### Notes

- **Roving focus** — real DOM focus lives on the rows; exactly one row is a tab stop (`tabIndex` 0),
  so a single Tab moves in or out of the list. The tab stop follows the active row and falls back to
  the first navigable row.
- **Navigable rows** — only `item`s. `section` labels are transparent to navigation: skipped by
  arrows / Home / End / typeahead, rendered as `role="presentation"`, and `focusItem` on one is a
  no-op. Disabled rows stay navigable but are never selectable (APG focusable-not-selectable).
- **Keyboard** — Arrow Up/Down and Home/End move the active row; Space toggles (multiple) or selects
  (single); Enter runs `onItemAction`, otherwise selects; Shift+Arrows and Shift+Home/End extend the
  range from the anchor (multiple); Ctrl/Cmd+A selects every visible row (multiple); typing runs
  typeahead. A shift range spans disabled rows by position but never selects them. Horizontal arrows
  are inert — the listbox has no inline axis.
- **Active row** — controlled through `activeItemId` / `defaultActiveItemId` / `onActiveItemUpdate`;
  the uncontrolled default seeds from the first selectable selected id.
- **Row and container ids** — the container id (`id`, or a generated SSR-safe one) is the base for
  each row id (`{id}-item-{itemId}`, with the item id sanitized to a valid id token).
- **Disabled list** — `aria-disabled`, no tab stop, and keyboard / pointer / typeahead muted; distinct
  from per-item disabled, which keeps the list interactive.
- **Virtual focus** — not implemented yet: `focus: {mode: 'virtual'}` falls back to roving and
  `virtualFocusTargetProps` is `undefined`.

### Properties

| Name                | Description                                                      | Type                                           | Default            |
| :------------------ | :--------------------------------------------------------------- | :--------------------------------------------- | :----------------- |
| activateOnHover     | How pointer hover moves the active row                           | `'keep' \| 'reset-on-leave' \| false`          | `'reset-on-leave'` |
| activeItemId        | Active (highlighted) row id, controlled                          | `string`                                       |                    |
| defaultActiveItemId | Initially active row id, uncontrolled                            | `string`                                       | first selected     |
| disabled            | Disables the whole list as a form control                        | `boolean`                                      | `false`            |
| expandTrigger       | What expands a node by pointer                                   | `'chevron' \| 'item'`                          | `'item'`           |
| focus               | Focus projection (`virtual` falls back to roving)                | `{mode: 'roving'} \| {mode: 'virtual'}`        | `{mode: 'roving'}` |
| getItemTextValue    | Derives the typeahead text; defaults to the item for strings     | `(item: T) => string`                          |                    |
| id                  | DOM id of the role container; row ids derive from it             | `string`                                       | generated          |
| loading             | Whether the list is loading more rows                            | `boolean`                                      |                    |
| onActiveItemUpdate  | Called when the active row changes                               | `(id: string \| undefined) => void`            |                    |
| onItemAction        | "Apply" a row — Enter, double click, single click without select | `(ctx: ListItemContext<T>) => void`            |                    |
| onLoadChildren      | Called on the first expand of a `lazy` node                      | `(ctx: ListItemContext<T>) => void \| Promise` |                    |
| onLoadMore          | Called when the load-more sentinel is reached                    | `() => void`                                   |                    |
| role                | Container role                                                   | `'listbox' \| 'tree' \| 'grid'`                |                    |
| selection           | Selection from `useListSelection`; omit for no selection         | `ListSelection`                                |                    |
| state               | Structural state from `useListState`                             | `ListState<T>`                                 |                    |
| typeahead           | Whether typing activates the matching row                        | `boolean`                                      | `true`             |

### Returns

`useListBehavior` returns a `ListBehavior<T>` object:

| Name                    | Description                                                            | Type                                               |
| :---------------------- | :--------------------------------------------------------------------- | :------------------------------------------------- |
| api                     | Imperative handle — focus, structure, scrolling and expansion          | `ListApi`                                          |
| containerProps          | Props for the role container — role, `aria-*`, tabIndex, handlers, ref | `React.HTMLAttributes<HTMLElement> & {ref}`        |
| getItemContext          | Builds the per-row context (state + ready-made `props`) for an id      | `(id: string) => ListItemContext<T>`               |
| virtualFocusTargetProps | Props for the focus owner in `virtual` mode; `undefined` in roving     | `{aria-activedescendant?; onKeyDown} \| undefined` |
