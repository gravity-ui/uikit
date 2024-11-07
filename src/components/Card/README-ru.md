<!--GITHUB_BLOCK-->

# Card

<!--/GITHUB_BLOCK-->

```tsx
import {Card} from '@gravity-ui/uikit';
```

## Описание

Компонент `Card` — это React-контейнер в виде карточки с возможностью настройки стилей и функций, применяемый для эстетичного и упорядоченного представления различного контента.

## Внешний вид

`Card` можно визуализировать с использованием различных комбинаций стилей:

- `theme` — `normal`, `info`, `success`, `warning`, `danger` или `utility`;
- `type` — `selection`, `action` или `container`;
- `view` — `outlined` или `clear`, или `outlined`, `filled` или `raised` (в зависимости от параметра `type`).

## `Theme` (тема)

Параметр `theme` используется для указания стиля темы карточки. Он определяет цветовую схему карточки и ее внешний вид.

Выбирая разные значения темы, вы можете кастомизировать внешний вид `Card` так, чтобы он соответствовал вашим целям и необходимому стилю.

- `normal` — обычная/стандартная тема карточки;
- `info` — тема для отображения нейтральной информации;
- `success` — тема для отображения положительного или подтверждающего контента;
- `warning` — тема для отображения предупреждений;
- `danger` — тема для отображения контента, связанного с критическими проблемами или ошибками;
- `utility` — тема для отображения полезных советов.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
const style = {
    width: '120px';
    height: '120px';
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
}

<Card style={style} theme="normal" size="l">Normal</Card>
<Card style={style} theme="info" size="l">Info</Card>
<Card style={style} theme="success" size="l">Success</Card>
<Card style={style} theme="warning" size="l">Warning</Card>
<Card style={style} theme="danger" size="l">Danger</Card>
<Card style={style} theme="utility" size="l">Utility</Card>
`}>

    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="normal" size="l">Normal</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="info" size="l">Info</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="success" size="l">Success</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="warning" size="l">Warning</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="danger" size="l">Danger</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} theme="utility" size="l">Utility</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## `Type` (тип)

Этот параметр используется для определения типа `Card`. Он позволяет настраивать внешний вид и поведение карточки.

- `container` — карточка, которая выступает в роли контейнера для других элементов. Она обеспечивает структурированную компоновку контента.
- `action` — карточка с интерактивным элементом — например, кнопкой, которая активирует определенное действие при нажатии.
- `selection` — карточка, которую можно выбрать или нажать, чтобы выполнить определенное действие.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
const style = {
    width: '120px';
    height: '120px';
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
}

    <Card style={style} view="outlined" type="container" size="l">Container</Card>
    <Card style={style} view="outlined" type="action" size="l">action with onClick</Card>
    <Card style={style} view="outlined" type="selection" size="l">Selection</Card>
`}>
    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="container" size="l">Container</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="action" onClick={() => alert(':wave: hey')} size="l">action with onClick</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="selection" size="l">Selection</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## `View` (вид)

Данный параметр используется для указания вида или стиля компоновки `Card`. Он позволяет настраивать внешний вид и расположение содержимого карточки:

- `clear` — без стиля;
- `outlined` — добавляет контурную обводку для выделения содержимого карточки;
- `filled` — добавляет заливку содержимого карточки;
- `raised` — добавляет тень для создания эффекта приподнятого контейнера.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
const style = {
    width: '120px';
    height: '120px';
    display: 'flex';
    alignItems: 'center';
    justifyContent: 'center';
}

    <Card style={style} view="clear" type="container" size="l">Clear</Card>
    <Card style={style} view="outlined" type="container" size="l">Outlined</Card>
    <Card style={style} view="filled" type="container" size="l">Filled</Card>
    <Card style={style} view="raised" type="container" size="l">Raised</Card>
`}>
    <div style={{display: 'grid', gridAutoFlow: 'column', gridGap: '10px'}}>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="clear" type="container" size="l">Clear</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="outlined" type="container" size="l">Outlined</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="filled" type="container" size="l">Filled</UIKit.Card>
        <UIKit.Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px'}} view="raised" type="container" size="l">Raised</UIKit.Card>
    </div>

</ExampleBlock>
LANDING_BLOCK-->

## Свойства

| Имя       | Описание                                                                                     |     Тип     | Значение по умолчанию |
| :-------- | :------------------------------------------------------------------------------------------- | :---------: | :-------------------: |
| children  | Содержимое карточки.                                                                         | `ReactNode` |                       |
| type      | Тип `Card`. Определяет, какие свойства доступны.                                             |  `string`   |     `"container"`     |
| view      | Доступно только для типов `"container"` и `"selection"`.                                     |  `string`   |     `"outlined"`      |
| theme     | Базовый цвет карточки. Свойство доступно только для типа `"container"`.                      |  `string`   |      `"normal"`       |
| size      | Размер `Card`. Определяет, какие свойства доступны.                                          |  `string`   |         `"m"`         |
| className | CSS-класс.                                                                                   |  `string`   |                       |
| onClick   | Обработчик клика по карточке. Свойство доступно только для типов `"selection"` и `"action"`. | `Function`  |                       |
| selected  | Выбранная карточка. Свойство доступно только для типа `"selection"`.                         |  `Boolean`  |                       |
| disabled  | Неактивная карточка. Свойство доступно только для типов `"selection"` и `"action"`.          |  `Boolean`  |                       |
| qa        | HTML-атрибут `data-qa`, используется для тестирования.                                       |  `string`   |                       |

## API CSS

| Имя                         | Описание                 |
| :-------------------------- | :----------------------- |
| `--g-card-background-color` | Цвет фона.               |
| `--g-card-border-width`     | Ширина границы.          |
| `--g-card-border-color`     | Цвет границы.            |
| `--g-card-border-radius`    | Радиус скругления углов. |
| `--g-card-box-shadow`       | Тень.                    |
