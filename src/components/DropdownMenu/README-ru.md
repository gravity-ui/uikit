<!--GITHUB_BLOCK-->

# DropdownMenu

<!--/GITHUB_BLOCK-->

```tsx
import {DropdownMenu} from '@gravity-ui/uikit';
```

Компонент `DropdownMenu` (выпадающее меню) позволяет организовывать элементы в группы, создавать подменю и настраивать переключатель. Элементы выпадающего меню настраиваются через свойство `items`. По умолчанию переключатель меню — кнопка с иконкой многоточия (**⋯**), которую можно переопределить с помощью свойства `renderSwitcher`.

<!--SANDBOX
import type {DropdownMenuItem} from '@gravity-ui/uikit';
import {DropdownMenu} from '@gravity-ui/uikit';

const items: DropdownMenuItem[] = [
    {
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
];

export default function () {
    return <DropdownMenu items={items} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  items={[
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

## Сгруппированные элементы

Элементы компонента`DropdownMenu` можно группировать и визуально отделять от остальных с помощью массивов элементов меню, вложенных в массив `items`.

<!--SANDBOX
import type {DropdownMenuItemMixed} from '@gravity-ui/uikit';
import {DropdownMenu} from '@gravity-ui/uikit';

const items: DropdownMenuItemMixed[] = [
    [
        {
            action: () => console.log('Call'),
            text: 'Call',
        },
        {
            action: () => console.log('Send email'),
            text: 'Send email',
        },
    ],
    {
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
];

export default function () {
    return <DropdownMenu items={items} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  items={[
    [
      {
        action: () => console.log('Call'),
        text: 'Call',
      },
      {
        action: () => console.log('Send email'),
        text: 'Send email',
      },
    ],
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

## Подменю

Используя свойство `items` для отдельного элемента меню, можно добавить вложенные подэлементы.

Для элементов меню с подменю предусмотрены следующие дополнительные классы для стилизации:

- `.g-dropdown-menu__menu-item_with-submenu`— для элементов меню с более чем одним вложенным подэлементом;
- `.g-dropdown-menu__menu-item_active-parent`— для элемента, подменю которого в данный момент открыто.

<!--SANDBOX
import type {DropdownMenuItem} from '@gravity-ui/uikit';
import {DropdownMenu} from '@gravity-ui/uikit';

const items: DropdownMenuItem[] = [
    {
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
    {
        text: 'More',
        items: [
            {
                action: () => console.log('Mark as'),
                text: 'Mark as',
                items: [
                    {
                        action: () => console.log('Important'),
                        text: 'Important',
                    },
                    {
                        action: () => console.log('Favorite'),
                        text: 'Favorite',
                    },
                ],
            },
            {
                action: () => console.log('Copy'),
                text: 'Copy',
            },
            {
                text: 'Move to',
                items: [
                    {
                        action: () => console.log('Location #1'),
                        text: 'Location #1',
                    },
                    {
                        action: () => console.log('Location #2'),
                        text: 'Location #2',
                    },
                ],
            },
        ],
    },
];

export default function () {
    return <DropdownMenu items={items} />;
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  items={[
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
    {
      text: 'More',
      items: [
        {
          action: () => console.log('Mark as'),
          text: 'Mark as',
          items: [
            {
              action: () => console.log('Important'),
              text: 'Important',
            },
            {
              action: () => console.log('Favorite'),
              text: 'Favorite',
            },
          ],
        },
        {
          action: () => console.log('Copy'),
          text: 'Copy',
        },
        {
          text: 'Move to',
          items: [
            {
              action: () => console.log('Location #1'),
              text: 'Location #1',
            },
            {
              action: () => console.log('Location #2'),
              text: 'Location #2',
            },
          ],
        },
      ],
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

## Пользовательский переключатель меню

Для настройки переключателя меню используйте свойство `renderSwitcher`. Это может быть любая функция, возвращающая React-компонент (или `(props: SwitcherProps) => React.ReactNode` в контексте TypeScript; см. [`SwitcherProps`](#switcherprops) ниже). По умолчанию переключатель меню — кнопка с иконкой многоточия (**⋯**).

<!--SANDBOX
import type {DropdownMenuItem} from '@gravity-ui/uikit';
import {DropdownMenu} from '@gravity-ui/uikit';

const items: DropdownMenuItem[] = [
    {
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
];

export default function () {
    return (
        <DropdownMenu
            renderSwitcher={(props) => (
                <div {...props} style={{cursor: 'pointer', borderBottom: '1px dotted'}}>
                    John Doe
                </div>
            )}
            items={items}
        />
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  renderSwitcher={(props) => (
    <div {...props} style={{cursor: 'pointer', borderBottom: '1px dotted'}}>
      John Doe
    </div>
  )}
  items={[
    {
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

Пример выше упрощен с целью показать принцип работы настраиваемого переключателя меню. В реальных приложениях желательно, чтобы кликабельный переключатель меню представлял собой компонент, доступный для управления с клавиатуры и через другие вспомогательные технологии, такие как кнопка.

## Пользовательские иконки

Для добавления пользовательских иконок к элементам `DropdownMenu` используйте свойства `iconStart` и `iconEnd`. По умолчанию в элементах `DropdownMenu` иконки отсутствуют.

Чтобы изменить иконку переключателя меню, используйте свойства `renderSwitcher` компонента`DropdownMenu` По умолчанию переключатель меню — кнопка с иконкой многоточия (**⋯**).

<!--SANDBOX
import {Bars, Pencil, TrashBin} from '@gravity-ui/icons';
import type {DropdownMenuItem} from '@gravity-ui/uikit';
import {Button, DropdownMenu, Icon} from '@gravity-ui/uikit';

const items: DropdownMenuItem[] = [
    {
        iconStart: <Icon size={16} data={Pencil} />,
        action: () => console.log('Rename'),
        text: 'Rename',
    },
    {
        iconStart: <Icon size={16} data={TrashBin} />,
        action: () => console.log('Delete'),
        text: 'Delete',
        theme: 'danger',
    },
];

export default function () {
    return (
        <DropdownMenu
            renderSwitcher={(props) => (
                <Button {...props} view="flat">
                    <Icon size={16} data={Bars} />
                </Button>
            )}
            items={items}
        />
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```jsx
<DropdownMenu
  renderSwitcher={(props) => (
    <Button {...props} view="flat">
      <Icon size={16} data={Bars} />
    </Button>
  )}
  items={[
    {
      iconStart: <Icon size={16} data={Pencil} />,
      action: () => console.log('Rename'),
      text: 'Rename',
    },
    {
      iconStart: <Icon size={16} data={TrashBin} />,
      action: () => console.log('Delete'),
      text: 'Delete',
      theme: 'danger',
    },
  ]}
/>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя                        | Описание                                                                                                 |                        Тип                         | Значение по умолчанию |
| :------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------: | :-------------------: |
| `items`                    | Массив элементов. Вложенные массивы элементов представляют визуально разделенные группы.                 | `(DropdownMenuItem \| DropdownMenuItem[])[] \| []` |                       |
| `data`                     | Данные, которые передаются в действия, вызываемые из меню (это может быть полезно для контекстных меню). |                       `any`                        |                       |
| `icon`                     | Иконка дефолтного переключателя (`switcher`).                                                            |                 `React.ReactNode`                  |  Иконка многоточия.   |
| `size`                     | Применяется как к дефолтному `switcher`, так и к меню.                                                   |            `'s' \| 'm' \| 'l' \| 'xl'`             |         `'m'`         |
| `disabled`                 | Значение `true` для этого свойства отключает кнопку `switcher` и блокирует открытие меню.                |                     `boolean`                      |                       |
| `renderSwitcher`           | Функция рендеринга для контрола переключения меню.                                                       |                 `React.ReactNode`                  |                       |
| `switcherWrapperClassName` | Значение для свойства `className` родительского компонента `switcher`.                                   |                      `string`                      |                       |
| `defaultSwitcherProps`     | Свойства дефолтного `switcher`.                                                                          |                   `ButtonProps`                    |                       |
| `defaultSwitcherClassName` | Значение для свойства `className` дефолтного `switcher`.                                                 |                      `string`                      |                       |
| `menuProps`                | Переопределяет свойства выпадающего меню по умолчанию.                                                   |                    `MenuProps`                     |                       |
| `popupProps`               | Переопределяет свойства всплывающего окна по умолчанию.                                                  |                    `PopupProps`                    |                       |
| `open`                     | Переключает видимость выпадающего меню.                                                                  |                     `boolean`                      |                       |
| `onOpenToggle`             | Вызывается при открытии или закрытии меню.                                                               |                    `() => void`                    |                       |
| `onSwitcherClick`          | Вызывается при клике по переключателю.                                                                   |       `React.MouseEventHandler<HTMLElement>`       |                       |
| `hideOnScroll`             | Указывает, нужно ли скрывать меню при прокрутке родительского элемента.                                  |                     `boolean`                      |        `true`         |
| `children`                 | Пользовательский контент внутри всплывающего окна с меню.                                                |                 `React.ReactNode`                  |                       |

### DropdownMenuItem

Используется для описания отдельных элементов выпадающего меню.

| Имя          | Описание                                                                                                                                                             |                      Тип                       | Значение по умолчанию |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------: | :-------------------: |
| `text`       | Текстовое содержимое элемента меню.                                                                                                                                  |               `React.ReactNode`                |                       |
| `action`     | Обработчик клика по элементу меню. Получает параметры от родительского выпадающего меню (`event` и `data`).                                                          | `(event: React.MouseEvent, data: any) => void` |                       |
| `iconStart`  | Иконка, отображаемая перед содержимым элемента меню.                                                                                                                 |               `React.ReactNode`                |                       |
| `iconEnd`    | Иконка, отображаемая после содержимого элемента меню. Игнорируется, если у элемента есть подменю.                                                                    |               `React.ReactNode`                |                       |
| `hidden`     | Определяет, скрыт ли элемент меню.                                                                                                                                   |                   `boolean`                    |                       |
| `disabled`   | Определяет, заблокирован ли элемент меню.                                                                                                                            |                   `boolean`                    |                       |
| `href`       | Элемент меню с этим свойством становится ссылкой на указанное местоположение.                                                                                        |                    `string`                    |                       |
| `target`     | То же, что и атрибут `target` у тега `<a>`.                                                                                                                          |                    `string`                    |                       |
| `rel`        | То же, что и атрибут `rel` у тега `<a>`.                                                                                                                             |                    `string`                    |                       |
| `extraProps` | Дополнительные свойства для элемента меню.                                                                                                                           |                    `object`                    |                       |
| `title`      | Текст всплывающей подсказки.                                                                                                                                         |                    `string`                    |                       |
| `className`  | Значение HTML-атрибута `class`.                                                                                                                                      |                    `string`                    |                       |
| `items`      | Элементы подменю.                                                                                                                                                    |  `(DropdownMenuItem \| DropdownMenuItem[])[]`  |                       |
| `popupProps` | Свойства всплывающего окна подменю.                                                                                                                                  |                    `string`                    |                       |
| `path`       | Путь индексов от корня до текущего элемента.                                                                                                                         |                   `number[]`                   |                       |
| `closeMenu`  | Пользовательская функция для закрытия меню (`closeMenu`). Ее можно вызвать вместо закрытия основного меню. Позволяет сначала закрыть подменю, а затем основное меню. |                  `() => void`                  |                       |

### SwitcherProps

| Имя         | Описание                                                                   |     Тип      |
| :---------- | :------------------------------------------------------------------------- | :----------: |
| `onClick`   | Вызывается при клике по переключателю.                                     | `() => void` |
| `onKeyDown` | Вызывается при получении переключателем фокуса и нажатии клавиши действия. | `() => void` |
