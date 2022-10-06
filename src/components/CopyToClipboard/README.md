## CopyToClipboard

A wrapper component witch takes given text to be copy-pasted <br/>
and then updates its contents with a render function passed as children props.

The component bounces back to initial state after given timeout <br/>
which might be useful when you want to animate the copy process.

### PropTypes

| Property | Type       | Required | Default | Description                                                                          |
| :------- | :--------- | :------: | :------ | :----------------------------------------------------------------------------------- |
| children | `Function` |    ✓     |         | Copy control render function `(status: CopyToClipboardStatus) => React.ReactElement` |
| text     | `String`   |          |         | Text to copy                                                                         |
| timeout  | `Number`   |          | `1000`  | Time in ms to restore initial state (`CopyToClipboardStatus.Pending`)                |
| onCopy   | `Function` |          |         | Callback after copy `(text: string, result: boolean) => void`                        |

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
