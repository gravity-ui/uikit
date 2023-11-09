# useRestoreFocus

The `useRestoreFocus` hook restore focus

## Properties

| Name            | Description                |       Type        | Default |
| :-------------- | :------------------------- | :---------------: | :-----: |
| enabled         | Enabled flag               |     `boolean`     |         |
| restoreFocusRef | Ref-link for restore focus | `React.RefObject` |         |
| focusTrapped    | Focus trapped flag         |     `boolean`     |         |

## Result

| Name    | Description      |                Type                 |
| :------ | :--------------- | :---------------------------------: |
| onFocus | OnFocus callback | `(event: React.FocusEvent) => void` |
