[readme](#readme)

## Dialog

This is a component used for dialogs.

### PropTypes

| Name                  | Type                                                                                           | Required | Default   | Description                                                                                   |
| :-------------------- | :--------------------------------------------------------------------------------------------- | :------: | :-------- | :-------------------------------------------------------------------------------------------- |
| open                  | `Boolean`                                                                                      |    ✓     |           | Current dialog state                                                                          |
| onEscapeKeyDown       | `(event: KeyboardEvent) => void`                                                               |          |           | Escape keydown event handler                                                                  |
| onEnterKeyDown        | `(event: KeyboardEvent) => void`                                                               |          |           | Enter keydown event handler                                                                   |
| onOutsideClick        | `(event: MouseEvent) => void`                                                                  |          |           | Event handler on a mouse click outside the dialog                                             |
| onClose               | `(event: MouseEvent or KeyboardEvent, reason: LayerCloseReason or "closeButtonClick") => void` |    ✓     |           | Event handler on closing the dialog                                                           |
| className             | `String`                                                                                       |          |           | `ClassName` of the dialog content wrapper                                                     |
| modalClassName        | `String`                                                                                       |          |           | ClassName of modal box in which the dialog is embedded                                        |
| size                  | `s` `m` `l`                                                                                    |          |           | Dialog size                                                                                   |
| disableBodyScrollLock | `Boolean`                                                                                      |          | `False`   | Toggles whether the body scroll is locked                                                     |
| disableEscapeKeyDown  | `Boolean`                                                                                      |          | `False`   | Toggles whether the escape keydown is disabled                                                |
| disableOutsideClick   | `Boolean`                                                                                      |          | `False`   | Toggles whether the outside click is disabled                                                 |
| disableFocusTrap      | `Boolean`                                                                                      |          |           | If true, the modal will not prevent focus from leaving it while open                          |
| disableAutoFocus      | `Boolean`                                                                                      |          |           | If true, the modal will not automatically shift focus to itself when it opens                 |
| onTransitionEnter     | `() => void`                                                                                   |          |           | Open dialog animation on start                                                                |
| onTransitionEntered   | `() => void`                                                                                   |          |           | Open dialog animation on finish                                                               |
| onTransitionExit      | `() => void`                                                                                   |          |           | Close dialog animation on start                                                               |
| onTransitionExited    | `() => void`                                                                                   |          |           | Close dialog animation on finish                                                              |
| restoreFocusRef       | `React.RefObject`                                                                              |          |           | Element to receive focus when the dialog is closed                                            |
| keepMounted           | `Boolean`                                                                                      |          | `False`   | Toggles whether the dialog is kept in the mounted state                                       |
| hasCloseButton        | `Boolean`                                                                                      |          | `True`    | Toggles whether there is a cross icon in the top-right corner of the dialog                   |
| aria-labelledby       | `String`                                                                                       |          |           | <Dialog/> caption ID. Use the `id` property of `<Dialog.Header/>` to set the ID for caption   |
| aria-label            | `String`                                                                                       |          |           | Dialog label for a11y. Set `aria-labelledby` if the caption is visible to the user            |
| container             | `HTMLElement`                                                                                  |          |           | Container element for the dialog box                                                          |
| qa                    | `String`                                                                                       |          |           | `Data-qa` attribute value of the modal box in which the dialog is embedded                    |
| contentOverflow       | `visible` `auto`                                                                               |          | `visible` | Determines whether the `Dialog` has a scroll indicator inside or gets larger with the content |

### Examples

```js
const [open, setOpen] = useState(false);
const dialogTitleId = 'app-confirmation-dialog-title';

<Dialog
  onClose={() => setOpen(false)}
  open={open}
  onEnterKeyDown={() => {
    alert('onEnterKeyDown');
  }}
  aria-labelledby={dialogTitleId}
>
  <Dialog.Header caption="Caption" id={dialogTitleId} />
  <Dialog.Body>Dialog.Body</Dialog.Body>
  <Dialog.Footer
    onClickButtonCancel={() => setOpen(false)}
    onClickButtonApply={() => alert('onApply')}
    textButtonApply="Apply"
    textButtonCancel="Cancel"
  />
</Dialog>;
```
