<!--GITHUB_BLOCK-->

# List

<!--/GITHUB_BLOCK-->

```tsx
import {List} from '@gravity-ui/uikit';
```

### ItemsHeight

Determines the item list height (or a function that returns the height value for a list). It can be helpful when setting the list height dynamically, e.g., `(items: []) => number`.

### Items

Provides an array of items for a list:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} />
`}>
    <UIKit.List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<List items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']} itemsHeight={160} />
```

<!--/GITHUB_BLOCK-->

An item can be a scalar or an arbitrary value and must be `truthy` in any case.
If it is an arbitrary value, make sure to specify the filtering and rendering functions.
The default render only provides an item as text.

The special `item.disabled` field disables an item.

The render and height customization provides plenty of room for experimenting.
For example, the code below allows you to emulate groups:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<List items={[{title: 'one', group: true,disabled: true}, {title: 'two'},
    {
      title: 'three',
      group: true,
      disabled: true,
    },
    {
      title: 'four',
    },
  ]} onItemClick={(value) => console.log(value)}
  renderItem={(item) => {
    if (item.group) {
      return (
        <div className={'group'}>
          <div className={'select-text'}>{item.title}</div>
        </div>
      );
    }
    return (
      <div className={'select'}>
        <div className={'select-text'}>{item.title}</div>
      </div>
    );
  }}
  itemHeight={(item) => (item.group ? 24 : 36)}
  itemsHeight={160}
  filterItem={(filter) => (item) => item.title.includes(filter)}
/>
`}>
    <UIKit.List items={[
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
  ]} onItemClick={(value) => console.log(value)}
  renderItem={(item) => {
    if (item.group) {
      return (
        <div className={'group'}>
          <div className={'select-text'}>{item.title}</div>
        </div>
      );
    }
    return (
      <div className={'select'}>
        <div className={'select-text'}>{item.title}</div>
      </div>
    );
  }}
  itemHeight={(item) => (item.group ? 24 : 36)}
  itemsHeight={160}
  filterItem={(filter) => (item) => item.title.includes(filter)}
/>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
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
        <div className={'group'}>
          <div className={'select-text'}>{item.title}</div>
        </div>
      );
    }
    return (
      <div className={'select'}>
        <div className={'select-text'}>{item.title}</div>
      </div>
    );
  }}
  itemHeight={(item) => (item.group ? 24 : 36)}
  itemsHeight={160}
  filterItem={(filter) => (item) => item.title.includes(filter)}
/>
```

<!--/GITHUB_BLOCK-->

### Filterable

The `filterable` property disables the input to search for an item if its value is `false`. Its default value is `true`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} filterable={false} />
`}>
    <UIKit.List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} filterable={false} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<List
  items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']}
  itemsHeight={160}
  filterable={false}
/>
```

<!--/GITHUB_BLOCK-->

### Sortable

The `sortable` property enables swapping list items if its value is `true`. Its default value is `false`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} sortable={true} />
`}>
    <UIKit.List items={["one", "two", "three", "four", "five", "six", "seven"]} itemsHeight={160} sortable={true} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<List
  items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']}
  itemsHeight={160}
  sortable={true}
/>
```

<!--/GITHUB_BLOCK-->

### Virtualization

To enable virtualization, make sure one of these two conditions is met:

1. You set the `itemsHeight` property. In this case, the list height will be fixed and equal to that value.
2. You set the `display: flex` style for the list parent container. In this case, the list will adapt to the container width.

### External management

Sometimes, you may want to manage the activity of items from the keyboard by maintaining the focus on an external item.
The `onKeyDown` event forwarding to a list may help you here.
Likewise, you can forward `onFocus` and `onBlur` if you need to repeat the behavior when an active item is lost.

### Filter

The `filter` property provides the filter value used with external sorting.

### PropTypes

| Name              | Description                                                                                                                                                                                                 | Type              | Default |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- | :------ |
| [items](#items)   | List of items                                                                                                                                                                                               | `Array`           | []      |
| itemHeight        | Item height in `px` or a function that returns the height value for an item: `(item: any) => number`.                                                                                                       | `Number/Function` | 28      |
| itemsHeight       | Item list height or a function that returns the height value for a list. It can be helpful when setting the list height dynamically: `(items: []) => number`.                                               | `Number/Function` |         |
| renderItem        | Render function with an item received as an input and a React node returned: `(item: any, isItemActive: bool, itemIndex: number) => React.ReactNode`.                                                       | `Function`        |         |
| filterItem        | Filtering function that receives a specified string as a search or filter input and returns a function that receives an item as an input and outputs boolean: `(filter: string) => (item: any) => boolean`. | `Function`        |         |
| filterable        | Flag that enables a filter field.                                                                                                                                                                           | `Boolean`         | true    |
| filterPlaceholder | Placeholder for a filter field.                                                                                                                                                                             | `String`          |         |
| filter            | Filter value (in case external sorting is used).                                                                                                                                                            | `String`          |         |
| filterClassName   | Class for filter input styles.                                                                                                                                                                              | `String`          |         |
| onChangeFilter    | Filter change handler (in case external sorting is used): `(filter: string) => void`.                                                                                                                       | `Function`        |         |
| onFilterEnd       | Function invoked after internal filtering is complete: `({items}: {items: T[]}) => void`                                                                                                                    | `Function`        |         |
| emptyPlaceholder  | Placeholder for an empty list.                                                                                                                                                                              | `React.ReactNode` |         |
| sortable          | Flag that enables list sorting.                                                                                                                                                                             | `Boolean`         |         |
| sortHandleAlign   | Sorting indicator alignment (left or right).                                                                                                                                                                | `left` `right`    |         |
| onSortEnd         | Sorting event handler: `({oldIndex: number, newIndex: number}) => void`.                                                                                                                                    | `Function`        |         |
| virtualized       | Flag that enables virtualization. If inactive, all items are rendered at once.                                                                                                                              | `Boolean`         | true    |
| onItemClick       | Item click handler: `(item: any, index: number, fromKeyboard?: bool) => void`.                                                                                                                              | `Function`        |         |
| deactivateOnLeave | If this flag is set, the item selection is deactivated once the cursor leaves the item or the list loses its focus. If not set, the last selected item will always be selected.                             | `Boolean`         | true    |
| activeItemIndex   | If a value is set, an item with this index is rendered as active.                                                                                                                                           | `Number`          |         |
| selectedItemIndex | If a value is set, an item with this index is rendered as selected (the background color is taken from `--g-color-base-selection`).                                                                         | `Number/Array`    |         |
| itemClassName     | Custom class name to add to an item container.                                                                                                                                                              | `String`          |         |
| itemsClassName    | Custom class name to add to an item list.                                                                                                                                                                   | `String`          |         |
| role              | `role` HTML attribute                                                                                                                                                                                       | `String`          | list    |
| id                | `id` HTML attribute                                                                                                                                                                                         | `string`          |         |
| onChangeActive    | Fires when the index of an option in the listbox that is visually highlighted as having keyboard focus is changed: `(index?: number) => void`.                                                              | `Function`        |         |
