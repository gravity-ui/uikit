<!--GITHUB_BLOCK-->

# Breadcrumbs

<!--/GITHUB_BLOCK-->

```tsx
import {Breadcrumbs} from '@gravity-ui/uikit';
```

`Breadcrumbs` is a navigation element that shows the current location of a page within a website’s hierarchy. It provides links that allow users to return to higher levels in the hierarchy, making it easier to navigate through a website with multiple layers. Breadcrumbs are especially useful for large websites and applications with hierarchy-based structure of pages.

## Appearance

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

### Custom divider

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

### Custom title

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

## Properties

| Name                     | Description                                                 | Type                                                                                                    | Default |
| :----------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :------ |
| items                    | Breadcrumbs item array                                      | `BreadcrumbsItem[]`                                                                                     |         |
| className                | CSS class name of the root element                          | `string`                                                                                                |         |
| renderRootContent        | Custom render function of item 1                            | `((item: BreadcrumbsItem, isCurrent: boolean) => React.ReactNode) \| undefined`                         |         |
| renderItemContent        | Custom render function of item N+1                          | `((item: BreadcrumbsItem, isCurrent: boolean, isPrevCurrent: boolean) => React.ReactNode) \| undefined` |         |
| renderItemDivider        | Custom render function of item separator                    | `(() => React.ReactNode) \| undefined`                                                                  |         |
| renderItem               | Custom render function of items                             | `(props: RenderBreadcrumbsItemProps<T>) => React.ReactNode) \| undefined`                               |         |
| firstDisplayedItemsCount | Number of items to display before the item collapse control | `FirstDisplayedItemsCount.Zero \| FirstDisplayedItemsCount.One`                                         |         |
| lastDisplayedItemsCount  | Number of items to display after the item collapse control  | `LastDisplayedItemsCount.One \| LastDisplayedItemsCount.Two`                                            |         |
| popupStyle               | Style of the collapsed item popup                           | `"staircase" \| undefined`                                                                              |         |
| qa                       | `data-qa` HTML attribute, used for testing                  | `string`                                                                                                |         |

### RenderBreadcrumbsItemProps`<T>`

| Name          |       Type        |
| :------------ | :---------------: |
| children      | `React.ReactNode` |
| item          |        `T`        |
| isCurrent     |     `boolean`     |
| isPrevCurrent |     `boolean`     |

### BreadcrumbsItem

| Name   | Description            | Type                                                                              | Default |
| :----- | :--------------------- | :-------------------------------------------------------------------------------- | :------ |
| text   | Breadcrumbs content    | `string`                                                                          |         |
| action | `click` event handler  | `React.MouseEventHandler<HTMLElement> \| React.KeyboardEventHandler<HTMLElement>` |         |
| href   | `href` HTML attribute  | `string \| undefined`                                                             |         |
| items  | Breadcrumbs item array | `BreadcrumbsItem[] \| undefined`                                                  |         |
| title  | `title` HTML attribute | `string \| undefined`                                                             |         |
