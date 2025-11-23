<!--GITHUB_BLOCK-->

# TableColumnSetup

<!--/GITHUB_BLOCK-->

```tsx
import {TableColumnSetup} from '@gravity-ui/uikit';
```

The `TableColumnSetup` component provides a user interface for configuring table column visibility and order. It displays a button that opens a popup with a list of available columns, allowing users to show/hide columns and optionally reorder them via drag and drop.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
const items = [
    {id: 'name', title: 'Name', selected: true, required: true},
    {id: 'email', title: 'Email', selected: true},
    {id: 'phone', title: 'Phone', selected: false},
];

<TableColumnSetup
    items={items}
    onUpdate={(updatedItems) => console.log(updatedItems)}
/>
`}
>
    <UIKit.TableColumnSetup
        items={[
            {id: 'name', title: 'Name', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Phone', selected: false},
        ]}
        onUpdate={(updatedItems) => console.log(updatedItems)}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
const items = [
  {id: 'name', title: 'Name', selected: true, required: true},
  {id: 'email', title: 'Email', selected: true},
  {id: 'phone', title: 'Phone', selected: false},
];

<TableColumnSetup items={items} onUpdate={(updatedItems) => console.log(updatedItems)} />;
```

<!--/GITHUB_BLOCK-->

## Sortable columns

Enable drag and drop functionality to allow users to reorder columns by setting the `sortable` property to `true`.

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
            {id: 'name', title: 'Name', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Phone', selected: false},
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

## Apply modes

Control when changes are applied using the `hideApplyButton` property:

- `true` - Changes are applied immediately when user toggles columns
- `false` - Changes are applied only when user clicks the Apply button

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
            {id: 'name', title: 'Name', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Phone', selected: false},
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

## Status display

Show the count of selected columns in the switcher button by enabling the `showStatus` property.

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
            {id: 'name', title: 'Name', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Phone', selected: false},
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

## Custom switcher

Customize the trigger button using the `renderSwitcher` property.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<TableColumnSetup
    items={items}
    renderSwitcher={({onClick, onKeyDown}) => (
        <Button onClick={onClick} onKeyDown={onKeyDown} view="outlined">
            Configure Columns
        </Button>
    )}
    onUpdate={(updatedItems) => console.log(updatedItems)}
/>
`}
>
    <UIKit.TableColumnSetup
        items={[
            {id: 'name', title: 'Name', selected: true, required: true},
            {id: 'email', title: 'Email', selected: true},
            {id: 'phone', title: 'Phone', selected: false},
        ]}
        renderSwitcher={({onClick, onKeyDown}) => (
            <UIKit.Button onClick={onClick} onKeyDown={onKeyDown} view="outlined">
                Configure Columns
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
      Configure Columns
    </Button>
  )}
  onUpdate={(updatedItems) => console.log(updatedItems)}
/>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name            | Description                                                     |                            Type                             | Default |
| :-------------- | :-------------------------------------------------------------- | :---------------------------------------------------------: | :-----: |
| items           | Array of column configuration items                             |                  `TableColumnSetupItem[]`                   |         |
| onUpdate        | Callback fired when column configuration changes                |          `(items: TableColumnSetupItem[]) => void`          |         |
| disabled        | Disables the switcher button                                    |                          `boolean`                          | `false` |
| sortable        | Enables drag and drop sorting of columns                        |                          `boolean`                          | `true`  |
| hideApplyButton | When to apply changes: immediately or manually via Apply button |                          `boolean`                          | `false` |
| showStatus      | Shows selected/total columns count in switcher button           |                          `boolean`                          | `false` |
| popupWidth      | Width of the popup                                              |                      `number \| 'fit'`                      |         |
| popupPlacement  | Popup placement relative to trigger                             |      [`PopupPlacement`](../Popup/README.md#properties)      |         |
| renderSwitcher  | Custom render function for the switcher button                  | `(props: SwitcherProps) => React.ReactElement \| undefined` |         |
| switcher        | **Deprecated.** Use `renderSwitcher` instead                    |              `React.ReactElement \| undefined`              |         |
| getItemTitle    | Function to get item title                                      |      `(item: TableColumnSetupItem) => React.ReactNode`      |         |
| className       | Custom CSS class for the root element                           |                          `string`                           |         |

### TableColumnSetupItem

| Name     | Description                                       |        Type         | Default |
| :------- | :------------------------------------------------ | :-----------------: | :-----: |
| id       | Unique identifier for the column                  |      `string`       |         |
| title    | Display title for the column                      |  `React.ReactNode`  |         |
| selected | Whether the column is currently visible           |      `boolean`      |         |
| required | Whether the column is required (cannot be hidden) |      `boolean`      |         |
| sticky   | Sticky positioning for the column                 | `'left' \| 'right'` |         |

### SwitcherProps

| Name      | Description                            |                   Type                    |
| :-------- | :------------------------------------- | :---------------------------------------: |
| onClick   | Click event handler for the switcher   |  `React.MouseEventHandler<HTMLElement>`   |
| onKeyDown | KeyDown event handler for the switcher | `React.KeyboardEventHandler<HTMLElement>` |
