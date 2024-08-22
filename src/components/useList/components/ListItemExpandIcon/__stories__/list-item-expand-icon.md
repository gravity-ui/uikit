### ListItemExpandIcon

Base group expand icon view

#### Import

```tsx
import {
  type unstable_ListItemExpandIconProps as ListItemExpandIconProps,
  unstable_ListItemExpandIcon as ListItemExpandIcon,
} from '@gravity-ui/uikit/unstable';
```

#### Base example:

```jsx
const DefaultExample = (props: ListItemExpandIconProps) => {
    return <ListItemExpandIcon {...props} />;
};
```

<ListItemExpandIconDefault />

#### Render icon inside Button component:

```jsx
const InsideButtonExample = (props: ListItemExpandIconProps) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Button onClick={() => setExpanded((x) => !x)}>
            <ListItemExpandIcon {...props} expanded={expanded} />
        </Button>
    );
};
```

<ListItemExpandIconInsideButton />

#### Props

| Name              | Description                                     |                         Type                         | Default |
| :---------------- | :---------------------------------------------- | :--------------------------------------------------: | :-----: |
| expanded          | icon state                                      |                      `boolean`                       |         |
| disableTransition | disable animation while `expanded` state change |                      `boolean`                       |         |
| disabled          | disabled view type                              |                      `boolean`                       |         |
| usageRole         | The type of behavior of the component           | `state`, `action`, `state-inverse`, `action-inverse` |         |
