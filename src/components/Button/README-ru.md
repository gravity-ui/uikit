<!--GITHUB_BLOCK-->

# Button

<!--/GITHUB_BLOCK-->

```tsx
import {Button} from '@gravity-ui/uikit';
```

Компонент `Button` используется как триггер для выполнения определенного действия. Основное назначение кнопки – запуск действия. В редких случаях кнопка используется вместо ссылок для перехода на другую страницу.

## Внешний вид

По внешнему виду компонент `Button` делится на 4 типа: базовая кнопка, контурная кнопка, плоская кнопка и контрастная кнопка.
Внешний вид кнопки определяется свойством `view`.

### Базовая кнопка

`action` — наиболее заметный тип кнопки. Используется для выполнения основного действия на экране, требующего максимального внимания.
Рекомендуется использовать не более одной такой кнопки на странице.

`normal` — тип кнопки по умолчанию. Используется для вторичных действий или когда нужно сохранить важность действия, но не слишком привлекать к нему внимание.

`raised` — кнопка, располагающаяся поверх контента в виде плавающего элемента; обычно имеет фиксированное положение.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit'

export default function () {
    return (
        <>
            <Button view="action" size="l">Action</Button>
            <Button view="normal" size="l">Normal</Button>
            <Button view="raised" size="l">Raised</Button>
        </>
    )
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="action" size="l">Action</Button>
<Button view="normal" size="l">Normal</Button>
<Button view="raised" size="l">Raised</Button>
```

<!--/GITHUB_BLOCK-->

### Контурная кнопка (`outlined`)

`outlined` — используется для вторичных действий, требующих меньшего внимания. Может использоваться как с основной кнопкой, так и без нее; при этом, если есть основная кнопка, она должна быть акцентирована.

`outlined-action`: Обычно используется как ссылка на другую страницу или внешний ресурс.

Этот тип кнопки также имеет дополнительные семантические варианты: `outlined-info`, `outlined-success`, `outlined-warning` и `outlined-danger`.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button view="outlined" size="l">Outlined</Button>
            <Button view="outlined-action" size="l">Outlined Action</Button>
            <Button view="outlined-info" size="l">Outlined Info</Button>
            <Button view="outlined-success" size="l">Outlined Success</Button>
            <Button view="outlined-warning" size="l">Outlined Warning</Button>
            <Button view="outlined-danger" size="l">Outlined Danger</Button>
            <Button view="outlined-utility" size="l">Outlined Utility</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="outlined" size="l">Outlined</Button>
<Button view="outlined-action" size="l">Outlined Action</Button>
<Button view="outlined-info" size="l">Outlined Info</Button>
<Button view="outlined-success" size="l">Outlined Success</Button>
<Button view="outlined-warning" size="l">Outlined Warning</Button>
<Button view="outlined-danger" size="l">Outlined Danger</Button>
<Button view="outlined-utility" size="l">Outlined Utility</Button>
```

<!--/GITHUB_BLOCK-->

### Плоская кнопка (`flat`)

`flat` — используется для вспомогательных действий, требующих наименьшего внимания. Такие элементы часто встречаются в списках кнопок или иконок действий (без текста) в редакторах.

`flat-secondary` — менее акцентированная версия кнопки `flat`. Часто используется в качестве вспомогательной кнопки в диалогах и модальных окнах.

`flat-action` — обычно используется как ссылка на другую страницу или внешний ресурс.

Также имеет дополнительные семантические варианты: `outlined-info`, `outlined-success`, `outlined-warning` и `outlined-danger`.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button view="flat" size="l">Flat</Button>
            <Button view="flat-action" size="l">Flat Action</Button>
            <Button view="flat-info" size="l">Flat Info</Button>
            <Button view="flat-success" size="l">Flat Success</Button>
            <Button view="flat-warning" size="l">Flat Warning</Button>
            <Button view="flat-danger" size="l">Flat Danger</Button>
            <Button view="flat-utility" size="l">Flat Utility</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="flat" size="l">Flat</Button>
<Button view="flat-secondary" size="l">Flat Secondary</Button>
<Button view="flat-action" size="l">Flat Action</Button>
<Button view="flat-info" size="l">Flat Info</Button>
<Button view="flat-success" size="l">Flat Success</Button>
<Button view="flat-warning" size="l">Flat Warning</Button>
<Button view="flat-danger" size="l">Flat Danger</Button>
<Button view="flat-utility" size="l">Flat Utility</Button>
```

<!--/GITHUB_BLOCK-->

### Контрастная кнопка (`contrast`)

Кнопки `normal-contrast`, `outline-contrast` и `flat-contrast` выделяют действия на фоне сложного фона, например, на баннере или фоне с инверсией.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit'
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    display: 'flex',
    gap: 16,
    backgroundColor: 'rgb(68, 38, 204)',
    padding: '20px',
    borderRadius: '8px'
}

export default function () {
    return (
        <div style={containerStyle}>
            <Button view="normal-contrast" size="l">Normal Contrast</Button>
            <Button view="outlined-contrast" size="l">Outlined Contrast</Button>
            <Button view="flat-contrast" size="l">Flat Contrast</Button>
        </div>
    )
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="normal-contrast" size="l">Normal Contrast</Button>
<Button view="outlined-contrast" size="l">Outlined Contrast</Button>
<Button view="flat-contrast" size="l">Flat Contrast</Button>
```

<!--/GITHUB_BLOCK-->

## Иконки

Чтобы добавить иконку в `Button`, используйте компонент [`Icon`](../Icon), который представляет собой обертку для SVG-файлов.

<!--SANDBOX
import {Gear} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button view="outlined" size="l">
                <Icon data={Gear} size={18} />
                Start
            </Button>
            <Button view="outlined" size="l">
                End
                <Icon data={Gear} size={18} />
            </Button>
            <Button view="outlined" size="l">
                <Icon data={Gear} size={18} />
                Both
                <Icon data={Gear} size={18} />
            </Button>
            <Button view="outlined" size="l">
                <Icon data={Gear} size={18} />
            </Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Start
</Button>
<Button view="outlined" size="l">
    End
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Both
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    No text:
    <Icon data={Gear} size={18} />
</Button>
```

<!--/GITHUB_BLOCK-->

## Состояния

`Button` может иметь разные состояния:

`disabled` — когда взаимодействие с кнопкой по каким-либо причинам недоступно.

`loading` — когда в фоновом режиме выполняются асинхронные процессы.

`selected` — когда пользователь может включить (**Enable**) или отключить (**Disable**) кнопку.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button size="l" disabled>Disabled</Button>
            <Button size="l" loading>Loading</Button>
            <Button size="l" selected>Selected</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button size="l" disabled>Disabled</Button>
<Button size="l" loading>Loading</Button>
<Button size="l" selected>Selected</Button>
```

<!--/GITHUB_BLOCK-->

### Переключатель меню

`Button` автоматически меняет свой внешний вид при передаче специальных aria-атрибутов (`aria-haspopup`, `aria-expanded`):

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return <Button aria-haspopup="menu" aria-expanded="true">Menu</Button>;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button aria-haspopup="menu" aria-expanded="true">
  Menu
</Button>
```

<!--/GITHUB_BLOCK-->

## Размер

Размер `Button` можно настроить с помощью свойства `size`. Размер по умолчанию — `m`.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Button size="xs">XS Size</Button>
            <Button size="s">S Size</Button>
            <Button size="m">M Size</Button>
            <Button size="l">L Size</Button>
            <Button size="xl">XL Size</Button>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Button size="xs">XS Size</Button>
<Button size="s">S Size</Button>
<Button size="m">M Size</Button>
<Button size="l">L Size</Button>
<Button size="xl">XL Size</Button>
```

<!--/GITHUB_BLOCK-->

## Ширина

Для управления поведением компонента `Button` внутри контейнера используйте свойство `width`:

`auto` — ограничивает максимальную ширину кнопки, скрывая переполняющее содержимое с помощью многоточия.

`max` — подгоняет ширину кнопки под размер родительского контейнера, также скрывая переполняющее содержимое с помощью многоточия.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';
import {type CSSProperties} from 'react';

const containerStyle: CSSProperties = {
    width: 100,
    border: '2px dashed gray',
};

const titleStyle: CSSProperties = {
    textAlign: 'center',
};

export default function () {
    return (
        <>
            <div style={containerStyle}>
                <h4 style={titleStyle}>Default</h4>
                <p>
                    <Button>Text</Button>
                </p>
                <p>
                    <Button>Very Long Text</Button>
                </p>
            </div>
            <div style={containerStyle}>
                <h4 style={titleStyle}>Auto</h4>
                <p>
                    <Button width="auto">Text</Button>
                </p>
                <p>
                    <Button width="auto">Very Long Text</Button>
                </p>
            </div>
            <div style={containerStyle}>
                <h4 style={titleStyle}>Max</h4>
                <p>
                    <Button width="max">Text</Button>
                </p>
                <p>
                    <Button width="max">Very Long Text</Button>
                </p>
            </div>
        </>
    );
}
SANDBOX-->

## Форматирование краев

Свойство `pin` позволяет настраивать форму _начальных_ и _конечных_ краев элемента и обычно используется для объединения нескольких кнопок в единый блок.
Значение свойства `pin` включает названия стилей _начального_ и _конечного_ краев, разделенных дефисом, например, `round-brick`.
Доступные стили краев: `round` (по умолчанию), `circle`, `brick` и `clear`.

<!--SANDBOX
import {Button} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <div>
                <Button view="action" size="l" pin="round-clear">Create</Button>
                <Button view="action" size="l" pin="brick-round">...</Button>
            </div>
            <div>
                <Button view="normal" size="l" pin="circle-clear">Start</Button>
                <Button view="normal" size="l" pin="brick-brick" selected>Center</Button>
                <Button view="normal" size="l" pin="clear-circle">End</Button>
            </div>
            <div>
                <Button view="outlined" pin="brick-clear">1</Button>
                <Button view="outlined" pin="clear-clear">2</Button>
                <Button view="outlined" pin="clear-clear">3</Button>
                <Button view="outlined" pin="clear-brick">4</Button>
            </div>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<div>
    <Button view="action" size="l" pin="round-brick">Create</Button>
    <Button view="action" size="l" pin="brick-round">...</Button>
</div>
<div>
    <Button view="normal" size="l" pin="circle-clear">Start</Button>
    <Button view="normal" size="l" pin="brick-brick" selected>Center</Button>
    <Button view="normal" size="l" pin="clear-circle">End</Button>
</div>
<div>
    <Button view="outlined" pin="brick-clear">1</Button>
    <Button view="outlined" pin="clear-clear">2</Button>
    <Button view="outlined" pin="clear-clear">3</Button>
    <Button view="outlined" pin="clear-brick">4</Button>
</div>
```

<!--/GITHUB_BLOCK-->

## Свойства

Компонент `Button` принимает все допустимые свойства элемента `button` или `a`, в добавок к следующим:

| Имя       | Описание                                                                    |               Тип               | Значение по умолчанию |
| :-------- | :-------------------------------------------------------------------------- | :-----------------------------: | :-------------------: |
| children  | Содержимое кнопки. Можно использовать как текст, так и компонент `<Icon/>`. |        `React.ReactNode`        |                       |
| component | Переопределяет корневой компонент.                                          |       `React.ElementType`       |                       |
| disabled  | Включает или отключает состояние `disabled`.                                |            `boolean`            |        `false`        |
| href      | Делает корневой элемент ссылкой                                             |            `string`             |                       |
| loading   | Включает или отключает состояние `loading`.                                 |            `boolean`            |        `false`        |
| pin       | Задает стиль краев кнопки.                                                  |            `string`             |    `"round-round"`    |
| qa        | HTML-атрибут `data-qa`, используется для тестирования.                      |            `string`             |                       |
| selected  | Включает или отключает состояние `selected`.                                |            `boolean`            |                       |
| size      | Задает размер кнопки.                                                       | `"xs"` `"s"` `"m"` `"l"` `"xl"` |         `"m"`         |
| view      | Задает внешний вид кнопки.                                                  |          `ButtonView`           |      `"normal"`       |
| width     | Задает ширину кнопки.                                                       |        `"auto"` `"max"`         |                       |

## API CSS

| Имя                                 | Описание                               |
| :---------------------------------- | :------------------------------------- |
| `--g-button-text-color`             | Цвет текста.                           |
| `--g-button-text-color-hover`       | Цвет текста при ховере.                |
| `--g-button-background-color`       | Цвет фона.                             |
| `--g-button-background-color-hover` | Цвет фона при ховере.                  |
| `--g-button-border-width`           | Ширина границы.                        |
| `--g-button-border-color`           | Цвет границы.                          |
| `--g-button-border-style`           | Стиль границы.                         |
| `--g-button-focus-outline-width`    | Толщина контура при получении фокуса.  |
| `--g-button-focus-outline-color`    | Цвет контура при получении фокуса.     |
| `--g-button-focus-outline-style`    | Стиль контура при получении фокуса.    |
| `--g-button-focus-outline-offset`   | Смещение контура при получении фокуса. |
| `--g-button-height`                 | Высота (высота строки).                |
| `--g-button-padding`                | Боковые отступы.                       |
| `--g-button-border-radius`          | Радиус скругления углов.               |
| `--g-button-font-size`              | Размер шрифта текста.                  |
| `--g-button-icon-space`             | Размер пространства под иконку.        |
| `--g-button-icon-offset`            | Смещение иконки.                       |
