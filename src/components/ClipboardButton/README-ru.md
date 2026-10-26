<!--GITHUB_BLOCK-->

# ClipboardButton

<!--/GITHUB_BLOCK-->

```tsx
import {ClipboardButton} from '@gravity-ui/uikit';
```

`ClipboardButton` — компонент, объединяющий [`CopyToClipboard`](../CopyToClipboard/README.md) и [`ClipboardIcon`](../ClipboardIcon/README.md). [`CopyToClipboard`](../CopyToClipboard/README.md) отправляет текст в буфер обмена и использует [`ClipboardIcon`](../ClipboardIcon/README.md) для отображения анимации во время копирования.

<!--SANDBOX
import {ClipboardButton} from '@gravity-ui/uikit';

export default function () {
    return <ClipboardButton text="Some text to copy" />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<ClipboardButton text="Some text to copy" />
```

<!--/GITHUB_BLOCK-->

## Тултип

Используйте `tooltipProps` для настройки вложенного [`ActionTooltip`](../ActionTooltip/README-ru.md),
например его положения или отрисовки через портал:

```tsx
<ClipboardButton
  text="Текст для копирования"
  tooltipProps={{placement: 'top', disablePortal: true}}
/>
```

Поддерживаются свойства `onOpenChange`, `strategy`, `placement`, `offset`, `disabled`,
`container`, `disablePortal`, а также свойства `DOMProps` (`className`, `style`) и `QAProps` (`qa`).

Установите `tooltipProps.disabled` в `true`, чтобы отключить тултип. `hasTooltip={false}` и таймаут
обратной связи при копировании также отключают его, даже если `tooltipProps.disabled` равно `false`.
Для настройки обратной связи при копировании используйте `tooltipInitialText`, `tooltipSuccessText`
и `timeout`.

## Свойства

`ClipboardButton` наследует [свойства](../Button/README-ru.md#свойства) от `Button`.

| Имя                | Описание                                                                    |               Тип               | Значение по умолчанию |
| :----------------- | :-------------------------------------------------------------------------- | :-----------------------------: | :-------------------: |
| hasTooltip         | Включает или отключает отображение тултипа.                                 |            `boolean`            |        `true`         |
| onCopy             | Обратный вызов после копирования:`(text: string, result: boolean) => void`. |           `Function`            |                       |
| text               | Копируемый текст (может быть строкой или функцией, возвращающей строку).    |    `string \| () => string`     |                       |
| timeout            | Время до возврата состояния в норму после клика по кнопке.                  |            `number`             |        `1000`         |
| tooltipInitialText | Текст, отображаемый перед копированием.                                     |            `string`             |       `"Copy"`        |
| tooltipSuccessText | Текст, отображаемый после копирования.                                      |            `string`             |      `"Copied!"`      |
| tooltipProps       | Настройки тултипа. См. [поддерживаемые свойства](#тултип).                  |            `object`             |                       |
| icon               | Пользовательская иконка.                                                    |        `React.ReactNode`        |                       |
| iconPosition       | Расположение иконки.                                                        | `start          \|         end` |        `start`        |
