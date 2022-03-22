## Breadcrumbs

Компонент для хлебных крошек. Умеет прятать крошки которые не помещаются для показа.

### PropTypes

| Property                 | Type       | Required | Default | Description                                                                                                                 |
| :----------------------- | :--------- | :------: | :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| items                    | `Array`    |    ✓     |         | Массив хлебных крошек `BreadcrumbsItem[]`                                                                                   |
| className                | `String`   |          |         | CSS-класс элемента                                                                                                          |
| renderRootContent        | `Function` |          | `500`   | Кастомный рендер для первого элемента `(item: BreadcrumbsItem, isCurrent: boolean) => React.ReactNode;`)                    |
| renderItemContent        | `Function` |          |         | Кастомный рендер для N+1 элемента `(item: BreadcrumbsItem, isCurrent: boolean, isPrevCurrent: boolean) => React.ReactNode;` |
| renderItemDivider        | `Function` |          |         | Кастомный рендер, для разделителя крошек `() => React.ReactNode;`                                                           |
| lastDisplayedItemsCount  | `Enum`     |    ✓     | `1`     | Количество элементов отображаемых справа от схлопывания-многоточия: `LastDisplayedItemsCount`                               |
| firstDisplayedItemsCount | `Enum`     |    ✓     | `0`     | Количество элементов отображаемых слева от схлопывания-многоточия: `FirstDisplayedItemsCount`                               |
| popupStyle               | `String`   |          |         | Стиль отображения элементов в попапе `staircase`                                                                            |

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

return <Breadcrumbs items={items} />;
```
