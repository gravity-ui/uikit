<!--GITHUB_BLOCK-->

# List

<!--/GITHUB_BLOCK-->

```tsx
import {Alert} from '@gravity-ui/uikit';
```

### Items

An item can be a scalar or an arbitrary value (anyway, it must be `truly`).
If the latter, be sure to specify filtering and rendering functions.
The default render just passes an item as text.

The special `item.disabled` field disables an item.

Render and height customization provides plenty of room for experimenting.
For example, the code below lets you emulate groups:

```jsx harmony
<List
  items={[
    {
      title: 'one',
      group: true,
      disabled: true,
    },
    {
      title: 'two',
    },
    {
      title: 'three',
      group: true,
      disabled: true,
    },
    {
      title: 'four',
    },
  ]}
  onItemClick={(value) => console.log(value)}
  renderItem={(item) => {
    if (item.group) {
      return (
        <div className={b('group')}>
          <div className={b('select-text')}>{item.title}</div>
        </div>
      );
    }
    return (
      <div className={b('select')}>
        <div className={b('select-text')}>{item.title}</div>
      </div>
    );
  }}
  itemHeight={(item) => (item.group ? 24 : 36)}
  filterItem={(filter) => (item) => item.title.includes(filter)}
/>
```

### Virtualization

To enable virtualization, make sure one of the following two conditions is set:

1. The `--yc-list-height` variable value is set. In this case, the list height will be fixed and equal to the value specified in this variable.
2. Set the `display: flex` style for the list parent container. In this case, the list will adapt to the container width.

### External management

Sometimes you may want to manage the activity of items from the keyboard by maintaining the focus on an external item.
The `onKeyDown` event forwarding to a list may help you here:

```jsx harmony
<TextInput
    view="default"
    tone="default"
    theme="normal"
    size="s"
    text="Hello!"
    onKeyDown={(...props) => this.firstListRef.current.onKeyDown(...props)}
/>
<List
    ref={this.firstListRef}
    ...
/>
```

Likewise, you can forward `onFocus` and `onBlur` if you need to repeat the behavior when an active item is lost.

### PropTypes

| Property          | Type              | Required | Default | Description                                                                                                                                                                                            |
| :---------------- | :---------------- | :------: | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [items](#items)   | `Array`           |   yes    | []      | List of items.                                                                                                                                                                                         |
| itemHeight        | `Number/Function` |          | 28      | Item height in `px` (or a function that returns the height value for an item). `(item: any) => number`                                                                                                 |
| itemsHeight       | `Number/Function` |          |         | Item list height (or a function that returns the height value for a list). It can be helpful when setting the list height dynamically. `(items: []) => number`                                         |
| renderItem        | `Function`        |          |         | Render function with an item received as an input and a React node returned. `(item: any, isItemActive: bool, itemIndex: number) => React.ReactNode`                                                   |
| filterItem        | `Function`        |          |         | Filtering function that receives a specified string as a search/filter input and returns a function that receives an item as an input and outputs boolean `(filter: string) => (item: any) => boolean` |
| filterable        | `Boolean`         |          | true    | Flag that enables a filter field.                                                                                                                                                                      |
| filterPlaceholder | `String`          |          |         | Placeholder for a filter field.                                                                                                                                                                        |
| filter            | `String`          |          |         | Filter value (if external sorting is used).                                                                                                                                                            |
| filterClassName   | `String`          |          |         | Class for filter input styles                                                                                                                                                                          |
| onChangeFilter    | `Function`        |          |         | Filter change handler (if external sorting is used). `(filter: string) => void`                                                                                                                        |
| onFilterEnd       | `Function`        |          |         | Function invoked after internal filtering is completed. `({items}: {items: T[]}) => void`                                                                                                              |
| emptyPlaceholder  | `String`          |          |         | Placeholder for an empty list.                                                                                                                                                                         |
| sortable          | `Boolean`         |          |         | Flag that enables list sorting.                                                                                                                                                                        |
| sortHandleAlign   | `left` `right`    |          |         | Sorting indicator alignment (left or right).                                                                                                                                                           |
| onSortEnd         | `Function`        |          |         | Sorting event handler. `({oldIndex: number, newIndex: number}) => void`                                                                                                                                |
| virtualized       | `Boolean`         |          | true    | Flag that enables virtualization. If not active, all items are rendered at once.                                                                                                                       |
| onItemClick       | `Function`        |          |         | Item click handler. `(item: any, index: number, fromKeyboard?: bool) => void`                                                                                                                          |
| deactivateOnLeave | `Boolean`         |          | true    | If the flag is set, an item's selection is deactivated once the cursor leaves the item or the list loses its focus. If not set, the last selected item will always be selected.                        |
| activeItemIndex   | `Number`          |          |         | If a value is set, an item with this index is rendered as active ~~until the curse is lifted~~.                                                                                                        |
| selectedItemIndex | `Number`          |          |         | If a value is set, an item with this index is rendered as selected (the background color is from `--g-color-base-selection`).                                                                          |
| itemClassName     | `String`          |          |         | Custom class name to be added to an item container                                                                                                                                                     |
| itemsClassName    | `String`          |          |         | Custom class name to be added to an item list                                                                                                                                                          |
