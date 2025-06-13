<!--GITHUB_BLOCK-->

## Table

<!--/GITHUB_BLOCK-->

```jsx
import {Table} from '@gravity-ui/uikit';
```

A `Table` allows selecting and sorting rows, as well as performing actions on a row.

<!--GITHUB_BLOCK-->

Additional features are enabled through HOCs:

- [withTableActions](#usage-with-hoc-withtableactions)
- [withTableCopy](#usage-with-hoc-withtablecopy)
- [withTableSelection](#usage-with-hoc-withtableselection)
- [withTableSettings](#usage-with-hoc-withtablesettings)
- [withTableSorting](#usage-with-hoc-withtablesorting)

<!--/GITHUB_BLOCK-->

## Properties

| Name                             | Description                                                                                                                                                                            |                                        Type                                        |   Default   |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------: | :---------: |
| data                             | Data                                                                                                                                                                                   |                                      `any[]`                                       |             |
| columns                          | Column settings                                                                                                                                                                        |                               `TableColumnConfig[]`                                |             |
| verticalAlign                    | Vertical alignment of content                                                                                                                                                          |                                 `"top"` `"middle"`                                 |             |
| getRowDescriptor                 | Handler to get the row descriptor                                                                                                                                                      |                   `(item: any, index: number) => DescriptorType`                   |             |
| getRowId                         | Row ID used when selecting and sorting rows. If you skip a row, its ID will be the value of the field in the row data with the same name as the column ID.                             |                 `string` `((item: any, index: number) => string)`                  |             |
| getRowClassNames                 | Row CSS classes                                                                                                                                                                        |                      `(item: any, index: number) => string[]`                      |             |
| isRowDisabled                    | Condition for disabling columns                                                                                                                                                        |                      `(item: any, index: number) => boolean`                       |             |
| onRowClick                       | Row click handler                                                                                                                                                                      | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| onRowMouseEnter                  | Row mouseenter handler                                                                                                                                                                 | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| onRowMouseLeave                  | Row mouseleave handler                                                                                                                                                                 | `(item: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void` |             |
| emptyMessage                     | Returning a message if the data is missing                                                                                                                                             |                                      `string`                                      | `"No data"` |
| className                        | Table CSS class                                                                                                                                                                        |                                      `string`                                      |             |
| edgePadding                      | Adds horizontal padding for edge cells                                                                                                                                                 |                                     `boolean`                                      |             |
| stickyHorizontalScroll           | Adds a horizontal sticky scroll in a table. Note: A table cannot have a fixed height and a sticky scroll at the same time. A sticky scroll will not work if the table has an overflow. |                                     `boolean`                                      |   `false`   |
| stickyHorizontalScrollBreakpoint | Threshold the parent block should reach before making a scroll sticky. This is useful in the console, such as when the `groupActions` bar overlaps the scroll.                         |                                      `number`                                      |     `0`     |

### DescriptorType

| Name        | Description                                 |    Type    | Default |
| :---------- | :------------------------------------------ | :--------: | :-----: |
| id          | Row ID used when selecting and sorting rows |  `string`  |         |
| disabled    | Condition for disabling columns             | `boolean`  |         |
| interactive | Show row hover                              | `boolean`  |         |
| classNames  | Row CSS classes                             | `string[]` |         |

### TableColumnConfig

| Name        | Description                                                                                                        |                            Type                            |                         Default                         |
| :---------- | :----------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------: | :-----------------------------------------------------: |
| id          | Column ID                                                                                                          |                          `string`                          |                                                         |
| name        | Column name (header)                                                                                               |             `string` `(() => React.ReactNode)`             |                        column ID                        |
| className   | CSS class that will be added to all cells in the column                                                            |                          `string`                          |                                                         |
| placeholder | Stub when there is no data in a cell                                                                               | `string` `((item: any, index: number) => React.ReactNode)` |                      `— (&mdash;)`                      |
| template    | Cell contents. If you skip a row, the cell contents will be the value of the field with the same name as this row. | `string` `((item: any, index: number) => React.ReactNode)` | Value of the field with the name equal to the column ID |
| align       | Content alignment                                                                                                  |                `"start"` `"center"` `"end"`                |                                                         |
| sticky      | Sticky column                                                                                                      |                     `"start"` `"end"`                      |                                                         |
| primary     | Identifies a column as primary as opposed to others                                                                |                         `boolean`                          |                                                         |
| width       | Column's content width in pixels                                                                                   |                     `number` `string`                      |                                                         |
| meta        | _displayName_: name to be shown in Table Settings widget; other miscellaneous data including the HOC settings      |                   `Record<string, any>`                    |                                                         |

## Using `Table` with the `withTableActions` HOC

This HOC adds a special column with actions to table columns.

### Properties

| Name             | Description                                    |                           Type                           |
| :--------------- | :--------------------------------------------- | :------------------------------------------------------: |
| getRowActions    | Array of action configs for each row           |   `(item: any, index: number) => TableActionConfig[]`    |
| renderRowActions | Render function for Actions Cell               | `(props: {item: any; index: number}) => React.ReactNode` |
| rowActionsSize   | Size of the action button and popup menu items |                 `"s"` `"m"` `"l"` `"xl"`                 |
| rowActionsIcon   | Custom Icon for Actions Cell                   |                    `React.ReactNode`                     |

### TableActionConfig

```ts
type TableActionConfig = TableAction | TableActionGroup;
```

#### TableAction

| Name     | Description                                                              |                 Type                 |  Default   |
| :------- | :----------------------------------------------------------------------- | :----------------------------------: | :--------: |
| text     | Text                                                                     |               `string`               |            |
| handler  | Click handler                                                            | `(item: any, index: number) => void` |            |
| disabled | Action disabled                                                          |              `boolean`               |            |
| href     | A menu item with this property becomes a link to the specified location. |               `string`               |            |
| target   | Same as the `target` attribute of the `<a>` tag.                         |               `string`               |            |
| rel      | Same as the `rel` attribute of the `<a>` tag.                            |               `string`               |            |
| theme    | Theme                                                                    |        `"normal"` `"danger"`         | `"normal"` |
| icon     | Icon to display next to the text                                         |          `React.ReactNode`           |            |

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

## Using `Table` with the `withTableCopy` HOC

This HOC enables copying the contents of a cell or any other text.

### ColumnMeta

| Name | Description                                                           |                                            Type                                             |
| :--- | :-------------------------------------------------------------------- | :-----------------------------------------------------------------------------------------: |
| copy | Text to copy. If the value is true, copying cell contents is allowed. | `boolean` `((item: any, index: number) => string)` `((item: any, index: number) => number)` |

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

## Using `Table` with the `withTableSelection` HOC

This HOC enables selecting table rows.

### Properties

| Name              | Description                 |           Type            |
| :---------------- | :-------------------------- | :-----------------------: |
| selectedIds       | Selected rows               |        `string[]`         |
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

## Using `Table` with the `withTableSettings` HOC

This HOC enables features for table column settings. You can use it in two ways:

```jsx
import {Table, withTableSettings} from './withTableSettings';

// No options passed
const MyTable1 = withTableSettings(Table);
// or with options
const MyTable1 = withTableSettings({sortable: false})(Table);
```

### Options

| Name       | Description                                  |       Type       | Default |
| :--------- | :------------------------------------------- | :--------------: | :-----: |
| width      | Settings popup width                         | `number` `"fit"` |         |
| sortable   | Enables or disables sorting settings items   |    `boolean`     | `true`  |
| filterable | Enables or disables filtering settings items |    `boolean`     | `false` |

### ColumnMeta

| Name              | Description                                                               |   Type    | Default |
| :---------------- | :------------------------------------------------------------------------ | :-------: | :-----: |
| selectedByDefault | Enables or disables selecting a column if it is missing from the settings | `boolean` | `true`  |
| selectedAlways    | Makes the column always selected. You cannot change its visibility.       | `boolean` | `false` |

### Properties

| Name                       | Description                                                  |                           Type                           |
| :------------------------- | :----------------------------------------------------------- | :------------------------------------------------------: |
| settingsPopupWidth         | `TableColumnSetup` pop-up width                              |                     `number` `"fit"`                     |
| settings                   | Current settings                                             |                   `TableSettingsData`                    |
| updateSettings             | Settings update handler                                      |       `(data: TableSettingsData) => Promise<void>`       |
| renderControls             | Enables rendering custom actions                             |                     `RenderControls`                     |
| settingsFilterPlaceholder  | Text that appears in the control when no search value is set |                         `string`                         |
| settingsFilterEmptyMessage | Text that appears when no item is found                      |                         `string`                         |
| filterSettings             | Function for filtering items                                 | `(value: string, item: TableColumnSetupItem) => boolean` |

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

### Example

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

## Using `Table` with the `withTableSorting` HOC

This HOC enables column sorting.

### ColumnMeta

| Name             | Description                                                                                                                                                    |                       Type                       | Default |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------: | :-----: |
| defaultSortOrder | Sets the primary sorting order                                                                                                                                 |                 `"asc"` `"desc"`                 |  `asc`  |
| sort             | Sorting function. It should return a value for sorting in the ascending order. If set to true, the cell values are compared and sorted in the ascending order. | `boolean` `((itemA: any, itemB: any) => number)` |         |

### Properties

| Name              | Description                                         |                 Type                  |
| :---------------- | :-------------------------------------------------- | :-----------------------------------: |
| defaultSortState  | Default sorting state for an uncontrolled component |           `TableSortState`            |
| sortState         | Sorting state                                       |           `TableSortState`            |
| onSortStateChange | Sorting state change handle                         | `(sortState: TableSortState) => void` |

If the `sortState` and `onSortStateChange` properties are missing, the sorting state is stored in the component itself.

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
