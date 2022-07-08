## CopyToClipboard

Low-level component to copy text to clipboard.

### PropTypes

| Property | Type       | Required | Default | Description                                                                                       |
| :------- | :--------- | :------: | :------ | :------------------------------------------------------------------------------------------------ |
| children | `Function` |    ✓     |         | Copy control render function `(status: CopyToClipboardStatus) => React.ReactElement`              |
| text     | `String`   |          |         | Text to copy                                                                                      |
| timeout  | `Number`   |          | `500`   | Time in ms to restore initial state (`CopyToClipboardStatus.Pending`)                             |
| onCopy   | `Function` |          |         | Callback after copy `(text: string, result: boolean) => void`                                     |

### Examples

```js
const buttonText = {
  pending: 'Click Me',
  success: 'Copied!',
  error: "Couldn't copy...",
};

const clipboardButton = (
  <CopyToClipboard text="Some text to copy">
    {(state) => <button>{buttonText[state]}</button>}
  </CopyToClipboard>
);
```
