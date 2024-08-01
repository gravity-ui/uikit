### getItemRenderState;

Map list state to `ListItemView` render props;

```tsx
import {
    unstable_ListItemView as ListItemView,
    unstable_getItemRenderState as getItemRenderState,
    unstable_useListState as useListState,
    unstable_useList as useList,
} from '@gravity-ui/uikit/unstable';

const list = useList({items: [...]});
const onItemClick = getListItemClickHandler({list});

const {data, props, context} = getItemRenderState({
    qa: 'some-qa-id',
    id,
    multiple: true,
    size, // list size
    onItemClick,
    mapItemDataToContentProps: (item) => ({title: item.title}),
    list,
});

return <ListItemView {...props} />;
```

#### Props:

| Name                      | Description                                                                        |                              Type                              | Default |
| :------------------------ | :--------------------------------------------------------------------------------- | :------------------------------------------------------------: | :-----: |
| id                        | `id` of list item                                                                  |                          `ListItemId`                          |         |
| list                      | result of `useList` hook                                                           |                        `UseListResult`                         |         |
| multiple                  | One or multiple elements selected list                                             |                           `boolean`                            |         |
| onItemClick               | Optional on click handler                                                          | `(payload :{id: ListItemId}, e: React.SyntheticEvent) => void` |         |
| size                      | The size of the element. This also affects the rounding radius of the list element |                      `s \| m \| l \| xl`                       |   `m`   |
| mapItemDataToContentProps | Map list item data (`T`) to `ListItemView` `content` prop                          |            `(data: T) => ListItemViewContentProps`             |         |

##### ListItemViewContentProps

| Name      |       Type        |   Note   |
| :-------- | :---------------: | :------: |
| title     | `React.ReactNode` | required |
| subtitle  | `React.ReactNode` | optional |
| startSlot | `React.ReactNode` | optional |
| endSlot   | `React.ReactNode` | optional |

#### Returns:

| Name    |                   Description                    |            Type            |
| :------ | :----------------------------------------------: | :------------------------: |
| data    |                Row list item data                |            `T`             |
| props   |        Prepared props for `ListItemView`         |    `ListItemViewProps`     |
| context | List item state form `list` picked by current id | `ListItemListContextProps` |

##### ListItemListContextProps

| Name        |                         Description                          |      Type      |
| :---------- | :----------------------------------------------------------: | :------------: |
| indentation |                      Item nested level                       |    `number`    |
| parentId    | Optional. Link to parent group node if current node is child |  `ListItemId`  |
| childrenIds |          Optional. Exists is list item a group node          | `ListItemId[]` |

#### Usage example:

```tsx
import {
  unstable_ListContainerView as ListItemRecursiveRenderer,
  unstable_ListItemView as ListItemView,
  unstable_getItemRenderState as getItemRenderState,
  unstable_useList as useList,
} from '@gravity-ui/uikit/unstable';

const list = useList({items});
const onItemClick = () => {};

<ListItemRecursiveRenderer>
  {(id) => {
    const {props} = getItemRenderState({
      qa: 'some-qa-id',
      id,
      multiple: false,
      size, // list size
      onItemClick,
      mapItemDataToContentProps,
      list,
    });

    return <ListItemView {...props} />;
  }}
</ListItemRecursiveRenderer>;
```
