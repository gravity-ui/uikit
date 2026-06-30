<!--GITHUB_BLOCK-->

# Label

<!--/GITHUB_BLOCK-->

```tsx
import {Label} from '@gravity-ui/uikit';
```

`Label` (лейбл) можно использовать для выделения определенной информации. `Label` с кнопкой `Close` или `Copy` может быть полезен для выполнения различных простых действий.

Лейблы больше всего подходят для отображения однострочной текстовой информации с различными цветовыми кодами, показывающими ее важность.

## Внешний вид

`Label` можно отображать в различных стилях.

### `Theme` (тема)

Свойство `theme` позволяет применять различные темы в зависимости от статуса. Возможные значения: `normal`, `info`, `success`, `warning`, `danger`, `utility`, `unknown` и `clear`.
Тема по умолчанию — `normal`.

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label theme="normal">Normal</Label>
            <Label theme="info">Info</Label>
            <Label theme="success">Success</Label>
            <Label theme="warning">Warning</Label>
            <Label theme="danger">Danger</Label>
            <Label theme="utility">Utility</Label>
            <Label theme="unknown">Unknown</Label>
            <Label theme="clear">Clear</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label theme="normal">Normal</Label>
<Label theme="info">Info</Label>
<Label theme="success">Success</Label>
<Label theme="warning">Warning</Label>
<Label theme="danger">Danger</Label>
<Label theme="utility">Utility</Label>
<Label theme="unknown">Unknown</Label>
<Label theme="clear">Clear</Label>
```

<!--/GITHUB_BLOCK-->

### `Type` (тип)

Свойство `type` добавляет различные опции к `Label`:

`copy` — добавляет кнопку копирования, при нажатии на которую копируется значение, указанное в свойстве `copyText`;

`close` — добавляет кнопку закрытия для управления списком лейблов;

`info` — добавляет иконку информации к лейблу.

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label type="default" onClick={() => alert('On click label')} size="s">
                Clickable
            </Label>
            <Label type="close" onCloseClick={() => alert('On click close')} size="s">
                Closable
            </Label>
            <Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">
                Copy
            </Label>
            <Label type="info" size="s">Info</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label type="default" onClick={() => alert('On click label')} size="s">Clickable</Label>
<Label type="close" onCloseClick={() => alert('On click close')} size="s">Closable</Label>
<Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">Copy</Label>
<Label type="info" size="s">Info</Label>
```

<!--/GITHUB_BLOCK-->

### Иконка

Иконку можно добавить с помощью свойства `icon`. Для этого используйте компонент [`Icon`](../Icon), который представляет собой обертку для SVG-файлов.

<!--SANDBOX
import {Icon, Label} from '@gravity-ui/uikit';
import {Gear} from '@gravity-ui/icons';

export default function () {
    return (
        <>
            <Label icon={<Icon size={16} data={Gear} />}>Icon</Label>
            <Label type="close" icon={<Icon size={16} data={Gear} />}>Icon and close</Label>
            <Label type="copy" icon={<Icon size={16} data={Gear} />}>Icon and copy</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label icon={<Icon size={16} data={GearIcon} />}>Icon</Label>
<Label type="close" icon={<Icon size={16} data={GearIcon} />}>Icon and close</Label>
<Label type="copy" icon={<Icon size={16} data={GearIcon} />}>Icon and copy</Label>
```

<!--/GITHUB_BLOCK-->

## Значение

`Label` можно применять для отображения информации в формате `ключ-значение`. Для этого необходимо передать ключ в свойство `children`, а значение — в свойство `value`.

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label theme="normal" value="Value">Key</Label>
            <Label theme="info" value="Value">Key</Label>
            <Label theme="success" value="Value">Key</Label>
            <Label theme="warning" value="Value">Key</Label>
            <Label theme="danger" value="Value">Key</Label>
            <Label theme="utility" value="Value">Key</Label>
            <Label theme="unknown" value="Value">Key</Label>
            <Label theme="clear" value="Value">Key</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label theme="normal" value="Value">Key</Label>
<Label theme="info" value="Value">Key</Label>
<Label theme="success" value="Value">Key</Label>
<Label theme="warning" value="Value">Key</Label>
<Label theme="danger" value="Value">Key</Label>
<Label theme="utility" value="Value">Key</Label>
<Label theme="unknown" value="Value">Key</Label>
<Label theme="clear" value="Value">Key</Label>
```

<!--/GITHUB_BLOCK-->

## Состояние

`Label` может иметь разные состояния:

- `disabled` — взаимодействие с лейблом запрещено.
- `interactive` — лейбл становится интерактивным по ховеру.
- `loading` — отображает состояние загрузки.

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label>Default</Label>
            <Label disabled>Disabled</Label>
            <Label interactive>Interactive</Label>
            <Label loading>Loading</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label>Default</Label>
<Label disabled>Disabled</Label>
<Label interactive>Interactive</Label>
<Label loading>Loading</Label>
```

<!--/GITHUB_BLOCK-->

## Размер

<!--SANDBOX
import {Label} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Label size="xxs">XXS size</Label>
            <Label size="xs">XS size</Label>
            <Label size="s">S size</Label>
            <Label size="m">M size</Label>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Label size="xxs">XXS size</Label>
<Label size="xs">XS size</Label>
<Label size="s">S size</Label>
<Label size="m">M size</Label>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя              | Описание                                               |                   Тип                   | Значение по умолчанию |
| :--------------- | :----------------------------------------------------- | :-------------------------------------: | :-------------------: |
| children         | Содержимое.                                            |            `React.ReactNode`            |                       |
| className        | HTML-атрибут `class`.                                  |                `string`                 |                       |
| closeButtonLabel | `aria-label` кнопки закрытия.                          |                `string`                 |                       |
| copyButtonLabel  | `aria-label` кнопки копирования.                       |                `string`                 |                       |
| copyText         | Копируемый текст.                                      |                `string`                 |                       |
| disabled         | Отключенное состояние.                                 |                `boolean`                |                       |
| icon             | Иконка лейбла (слева).                                 |            `React.ReactNode`            |                       |
| interactive      | Включение эффекта ховера.                              |                `boolean`                |                       |
| loading          | Состояние загрузки.                                    |                `boolean`                |        `false`        |
| onClick          | Обработчик события `click`.                            |               `Function`                |                       |
| onCloseClick     | Обработчик события `click` по кнопке закрытия.         |               `Function`                |                       |
| onCopy           | Обработчик события `copy`.                             |               `Function`                |                       |
| qa               | HTML-атрибут `data-qa`, используется для тестирования. |                `string`                 |                       |
| size             | Размер лейбла.                                         |       `"xxs"` `"xs"` `"s"` `"m"`        |        `"xs"`         |
| theme            | Тема лейбла.                                           |                `string`                 |      `"normal"`       |
| title            | HTML-атрибут `title`.                                  |                `string`                 |                       |
| type             | Тип лейбла.                                            | `"default"` `"copy"` `"close"` `"info"` |      `"default"`      |
| value            | Значение лейбла (в виде `"children : value"`).         |            `React.ReactNode`            |                       |
| width            | Задает ширину лейбла.                                  |                `"auto"`                 |                       |
