<!--GITHUB_BLOCK-->

## Table

<!--/GITHUB_BLOCK-->

```jsx
import {Table} from '@gravity-ui/uikit';
```

A table that allows the selecting and sorting of rows, and performing actions on a row.

<!--GITHUB_BLOCK-->

Additional functionality is enabled via HOCs:

- [withTableActions](#usage-with-hoc-withtableactions)
- [withTableCopy](#usage-with-hoc-withtablecopy)
- [withTableSelection](#usage-with-hoc-withtableselection)
- [withTableSettings](#usage-with-hoc-withtablesettings)
- [withTableSorting](#usage-with-hoc-withtablesorting)

<!--/GITHUB_BLOCK-->

## Properties

| Name                             | Description                                                                                                                                                                     |                                        Type                                        |   Default   |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------: | :---------: |
| data                             | Data                                                                                                                                                                            |                                      `any[]`                                       |             |
| columns                          | Column parameters                                                                                                                                                               |                               `TableColumnConfig[]`                                |             |
| verticalAlign                    | Vertical alignment of contents                                                                                                                                                  |                                 `"top"` `"middle"`                                 |             |
| getRowDescriptor                 | Handler to get row descriptor                                                                                                                                                   |                   `(item: any, index: number) => DescriptorType                    |             |
| getRowId                         | The row ID, used when selecting and sorting rows. If you skip a row, its ID will be the value of the field in the row data with the same name as the column ID                  |                 `string` `((item: any, index: number) => string)`                  |             |
| getRowClassNames                 | Row CSS classes                                                                                                                                                                 |                      `(item: any, index: number) => string[]`                      |             |
| isRowDisabled                    | Condition for disabling columns                                                                                                                                                 |                      `(item: any, index: number) => boolean`                       |             |
| onRowClick                       | Row click handler                                                                                                                                                               | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| onRowMouseEnter                  | Row mouseenter handler                                                                                                                                                          | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| onRowMouseLeave                  | Row mouseleave handler                                                                                                                                                          | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| emptyMessage                     | The message returned if data is missing.                                                                                                                                        |                                      `string`                                      | `"No data"` |
| className                        | Table CSS class                                                                                                                                                                 |                                      `string`                                      |             |
| edgePadding                      | Adds horizontal padding for edge cells                                                                                                                                          |                                     `boolean`                                      |             |
| stickyHorizontalScroll           | A horizontal sticky scroll in a table. NB: A table cannot have a fixed height and a sticky scroll at the same time. A sticky scroll will not work if the table has an overflow. |                                     `boolean`                                      |   `false`   |
| stickyHorizontalScrollBreakpoint | The threshold that the parent block should reach before making a scroll sticky. This is useful in the console, for example, when the groupActions bar closes the scroll.        |                                      `number`                                      |     `0`     |

### DescriptorType

| Name       | Description                                      |    Type     | Default |
| :--------- | :----------------------------------------------- | :---------: | :-----: |
| id         | The row ID, used when selecting and sorting rows |  `string`   |         |
| disabled   | Column ID                                        |  `boolean`  |         |
| classNames | Row CSS classes                                  | ` string[]` |         |

### TableColumnConfig

| Name        | Description                                                                                                        |                            Type                            |                           Default                           |
| :---------- | :----------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------: | :---------------------------------------------------------: |
| id          | Column ID                                                                                                          |                          `any[]`                           |                                                             |
| name        | Column name (header)                                                                                               |             `string` `(() => React.ReactNode)`             |                          column ID                          |
| placeholder | The stub when there is no data in a cell                                                                           | `string` `((item: any, index: number) => React.ReactNode)` |                        `— (&mdash;)`                        |
| template    | Cell contents. If you skip a row, the cell contents will be the value of the field with the same name as this row. | `string` `((item: any, index: number) => React.ReactNode)` | The value of the field with the name equal to the column ID |
| align       | Content alignment                                                                                                  |               `"left"` `"center"` `"right"`                |                                                             |
| sticky      | Sticky column                                                                                                      |                     `"left"` `"right"`                     |                                                             |
| primary     | Distinguishes a column among other                                                                                 |                         `boolean`                          |                                                             |
| width       | Column's content width in px                                                                                       |                     `number` `string`                      |                                                             |
| meta        | Various data, HOC settings                                                                                         |                   `Record<string, any>`                    |                                                             |

## Usage with HOC `withTableActions`

Adds a special column with actions to table columns.

### Properties

| Name           | Description                                 |                        Type                         |
| :------------- | :------------------------------------------ | :-------------------------------------------------: |
| getRowActions  | Array of action configs for each row        | `(item: any, index: number) => TableActionConfig[]` |
| rowActionsSize | Size of actions button and popup menu items |              `"s"` `"m"` `"l"` `"xl"`               |

### TableActionConfig

```ts
type TableActionConfig = TableAction | TableActionGroup;
```

#### TableAction

| Name     | Description     |                 Type                 |  Default   |
| :------- | :-------------- | :----------------------------------: | :--------: |
| text     | Text            |               `string`               |            |
| handler  | Click handler   | `(item: any, index: number) => void` |            |
| disabled | Action disabled |              `boolean `              |            |
| theme    | Theme           |        `"normal"` `"danger"`         | `"normal"` |

#### TableActionGroup

| Name  | Description         |         Type          |
| :---- | :------------------ | :-------------------: |
| title | Action group header |       `string`        |
| items | Action group items  | `TableActionConfig[]` |

### Example

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

## Usage with HOC `withTableCopy`

Allows the contents of a cell or any text to be copied.

### ColumnMeta

| Name | Description                                                             |                                            Type                                             |
| :--- | :---------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------: |
| copy | The text to be copies. If true is passed, the cell contents are copied. | `boolean` `((item: any, index: number) => string)` `((item: any, index: number) => number)` |

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

const table = <MyTable data={data} columns={columns} />;
```

## Usage with HOC `withTableSelection`

Enables the selection of table rows.

### Properties

| Name              | Description                 |           Type            |
| :---------------- | :-------------------------- | :-----------------------: |
| selectedIds       | Rows selected               |        `string[]`         |
| onSelectionChange | Selected row change handler | `(ids: string[]) => void` |

### Example

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

## Usage with HOC `withTableSettings`

Enables functionality for table column settings. You can use ut in two forms:

```jsx
import {Table, withTableSettings} from './withTableSettings';

// No options passed
const MyTable1 = withTableSettings(Table);
// or with options
const MyTable1 = withTableSettings({sortable: false})(Table);
```

### Options

| Name     | Description                                       |       Type        | Default |
| :------- | :------------------------------------------------ | :---------------: | :-----: |
| width    | Settings' popup width                             | `number` `string` |         |
| sortable | Whether or not add ability to sort settings items |     `boolean`     | `true`  |

### ColumnMeta

| Name              | Description                                                                |   Type    | Default |
| :---------------- | :------------------------------------------------------------------------- | :-------: | :-----: |
| selectedByDefault | Specifies whether a column is selected if it is missing from the settings. | `boolean` | `true`  |
| selectedAlways    | Makes the column always selected. You cannot change its visibility.        | `boolean` | `false` |

### Properties

| Name               | Description                   |                     Type                     |
| :----------------- | :---------------------------- | :------------------------------------------: |
| settingsPopupWidth | TableColumnSetup pop-up width |              `number` `string`               |
| settings           | Current settings              |             `TableSettingsData`              |
| updateSettings     | Settings update handle        | `(data: TableSettingsData) => Promise<void>` |

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

const MyTable = withTableSettings({width: 100, sortable: false})(Table);
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

## Usage with HOC `withTableSorting`

Enables column sorting.

### ColumnMeta

| Name             | Description                                                                                                                                               |                       Type                       | Default |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------: | :-----: |
| defaultSortOrder | Sets the primary sorting order                                                                                                                            |                 `"asc"` `"desc"`                 |  `asc`  |
| sort             | The sorting function. It should return a value for sorting in ascending order. If true is passed, cell values are compared and sorted in ascending order. | `boolean` `((itemA: any, itemB: any) => number)` |         |

### Properties

| Name              | Description                                         |                 Type                  |
| :---------------- | :-------------------------------------------------- | :-----------------------------------: |
| defaultSortState  | Default sorting state for an uncontrolled component |           `TableSortState`            |
| sortState         | Sorting state                                       |           `TableSortState`            |
| onSortStateChange | Sorting state change handle                         | `(sortState: TableSortState) => void` |

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
  {
    id: 'text',
    meta: {defaultSortOrder: 'desc', sort: (a, b) => Date.parse(a.date) - Date.parse(b.date)},
  },
];

const table = <MyTable data={data} columns={columns} />;
```
