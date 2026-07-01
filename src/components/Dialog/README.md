<!--GITHUB_BLOCK-->

# Dialog

<!--/GITHUB_BLOCK-->

```tsx
import {Dialog} from '@gravity-ui/uikit';
```

This is a component used for dialogs.

## Usage

```tsx
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

## Properties

| Name                  | Description                                                                                   | Type                                                                                             | Default     |
| :-------------------- | :-------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- | :---------- |
| open                  | Current dialog state                                                                          | `boolean`                                                                                        |             |
| onEscapeKeyDown       | Escape keydown event handler                                                                  | `(event: KeyboardEvent) => void`                                                                 |             |
| onEnterKeyDown        | Enter keydown event handler                                                                   | `(event: KeyboardEvent) => void`                                                                 |             |
| onOutsideClick        | Event handler on a mouse click outside the dialog                                             | `(event: MouseEvent) => void`                                                                    |             |
| onClose               | Event handler on closing the dialog                                                           | `(event: MouseEvent or KeyboardEvent,` `reason: ModalCloseReason or "closeButtonClick") => void` |             |
| className             | `className` of the dialog content wrapper                                                     | `string`                                                                                         |             |
| modalClassName        | `className` of modal box in which the dialog is embedded                                      | `string`                                                                                         |             |
| maxWidth              | Dialog content max width                                                                      | `'s'` `'m'` `'l'`                                                                                |             |
| fullWidth             | If `true` content stretches to `maxWidth`                                                     | `boolean`                                                                                        |             |
| disableBodyScrollLock | Toggles whether the body scroll is locked                                                     | `boolean`                                                                                        | `false`     |
| disableEscapeKeyDown  | Toggles whether the escape keydown is disabled                                                | `boolean`                                                                                        | `false`     |
| disableOutsideClick   | Toggles whether the outside click is disabled                                                 | `boolean`                                                                                        | `false`     |
| keepMounted           | Toggles whether the dialog is kept in the mounted state                                       | `boolean`                                                                                        | `false`     |
| hasCloseButton        | Toggles whether there is a cross icon in the top-right corner of the dialog                   | `boolean`                                                                                        | `true`      |
| aria-labelledby       | `<Dialog/>` caption ID. Use the `id` property of `<Dialog.Header/>` to set the ID for caption | `string`                                                                                         |             |
| aria-label            | Dialog label for a11y. Set `aria-labelledby` if the caption is visible to the user            | `string`                                                                                         |             |
| container             | Container element for the dialog box                                                          | `HTMLElement`                                                                                    |             |
| qa                    | `data-qa` attribute value of the modal box in which the dialog is embedded                    | `string`                                                                                         |             |
| contentOverflow       | Determines whether the `Dialog` has a scroll indicator inside or gets larger with the content | `'visible'` `'auto'`                                                                             | `'visible'` |
