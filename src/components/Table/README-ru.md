<!--GITHUB_BLOCK-->

## Table (таблица)

<!--/GITHUB_BLOCK-->

```jsx
import {Table} from '@gravity-ui/uikit';
```

Компонент `Table` позволяет выбирать и сортировать строки, а также выполнять действия с выбранной строкой.

<!--GITHUB_BLOCK-->

Дополнительные функции подключаются через компоненты высшего порядка (HOC):

- [withTableActions](#usage-with-hoc-withtableactions)
- [withTableCopy](#usage-with-hoc-withtablecopy)
- [withTableSelection](#usage-with-hoc-withtableselection)
- [withTableSettings](#usage-with-hoc-withtablesettings)
- [withTableSorting](#usage-with-hoc-withtablesorting)

<!--/GITHUB_BLOCK-->

## Свойства

| Имя                              | Описание                                                                                                                                                                                                                              |                                        Тип                                         | Значение по умолчанию |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------: | :-------------------: |
| data                             | Данные.                                                                                                                                                                                                                               |                                      `any[]`                                       |                       |
| columns                          | Настройки столбцов.                                                                                                                                                                                                                   |                               `TableColumnConfig[]`                                |                       |
| verticalAlign                    | Выравнивание содержимого по вертикали.                                                                                                                                                                                                |                                 `"top"` `"middle"`                                 |                       |
| getRowDescriptor                 | Обработчик для получения дескриптора строки.                                                                                                                                                                                          |                   `(item: any, index: number) => DescriptorType`                   |                       |
| getRowId                         | Идентификатор строки, используемый при выборе и сортировке строк. Если пропустить строку, то идентификатор такой строки будет равен значению поля в данных строки с тем же именем, что и идентификатор столбца.                       |                 `string` `((item: any, index: number) => string)`                  |                       |
| getRowClassNames                 | CSS-классы строки.                                                                                                                                                                                                                    |                      `(item: any, index: number) => string[]`                      |                       |
| isRowDisabled                    | Условие блокировки столбцов.                                                                                                                                                                                                          |                      `(item: any, index: number) => boolean`                       |                       |
| onRowClick                       | Обработчик клика (`click`) по строке.                                                                                                                                                                                                 | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |                       |
| onRowMouseEnter                  | Обработчик наведения мыши (`mouseenter`) на строку.                                                                                                                                                                                   | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |                       |
| onRowMouseLeave                  | Обработчик ухода мыши (`mouseleave`) со строки.                                                                                                                                                                                       | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |                       |
| emptyMessage                     | Возвращает сообщение, если данные отсутствуют.                                                                                                                                                                                        |                                      `string`                                      |      `"No data"`      |
| className                        | CSS-класс таблицы.                                                                                                                                                                                                                    |                                      `string`                                      |                       |
| edgePadding                      | Добавляет горизонтальные отступы для крайних ячеек.                                                                                                                                                                                   |                                     `boolean`                                      |                       |
| stickyHorizontalScroll           | Добавляет горизонтальную липкую прокрутку (sticky scroll) в таблице. Обратите внимание, что таблица не может иметь фиксированную высоту и липкую прокрутку одновременно. Липкая прокрутка не будет работать при переполнении таблицы. |                                     `boolean`                                      |        `false`        |
| stickyHorizontalScrollBreakpoint | Порог, которого должен достичь родительский блок, чтобы прокрутка стала липкой. Это особенно удобно в консоли, когда панель `groupActions` перекрывает область прокрутки.                                                             |                                      `number`                                      |          `0`          |

### DescriptorType

| Имя         | Описание                                                          |    Тип     | Значение по умолчанию |
| :---------- | :---------------------------------------------------------------- | :--------: | :-------------------: |
| id          | Идентификатор строки, используемый при выборе и сортировке строк. |  `string`  |                       |
| disabled    | Условие блокировки столбцов.                                      | `boolean`  |                       |
| interactive | Показывать ховерное состояние строки                              | `boolean`  |                       |
| classNames  | CSS-классы строки.                                                | `string[]` |                       |

### TableColumnConfig

| Имя         | Описание                                                                                                                |                            Тип                             |                       Значение по умолчанию                       |
| :---------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------: | :---------------------------------------------------------------: |
| id          | Идентификатор столбца.                                                                                                  |                          `string`                          |                                                                   |
| name        | Название (заголовок) столбца.                                                                                           |             `string` `(() => React.ReactNode)`             |                      Идентификатор столбца.                       |
| className   | CSS-класс, который будет добавлен ко всем ячейкам в столбце.                                                            |                          `string`                          |                                                                   |
| placeholder | Заглушка при отсутствии данных в ячейке.                                                                                | `string` `((item: any, index: number) => React.ReactNode)` |                           `— (&mdash;)`                           |
| template    | Содержимое ячейки. Если пропустить строку, ячейка будет содержать значение поля с таким же именем, как и у этой строки. | `string` `((item: any, index: number) => React.ReactNode)` | Значение поля, имя которого соответствует идентификатору столбца. |
| align       | Выравнивание содержимого.                                                                                               |                `"start"` `"center"` `"end"`                |                                                                   |
| sticky      | Липкий столбец.                                                                                                         |                     `"start"` `"end"`                      |                                                                   |
| primary     | Указывает, что столбец является первичным относительно остальных.                                                       |                         `boolean`                          |                                                                   |
| width       | Ширина содержимого столбца в пикселях.                                                                                  |                     `number` `string`                      |                                                                   |
| meta        | Различные данные, включая настройки HOC.                                                                                |                   `Record<string, any>`                    |                                                                   |

## Использование `Table` с HOC `withTableActions`

Этот HOC добавляет к столбцам таблицы специальный столбец с действиями.

### Свойства

| Имя              | Описание                                              |                           Тип                            |
| :--------------- | :---------------------------------------------------- | :------------------------------------------------------: |
| getRowActions    | Массив конфигураций действий для каждой строки.       |   `(item: any, index: number) => TableActionConfig[]`    |
| renderRowActions | Функция рендеринга ячейки с действиями.               | `(props: {item: any; index: number}) => React.ReactNode` |
| rowActionsSize   | Размер кнопки действия и элементов всплывающего меню. |                 `"s"` `"m"` `"l"` `"xl"`                 |
| rowActionsIcon   | Пользовательский значок для ячейки действий.          |                    `React.ReactNode`                     |

### TableActionConfig

```ts
type TableActionConfig = TableAction | TableActionGroup;
```

#### TableAction

| Имя      | Описание                                                                      |                 Тип                  | Значение по умолчанию |
| :------- | :---------------------------------------------------------------------------- | :----------------------------------: | :-------------------: |
| text     | Текст.                                                                        |               `string`               |                       |
| handler  | Обработчик клика.                                                             | `(item: any, index: number) => void` |                       |
| disabled | Действие отключено.                                                           |              `boolean`               |                       |
| href     | Элемент меню с этим свойством становится ссылкой на указанное местоположение. |               `string`               |                       |
| target   | То же, что и атрибут `target` у тега `<a>`.                                   |               `string`               |                       |
| rel      | То же, что и атрибут `rel` у тега `<a>`.                                      |               `string`               |                       |
| theme    | Тема.                                                                         |        `"normal"` `"danger"`         |      `"normal"`       |
| icon     | Иконка, отображаемая рядом с текстом.                                         |          `React.ReactNode`           |                       |

#### TableActionGroup

| Имя   | Описание                   |          Тип          |
| :---- | :------------------------- | :-------------------: |
| title | Заголовок группы действий. |       `string`        |
| items | Элементы группы действий.  | `TableActionConfig[]` |

### Пример

```jsx
import {Table, withTableActions} from '@gravity-ui/uikit';

const MyTable = withTableActions(Table);
const data = [
  {id: 1, text: 'Hello'},
  {id: 2, text: 'World'},
];
const columns = [{id: 'id'}, {id: 'text'}];
const getRowActions = () => {
  return [
    {
      text: 'Print',
      handler: () => {},
    },
    {
      text: 'Remove',
      handler: () => {},
      theme: 'danger',
    },
  ];
};

const table = <MyTable data={data} columns={columns} getRowActions={getRowActions} />;
```

```jsx
import {Table, withTableActions, RenderRowActionsProps} from '@gravity-ui/uikit';

const MyTable = withTableActions(Table);
type Item = {id: number; text: string};

const data: Item[] = [
  {id: 1, text: 'Hello'},
  {id: 2, text: 'World'},
];
const columns = [{id: 'id'}, {id: 'text'}];

const RowAction = ({item}: RenderRowActionsProps<Item>) => {
    return <React.Fragment>{`Action for - ${item.text}`}</React.Fragment>;
};

const table = (
  <MyTable
    data={data}
    columns={columns}
    renderRowActions={RowAction}
  />
);
```

## Использование `Table` с HOC `withTableCopy`

Этот HOC позволяет копировать содержимое ячейки или произвольный текст.

### ColumnMeta

| Имя  | Описание                                                                                |                                             Тип                                             |
| :--- | :-------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------: |
| copy | Копируемый текст. Если установлено значение `true`, содержимое ячейки можно копировать. | `boolean` `((item: any, index: number) => string)` `((item: any, index: number) => number)` |

### Пример

```jsx
import {Table, withTableCopy} from '@gravity-ui/uikit';

const MyTable = withTableCopy(Table);
const data = [
  {id: 1, text: 'Hello'},
  {id: 2, text: 'World'},
];
const columns = [
  {id: 'id', meta: {copy: ({id}) => `ID #${id}`}},
  {id: 'text', meta: {copy: true}},
];

const table = <MyTable data={data} columns={columns} />;
```

## Использование `Table` с HOC `withTableSelection`

Этот HOC позволяет выбирать строки в таблице.

### Свойства

| Имя               | Описание                              |            Тип            |
| :---------------- | :------------------------------------ | :-----------------------: |
| selectedIds       | Выбранные строки.                     |        `string[]`         |
| onSelectionChange | Обработчик изменения выбранных строк. | `(ids: string[]) => void` |

### Пример

```jsx
import {Table, withTableSelection} from '@gravity-ui/uikit';

const MyTable = withTableSelection(Table);
const data = [
  {id: 1, text: 'Hello'},
  {id: 2, text: 'World'},
];
const columns = [{id: 'id'}, {id: 'text'}];
const getRowId = 'id';

function SelectionTable() {
  const [selectedIds, setSelectedIds] = React.useState([1]);

  return (
    <MyTable
      data={data}
      columns={columns}
      getRowId={getRowId}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
    />
  );
}
```

## Использование `Table` с HOC `withTableSettings`

Этот HOC активирует функции для настройки столбцов таблицы. Его можно использовать двумя способами:

```jsx
import {Table, withTableSettings} from './withTableSettings';

// No options passed
const MyTable1 = withTableSettings(Table);
// or with options
const MyTable1 = withTableSettings({sortable: false})(Table);
```

### Опции

| Имя        | Описание                                              |       Тип        | Значение по умолчанию |
| :--------- | :---------------------------------------------------- | :--------------: | :-------------------: |
| width      | Ширина всплывающего окна с настройками.               | `number` `"fit"` |                       |
| sortable   | Включает или отключает сортировку элементов настроек. |    `boolean`     |        `true`         |
| filterable | Включает или отключает фильтрацию элементов настроек. |    `boolean`     |        `false`        |

### ColumnMeta

| Имя               | Описание                                                                                                  |    Тип    | Значение по умолчанию |
| :---------------- | :-------------------------------------------------------------------------------------------------------- | :-------: | :-------------------: |
| selectedByDefault | Включает или отключает автоматический выбор столбца, если он не передан в настройках.                     | `boolean` |        `true`         |
| selectedAlways    | При включении этого свойства столбец всегда остается выбранным. Изменить видимость такого столбца нельзя. | `boolean` |        `false`        |

### Свойства

| Имя                        | Описание                                                                     |                           Тип                            |
| :------------------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------: |
| settingsPopupWidth         | Ширина всплывающего окна `TableColumnSetup`.                                 |                     `number` `"fit"`                     |
| settings                   | Текущие настройки.                                                           |                   `TableSettingsData`                    |
| updateSettings             | Обработчик обновления настроек.                                              |       `(data: TableSettingsData) => Promise<void>`       |
| renderControls             | Позволяет рендерить пользовательские действия.                               |                     `RenderControls`                     |
| settingsFilterPlaceholder  | Текст, который отображается в контроле, когда значение для поиска не задано. |                         `string`                         |
| settingsFilterEmptyMessage | Текст, который отображается, когда ни один элемент не найден.                |                         `string`                         |
| filterSettings             | Функция для фильтрации элементов.                                            | `(value: string, item: TableColumnSetupItem) => boolean` |

### TableSettingsData

```ts
type TableSettingsData = Array<{
  id: string;
  isSelected?: boolean;
}>;
```

### RenderControls

```ts
type RenderControls = (params: {
  DefaultApplyButton: React.ComponentType;
  onApply: () => void;
}) => React.ReactNode;
```

### Пример

```jsx
import {Table, withTableSettings} from '@gravity-ui/uikit';

const MyTable = withTableSettings({width: 100, sortable: false})(Table);
const data = [
  {id: 1, text: 'Hello'},
  {id: 2, text: 'World'},
];
const columns = [{id: 'id'}, {id: 'text'}];
const initialSettings = [
  {id: 'id', isSelected: false},
  {id: 'text', isSelected: true},
];

function SelectionTable() {
  const [settings, setSettings] = React.useState(initialSettings);

  return (
    <MyTable
      data={data}
      columns={columns}
      settings={settings}
      updateSettings={(settings) => {
        setSettings(settings);
        return Promise.resolve();
      }}
      renderControls={({DefaultApplyButton, onApply}) => (
        <Flex gapRow="1" direction="column">
          <Button
            view="outlined-warning"
            onClick={() => {
              onApply();
              setSettings(initialSettings);
            }}
          >
            Reset
          </Button>
          <DefaultApplyButton />
        </Flex>
      )}
    />
  );
}
```

## Использование `Table` с HOC `withTableSorting`

Этот HOC позволяет выполнить сортировку столбцов.

### ColumnMeta

| Имя              | Описание                                                                                                                                                     |                       Тип                        | Значение по умолчанию |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------: | :-------------------: |
| defaultSortOrder | Устанавливает первичный порядок сортировки.                                                                                                                  |                 `"asc"` `"desc"`                 |         `asc`         |
| sort             | Функция сортировки. Возвращает значение для сортировки по возрастанию. При установке `true` значения ячеек сравниваются и сортируются в порядке возрастания. | `boolean` `((itemA: any, itemB: any) => number)` |                       |

### Свойства

| Имя               | Описание                                                            |                  Тип                  |
| :---------------- | :------------------------------------------------------------------ | :-----------------------------------: |
| defaultSortState  | Состояние сортировки по умолчанию для неконтролируемого компонента. |           `TableSortState`            |
| sortState         | Состояние сортировки.                                               |           `TableSortState`            |
| onSortStateChange | Обработчик изменения состояния сортировки.                          | `(sortState: TableSortState) => void` |

Если не передавать свойства `sortState` и `onSortStateChange`, то состояние сортировки будет храниться в самом компоненте.

### TableSortState

```ts
type TableSortState = Array<{
  column: string;
  order: 'asc' | 'desc';
}>;
```

### Пример

```jsx
import {Table, withTableSorting} from '@gravity-ui/uikit';

const MyTable = withTableSorting(Table);
const data = [
  {id: 1, text: 'Hello', date: '2016-10-25'},
  {id: 2, text: 'World', date: '2020-08-15'},
];
const columns = [
  {id: 'id', meta: {sort: true}},
  {
    id: 'text',
    meta: {defaultSortOrder: 'desc', sort: (a, b) => Date.parse(a.date) - Date.parse(b.date)},
  },
];

const table = <MyTable data={data} columns={columns} />;
```
