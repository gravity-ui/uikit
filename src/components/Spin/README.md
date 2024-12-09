<!--GITHUB_BLOCK-->

# Spin

<!--/GITHUB_BLOCK-->

```tsx
import {Spin} from '@gravity-ui/uikit';
```

The `Spin` component displays the loading state (a rotating semicircle) in inline scenarios. Unlike `Loader`, this component is used to display the loading state in inline scenarios, e.g., in a `Button` or `Label`.

### Size

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Spin size="xs" />
<Spin size="s" />
<Spin size="m" />
<Spin size="l" />
<Spin size="xl" />
`}
>
    <UIKit.Spin size="xs" />
    <UIKit.Spin size="s" />
    <UIKit.Spin size="m" />
    <UIKit.Spin size="l" />
    <UIKit.Spin size="xl" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Spin size="xs" />
<Spin size="s" />
<Spin size="m" />
<Spin size="l" />
<Spin size="xl" />
```

<!--/GITHUB_BLOCK-->

`XS`: Extra small.

`S`: Small, used when a medium-sized spin is too large.

`M`: Medium (basic), used in most cases.

`L`: Large, used when a medium-sized spin is too small.

`XL`: Extra large.

## Properties

| Name      | Description                           |              Type               | Default |
| :-------- | :------------------------------------ | :-----------------------------: | :-----: |
| size      | Spin size                             | `"xs"` `"s"` `"m"` `"l"` `"xl"` |  `"m"`  |
| style     | Custom CSS styles for root element    |      `React.CSSProperties`      |         |
| className | Custom CSS class for the root element |            `string`             |         |
| qa        | Test attribute (`data-qa`)            |            `string`             |         |
