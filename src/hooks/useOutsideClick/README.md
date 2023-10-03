<!--GITHUB_BLOCK-->

# useOutsideClick

<!--/GITHUB_BLOCK-->

```tsx
import {useOutsideClick} from '@gravity-ui/uikit';
```

The `useOutsideClick` hook helps to track the click outside of the tracked element.

## Properties

| Name    | Description                                                       |       Type        | Default |
| :------ | :---------------------------------------------------------------- | :---------------: | :-----: |
| ref     | Ref-link to target of observation                                 | `React.RefObject` |         |
| handler | Callback when a click is triggered outside the observation target |   `() => void`    |         |
