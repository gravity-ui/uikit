# useBoolean

The `useBoolean` hook makes typical handlers for boolean state

## Properties

| Name         | Description   |            Type            | Default |
| :----------- | :------------ | :------------------------: | :-----: |
| initialState | Boolean state | `boolean - (() => boolean` |         |

## Result

```
[
    value, // boolean
    setTrueCallback, // () => void
    setFalseCallback, // () => void
    toggleBooleanStateCallback, // () => void
]
```
