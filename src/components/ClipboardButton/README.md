## ClipboardButton

Кнопка для копирования текста в буфер обмена со стандартным значком и анимированной реакцией.

### PropTypes

| Property  | Type     | Required | Default | Description           |
| :-------- | :------- | :------: | :------ | :-------------------- |
| text      | `String` |          |         | Текст для копирования |
| size      | `Number` |          |         | Размер значка         |
| className | `String` |          |         | CSS-класс элемента    |

### Examples

```js
const clipboardButton = <ClipboardButton text="Some text to copy" />;
```
