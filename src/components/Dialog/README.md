[readme](#readme)

## Dialog

Dialog component

### PropTypes

| Property              | Type                                                                                           | Required | Default | Description                                                                         |
| :-------------------- | :--------------------------------------------------------------------------------------------- | :------: | :------ | :---------------------------------------------------------------------------------- |
| open                  | `Boolean`                                                                                      |    ✓     |         | Current dialog state                                                                |
| onEscapeKeyDown       | `(event: KeyboardEvent) => void`                                                               |          |         | Escape key down event handler                                                       |
| onEnterKeyDown        | `(event: KeyboardEvent) => void`                                                               |          |         | Enter key down event handler                                                        |
| onOutsideClick        | `(event: MouseEvent) => void`                                                                  |          |         | Event handler on outside dialog mouse click                                         |
| onClose               | `(event: MouseEvent or KeyboardEvent, reason: LayerCloseReason or "closeButtonClick") => void` |    ✓     |         | On dialog close handler                                                             |
| className             | `String`                                                                                       |          |         | ClassName of dialog content wrapper                                                 |
| modalClassName        | `String`                                                                                       |          |         | ClassName of modal box, in which dialog is disposed                                 |
| size                  | `s` `m` `l`                                                                                    |          |         | Dialog size                                                                         |
| disableBodyScrollLock | `Boolean`                                                                                      |          | `False` | Should body scroll be locked                                                        |
| disableEscapeKeyDown  | `Boolean`                                                                                      |          | `False` | Should escape key down be disabled                                                  |
| disableOutsideClick   | `Boolean`                                                                                      |          | `False` | Should outside click be disabled                                                    |
| keepMounted           | `Boolean`                                                                                      |          | `False` | Should dialog be kept mounted                                                       |
| hasCloseButton        | `Boolean`                                                                                      |          | `True`  | Cross icon in top right corner of dialog presence                                   |
| aria-labelledby       | `String`                                                                                       |          |         | Id of <Dialog/> caption. Use `id` props of `<Dialog.Header/>` to set id for caption |
| aria-label            | `String`                                                                                       |          |         | Dialog label for a11y. Prefer `aria-labelledby` if caption is visible to user       |
| qa                    | `String`                                                                                       |          |         | Data-qa attribute value of modal box, in which dialog is disposed                   |

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
