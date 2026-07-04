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
- **Anchor** — `extendTo` builds an inclusive range from the anchor (set by the last `select` /
  `toggle`) along `visibleIds`; in single mode it falls back to `select`.
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
