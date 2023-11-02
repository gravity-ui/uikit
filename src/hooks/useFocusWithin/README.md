<!--GITHUB_BLOCK-->

# useFocusWithin

<!--/GITHUB_BLOCK-->

```tsx
import {useFocusWithin} from '@gravity-ui/uikit';
```

The `useFocusWithin` hook that handles focus events for the target and its descendants

## Properties

| Name                | Description                                                                   |                Type                | Default |
| :------------------ | :---------------------------------------------------------------------------- | :--------------------------------: | :-----: |
| isDisabled          | Whether the focus within events should be disabled                            |             `boolean`              |         |
| onFocusWithin       | Handler that is called when the target element or a descendant receives focus |  `(e: React.FocusEvent) => void`   |         |
| onBlurWithin        | Handler that is called when the target element and all descendants lose focus |  `(e: React.FocusEvent) => void`   |         |
| onFocusWithinChange | Handler that is called when the the focus within state changes                | `(isFocusWithin: boolean) => void` |         |

## Result

`onFocus` and `onBlur` handlers. `{focusWithinProps: {onFocus, onBlur}}`
