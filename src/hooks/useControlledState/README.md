<!--GITHUB_BLOCK-->

# useControlledState

<!--/GITHUB_BLOCK-->

```tsx
import {useControlledState} from '@gravity-ui/uikit';
```

The `useControlledState` hook that simplify work with controlled/uncontrolled state.

## Properties

| Name         | Description                               |       Type        | Default |
| :----------- | :---------------------------------------- | :---------------: | :-----: |
| value        | if `undefined` then value is uncontrolled | `T  \| undefined` |         |
| defaultValue | Initial value if value is uncontrolled    | `T  \| undefined` |         |
| onUpdate     | Callback on value change                  | `(v: T) => void`  |         |

## Result

`useControlledState` returns an array with exactly two values:

1. The current state.
2. The set function that lets you update the state to a different value.
