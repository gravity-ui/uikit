<!--GITHUB_BLOCK-->

# Breadcrumbs

<!--/GITHUB_BLOCK-->

```tsx
import {Breadcrumbs} from '@gravity-ui/uikit';
```

`Breadcrumbs` (хлебные крошки) — это навигационный элемент, показывающий текущее расположение страницы в иерархии сайта. Он содержит ссылки, позволяющие пользователю вернуться на более высокие уровни иерархии, что упрощает навигацию по многоуровневым сайтам. Хлебные крошки незаменимы для крупных веб-сайтов и приложений с иерархической структурой страниц.

## Внешний вид

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs
    items={[
        {
            text: 'Region',
            action: () => {},
        },
        {
            text: 'Country',
            action: () => {},
        },
        {
            text: 'City',
            action: () => {},
        },
        {
            text: 'District',
            action: () => {},
        },
        {
            text: 'Street',
            action: () => {},
        },
    ]}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
/>
`}
>
    <UIKit.Breadcrumbs
        items={[
            {
                text: 'Region',
                action: () => {},
            },
            {
                text: 'Country',
                action: () => {},
            },
            {
                text: 'City',
                action: () => {},
            },
            {
                text: 'District',
                action: () => {},
            },
            {
                text: 'Street',
                action: () => {},
            },
        ]}
        firstDisplayedItemsCount={1}
        lastDisplayedItemsCount={1}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const breadcrumbs = [
  {
    text: 'Region',
    action: () => {},
  },
  {
    text: 'Country',
    action: () => {},
  },
  {
    text: 'City',
    action: () => {},
  },
  {
    text: 'District',
    action: () => {},
  },
  {
    text: 'Street',
    action: () => {},
  },
];

return (
  <Breadcrumbs
    items={items}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
  />
);
```

<!--/GITHUB_BLOCK-->

### Пользовательский разделитель

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs
    items={[
        {
            text: 'Region',
            action: () => {},
        },
        {
            text: 'Country',
            action: () => {},
        },
        {
            text: 'City',
            action: () => {},
        },
        {
            text: 'District',
            action: () => {},
        },
        {
            text: 'Street',
            action: () => {},
        },
    ]}
    renderItemDivider={() => '>'}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
/>
`}
>
    <UIKit.Breadcrumbs
        items={[
            {
                text: 'Region',
                action: () => {},
            },
            {
                text: 'Country',
                action: () => {},
            },
            {
                text: 'City',
                action: () => {},
            },
            {
                text: 'District',
                action: () => {},
            },
            {
                text: 'Street',
                action: () => {},
            },
        ]}
        renderItemDivider={() => '>'}
        firstDisplayedItemsCount={1}
        lastDisplayedItemsCount={1}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const breadcrumbs = [
  {
    text: 'Region',
    action: () => {},
  },
  {
    text: 'Country',
    action: () => {},
  },
  {
    text: 'City',
    action: () => {},
  },
  {
    text: 'District',
    action: () => {},
  },
  {
    text: 'Street',
    action: () => {},
  },
];

return (
  <Breadcrumbs
    items={items}
    renderItemDivider={() => '>'}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
  />
);
```

<!--/GITHUB_BLOCK-->

### Пользовательский заголовок

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs
    items={[
        {
            text: 'Region',
            title: 'Custom title for Region',
            action: () => {},
        },
        {
            text: 'Country',
            title: 'Custom title for Country',
            action: () => {},
        },
        {
            text: 'City',
            title: 'Custom title for City',
            action: () => {},
        },
        {
            text: 'District',
            title: 'Custom title for District',
            action: () => {},
        },
        {
            text: 'Street',
            title: 'Custom title for Street',
            action: () => {},
        },
    ]}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
/>
`}
>
    <UIKit.Breadcrumbs
        items={[
            {
                text: 'Region',
                title: 'Custom title for Region',
                action: () => {},
            },
            {
                text: 'Country',
                title: 'Custom title for Country',
                action: () => {},
            },
            {
                text: 'City',
                title: 'Custom title for City',
                action: () => {},
            },
            {
                text: 'District',
                title: 'Custom title for District',
                action: () => {},
            },
            {
                text: 'Street',
                title: 'Custom title for Street',
                action: () => {},
            },
        ]}
        firstDisplayedItemsCount={1}
        lastDisplayedItemsCount={1}
    />
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const breadcrumbs = [
  {
    text: 'Region',
    title: 'Custom title for Region',
    action: () => {},
  },
  {
    text: 'Country',
    title: 'Custom title for Country',
    action: () => {},
  },
  {
    text: 'City',
    title: 'Custom title for City',
    action: () => {},
  },
  {
    text: 'District',
    title: 'Custom title for District',
    action: () => {},
  },
  {
    text: 'Street',
    title: 'Custom title for Street',
    action: () => {},
  },
];

return (
  <Breadcrumbs
    items={items}
    firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
    lastDisplayedItemsCount={LastDisplayedItemsCount.One}
  />
);
```

<!--/GITHUB_BLOCK-->

## Свойства

| Имя                      | Описание                                                                    | Тип                                                                                                     | Значение по умолчанию |
| :----------------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :-------------------- |
| items                    | Массив элементов хлебных крошек.                                            | `BreadcrumbsItem[]`                                                                                     |                       |
| className                | Имя CSS-класса корневого элемента.                                          | `string`                                                                                                |                       |
| renderRootContent        | Пользовательская функция для отрисовки элемента 1.                          | `((item: BreadcrumbsItem, isCurrent: boolean) => React.ReactNode) \| undefined`                         |                       |
| renderItemContent        | Пользовательская функция для отрисовки элемента N+1.                        | `((item: BreadcrumbsItem, isCurrent: boolean, isPrevCurrent: boolean) => React.ReactNode) \| undefined` |                       |
| renderItemDivider        | Пользовательская функция для отрисовки разделителя элементов.               | `(() => React.ReactNode) \| undefined`                                                                  |                       |
| renderItem               | Пользовательская функция для отрисовки элементов.                           | `(props: RenderBreadcrumbsItemProps<T>) => React.ReactNode) \| undefined`                               |                       |
| firstDisplayedItemsCount | Количество элементов, которые будут отображены перед контролом свертывания. | `FirstDisplayedItemsCount.Zero \| FirstDisplayedItemsCount.One`                                         |                       |
| lastDisplayedItemsCount  | Количество элементов, которые будут отображены после контрола свертывания.  | `LastDisplayedItemsCount.One \| LastDisplayedItemsCount.Two`                                            |                       |
| popupStyle               | Стиль всплывающего окна для свернутого элемента.                            | `"staircase" \| undefined`                                                                              |                       |
| qa                       | HTML-атрибут `data-qa`, используется для тестирования.                      | `string`                                                                                                |                       |

### RenderBreadcrumbsItemProps`<T>`

| Имя           |        Тип        |
| :------------ | :---------------: |
| children      | `React.ReactNode` |
| item          |        `T`        |
| isCurrent     |     `boolean`     |
| isPrevCurrent |     `boolean`     |

### BreadcrumbsItem

| Имя    | Описание                         | Тип                                                                               | Значение по умолчанию |
| :----- | :------------------------------- | :-------------------------------------------------------------------------------- | :-------------------- |
| text   | Содержимое хлебных крошек.       | `string`                                                                          |                       |
| action | Обработчик события `click`.      | `React.MouseEventHandler<HTMLElement> \| React.KeyboardEventHandler<HTMLElement>` |                       |
| href   | HTML-атрибут `href`.             | `string \| undefined`                                                             |                       |
| items  | Массив элементов хлебных крошек. | `BreadcrumbsItem[] \| undefined`                                                  |                       |
| title  | HTML-атрибут `title`.            | `string \| undefined`                                                             |                       |
