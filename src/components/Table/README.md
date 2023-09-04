<!--GITHUB_BLOCK-->

## Table

<!--/GITHUB_BLOCK-->

```jsx
import {Table} from '@gravity-ui/uikit';
```


A table that allows selecting and sorting rows and performing actions on a row.

<!--GITHUB_BLOCK-->

Additional functionality is enabled via HOCs:

- [withTableActions](#withtableactions)
- [withTableCopy](#withtablecopy)
- [withTableSelection](#withtableselection)
- [withTableSettings](#withtablesettings)
- [withTableSorting](#withtablesorting)

<!--/GITHUB_BLOCK-->

## Properties

| Name             | Description                                                                                                                                            |                                        Type                                        |   Default   |
|:-----------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------:|:-----------:|
| data             | Data                                                                                                                                                   |                                      `any[]`                                       |             |
| columns          | Column parameters                                                                                                                                      |                               `TableColumnConfig[]`                                |             |
| verticalAlign    | Vertical alignment of contents                                                                                                                         |                                 `"top"` `"middle"`                                 |             |
| getRowId         | Row ID. Used when selecting and sorting rows. If you pass a row, its ID will be the value of the field in the row data named the same as the column ID |                `"string"` `((item: any, index: number) => string)`                 |             |
| getRowClassNames | Row CSS classes                                                                                                                                        |                      `(item: any, index: number) => string[]`                      |             |
| isRowDisabled    | Condition for disabling columns                                                                                                                        |                      `(item: any, index: number) => boolean`                       |             |
| onRowClick       | Row click handler                                                                                                                                      | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| onRowMouseEnter  | Row mouseenter handler                                                                                                                                 | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| onRowMouseLeave  | Row mouseleave handler                                                                                                                                 | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| emptyMessage     | Message returned if data is missing.                                                                                                                   |                                      `string`                                      | `"No data"` |
| className        | Table CSS class                                                                                                                                        |                                      `string`                                      |             |
| edgePadding      | Adds horizontal padding for edge cells                                                                                                                 |                                     `boolean`                                      |             |

### TableColumnConfig

| Name                             | Description                                                                                                                                                            |                            Type                            |                           Default                           |
|:---------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------:|:-----------------------------------------------------------:|
| id                               | Column ID                                                                                                                                                              |                          `any[]`                           |                                                             |
| name                             | Column name (header)                                                                                                                                                   |            `string`  `(() => React.ReactNode)`             |                          column ID                          |
| placeholder                      | Stub in the event there is no data in a cell                                                                                                                           | `string` `((item: any, index: number) => React.ReactNode)` |                        `— (&mdash;)`                        |
| template                         | Cell contents. If you pass a row, the cell contents will be the value of the field named the same as this row                                                          | `string` `((item: any, index: number) => React.ReactNode)` | The value of the field with the name equal to the column ID |
| align                            | Content alignment                                                                                                                                                      |               `"left"` `"center"` `"right"`                |                                                             |
| sticky                           | Sticky column                                                                                                                                                          |                    `"left"`  `"right"`                     |                                                             |
| primary                          | Distinguishes a column among othe                                                                                                                                      |                         `boolean`                          |                                                             |
| width                            | Column width in px                                                                                                                                                     |                          `number`                          |                                                             |
| stickyHorizontalScroll           | Horizontal sticky scroll in a table. Note: A table can't have a fixed height and sticky scroll at the same time. A sticky scroll won't work if a table has an overflow |                         `boolean`                          |                           `false`                           |
| stickyHorizontalScrollBreakpoint | Threshold that the parent block should pass to make a scroll sticky. Helpful, for example, in the console when the groupActions bar closes the scroll                  |                          `number`                          |                             `0`                             |
| meta                             | Various data, HOC settings                                                                                                                                             |                   `Record<string, any>`                    |                                                             |

## Usage with HOC `withTableActions`

Adds a special column with actions to table columns.

### Properties

| Name           | Description                                 |                         Type                          |
|:---------------|:--------------------------------------------|:-----------------------------------------------------:|
| getRowActions  | Array of action configs for each row        |  `(item: any, index: number) => TableActionConfig[]`  |
| rowActionsSize | Size of actions button and popup menu items |               `"s"` `"m"` `"l"` `"xl"`                |


### TableActionConfig

```ts
type TableActionConfig = TableAction | TableActionGroup;
```
#### TableAction

| Name     | Description     |                 Type                 |   Default   |
|:---------|:----------------|:------------------------------------:|:-----------:|
| text     | Text            |               `string`               |             |
| handler  | Click handler   | `(item: any, index: number) => void` |             |
| disabled | Action disabled |              `boolean `              |             |
| theme    | Action disabled |        `"normal"` `"danger"`         | `"normal"`  |

#### TableActionGroup

| Name  | Description         |          Type          |
|:------|:--------------------|:----------------------:|
| title | Action group header |        `string`        |
| items | Action group items  | `TableActionConfig[]`  |

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

## Usage with HOC `withTableCopy`

Allows copying the contents of a cell or any text.

### ColumnMeta

| Name     | Description                                               |                                            Type                                             |
|:---------|:----------------------------------------------------------|:-------------------------------------------------------------------------------------------:|
| copy     | Text to copy. If true is passed, cell contents are copied | `boolean` `((item: any, index: number) => string)` `((item: any, index: number) => number)` |

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

## Usage with HOC `withTableSelection`

Enables selecting table rows.

### Properties

| Name              | Description                  |           Type            |
|:------------------|:-----------------------------|:-------------------------:|
| selectedIds       | Rows selected                |        `string[]`         |
| onSelectionChange | Selected row change handler  | `(ids: string[]) => void` |

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

## Usage with HOC `withTableSettings`

Enables functionality for table column settings.

### ColumnMeta

| Name              | Description                                                            |    Type    | Default |
|:------------------|:-----------------------------------------------------------------------|:----------:|:-------:|
| selectedByDefault | Specifies whether a column is selected if it's missing in the settings | `boolean`  | `true`  |
| selectedAlways    | The column is always selected, you can't change its visibility         | `boolean`  | `false` |


### Properties

| Name               | Description                   |                     Type                     |
|:-------------------|:------------------------------|:--------------------------------------------:|
| settingsPopupWidth | TableColumnSetup pop-up width |                   `string`                   |
| settings           | Current settings              |             `TableSettingsData`              |
| updateSettings     | Settings update handl         | `(data: TableSettingsData) => Promise<void>` |

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

## Usage with HOC `withTableSorting`

Enables column sorting.

### ColumnMeta

| Name             | Description                                                                                                                                                   |                       Type                        | Default |
|:-----------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------:|:-------:|
| defaultSortOrder | Sets the primary sorting order                                                                                                                                |                 `"asc"` `"desc"`                  |  `asc`  |
| sort             | Sorting function. It should return a value for sorting in ascending order. If true is passed, cell values are compared and sorting is done in ascending order | `boolean` `((itemA: any, itemB: any) => number)`  |         |


### Properties

| Name              | Description                                         |                 Type                  |
|:------------------|:----------------------------------------------------|:-------------------------------------:|
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
    {id: 'text', meta: {defaultSortOrder: 'desc', sort: (a, b) => Date.parse(a.date) - Date.parse(b.date)}},
];

const table = (
    <MyTable
        data={data}
        columns{columns}
    />
);
```
