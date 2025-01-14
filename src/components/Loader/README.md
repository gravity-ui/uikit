<!--GITHUB_BLOCK-->

# Loader

<!--/GITHUB_BLOCK-->

```tsx
import {Loader} from '@gravity-ui/uikit';
```

The `Loader` component displays the loading progress as flashing bars. Unlike `Spin`, this component is used in global scenarios, e.g., for an entire page or `Dialog`.

### Size

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Loader size="s" />
<Loader size="m" />
<Loader size="l" />
`}
>
    <UIKit.Loader size="s" />
    <UIKit.Loader size="m" />
    <UIKit.Loader size="l" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Loader size="s" />
<Loader size="m" />
<Loader size="l" />
```

<!--/GITHUB_BLOCK-->

`S`: Small size, used when the regular loader is too large.

`M`: Medium (basic) size, used in most cases.

`L`: Large size, used when the regular loader is too small.

## Properties

| Name      | Description                           |       Type        | Default |
| :-------- | :------------------------------------ | :---------------: | :-----: |
| size      | Loader size                           | `"s"` `"m"` `"l"` |  `"s"`  |
| className | Custom CSS class for the root element |     `string`      |         |
