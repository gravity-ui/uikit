# useCloseOnTimeout

The `useCloseOnTimeout` hook invokes callback after given amount of time unless mouse is on the element

## Properties

| Name    | Description       |      Type      | Default |
| :------ | :---------------- | :------------: | :-----: |
| onClose | On close callback | `VoidFunction` |         |
| timeout | Timeout           |    `number`    |         |

## Result

| Name         | Description          |           Type            |
| :----------- | :------------------- | :-----------------------: |
| onMouseOver  | OnMouseOver handler  | `React.MouseEventHandler` |
| onMouseLeave | OnMouseLeave handler | `React.MouseEventHandler` |
