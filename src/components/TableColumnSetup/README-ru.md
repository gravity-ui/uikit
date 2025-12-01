<!--GITHUB_BLOCK-->

# TableColumnSetup

<!--/GITHUB_BLOCK-->

```tsx
import {TableColumnSetup} from '@gravity-ui/uikit';
```

Компонент `TableColumnSetup` предоставляет пользовательский интерфейс для настройки видимости и порядка колонок таблицы. Он отображает кнопку, которая открывает всплывающее окно со списком доступных колонок, позволяя пользователям показывать/скрывать колонки и при необходимости изменять их порядок с помощью перетаскивания.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const items = [
  {id: 'name', title: 'Имя', selected: true, required: true},
  {id: 'email', title: 'Email', selected: true},
  {id: 'phone', title: 'Телефон', selected: false},
];

<TableColumnSetup items={items} onUpdate={(updatedItems) => console.log(updatedItems)} />;
`}
>
    <UIKit.TableColumnSetup
        items={[
            {id: 'name', title: 'Имя', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Телефон', selected: false},
        ]}
        onUpdate={(updatedItems) => console.log(updatedItems)}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const items = [
  {id: 'name', title: 'Имя', selected: true, required: true},
  {id: 'email', title: 'Email', selected: true},
  {id: 'phone', title: 'Телефон', selected: false},
];

<TableColumnSetup items={items} onUpdate={(updatedItems) => console.log(updatedItems)} />;
```

<!--/GITHUB_BLOCK-->

## Сортируемые колонки

Включите функциональность перетаскивания, чтобы позволить пользователям изменять порядок колонок, установив свойство `sortable` в `true`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<TableColumnSetup
    items={items}
    sortable
    onUpdate={(updatedItems) => console.log(updatedItems)}
/>
`}
>
    <UIKit.TableColumnSetup
        items={[
            {id: 'name', title: 'Имя', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Телефон', selected: false},
        ]}
        sortable
        onUpdate={(updatedItems) => console.log(updatedItems)}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TableColumnSetup items={items} sortable onUpdate={(updatedItems) => console.log(updatedItems)} />
```

<!--/GITHUB_BLOCK-->

## Режимы применения

Управляйте тем, когда изменения применяются, используя свойство `hideApplyButton`:

- `true` - Изменения применяются немедленно при переключении колонок пользователем
- `false` - Изменения применяются только при нажатии кнопки "Применить"

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<TableColumnSetup
    items={items}
    hideApplyButton
    onUpdate={(updatedItems) => console.log(updatedItems)}
/>
`}
>
    <UIKit.TableColumnSetup
        items={[
            {id: 'name', title: 'Имя', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Телефон', selected: false},
        ]}
        hideApplyButton
        onUpdate={(updatedItems) => console.log(updatedItems)}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TableColumnSetup
  items={items}
  hideApplyButton
  onUpdate={(updatedItems) => console.log(updatedItems)}
/>
```

<!--/GITHUB_BLOCK-->

## Отображение статуса

Показывайте количество выбранных колонок в кнопке переключения, включив свойство `showStatus`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<TableColumnSetup
    items={items}
    showStatus={true}
    onUpdate={(updatedItems) => console.log(updatedItems)}
/>
`}
>
    <UIKit.TableColumnSetup
        items={[
            {id: 'name', title: 'Имя', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Телефон', selected: false},
        ]}
        showStatus={true}
        onUpdate={(updatedItems) => console.log(updatedItems)}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TableColumnSetup
  items={items}
  showStatus={true}
  onUpdate={(updatedItems) => console.log(updatedItems)}
/>
```

<!--/GITHUB_BLOCK-->

## Пользовательский переключатель

Настройте кнопку-триггер, используя свойство `renderSwitcher`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<TableColumnSetup
    items={items}
    renderSwitcher={({onClick, onKeyDown}) => (
        <Button onClick={onClick} onKeyDown={onKeyDown} view="outlined">
            Настроить колонки
        </Button>
    )}
    onUpdate={(updatedItems) => console.log(updatedItems)}
/>
`}
>
    <UIKit.TableColumnSetup
        items={[
            {id: 'name', title: 'Имя', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Телефон', selected: false},
        ]}
        renderSwitcher={({onClick, onKeyDown}) => (
            <UIKit.Button onClick={onClick} onKeyDown={onKeyDown} view="outlined">
                Настроить колонки
            </UIKit.Button>
        )}
        onUpdate={(updatedItems) => console.log(updatedItems)}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<TableColumnSetup
  items={items}
  renderSwitcher={({onClick, onKeyDown}) => (
    <Button onClick={onClick} onKeyDown={onKeyDown} view="outlined">
      Настроить колонки
    </Button>
  )}
  onUpdate={(updatedItems) => console.log(updatedItems)}
/>
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя             | Описание                                                                   |                             Тип                             | Значение по умолчанию |
| :-------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------: | :-------------------: |
| items           | Массив элементов конфигурации колонок                                      |                  `TableColumnSetupItem[]`                   |                       |
| onUpdate        | Обратный вызов, срабатывающий при изменении конфигурации колонок           |          `(items: TableColumnSetupItem[]) => void`          |                       |
| disabled        | Отключает кнопку переключения                                              |                          `boolean`                          |        `false`        |
| sortable        | Включает сортировку колонок перетаскиванием                                |                          `boolean`                          |        `true`         |
| hideApplyButton | Когда применять изменения: немедленно или вручную через кнопку "Применить" |                          `boolean`                          |        `false`        |
| showStatus      | Показывает количество выбранных/общих колонок в кнопке переключения        |                          `boolean`                          |        `false`        |
| popupWidth      | Ширина всплывающего окна                                                   |                      `number \| 'fit'`                      |                       |
| popupPlacement  | Размещение всплывающего окна относительно триггера                         |    [`PopupPlacement`](../Popup/README-ru.md#properties)     |                       |
| renderSwitcher  | Пользовательская функция рендеринга для кнопки переключения                | `(props: SwitcherProps) => React.ReactElement \| undefined` |                       |
| switcher        | **Устарело.** Используйте `renderSwitcher` вместо этого                    |              `React.ReactElement \| undefined`              |                       |
| getItemTitle    | Функция для получения заголовка элемента                                   |      `(item: TableColumnSetupItem) => React.ReactNode`      |                       |
| className       | Пользовательский CSS-класс для корневого элемента                          |                          `string`                           |                       |

### TableColumnSetupItem

| Имя      | Описание                                                |         Тип         | Значение по умолчанию |
| :------- | :------------------------------------------------------ | :-----------------: | :-------------------: |
| id       | Уникальный идентификатор колонки                        |      `string`       |                       |
| title    | Отображаемый заголовок колонки                          |  `React.ReactNode`  |                       |
| selected | Видима ли колонка в данный момент                       |      `boolean`      |                       |
| required | Является ли колонка обязательной (не может быть скрыта) |      `boolean`      |                       |
| sticky   | Закрепленное позиционирование для колонки               | `'left' \| 'right'` |                       |

### SwitcherProps

| Имя       | Описание                                             |                    Тип                    |
| :-------- | :--------------------------------------------------- | :---------------------------------------: |
| onClick   | Обработчик события клика для переключателя           |  `React.MouseEventHandler<HTMLElement>`   |
| onKeyDown | Обработчик события нажатия клавиши для переключателя | `React.KeyboardEventHandler<HTMLElement>` |
