[readme](#readme)

## Dialog

Dialog component

### PropTypes

| Property              | Type                             |                Required                 | Default                      | Description                                                       |
| :-------------------- | :------------------------------- | :-------------------------------------: | :--------------------------- | :---------------------------------------------------------------- | --- | ----------------------- |
| open                  | `Boolean`                        |                    ✓                    |                              | Current dialog state                                              |
| onEscapeKeyDown       | `(event: KeyboardEvent) => void` |                                         |                              | Escape key down event handler                                     |
| onEnterKeyDown        | `(event: KeyboardEvent) => void` |                                         |                              | Enter key down event handler                                      |
| onOutsideClick        | `(event: MouseEvent) => void`    |                                         |                              | Event handler on outside dialog mouse click                       |
| onClose               | `(event: MouseEvent              | KeyboardEvent, reason: LayerCloseReason | "closeButtonClick") => void` | ✓                                                                 |     | On dialog close handler |
| className             | `String`                         |                                         |                              | ClassName of dialog content wrapper                               |
| modalClassName        | `String`                         |                                         |                              | ClassName of modal box, in which dialog is disposed               |
| size                  | `s` `m` `l`                      |                                         |                              | Dialog size                                                       |
| disableBodyScrollLock | `Boolean`                        |                                         | `False`                      | Should body scroll be locked                                      |
| disableEscapeKeyDown  | `Boolean`                        |                                         | `False`                      | Should escape key down be disabled                                |
| disableOutsideClick   | `Boolean`                        |                                         | `False`                      | Should outside click be disabled                                  |
| keepMounted           | `Boolean`                        |                                         | `False`                      | Should dialog be kept mounted                                     |
| hasCloseButton        | `Boolean`                        |                                         | `True`                       | Cross icon in top right corner of dialog presence                 |
| qa                    | `String`                         |                                         |                              | Data-qa attribute value of modal box, in which dialog is disposed |

### Examples

```js
const [open, setOpen] = useState(false);

<Dialog
  onClose={() => setOpen(false)}
  open={open}
  onEnterKeyDown={() => {
    alert('onEnterKeyDown');
  }}
>
  <Dialog.Header caption="Caption" />
  <Dialog.Body>Dialog.Body</Dialog.Body>
  <Dialog.Footer
    onClickButtonCancel={() => setOpen(false)}
    onClickButtonApply={() => alert('onApply')}
    textButtonApply="Apply"
    textButtonCancel="Cancel"
  />
</Dialog>;
```
