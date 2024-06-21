### useList

The main hook to use what provide you normalized representation of list items (`structure`) and list state (`state`).

#### Props:

| Name                 | Description                                                                |           Type            |  Default   |
| :------------------- | :------------------------------------------------------------------------- | :-----------------------: | :--------: |
| items                | a flat or tree-like data structure, with`List` declaration                 |    `ListItemType<T>[]`    |            |
| getItemId            | Allows you to generate an id for a list item depending on the list data    | `(itemData: T) => string` |            |
| defaultExpandedState | Default state for nodes with children items if `withExpandedState` is true |   `expanded`, `closed`    | `expanded` |
| withExpandedState    | Is nodes with children's needed to be controlled                           |         `boolean`         |   `true`   |
| initialState         | Initial state values                                                       |   `Partial<ListState>`    |            |
| controlledState      | Way to override state by some controlled values.                           |   `Partial<ListState>`    |            |

#### Result (UseListResult):

| Name      | Description                                                                          |      Type       |
| :-------- | :----------------------------------------------------------------------------------- | :-------------: |
| state     | List state to control and store current state values                                 |   `ListState`   |
| structure | Normalized representation of list and some helpful data structures to work with list | `ListStructure` |

#### ListState:

| Name            | Description                                                                                                                |                                                       Type                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------: |
| selectedById    | Key-value selected elements state                                                                                          |                                           `Record<ListItemId, boolean>`                                           |
| disabledById    | Key-value disabled elements state                                                                                          |                                           `Record<ListItemId, boolean>`                                           |
| expandedById    | Key-value expanded elements state. Available is only `withExpandedState` option of `useList` hook is `true`                |                                           `Record<ListItemId, boolean>`                                           |
| activeItemId    | Active item id                                                                                                             |                                             `ListItemId`, `undefined`                                             |
| setSelected     | Method to handle selected state list items state                                                                           | `(payload: Record<ListItemId, boolean>) => void` , `(fn: (payload: Record<ListItemId, boolean>) => void) => void` |
| setDisabled     | Method to handle disable state list items state                                                                            | `(payload: Record<ListItemId, boolean>) => void` , `(fn: (payload: Record<ListItemId, boolean>) => void) => void` |
| setExpanded     | Method to handle expanded state list items state. Available is only `withExpandedState` option of `useList` hook is `true` | `(payload: Record<ListItemId, boolean>) => void` , `(fn: (payload: Record<ListItemId, boolean>) => void) => void` |
| setExpanded     | Normalized representation of list and some helpful data structures to work with list                                       |                                                  `ListStructure`                                                  |
| setActiveItemId | Method to handle current active list item state                                                                            |                                  `(listItemId: ListItemId or undefined) => void`                                  |

#### ListStructure:

| Name              | Description                                                                                                                                                                                                                       |                                Type                                |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------: |
| items             | Link for original `items` property                                                                                                                                                                                                |                         `ListItemType<T>`                          |
| itemsState        | List item state                                                                                                                                                                                                                   | `Record<ListItemId, {parentId?: ListItemId; indentation: number}>` |
| groupState        | A normalized representation of metadata about a group if the item is both a list item and a group:                                                                                                                                |         `Record<ListItemId, {childrenIds: ListItemId[]}>`          |
| itemsById         | The default IDs are formed according to the principle `<ordinal index>-<ordinal index of the nested list>`. To make a custom `id`, you need to use it either when forming an array of `items` or through the`getItemId` function. |                      `Record<ListItemId, T>`                       |
| visibleFlattenIds | Sequential representation of list items by id, taking into account invisible elements inside collapsed groups. Items visibility determine by `expandedById` state                                                                 |                           `ListItemId[]`                           |
| idToFlattenIndex  | Auxiliary data structure for quick get item index by id. Needed, for example, for DnD things with list                                                                                                                            |                    `Record<ListItemId, number>`                    |
| itemsSchema       | Item structure to use in custom view implementations if needed. Items visibility determine by `expandedById` state                                                                                                                |                           `ItemSchema[]`                           |

##### ItemSchema

```ts
export type ItemSchema = {
  id: ListItemId;
  index: number;
  children?: ItemSchema[];
};
```

#### Item variants

```ts
const simple: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

const arbitraryObject: ListItemType<{text: string}>[] = [
  {text: 'one'},
  {text: 'two'},
  {text: 'free'},
  {text: 'four'},
  {text: 'five'},
];

const withNestedChildren: ListItemType<string>[] = [
  {data: 'one'},
  {data: 'two', children: [{data: 'tree', children: [{data: 'four'}, {data: 'five'}]}]},
];

const withNestedChildrenComplexExample: ListItemType<string>[] = [
  {disabled: true, data: {title: 'one', id: '1'}},
  {
    expanded: true,
    data: {title: 'two', id: '2'},
    children: [
      {
        data: {title: 'tree', id: '3'},
        children: [{data: {title: 'four', id: '4'}}, {data: {title: 'five', id: '5'}}],
      },
    ],
  },
];
```

#### Object decl reserved properties:

```tsx
interface ListItemInitialProps {
  /**
   * If you need to control the state from the outside,
   * you can set a unique id for each element
   */
  id?: string;
  /**
   * Initial disabled item state
   */
  disabled?: boolean;
  /**
   * Initial selected item state
   */
  selected?: boolean;
  /**
   * Default expanded state if group
   */
  expanded?: boolean;
}

type ListFlattenItemType<T> = T & ListItemInitialProps;

interface ListTreeItemType<T> extends ListItemInitialProps {
  data: T;
  children?: ListTreeItemType<T>[];
}

export type ListItemType<T> = ListTreeItemType<T> | ListFlattenItemType<T>;
```

#### ControlledValues example:

```tsx
const [selectedById] = React.useState<Record<ListItemId, boolean>>({});

const list = useList({
  // outer controlled state
  controlledState: {
    selectedById,
  },
});
```
