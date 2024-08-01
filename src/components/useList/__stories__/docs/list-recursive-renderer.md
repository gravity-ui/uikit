### ListRecursiveRenderer

The basic "renderer" of the `List` elements. When rendering, it retains the nested html structure.

#### Props:

| Name       | Description                           |         Type          | Default |
| :--------- | :------------------------------------ | :-------------------: | :-----: |
| itemSchema | Simplified list representation schema |     `ItemSchema`      |         |
| children   | Children React element                |   `React.ReactNode`   |         |
| style      | Inline styles if needed               | `React.CSSProperties` |         |
| className  | Custom class name to mix with         |       `string`        |         |

##### ItemSchema

```ts
export type ItemSchema = {
  id: ListItemId;
  index: number;
  children?: ItemSchema[];
};
```

#### Usage example:

```tsx
import {
  unstable_ListItemRecursiveRenderer as ListItemRecursiveRenderer,
  unstable_ListContainerView as ListContainerView,
  unstable_ListItemView as ListItemView,
  unstable_useList as useList,
  unstable_useListItemsClick as useListItemsClick,
  unstable_getItemRenderState as getItemRenderState,
} from '@gravity-ui/uikit/unstable';

const items: ListItemType<string>[] = [
  {data: 'one'},
  {data: 'two', children: [{data: 'tree', children: [{data: 'four'}, {data: 'five'}]}]},
];

function List() {
  const list = useList({items});
  const onItemClick = useListItemsClick({items});

  return (
    <ListContainerView ref={containerRef}>
      {list.structure.itemsSchema.map((itemSchema, index) => (
        <ListItemRecursiveRenderer itemSchema={itemSchema} key={index}>
          {(id) => {
            const {props} = getItemRenderState({
              id: String(i),
              mapItemDataToContentProps: (title) => ({title}),
              onItemClick,
              list,
            });

            return <ListItemView {...props} />;
          }}
        </ListItemRecursiveRenderer>
      ))}
    </ListContainerView>
  );
}
```
