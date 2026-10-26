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

<!--SANDBOX
import {Card} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const cardStyle: CSSProperties = {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const gridStyle: CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '10px',
};

export default function () {
    return (
        <div style={gridStyle}>
            <Card style={cardStyle} theme="normal" size="l">
                Normal
            </Card>
            <Card style={cardStyle} theme="info" size="l">
                Info
            </Card>
            <Card style={cardStyle} theme="success" size="l">
                Success
            </Card>
            <Card style={cardStyle} theme="warning" size="l">
                Warning
            </Card>
            <Card style={cardStyle} theme="danger" size="l">
                Danger
            </Card>
            <Card style={cardStyle} theme="utility" size="l">
                Utility
            </Card>
        </div>
    );
}
SANDBOX-->

## `Type` (тип)

Этот параметр используется для определения типа `Card`. Он позволяет настраивать внешний вид и поведение карточки.

- `container` — карточка, которая выступает в роли контейнера для других элементов. Она обеспечивает структурированную компоновку контента.
- `action` — карточка с интерактивным элементом — например, кнопкой, которая активирует определенное действие при нажатии.
- `selection` — карточка, которую можно выбрать или нажать, чтобы выполнить определенное действие.

<!--SANDBOX
import {Card} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const cardStyle: CSSProperties = {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const gridStyle: CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '10px',
};

export default function () {
    return (
        <div style={gridStyle}>
            <Card style={cardStyle} view="outlined" type="container" size="l">
                Container
            </Card>
            <Card
                style={cardStyle}
                view="outlined"
                type="action"
                onClick={() => alert(':wave: hey')}
                size="l"
            >
                action with onClick
            </Card>
            <Card style={cardStyle} view="outlined" type="selection" size="l">
                Selection
            </Card>
        </div>
    );
}
SANDBOX-->

## `View` (вид)

Данный параметр используется для указания вида или стиля компоновки `Card`. Он позволяет настраивать внешний вид и расположение содержимого карточки:

- `clear` — без стиля;
- `outlined` — добавляет контурную обводку для выделения содержимого карточки;
- `filled` — добавляет заливку содержимого карточки;
- `raised` — добавляет тень для создания эффекта приподнятого контейнера.

<!--SANDBOX
import {Card} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const cardStyle: CSSProperties = {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const gridStyle: CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '10px',
};

export default function () {
    return (
        <div style={gridStyle}>
            <Card style={cardStyle} view="clear" type="container" size="l">
                Clear
            </Card>
            <Card style={cardStyle} view="outlined" type="container" size="l">
                Outlined
            </Card>
            <Card style={cardStyle} view="filled" type="container" size="l">
                Filled
            </Card>
            <Card style={cardStyle} view="raised" type="container" size="l">
                Raised
            </Card>
        </div>
    );
}
SANDBOX-->

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
