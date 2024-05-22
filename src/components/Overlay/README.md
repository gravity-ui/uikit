<!--GITHUB_BLOCK-->

# Overlay

<!--/GITHUB_BLOCK-->

```tsx
import {Overlay} from '@gravity-ui/uikit';
```

The `Overlay` component renders an overlay over the parent element with relative position,
i.e. parent element must have `position` set to `relative`.
For example, it can be used to preserve the desired layout while loading data.

```jsx
<Box position="relative">
  <div>Some content to hide under overlay</div>
  <Overlay visible={loading}>
    <Loader />
  </Overlay>
</Box>
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

| Name       | Type               | Required | Default | Description                         |
| :--------- | :----------------- | :------: | :------ | :---------------------------------- |
| className  | `String`           |          |         | CSS class name of the root element  |
| visible    | `Boolean`          |          | `false` | Overlay visibility state            |
| background | `"base"` `"float"` |          | `base`  | Overlay background style            |
| children   | `React.ReactNode`  |          |         | Content, usually a Loader component |
