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
            <Button.Icon>
                <ListItemExpandIcon {...props} expanded={expanded} />
            </Button.Icon>
        </Button>
    );
};
```

<ListItemExpandIconInsideButton />

#### Props

| Name     | Description                   |               Type                | Default |
| :------- | :---------------------------- | :-------------------------------: | :-----: |
| expanded | icon state                    |             `boolean`             |         |
| disabled | disabled view type            |             `boolean`             |         |
| behavior | The behavior of the component | `state`, `state-inverse`,`action` |         |
