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
<Flex gap="5">
  <Flex direction="column" gap="2">
    <Text>Position: start</Text>
    <Flex gap="2">
      <ListItemExpandIcon expanded={true} />
      <ListItemExpandIcon expanded={false} />
    </Flex>
  </Flex>
  <Flex direction="column" gap="2">
    <Text>Position: start</Text>
    <Flex gap="2">
      <ListItemExpandIcon expanded={true} position="end" />
      <ListItemExpandIcon expanded={false} position="end" />
    </Flex>
  </Flex>
</Flex>
```

<ListItemExpandIconDefault />

#### Render icon inside Button component:

```jsx

const InsideButtonExample = (props: ListItemExpandIconProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const [position, setPosition] = React.useState<'start' | 'end'>('start');

    return (
        <Flex direction="column" gap="3">
            <Flex gap="3" alignItems="center">
                <Text>Icon position: </Text>
                <RadioButton
                    size="m"
                    value={position}
                    onUpdate={setPosition}
                    options={[
                        {value: 'start', content: 'Start'},
                        {value: 'end', content: 'End'},
                    ]}
                />
            </Flex>

            <Text>Click on button to change state:</Text>

            <Button onClick={() => setExpanded((x) => !x)}>
                <ListItemExpandIcon expanded={expanded} position={position} />
            </Button>
        </Flex>
    );
};
```

<ListItemExpandIconInsideButton />
