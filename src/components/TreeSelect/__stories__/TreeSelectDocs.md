# TreeList

Rewritten component [Select](https://preview.gravity-ui.com/uikit/?path=/docs/components-inputs-select--docs) without feature-specific logic using TreeList inside.

`Storybook` provides complex examples how to use this components from this documentation.

## Import:

```tsx
import {unstable_TreeSelect as TreeSelect} from '@gravity-ui/uikit/unstable';
```

## Example

### Basic:

```tsx
import {
  type unstable_ListItemType as ListItemType,
  unstable_TreeSelect as TreeSelect,
} from '@gravity-ui/uikit/unstable';

const items: ListItemType<string>[] = ['one', 'two', 'free', 'four', 'five'];

<TreeSelect items={items} mapItemDataToContentProps={(item) => ({title: item})} />;
```

### With full list item view override:

```tsx
import {Text} from '@gravity-ui/uikit';
import {
  type unstable_ListItemType as ListItemType,
  type unstable_ListItemView as ListItemView,
  unstable_TreeSelect as TreeSelect,
} from '@gravity-ui/uikit/unstable';

interface Entity {
  id: string;
  title: string;
}

const items: ListItemType<Entity>[] = [
  {title: 'one', id: '1'},
  {title: 'two', id: '2'},
  {title: 'free', id: '3'},
  {title: 'four', id: '4'},
  {title: 'five', id: '5'},
];

const Component = () => {
  return (
    <TreeSelect
      items={items}
      getItemId={({id}) => id}
      mapItemDataToContentProps={({title}) => ({title})}
      renderItem={({data: {title}, props}) => (
        <ListItemView {...props} content={<Text>{title}</Text>} />
      )}
    />
  );
};
```

## Props:

### getItemById:

Take a look at this example:

```tsx
<TreeSelect
  value={['two']}
  items={['one', 'two', 'free']}
  mapItemDataToContentProps={(title) => ({title})}
/>
```

In this case we will see select with `empty` value.

Why this happens?

Internal list representation make own `id` for every item. By default it bases on index of base and nested arrays.
Result `id` will be computed by formula: `{root-array-item-index}-{child-array-index-if-exists}-{...}`.
In example to select second item you need to set as a value item index:

```sh
value={['1']}
```

To fix our example we need to use `getItemById` prop and explicitly tell `TreeSelect` to use items values as uniq ids:

```diff
<TreeSelect
  value={['two']}
+ getItemById={(value: id) => id}
  items={['one', 'two', 'free']}
  mapItemDataToContentProps={(title) => ({title})}
/>
```

Now we will se selected element with value `two`
