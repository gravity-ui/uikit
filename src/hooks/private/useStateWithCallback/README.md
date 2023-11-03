# useStateWithCallback

The `useStateWithCallback` hook a wrapper that adds a callback call when the wrapped state changes

## Properties

| Name         | Description          |          Type          | Default |
| :----------- | :------------------- | :--------------------: | :-----: |
| initialState | initial state        |         `any`          |         |
| callback     | callback for wrapper | `(value: any) => void` |         |

## Result

- state, `any`
- setWithCallback, `(nextValue: T | ((value: T) => T)) => void`
