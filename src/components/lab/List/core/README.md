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
