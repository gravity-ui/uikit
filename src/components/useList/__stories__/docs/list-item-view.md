### ListItemView

```tsx
import {unstable_ListItemView as ListItemView} from '@gravity-ui/uikit/unstable';
```

The basic component responsible for the appearance of the list items.
Use it even if the functionality of the `useList` hook seems redundant to you

#### Usage example:

```tsx
import {
   type unstable_ListItemType as ListItemType,
   unstable_ListItemView as ListItemView,
} from '@gravity-ui/uikit/unstable';

type Entity = {title: string, subtitle: string, icon: React.ReactNode};

const items: ListItemType<Entity>[] = [
   {title: 'some title 1', subtitle: 'some subtitle 1', icon: <Icon data={Grip} size={16} />},
   {title: 'some title 2', subtitle: 'some subtitle 2', icon: <Icon data={Grip} size={16} />},
];

const List = () => {
   return (
       <>
           {items.map(item, i) => {
               return (
                   <ListItemView
                       key={i}
                       id={String(i)}
                       content={{
                            title: item.title,
                            subtitle: item.subtitle,
                            endSlot: item.icon,
                       }}
                       // content={<YouCustomComponent />}
                   />
               )
           }}
       </>
   )
};
```

#### Props:

| Name          | Description                                                                                                                                                                                                                                                                           |               Type                | Default |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------: | :-----: |
| id            | Required prop. Set `[data-list-item="${id}"]` data attribute. By this it core list engine finds elements to scroll to.                                                                                                                                                                |             `string`              |         |
| as            | If needed, override `html` tag. By default - `li`                                                                                                                                                                                                                                     |           `HTMLElement`           |  `li`   |
| size          | The size of the element. This also affects the rounding radius of the list element                                                                                                                                                                                                    |        `s \| m \| l \| xl`        |   `m`   |
| height        | The height of the element in pixels. By default, it is calculated depending on the `size` parameter and the presence of the `subtitle` parameter.<br>Also you can define item height by two variants:<br>- component props `height`;<br>- css custom property `--g-list-item-height`; |             `number `             |         |
| selected      | The selected state of the component                                                                                                                                                                                                                                                   |            `boolean `             |         |
| active        | The state when the element is in the user's focus, but not selected. It can also be used when you drag an element                                                                                                                                                                     |            `boolean `             |         |
| disabled      | The disabled state. It also prevents clicking on an element                                                                                                                                                                                                                           |            `boolean `             |         |
| activeOnHover | directly control hover behavior                                                                                                                                                                                                                                                       |            `boolean `             |         |
| onClick       | On item click callback. If `disabled` option is `true` click don't appears                                                                                                                                                                                                            |           `() => void`            |         |
| content       | Typed props or ReactNode in difficult cases                                                                                                                                                                                                                                           | `ContentProps \| React.ReactNode` |         |

#### ContentProps

| Name             | Description                                                                                                                                                |         Type          | Default |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------: | :-----: |
| title            | Base required prop to use. If passed string, applies default component styles according design system. Pass you own component if you wont custom behavior; |   `React.ReactNode`   |         |
| subtitle         | Slot under `title`. If passed string apply predefined styles. Or you can pass custom `React.ReactNode` to use you own behavior                             |   `React.ReactNode`   |         |
| style            | Inline styles if needed                                                                                                                                    | `React.CSSProperties` |         |
| className        | Custom class name to mix with                                                                                                                              |       `string`        |         |
| dragging         | manage view of dragging element. Required for draggable list implementation                                                                                |       `boolean`       |         |
| indentation      | Affects the visual indentation of the element content                                                                                                      |       `number `       |         |
| hasSelectionIcon | Show selected icon if selected and reserve space for this icon                                                                                             |      `boolean `       |         |
| isGroup          | Applies group styles view to list element                                                                                                                  |       `boolean`       |         |
| expanded         | Control group item view state expended/closed                                                                                                              | `string \| undefined` |         |
| startSlot        | Custom slot before `title`                                                                                                                                 |   `React.ReactNode`   |         |
| endSlot          | Custom slot after `title`                                                                                                                                  |   `React.ReactNode`   |         |
