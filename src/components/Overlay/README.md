<!--GITHUB_BLOCK-->

# Loader

<!--/GITHUB_BLOCK-->

```tsx
import {Overlay} from '@gravity-ui/uikit';
```

The `Overlay` component renders an overlay over the parent element with relative position.
For example, it can be used to preserve the desired layout while loading data.

### PropTypes

| Name      | Type               | Required | Default | Description                         |
| :-------- | :----------------- | :------: | :------ | :---------------------------------- |
| className | `String`           |          |         | CSS class name of the root element  |
| visible   | `Boolean`          |          | `false` | Overlay visibility state            |
| view      | `"base"` `"float"` |          | `base`  | Overlay background style            |
| children  | `React.ReactNode`  |          |         | Content, usually a Loader component |

### Basic usage

```jsx
<div style={{position: 'relative'}}>
  <div>Some content to hide under overlay</div>
  <Overlay visible={loading}>
    <Loader />
  </Overlay>
</div>
```
