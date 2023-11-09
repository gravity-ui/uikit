# useStateWithCallback

The `useStateWithCallback` hook a wrapper that adds a callback call when the wrapped state changes

## Properties

| Name         | Description          |          Type          | Default |
| :----------- | :------------------- | :--------------------: | :-----: |
| initialState | initial state        |         `any`          |         |
| callback     | callback for wrapper | `(value: any) => void` |         |

## Result

| Name            | Description                                |                     Type                      |
| :-------------- | :----------------------------------------- | :-------------------------------------------: |
| state           | Target state                               |                     `any`                     |
| setWithCallback | State setter with the transmitted callback | `(nextValue: T or ((value: T) => T)) => void` |
