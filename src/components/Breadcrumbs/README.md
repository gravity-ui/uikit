## Breadcrumbs

Breadcrumbs component. Can collapse breadcrumbs that cause overflow.

### PropTypes

| Name                     | Type       | Required | Default | Description                                                                                                                  |
| :----------------------- | :--------- | :------: | :------ | :--------------------------------------------------------------------------------------------------------------------------- |
| items                    | `Array`    |    ✓     |         | Breadcrumb items array `BreadcrumbsItem[]`                                                                                   |
| className                | `String`   |          |         | CSS class name of root element                                                                                               |
| renderRootContent        | `Function` |          |         | Custom render function of first item `(item: BreadcrumbsItem, isCurrent: boolean) => React.ReactNode;`)                      |
| renderItemContent        | `Function` |          |         | Custom render function of N+1 item `(item: BreadcrumbsItem, isCurrent: boolean, isPrevCurrent: boolean) => React.ReactNode;` |
| renderItemDivider        | `Function` |          |         | Custom render function of items separator `() => React.ReactNode;`                                                           |
| lastDisplayedItemsCount  | `Enum`     |    ✓     |         | Number of items to display after items collapse control: `LastDisplayedItemsCount`                                           |
| firstDisplayedItemsCount | `Enum`     |    ✓     |         | Number of items to display before items collapse control: `FirstDisplayedItemsCount`                                         |
| popupStyle               | `String`   |          |         | Style of collapsed items popup `staircase`                                                                                   |

### Examples

```jsx
const breadcrumbs = [
  {
    title: 'What is love',
  },
  {
    title: "Baby don't hurt me",
  },
  {
    title: "Don't hurt me",
  },
  {
    title: 'No more',
  },
];

return (
  <Breadcrumbs
    items={items}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
  />
);
```
