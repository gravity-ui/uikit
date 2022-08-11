## ClipboardButton

A component that puts all together: **CopyToClipboard** and **ClipboardIcon**.<br/>
**CopyToClipboard** component takes given text into the clipboard <br/>and as a wrapper uses **ClipboardIcon** as a content for itself<br/> to display animation when copy-paste happening.

### PropTypes

| Property  | Type       | Required | Default | Description                                                                   |
| :-------- | :--------- | :------: | :------ | :---------------------------------------------------------------------------- |
| text      | `String`   |          |         | Text to copy                                                                  |
| size      | `Number`   |          | 24      | Icon size                                                                     |
| timeout   | `Number`   |          | 1000    | Time before state bounces back to its normal <br/>after the button is clicked |
| className | `String`   |          |         | CSS class name                                                                |
| onCopy    | `Function` |          |         | Callback after copy <br/>`(text: string, result: boolean) => void`            |

### Examples

```js
const clipboardButton = <ClipboardButton text="Some text to copy" />;
```
