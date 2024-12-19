<!--GITHUB_BLOCK-->

# DropdownMenu

<!--/GITHUB_BLOCK-->

```tsx
import {DropdownMenu} from '@gravity-ui/uikit';
```

Компонент `DropdownMenu` (выпадающее меню) позволяет организовывать элементы в группы, создавать подменю и настраивать переключатель. Элементы выпадающего меню настраиваются через свойство `items`. По умолчанию переключатель меню — кнопка с иконкой многоточия (**⋯**), которую можно переопределить с помощью свойства `renderSwitcher`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.DropdownMenu
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
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.DropdownMenu
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
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.DropdownMenu
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
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<DropdownMenu
    renderSwitcher={(props) => (
        <div {...props} style={{cursor: 'pointer', borderBottom: '1px dotted'}}>John Doe</div>
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
`}
>
    <UIKit.DropdownMenu
        renderSwitcher={(props) => (
            <div {...props} style={{cursor: 'pointer', borderBottom: '1px dotted'}}>John Doe</div>
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
</ExampleBlock>

LANDING_BLOCK-->

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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
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
`}
>
    <UIKit.DropdownMenu
        renderSwitcher={(props) => (
            <UIKit.Button {...props} view="flat">
                <UIKit.Icon
                    data={() => (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M1.25 3.25A.75.75 0 0 1 2 2.5h12A.75.75 0 0 1 14 4H2a.75.75 0 0 1-.75-.75Zm0 4.75A.75.75 0 0 1 2 7.25h12a.75.75 0 0 1 0 1.5H2A.75.75 0 0 1 1.25 8ZM2 12a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5H2Z" clip-rule="evenodd"></path></svg>
                    )}
                    size={16}
                />
            </UIKit.Button>
        )}
        items={[
            {
                iconStart: (
                    <UIKit.Icon
                        data={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M11.423 1A3.577 3.577 0 0 1 15 4.577c0 .27-.108.53-.3.722l-.528.529-1.971 1.971-5.059 5.059a3 3 0 0 1-1.533.82l-2.638.528a1 1 0 0 1-1.177-1.177l.528-2.638a3 3 0 0 1 .82-1.533l5.059-5.059 2.5-2.5c.191-.191.451-.299.722-.299Zm-2.31 4.009-4.91 4.91a1.5 1.5 0 0 0-.41.766l-.38 1.903 1.902-.38a1.5 1.5 0 0 0 .767-.41l4.91-4.91a2.077 2.077 0 0 0-1.88-1.88Zm3.098.658a3.59 3.59 0 0 0-1.878-1.879l1.28-1.28c.995.09 1.788.884 1.878 1.88l-1.28 1.28Z" clip-rule="evenodd"></path></svg>
                        )}
                        size={16}
                    />
                ),
                action: () => console.log('Rename'),
                text: 'Rename',
            },
            {
                iconStart: (
                    <UIKit.Icon
                        data={() => (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2Zm2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5H11Zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438l.315-7.562Zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0Zm3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"></path></svg>
                        )}
                        size={16}
                    />
                ),
                action: () => console.log('Delete'),
                text: 'Delete',
                theme: 'danger',
            },
        ]}
    />
</ExampleBlock>

LANDING_BLOCK-->

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
