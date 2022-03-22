## CopyToClipboard

Компонент для копирования текста в буфер обмена

### PropTypes

| Property | Type       | Required | Default | Description                                                                                       |
| :------- | :--------- | :------: | :------ | :------------------------------------------------------------------------------------------------ |
| children | `Function` |    ✓     |         | Рендерер кнопки копирования. `(status: CopyToClipboardStatus) => React.ReactElement`              |
| text     | `String`   |          |         | Текст для копирования                                                                             |
| timeout  | `Number`   |          | `500`   | Время в мс после которого, состояние будет сброшено в начальное (`CopyToClipboardStatus.Pending`) |
| onCopy   | `Function` |          |         | Колбек, который вызывается при копировании. `(text: string, result: boolean) => void`             |

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
