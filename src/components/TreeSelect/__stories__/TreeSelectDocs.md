# TreeList

Rewritten component [Select](https://preview.gravity-ui.com/uikit/?path=/docs/components-inputs-select--docs) without feature-specific logic using TreeList inside.

`Storybook` provides complex examples how to use this components from this documentation.

### Import:

```tsx
import {unstable_TreeSelect as TreeSelect} from '@gravity-ui/uikit/unstable';
```

### Basic example:

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
