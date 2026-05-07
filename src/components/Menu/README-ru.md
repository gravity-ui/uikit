<!--GITHUB_BLOCK-->

# Menu

<!--/GITHUB_BLOCK-->

```tsx
import {Menu} from '@gravity-ui/uikit';
```

Компонент `Menu` позволяет легко создавать представления для списков действий.

Он включает в себя специальные компоненты для элементов (`Menu.Item`) и групп (`Menu.Group`), которые можно комбинировать для создания более сложных меню.

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <Menu>
            <Menu.Item>First</Menu.Item>
            <Menu.Item>Second</Menu.Item>
            <Menu.Group label="Group">
                <Menu.Item>One</Menu.Item>
                <Menu.Item>Two</Menu.Item>
            </Menu.Group>
        </Menu>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item>First</Menu.Item>
  <Menu.Item>Second</Menu.Item>
  <Menu.Group label="Group">
    <Menu.Item>One</Menu.Item>
    <Menu.Item>Two</Menu.Item>
  </Menu.Group>
</Menu>
```

<!--/GITHUB_BLOCK-->

### `Size` (размер)

Позволяет задать размер меню. Значение по умолчанию — `m`.

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Menu size="s">
                <Menu.Item>First</Menu.Item>
                <Menu.Item>Second</Menu.Item>
            </Menu>
            <Menu size="m">
                <Menu.Item>First</Menu.Item>
                <Menu.Item>Second</Menu.Item>
            </Menu>
            <Menu size="l">
                <Menu.Item>First</Menu.Item>
                <Menu.Item>Second</Menu.Item>
            </Menu>
            <Menu size="xl">
                <Menu.Item>First</Menu.Item>
                <Menu.Item>Second</Menu.Item>
            </Menu>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu size="s">
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>

<Menu size="m">
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>

<Menu size="l">
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>

<Menu size="xl">
    <Menu.Item>First</Menu.Item>
    <Menu.Item>Second</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя       | Описание                                                 |           Тип            | Значение по умолчанию |
| :-------- | :------------------------------------------------------- | :----------------------: | :-------------------: |
| size      | Размер меню.                                             | `"s"` `"m"` `"l"` `"xl"` |         `"m"`         |
| children  | Дочерний элемент.                                        |    `React.ReactNode`     |                       |
| className | HTML-атрибут `class`.                                    |         `string`         |                       |
| style     | HTML-атрибут `style`.                                    |  `React.CSSProperties`   |                       |
| qa        | Атрибут `data-qa` в HTML, используется для тестирования. |         `string`         |                       |

## Menu.Item

Отвечает за рендеринг элементов меню.

### Иконка

Для отображения иконки в начале или в конце элемента меню используйте свойства `iconStart` или `iconEnd`:

<!--SANDBOX
import {Gear, TriangleExclamation} from '@gravity-ui/icons';
import {Icon, Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Menu>
                <Menu.Item iconStart={<Icon size={16} data={Gear} />}>Item with icon</Menu.Item>
                <Menu.Item>Item without icon</Menu.Item>
            </Menu>
            <Menu>
                <Menu.Item iconEnd={<Icon size={16} data={TriangleExclamation} />}>
                    Item with icon
                </Menu.Item>
                <Menu.Item>Item without icon</Menu.Item>
            </Menu>
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item iconStart={<Icon size={16} data={GearIcon} />}>Item with icon</Menu.Item>
  <Menu.Item>Item without icon</Menu.Item>
</Menu>
```

```tsx
<Menu>
  <Menu.Item iconEnd={<Icon size={16} data={TriangleExclamation} />}>Item with icon</Menu.Item>
  <Menu.Item>Item without icon</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### Состояния

Позволяет включать или отключать (делать неактивными) отдельные элементы меню:

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <Menu>
            <Menu.Item disabled>First</Menu.Item>
            <Menu.Item>Second</Menu.Item>
            <Menu.Item selected>Third</Menu.Item>
        </Menu>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item disabled>First</Menu.Item>
  <Menu.Item>Second</Menu.Item>
  <Menu.Item selected>Third</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### `Theme` (тема)

Позволяет изменить тему элемента меню. Тема по умолчанию — `normal`.

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <Menu>
            <Menu.Item theme="danger">First</Menu.Item>
            <Menu.Item theme="normal">Second</Menu.Item>
            <Menu.Item>Third</Menu.Item>
        </Menu>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item theme="danger">First</Menu.Item>
  <Menu.Item theme="normal">Second</Menu.Item>
  <Menu.Item>Third</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя              | Описание                                                 |            Тип            | Значение по умолчанию |
| :--------------- | :------------------------------------------------------- | :-----------------------: | :-------------------: |
| iconStart        | Иконка меню перед текстом элемента.                      |        `ReactNode`        |                       |
| iconEnd          | Иконка меню после текста элемента.                       |        `ReactNode`        |                       |
| selected         | Флаг выбранного элемента меню.                           |         `boolean`         |        `false`        |
| disabled         | Флаг отключенного элемента меню.                         |         `boolean`         |        `false`        |
| active           | Флаг активного элемента меню.                            |         `boolean`         |        `false`        |
| href             | URL-адрес.                                               |         `string`          |                       |
| title            | Атрибут заголовка.                                       |         `string`          |                       |
| target           | Атрибут целевого ресурса.                                |         `string`          |                       |
| rel              | Атрибут `rel`.                                           |         `string`          |                       |
| onClick          | Обработчик события клика.                                | `React.MouseEventHandler` |                       |
| theme            | Тема элемента меню.                                      |   `"normal"` `"danger"`   |      `"normal"`       |
| children         | Дочерний элемент.                                        |     `React.ReactNode`     |                       |
| className        | HTML-атрибут `class` для корневого элемента.             |         `string`          |                       |
| contentClassName | HTML-атрибут `class` для элемента контента.              |         `string`          |                       |
| style            | HTML-атрибут `style`.                                    |   `React.CSSProperties`   |                       |
| qa               | Атрибут `data-qa` в HTML, используется для тестирования. |         `string`          |                       |
| extraProps       | Дополнительные HTML-атрибуты.                            |         `Record`          |                       |

## Menu.Group

В пределах одного меню элементы можно группировать по темам:

<!--SANDBOX
import {Menu} from '@gravity-ui/uikit';

export default function () {
    return (
        <Menu>
            <Menu.Item>First</Menu.Item>
            <Menu.Group label="Group One">
                <Menu.Item>One</Menu.Item>
                <Menu.Item>Two</Menu.Item>
            </Menu.Group>
            <Menu.Group label="Group Two">
                <Menu.Item>One</Menu.Item>
                <Menu.Item>Two</Menu.Item>
            </Menu.Group>
            <Menu.Item>Middle</Menu.Item>
            <Menu.Group label="Group Three">
                <Menu.Item>One</Menu.Item>
                <Menu.Item>Two</Menu.Item>
            </Menu.Group>
            <Menu.Item>Last</Menu.Item>
        </Menu>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<Menu>
  <Menu.Item>First</Menu.Item>
  <Menu.Group label="Group One">
    <Menu.Item>One</Menu.Item>
    <Menu.Item>Two</Menu.Item>
  </Menu.Group>
  <Menu.Group label="Group Two">
    <Menu.Item>One</Menu.Item>
    <Menu.Item>Two</Menu.Item>
  </Menu.Group>
  <Menu.Item>Middle</Menu.Item>
  <Menu.Group label="Group Three">
    <Menu.Item>One</Menu.Item>
    <Menu.Item>Two</Menu.Item>
  </Menu.Group>
  <Menu.Item>Last</Menu.Item>
</Menu>
```

<!--/GITHUB_BLOCK-->

### Свойства

| Имя       | Описание                                                 |          Тип          | Значение по умолчанию |
| :-------- | :------------------------------------------------------- | :-------------------: | :-------------------: |
| label     | Лейбл группы меню.                                       |       `string`        |                       |
| children  | Дочерний элемент.                                        |   `React.ReactNode`   |                       |
| className | HTML-атрибут `class`.                                    |       `string`        |                       |
| style     | HTML-атрибут `style`.                                    | `React.CSSProperties` |                       |
| qa        | Атрибут `data-qa` в HTML, используется для тестирования. |       `string`        |                       |
