<!--GITHUB_BLOCK-->

# Divider

<!--/GITHUB_BLOCK-->

```tsx
import {Divider} from '@gravity-ui/uikit';
```

The `Divider` component is used as a thin line for delimiting and grouping elements to reinforce visual hierarchy.

```tsx
<Divider className="custom-divider" direction="horizontal" />
```

### Orientation

To control the orientation of the `Divider`, use the `orientation` property. The default orientation is `horizontal`.

#### Horizontal

<!--LANDING_BLOCK

<ExampleBlock
  code={`
    <Container>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
            perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
            aliquid commodi atque sunt officiis natus?
        </Text>
        <Divider direction="horizontal"/>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
            perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
            aliquid commodi atque sunt officiis natus?
        </Text>
    </Container>
`}
>
    <UIKit.Container>
        <UIKit.Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
            perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
            aliquid commodi atque sunt officiis natus?
        </UIKit.Text>
        <UIKit.Divider direction="horizontal"/>
        <UIKit.Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
            perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
            aliquid commodi atque sunt officiis natus?
        </UIKit.Text>
    </UIKit.Container>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Container, Text, Divider} from '@gravity-ui/uikit';

<Container>
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
    perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
    aliquid commodi atque sunt officiis natus?
  </Text>
  <Divider orientation="horizontal" />
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
    perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
    aliquid commodi atque sunt officiis natus?
  </Text>
</Container>;
```

<!--/GITHUB_BLOCK-->

#### Vertical

<!--LANDING_BLOCK

<ExampleBlock
    code={`
        <Container>
            <Flex gap={3}>
                <Label>Label</Label>
                <Divider orientation="vertical"/>
                <Label>Label</Label>
                <Divider orientation="vertical"/>
                <Label>Label</Label>
                <Divider orientation="vertical"/>
                <Label>Label</Label>
            </Flex>
        </Container>
    `}
>
    <UIKit.Container>
        <UIKit.Flex gap={3}>
            <UIKit.Label>Label</UIKit.Label>
            <UIKit.Divider orientation="vertical"/>
            <UIKit.Label>Label</UIKit.Label>
            <UIKit.Divider orientation="vertical"/>
            <UIKit.Label>Label</UIKit.Label>
            <UIKit.Divider orientation="vertical"/>
            <UIKit.Label>Label</UIKit.Label>
        </UIKit.Flex>
    </UIKit.Container>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {Flex, Label, Divider} from '@gravity-ui/uikit';

<Container>
  <Flex gap={3}>
    <Label>Label</Label>
    <Divider orientation="vertical" />
    <Label>Label</Label>
    <Divider orientation="vertical" />
    <Label>Label</Label>
    <Divider orientation="vertical" />
    <Label>Label</Label>
  </Flex>
</Container>;
```

<!--/GITHUB_BLOCK-->

### Properties

| Name        | Description                             | Type                    | Default      |
| :---------- | :-------------------------------------- | :---------------------- | :----------- |
| className   | HTML `class` attribute                  | `string`                | -            |
| orientation | Sets the direction of divider           | `horizontal - vertical` | `horizontal` |
| style       | HTML `style` attribute                  | `React.CSSProperties`   |              |
| qa          | HTML `data-qa` attribute, used in tests | `string`                |              |

### CSS API

| Name                | Description   |
| :------------------ | :------------ |
| `--g-divider-color` | Divider color |
