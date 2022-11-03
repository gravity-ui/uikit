## Table

A table that allows selecting and sorting rows and performing actions on a row.

Additional functionality is enabled via HOCs:

- [withTableActions](#withtableactions)
- [withTableCopy](#withtablecopy)
- [withTableSelection](#withtableselection)
- [withTableSettings](#withtablesettings)
- [withTableSorting](#withtablesorting)

### Props

```ts
interface Props {
  /**
   * Data.
   */
  data: any[];
  /**
   * Column parameters.
   */
  columns: TableColumnConfig[];
  /**
   * Vertical alignment of contents.
   */
  verticalAlign?: 'top' | 'middle';
  /**
   * Row ID.
   * Used when selecting and sorting rows. If you pass a row,
   * its ID will be the value of the field in the row data named the same as the column ID
   */
  getRowId?: string | ((item: any, index: number) => string);
  /**
   * Row CSS classes.
   */
  getRowClassNames?: (item: any, index: number) => string[];
  /**
   * Condition for disabling columns.
   */
  isRowDisabled?: (item: any, index: number) => boolean;
  /**
   * Row click handler.
   */
  onRowClick?: (item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void;
  /**
   * Message returned if data is missing.
   *
   * By default: "No data"
   */
  emptyMessage?: string;
  /**
   * Table CSS class.
   */
  className?: string;
}
```

### TableColumnConfig

```ts
interface TableColumnConfig<I> {
  /**
   * Column ID.
   */
  id: string;
  /**
   * Column name (header).
   *
   * By default: column ID
   */
  name?: string | (() => React.ReactNode);
  /**
   * Stub in the event there is no data in a cell.
   *
   * By default: — (&mdash;)
   */
  placeholder?: string | ((item: any, index: number) => React.ReactNode);
  /**
   * Cell contents.
   * If you pass a row, the cell contents
   * will be the value of the field named the same as this row.
   *
   * By default: The value of the field with the name equal to the column ID
   */
  template?: string | ((item: any, index: number) => React.ReactNode);
  /**
   * Content alignment.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Sticky column.
   */
  sticky?: 'left' | 'right';
  /**
   * Distinguishes a column among other.
   */
  primary?: boolean;
  /**
   * Column width in px.
   */
  width?: number;
  /**
   * Horizontal sticky scroll in a table.
   * Note: A table can't have a fixed height and sticky scroll at the same time.
   * A sticky scroll won't work if a table has an overflow.
   *
   * By default: false
   */
  stickyHorizontalScroll?: boolean;
  /**
   * Threshold that the parent block should pass to make a scroll sticky.
   * Helpful, for example, in the console when the groupActions bar closes the scroll.
   *
   * By default: 0
   */
  stickyHorizontalScrollBreakpoint?: number;
  /**
   * Various data, HOC settings.
   */
  meta?: Record<string, any>;
}
```

## withTableActions

Adds a special column with actions to table columns.

### Props

```ts
interface Props {
  /**
   * Array of action configs for each row.
   */
  getRowActions: (item: any, index: number) => TableActionConfig[];
}
```

### TableActionConfig

```ts
type TableActionConfig = TableAction | TableActionGroup;

interface TableAction {
  /**
   * Text.
   */
  text: string;
  /**
   * Click handler.
   */
  handler: (item: any, index: number) => void;
  /**
   * Action disabled.
   */
  disabled?: boolean;
  /**
   * Theme.
   *
   * By default: "normal"
   */
  theme?: 'normal' | 'danger';
}

interface TableActionGroup {
  /**
   * Action group header.
   */
  title: string;
  /**
   * Action group items.
   */
  items: TableActionConfig[];
}
```

### Example

```jsx
import {Table, withTableActions} from '@gravity-ui/uikit';

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
        {
            text: 'Print', handler: () => {
            }
        },
        {
            text: 'Remove', handler: () => {
            }, theme: 'danger'
        },
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

Allows copying the contents of a cell or any text.

### ColumnMeta

```ts
interface ColumnMeta {
  /**
   * Text to copy.
   * If true is passed, cell contents are copied.
   */
  copy: boolean | ((item: any, index: number) => string | number);
}
```

### Example

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

const table = (
    <MyTable
        data={data}
        columns{columns}
    />
);
```

## withTableSelection

Enables selecting table rows.

### Props

```ts
interface Props {
  /**
   * Rows selected.
   */
  selectedIds: string[];
  /**
   * Selected row change handler.
   */
  onSelectionChange: (ids: string[]) => void;
}
```

### Example

```jsx
import {Table, withTableSelection} from '@gravity-ui/uikit';

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

Enables functionality for table column settings.

### ColumnMeta

```ts
interface ColumnMeta {
  /**
   * Specifies whether a column is selected if it's missing in the settings.
   *
   * By default: true
   */
  selectedByDefault?: boolean;
  /**
   * The column is always selected, you can't change its visibility.
   *
   * By default: false
   */
  selectedAlways?: boolean;
}
```

### Props

```ts
interface Props {
  /**
   * TableColumnSetup pop-up width.
   */
  settingsPopupWidth?: string;
  /**
   * Current settings.
   */
  settings: TableSettingsData;
  /**
   * Settings update handle.
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

### Example

```jsx
import {Table, withTableSettings} from '@gravity-ui/uikit';

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

Enables column sorting.

### ColumnMeta

```ts
interface ColumnMeta {
  /**
   * Sets the primary sorting order.
   *
   * By default: "asc"
   */
  defaultSortOrder?: 'asc' | 'desc';
  /**
   * Sorting function.
   * It should return a value for sorting in ascending order.
   * If true is passed, cell values are compared
   * and sorting is done in ascending order.
   */
  sort: boolean | ((itemA: any, itemB: any) => number);
}
```

### Props

```ts
interface Props {
  /**
   * Default sorting state for an uncontrolled component.
   */
  defaultSortState?: TableSortState;
  /**
   * Sorting state.
   */
  sortState?: TableSortState;
  /**
   * Sorting state change handler.
   */
  onSortStateChange?: (sortState: TableSortState) => void;
}
```

If the `sortState` and `onSortStateChange` props are not passed, the sorting state is stored in the component itself.

### TableSortState

```ts
type TableSortState = Array<{
  column: string;
  order: 'asc' | 'desc';
}>;
```

### Example

```jsx
import {Table, withTableSorting} from '@gravity-ui/uikit';

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
