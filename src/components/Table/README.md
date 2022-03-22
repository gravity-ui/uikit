## Table

Таблица с поддержкой выбора строк, действий над строкой, и сортировкой.

Дополнительная функциональность подключается через HOC:

- [withTableActions](#withtableactions)
- [withTableCopy](#withtablecopy)
- [withTableSelection](#withtableselection)
- [withTableSettings](#withtablesettings)
- [withTableSorting](#withtablesorting)

### Props

```ts
interface Props {
  /**
   * Данные.
   */
  data: any[];
  /**
   * Параметры колонок.
   */
  columns: TableColumnConfig[];
  /**
   * Выравнивание содержимого по вертикали.
   */
  verticalAlign?: 'top' | 'middle';
  /**
   * ID строки.
   * Используется при выборе строк и сортировке. Если передать строку,
   * то ID будет значение поля в данных строки с именем равным ID колонки.
   */
  getRowId?: string | ((item: any, index: number) => string);
  /**
   * CSS-классы строки.
   */
  getRowClassNames?: (item: any, index: number) => string[];
  /**
   * Условие для блокирования колонок.
   */
  isRowDisabled?: (item: any, index: number) => boolean;
  /**
   * Обработчик клика по строке.
   */
  onRowClick?: (item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void;
  /**
   * Сообщение при отсутствии данных.
   *
   * По умолчанию: "Нет данных"
   */
  emptyMessage?: string;
  /**
   * CSS-класс таблицы.
   */
  className?: string;
}
```

### TableColumnConfig

```ts
interface TableColumnConfig<I> {
  /**
   * ID колонки.
   */
  id: string;
  /**
   * Имя колонки (заголовок).
   *
   * По умолчанию: ID колонки
   */
  name?: string | (() => React.ReactNode);
  /**
   * Заглушка при отсутствии данных в ячейке.
   *
   * По умолчанию: — (&mdash;)
   */
  placeholder?: string | ((item: any, index: number) => React.ReactNode);
  /**
   * Содержимое ячейки.
   * Если передать строку, то содержимое ячейки
   * будет значением поля с именем равным этой строке.
   *
   * По умолчанию: Значение поля с именем равным ID колонки
   */
  template?: string | ((item: any, index: number) => React.ReactNode);
  /**
   * Выравнивание содержимого.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * "Прилипание" колонки.
   */
  sticky?: 'left' | 'right';
  /**
   * Выделяет колонку среди остальных.
   */
  primary?: boolean;
  /**
   * Ширина колонки в px.
   */
  width?: number;
  /**
   * Горизонтальный sticky scroll у таблицы.
   * Note: таблица не может быть одновременно с фиксированной высотой и со sticky scroll.
   * Sticky scroll не будет работать, если у таблицы будет overflow.
   *
   * По умолчанию: false
   */
  stickyHorizontalScroll?: boolean;
  /**
   * Порог, который должен пересечь родительский блок, чтобы скролл "приклеился".
   * Полезно, например, в консоли, когда плашка от groupActions закрывает скролл.
   *
   * По умолчанию: 0
   */
  stickyHorizontalScrollBreakpoint?: number;
  /**
   * Различные данные, настройки для HOC-ов.
   */
  meta?: Record<string, any>;
}
```

## withTableActions

Добавляет к колонкам таблицы специальную колонку с действиями.

### Props

```ts
interface Props {
  /**
   * Массив конфигов действий для каждой строки.
   */
  getRowActions: (item: any, index: number) => TableActionConfig[];
}
```

### TableActionConfig

```ts
type TableActionConfig = TableAction | TableActionGroup;

interface TableAction {
  /**
   * Текст.
   */
  text: string;
  /**
   * Обработчик клика.
   */
  handler: (item: any, index: number) => void;
  /**
   * Действие заблокировано.
   */
  disabled?: boolean;
  /**
   * Тема.
   *
   * По умолчанию: "normal"
   */
  theme?: 'normal' | 'danger';
}

interface TableActionGroup {
  /**
   * Заголовок группы действий.
   */
  title: string;
  /**
   * Элементы группы действий.
   */
  items: TableActionConfig[];
}
```

### Пример

```jsx
import {Table, withTableActions} from '@yandex-cloud/uikit';

const MyTable = withTableActions(Table);
const data = [
    {id: 1, text: 'Hello'},
    {id: 2, text: 'World'},
];
const columns = [
    {id: 'id'},
    {id: 'text'},
];
const getRowActions = () => {
    return [
        {text: 'Print', handler: () => {}},
        {text: 'Remove', handler: () => {}, theme: 'danger'},
    ];
}

const table = (
    <MyTable
        data={data}
        columns{columns}
        getRowActions={getRowActions}
    />
);
```

## withTableCopy

Добавляет возможность копировать содержимое ячейки или произвольный текст.

### ColumnMeta

```ts
interface ColumnMeta {
  /**
   * Текст для копирования.
   * Если передать true, то будет скопировано содержимое ячейки.
   */
  copy: boolean | ((item: any, index: number) => string | number);
}
```

### Пример

```jsx
import {Table, withTableCopy} from '@yandex-cloud/uikit';

const MyTable = withTableCopy(Table);
const data = [
    {id: 1, text: 'Hello'},
    {id: 2, text: 'World'},
];
const columns = [
    {id: 'id', meta: {copy: ({id}) => `ID #${id}`}},
    {id: 'text', meta: {copy: true}},
];

const table = (
    <MyTable
        data={data}
        columns{columns}
    />
);
```

## withTableSelection

Добавляет возможность выбирать строки в таблице.

### Props

```ts
interface Props {
  /**
   * Выбранные строки.
   */
  selectedIds: string[];
  /**
   * Обработчик на изменение выбранных строк.
   */
  onSelectionChange: (ids: string[]) => void;
}
```

### Пример

```jsx
import {Table, withTableSelection} from '@yandex-cloud/uikit';

const MyTable = withTableSelection(Table);
const data = [
    {id: 1, text: 'Hello'},
    {id: 2, text: 'World'},
];
const columns = [
    {id: 'id'},
    {id: 'text'},
];
const getRowId = 'id';

function SelectionTable() {
    const [selectedIds, setSelectedIds] = React.useState([1]);

    return (
        <MyTable
            data={data}
            columns{columns}
            getRowId={getRowId}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
        />
   );
}
```

## withTableSettings

Добавляет функциональность по настройкам колонок таблицы.

### ColumnMeta

```ts
interface ColumnMeta {
  /**
   * Выбрана ли колонка, если в настройках её нет.
   *
   * По умолчанию: true
   */
  selectedByDefault?: boolean;
  /**
   * Колонка всегда выбрана, изменять её видимость нельзя.
   *
   * По умолчанию: false
   */
  selectedAlways?: boolean;
}
```

### Props

```ts
interface Props {
  /**
   * Ширина попапа компонента TableColumnSetup.
   */
  settingsPopupWidth?: string;
  /**
   * Текущие настройки.
   */
  settings: TableSettingsData;
  /**
   * Ручка обновления настроек.
   */
  updateSettings: (data: TableSettingsData) => Promise<void>;
}
```

### TableSettingsData

```ts
type TableSettingsData = Array<{
  id: string;
  isSelected?: boolean;
}>;
```

### Пример

```jsx
import {Table, withTableSettings} from '@yandex-cloud/uikit';

const MyTable = withTableSettings(Table);
const data = [
  {id: 1, text: 'Hello'},
  {id: 2, text: 'World'},
];
const columns = [{id: 'id'}, {id: 'text'}];

function SelectionTable() {
  const initialSettings = [
    {id: 'id', isSelected: false},
    {id: 'text', isSelected: true},
  ];
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
    />
  );
}
```

## withTableSorting

Добавляет сортировку колонок.

### ColumnMeta

```ts
interface ColumnMeta {
  /**
   * Какая сортировка будет в первую очередь.
   *
   * По умолчанию: "asc"
   */
  defaultSortOrder?: 'asc' | 'desc';
  /**
   * Функция сортировки.
   * Должна возвращать значение для сортировки по возрастанию.
   * Если передать true, сравнватся будут значения ячеек,
   * а сортировка будет выполнена во возрастанию.
   */
  sort: boolean | ((itemA: any, itemB: any) => number);
}
```

### Props

```ts
interface Props {
  /**
   * Начальное состояние сортировки для некотнроллируемого компонента.
   */
  defaultSortState?: TableSortState;
  /**
   * Состояние сортировки.
   */
  sortState?: TableSortState;
  /**
   * Обработчик изменения состояния сортировки.
   */
  onSortStateChange?: (sortState: TableSortState) => void;
}
```

Если не передавать пропсы `sortState` и `onSortStateChange`, то состояние сортировки будет храниться в самом компоненте.

### TableSortState

```ts
type TableSortState = Array<{
  column: string;
  order: 'asc' | 'desc';
}>;
```

### Пример

```jsx
import {Table, withTableSorting} from '@yandex-cloud/uikit';

const MyTable = withTableSorting(Table);
const data = [
    {id: 1, text: 'Hello', date: '2016-10-25'},
    {id: 2, text: 'World', date: '2020-08-15'},
];
const columns = [
    {id: 'id', meta: {sort: true}},
    {id: 'text', meta: {defaultSortOrder: 'desc', sort: (a, b) => Date.parse(a.date) - Date.parse(b.date)}},
];

const table = (
    <MyTable
        data={data}
        columns{columns}
    />
);
```
