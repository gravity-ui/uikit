<!--GITHUB_BLOCK-->

# Loader

<!--/GITHUB_BLOCK-->

```tsx
import {Loader} from '@gravity-ui/uikit';
```

The Loader component indicates loading state (flashing bars).

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

S – Small size, used when standard loader is too big.

M – Medium (basic size), used in most cases.

L – Large size, used when standard loader is too small.

## Properties

| Property  | Description                                | Default |
| :-------- | :----------------------------------------- | :------ |
| size      | Loader size: `"s"` `"m"` `"l"`             | `"s"`   |
| className | Custom CSS class for root element `string` |         |
