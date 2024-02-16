<!--GITHUB_BLOCK-->

# Breadcrumbs &middot; [![storybook](https://img.shields.io/badge/Storybook-Breadcrumbs-3bc935)](https://preview.gravity-ui.com/uikit/?path=/story/components-navigation-breadcrumbs--default)

<!--/GITHUB_BLOCK-->

```tsx
import {Breadcrumbs} from '@gravity-ui/uikit';
```

`Breadcrumbs` is a navigation element that shows the current location of a page within a website’s hierarchy. It provides links that allow users to return to higher levels in the hierarchy, making it easier to navigate a site with multiple layers. Breadcrumbs are especially useful for large websites and applications with a hierarchical organization of pages.

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

| Name                     | Description                                             | Type                                                                                                    | Default |
| :----------------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :------ |
| items                    | Breadcrumb item array                                   | `BreadcrumbsItem[]`                                                                                     |         |
| className                | CSS class name of root element                          | `string`                                                                                                |         |
| renderRootContent        | Custom render function of first item                    | `((item: BreadcrumbsItem, isCurrent: boolean) => React.ReactNode) \| undefined`                         |         |
| renderItemContent        | Custom render function of N+1 item                      | `((item: BreadcrumbsItem, isCurrent: boolean, isPrevCurrent: boolean) => React.ReactNode) \| undefined` |         |
| renderItemDivider        | Custom render function of items separator               | `(() => React.ReactNode) \| undefined`                                                                  |         |
| firstDisplayedItemsCount | Number of items to display before item collapse control | `FirstDisplayedItemsCount.Zero \| FirstDisplayedItemsCount.One`                                         |         |
| lastDisplayedItemsCount  | Number of items to display after item collapse control  | `LastDisplayedItemsCount.One \| LastDisplayedItemsCount.Two`                                            |         |
| popupStyle               | Style of collapsed item popup                           | `"staircase" \| undefined`                                                                              |         |
| qa                       | HTML `data-qa` attribute, used in tests                 | `string`                                                                                                |         |

### BreadcrumbsItem

| Name   | Description            | Type                                                                              | Default |
| :----- | :--------------------- | :-------------------------------------------------------------------------------- | :------ |
| text   | Breadcrumb content     | `string`                                                                          |         |
| action | `click` event handler  | `React.MouseEventHandler<HTMLElement> \| React.KeyboardEventHandler<HTMLElement>` |         |
| href   | HTML `href` attribute  | `string \| undefined`                                                             |         |
| items  | Breadcrumb item array  | `BreadcrumbsItem[] \| undefined`                                                  |         |
| title  | HTML `title` attribute | `string \| undefined`                                                             |         |
