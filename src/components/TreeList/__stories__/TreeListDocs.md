# TreeList

The basic component for working with lists, including tree-like. Under the hood, it uses the [useList](/docs/lab-uselist--docs).

`Storybook` provides complex examples how to use this components from this documentation.

## Quick start:

### Import:

```tsx
import {unstable_TreeList as TreeList} from '@gravity-ui/uikit/unstable';
```

### Basic example:

```tsx
import {
  type unstable_ListItemType as ListItemType,
  unstable_TreeList as TreeList,
  unstable_useList as useList,
} from '@gravity-ui/uikit/unstable';

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

const list = useList({items});

<TreeList list={list} mapItemDataToContentProps={(item) => ({title: item})} />;
```

### Example with state:

```tsx
import {
  type unstable_ListItemType as ListItemType,
  unstable_TreeList as TreeList,
  unstable_useList as useList,
} from '@gravity-ui/uikit/unstable';

const items: ListItemType<string>[] = [
  {title: 'one'},
  {title: 'two'},
  {title: 'free'},
  {title: 'four'},
  {title: 'five'},
];

const Component = () => {
  const list = useList({items});

  const handleItemClick = ({id}) => {
    list.state.setSelected({[id]: true});
  };

  return (
    <TreeList
      list={list}
      onItemClick={handleItemClick}
      mapItemDataToContentProps={({title}) => ({title})}
    />
  );
};
```

## Props:

| Name                      | Description                                                                                                                                                                                                                    |                                             Type                                             | Default |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------: | :-----: |
| list                      | result of [list](/docs/lab-uselist--docs#uselist) hook.                                                                                                                                                                        |                                       `UseListResult`                                        |         |
| containerRef              | a reference to the DOM element of the List container inside which to search for its elements;                                                                                                                                  |                      `React.RefObject<HTMLDivElement \| HTMLUlElement>`                      |         |
| qa                        | Selector for tests                                                                                                                                                                                                             |                                           `string`                                           |         |
| size                      | The size of the element. This also affects the rounding radius of the list element                                                                                                                                             |                                     `s \| m \| l \| xl`                                      |   `m`   |
| mapItemDataToContentProps | Map list item data (`T`) to `ListItemView` `content` prop                                                                                                                                                                      |                           `(data: T) => ListItemViewContentProps`                            |         |
| multiple                  | One or multiple elements selected list                                                                                                                                                                                         |                                          `boolean`                                           | `false` |
| id                        | id attribute                                                                                                                                                                                                                   |                                           `string`                                           |         |
| renderItem                | Redefine the rendering of a list item. For example, add dividers between list items or wrap an item in a link component. As a view component to display a list item, use [ListItemView](/docs/lab-uselist--docs#listitemview); |                   `(props: TreeListRenderItem<T, P>) => React.JSX.Element`                   |         |
| renderContainer           | Render custom list container.                                                                                                                                                                                                  |                  `(props: TreeListRenderContainer<T>) => React.JSX.Element`                  |         |
| onItemClick               | Override default on click behavior. Pass `null` to disable on click handler                                                                                                                                                    | `(props: {id: ListItemId; list: UseListResult<T>}, e: React.SyntheticEvent) => void \| null` |         |

### TreeListRenderItem props:

| Name                 | Description                                                                 |            Type            |   Default   |
| :------------------- | :-------------------------------------------------------------------------- | :------------------------: | :---------: |
| data                 | List item data                                                              |            `T`             |             |
| props                | Prepared `ListItemView` [props](/docs/lab-uselist--docs#listitemview)       |    `ListItemViewProps`     |
| context              | List item context [props](/docs/lab-uselist--docs#listitemlistcontextprops) | `ListItemListContextProps` |             |
| list                 | result of [list](/docs/lab-uselist--docs#uselist) hook.                     |      `UseListResult`       |             |
| index                | Index order in flatted visible id's                                         |          `number`          |             |
| renderContainerProps | Data from container rendered context if needed                              |            `P`             | `undefined` |

### TreeListRenderContainer props:

| Name         | Description                                                                                   |                                              Type                                              | Default |
| :----------- | :-------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------: | :-----: |
| id           | Id attribute                                                                                  |                                            `string`                                            |         |
| list         | result of `useList` hook                                                                      |                                        `UseListResult`                                         |         |
| size         | The size of the element. This also affects the rounding radius of the list element            |                                      `s \| m \| l \| xl`                                       |   `m`   |
| className    | Class name to mix with                                                                        |                                            `string`                                            |         |
| containerRef | a reference to the DOM element of the List container inside which to search for its elements; |                       `React.RefObject<HTMLDivElement \| HTMLUlElement>`                       |         |
| renderItem   | Render item interface to implement                                                            | `(props: {id: ListItemId; index: number;renderContainerProps?: Object,}) => React.JSX.Element` |         |
