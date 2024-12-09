<!--GITHUB_BLOCK-->

# ClipboardButton

<!--/GITHUB_BLOCK-->

```tsx
import {ClipboardButton} from '@gravity-ui/uikit';
```

`ClipboardButton` — компонент, объединяющий [`CopyToClipboard`](../CopyToClipboard/README.md) и [`ClipboardIcon`](../ClipboardIcon/README.md). [`CopyToClipboard`](../CopyToClipboard/README.md) отправляет текст в буфер обмена и использует [`ClipboardIcon`](../ClipboardIcon/README.md) для отображения анимации во время копирования.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<ClipboardButton text="Some text to copy" />
`}
>
    <UIKit.ClipboardButton text="Some text to copy" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<ClipboardButton text="Some text to copy" />
```

<!--/GITHUB_BLOCK-->

## Свойства

`ClipboardButton` наследует свойства от `Button`, за исключением `href`, `component`, `target`, `rel`, `loading` и `children`.

| Имя                | Описание                                                                    |                        Тип                        | Значение по умолчанию |
| :----------------- | :-------------------------------------------------------------------------- | :-----------------------------------------------: | :-------------------: |
| hasTooltip         | Включает или отключает отображение тултипа.                                 |                     `boolean`                     |        `true`         |
| onCopy             | Обратный вызов после копирования:`(text: string, result: boolean) => void`. |                    `Function`                     |                       |
| options            | Параметры копирования в буфер обмена.                                       | [CopyToClipboardOptions](#copytoclipboardoptions) |                       |
| text               | Копируемый текст.                                                           |                     `string`                      |                       |
| timeout            | Время до возврата состояния в норму после клика по кнопке.                  |                     `number`                      |        `1000`         |
| tooltipInitialText | Текст, отображаемый перед копированием.                                     |                     `string`                      |       `"Copy"`        |
| tooltipSuccessText | Текст, отображаемый после копирования.                                      |                     `string`                      |      `"Copied!"`      |

### CopyToClipboardOptions

| Имя     | Описание                                                                                                                                                                         |    Тип    | Значение по умолчанию |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------: | :-------------------: |
| debug   | Включает вывод в консоль.                                                                                                                                                        | `boolean` |        `false`        |
| message | Сообщение-подсказка.                                                                                                                                                             | `string`  |                       |
| format  | Устанавливает MIME-тип для копирования. Используйте `text/html` для копирования в формате HTML и `text/plain`, если при вставке в текстовый редактор не нужно наследовать стили. | `string`  |     `"text/html"`     |
