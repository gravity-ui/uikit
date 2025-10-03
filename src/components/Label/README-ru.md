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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label theme="normal">Normal</Label>
<Label theme="info">Info</Label>
<Label theme="success">Success</Label>
<Label theme="warning">Warning</Label>
<Label theme="danger">Danger</Label>
<Label theme="utility">Utility</Label>
<Label theme="unknown">Unknown</Label>
<Label theme="clear">Clear</Label>
`}
>
    <UIKit.Label theme="normal">Normal</UIKit.Label>
    <UIKit.Label theme="info">Info</UIKit.Label>
    <UIKit.Label theme="success">Success</UIKit.Label>
    <UIKit.Label theme="warning">Warning</UIKit.Label>
    <UIKit.Label theme="danger">Danger</UIKit.Label>
    <UIKit.Label theme="utility">Utility</UIKit.Label>
    <UIKit.Label theme="unknown">Unknown</UIKit.Label>
    <UIKit.Label theme="clear">Clear</UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label type="default" onClick={() => alert('On click label')} size="s">Clickable</Label>
<Label type="close" onCloseClick={() => alert('On click close')} size="s">Closable</Label>
<Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">Copy</Label>
<Label type="info" size="s">Info</Label>
`}
>
    <UIKit.Label type="default" onClick={() => alert('On click label')} size="s">Clickable</UIKit.Label>
    <UIKit.Label type="close" onCloseClick={() => alert('On click close')} size="s">Closable</UIKit.Label>
    <UIKit.Label type="copy" copyText="Copy" onCopy={() => alert('On copy')} size="s">Copy</UIKit.Label>
    <UIKit.Label type="info" size="s">Info</UIKit.Label>
</ExampleBlock>
LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label icon={<Icon size={16} data={GearIcon} />}>Icon</Label>
<Label type="close" icon={<Icon size={16} data={GearIcon} />}>Icon and close</Label>
<Label type="copy" icon={<Icon size={16} data={GearIcon} />}>Icon and copy</Label>
`}
>
    <UIKit.Label icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Icon</span>
    </UIKit.Label>
    <UIKit.Label type="close" icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Icon and close</span>
    </UIKit.Label>
    <UIKit.Label type="copy" icon={
        <UIKit.Icon data={() => (
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" class="g-icon" fill="currentColor" stroke="none" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.199 2H8.8a.2.2 0 0 1 .2.2c0 1.808 1.958 2.939 3.524 2.034a.199.199 0 0 1 .271.073l.802 1.388a.199.199 0 0 1-.073.272c-1.566.904-1.566 3.164 0 4.069a.199.199 0 0 1 .073.271l-.802 1.388a.199.199 0 0 1-.271.073C10.958 10.863 9 11.993 9 13.8a.2.2 0 0 1-.199.2H7.2a.199.199 0 0 1-.2-.2c0-1.808-1.958-2.938-3.524-2.034a.199.199 0 0 1-.272-.073l-.8-1.388a.199.199 0 0 1 .072-.271c1.566-.905 1.566-3.165 0-4.07a.199.199 0 0 1-.073-.271l.801-1.388a.199.199 0 0 1 .272-.073C5.042 5.138 7 4.007 7 2.2c0-.11.089-.199.199-.199ZM5.5 2.2c0-.94.76-1.7 1.699-1.7H8.8c.94 0 1.7.76 1.7 1.7a.85.85 0 0 0 1.274.735 1.699 1.699 0 0 1 2.32.622l.802 1.388c.469.813.19 1.851-.622 2.32a.85.85 0 0 0 0 1.472 1.7 1.7 0 0 1 .622 2.32l-.802 1.388a1.699 1.699 0 0 1-2.32.622.85.85 0 0 0-1.274.735c0 .939-.76 1.7-1.699 1.7H7.2a1.7 1.7 0 0 1-1.699-1.7.85.85 0 0 0-1.274-.735 1.698 1.698 0 0 1-2.32-.622l-.802-1.388a1.699 1.699 0 0 1 .622-2.32.85.85 0 0 0 0-1.471 1.699 1.699 0 0 1-.622-2.321l.801-1.388a1.699 1.699 0 0 1 2.32-.622A.85.85 0 0 0 5.5 2.2Zm4 5.8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd"></path></svg></svg>
        )} size={16} />
    }>
        <span>Icon and copy</span>
    </UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label icon={<Icon size={16} data={GearIcon} />}>Icon</Label>
<Label type="close" icon={<Icon size={16} data={GearIcon} />}>Icon and close</Label>
<Label type="copy" icon={<Icon size={16} data={GearIcon} />}>Icon and copy</Label>
```

<!--/GITHUB_BLOCK-->

## Значение

`Label` можно применять для отображения информации в формате `ключ-значение`. Для этого необходимо передать ключ в свойство `children`, а значение — в свойство `value`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label theme="normal" value="Value">Key</Label>
<Label theme="info" value="Value">Key</Label>
<Label theme="success" value="Value">Key</Label>
<Label theme="warning" value="Value">Key</Label>
<Label theme="danger" value="Value">Key</Label>
<Label theme="utility" value="Value">Key</Label>
<Label theme="unknown" value="Value">Key</Label>
<Label theme="clear" value="Value">Key</Label>
`}
>
    <UIKit.Label theme="normal" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="info" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="success" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="warning" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="danger" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="utility" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="unknown" value="Value">Key</UIKit.Label>
    <UIKit.Label theme="clear" value="Value">Key</UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label>Default</Label>
<Label disabled>Disabled</Label>
<Label interactive>Interactive</Label>
<Label loading>Loading</Label>
`}
>
    <UIKit.Label>Default</UIKit.Label>
    <UIKit.Label disabled>Disabled</UIKit.Label>
    <UIKit.Label interactive>Interactive</UIKit.Label>
    <UIKit.Label loading>Loading</UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Label>Default</Label>
<Label disabled>Disabled</Label>
<Label interactive>Interactive</Label>
<Label loading>Loading</Label>
```

<!--/GITHUB_BLOCK-->

## Размер

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Label size="xs">XS size</Label>
<Label size="s">S size</Label>
<Label size="m">M size</Label>
`}
>
    <UIKit.Label size="xs">XS size</UIKit.Label>
    <UIKit.Label size="s">S size</UIKit.Label>
    <UIKit.Label size="m">M size</UIKit.Label>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
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
| size             | Размер лейбла.                                         |           `"xs"` `"s"` `"m"`            |        `"xs"`         |
| theme            | Тема лейбла.                                           |                `string`                 |      `"normal"`       |
| title            | HTML-атрибут `title`.                                  |                `string`                 |                       |
| type             | Тип лейбла.                                            | `"default"` `"copy"` `"close"` `"info"` |      `"default"`      |
| value            | Значение лейбла (в виде `"children : value"`).         |            `React.ReactNode`            |                       |
| width            | Задает ширину лейбла.                                  |                `"auto"`                 |                       |
