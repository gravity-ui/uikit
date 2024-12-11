<!--GITHUB_BLOCK-->

# Overlay

<!--/GITHUB_BLOCK-->

```tsx
import {Overlay} from '@gravity-ui/uikit';
```

The `Overlay` component renders an overlay over the parent element with the relative position, i.e., the parent element must have `position` set to `relative`.
For example, it can be used to preserve the desired layout while loading data.

```jsx
import {Box, Overlay, Loader} from '@gravity-ui/uikit';

<Box position="relative">
  <div>Some content to hide under overlay</div>
  <Overlay visible={loading}>
    <Loader />
  </Overlay>
</Box>;
```

## Appearance

### Background

You can use `base` or `float` background colors.

<!--GITHUB_BLOCK-->

```tsx
<Overlay background="base">
<Overlay background="float">
```

<!--/GITHUB_BLOCK-->

## Properties

| Name       | Description                             |        Type        | Default |
| :--------- | :-------------------------------------- | :----------------: | :-----: |
| className  | CSS class name of the root element      |      `string`      |         |
| visible    | Overlay visibility state                |     `boolean`      | `false` |
| background | Overlay background style                | `"base"` `"float"` | `base`  |
| children   | Content (usually, a `Loader` component) | `React.ReactNode`  |         |
