<!--GITHUB_BLOCK-->

# Breadcrumbs

<!--/GITHUB_BLOCK-->

```tsx
import {Breadcrumbs} from '@gravity-ui/uikit';
```

`Breadcrumbs` is a navigation element that shows the current location of a page within a website’s hierarchy. It provides links that allow users to return to higher levels in the hierarchy, making it easier to navigate through a website with multiple layers. Breadcrumbs are especially useful for large websites and applications with hierarchy-based structure of pages.

## Example

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs>
    <Breadcrumbs.Item>Region</Breadcrumbs.Item>
    <Breadcrumbs.Item>Country</Breadcrumbs.Item>
    <Breadcrumbs.Item>City</Breadcrumbs.Item>
    <Breadcrumbs.Item>District</Breadcrumbs.Item>
    <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item>Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Country</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Street</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item>Region</Breadcrumbs.Item>
  <Breadcrumbs.Item>Country</Breadcrumbs.Item>
  <Breadcrumbs.Item>City</Breadcrumbs.Item>
  <Breadcrumbs.Item>District</Breadcrumbs.Item>
  <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsExample />

<!--/GITHUB_BLOCK-->

### Events

Use the `onAction` property as a callback to handle click events on items.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs onAction={(id) => alert(id)}>
    <Breadcrumbs.Item key={1}>Region</Breadcrumbs.Item>
    <Breadcrumbs.Item key={2}>Country</Breadcrumbs.Item>
    <Breadcrumbs.Item key={3}>City</Breadcrumbs.Item>
    <Breadcrumbs.Item key={4}>District</Breadcrumbs.Item>
    <Breadcrumbs.Item key={5}>Street</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs onAction={(id) => alert(id)}>
        <UIKit.Breadcrumbs.Item key={1}>Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key={2}>Country</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key={3}>City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key={4}>District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key={5}>Street</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
const [currentId, setCurrentId] = React.useState();
const items = [
    {id: 1, label: 'Region'},
    {id: 2, label: 'Country'},
    {id: 3, label: 'City'},
    {id: 4, label: 'District'},
    {id: 5, label: 'Street'},
]
<div>
    <Breadcrumbs onAction={setCurrentId}>
        {items.map((i) => <Breadcrumbs.Item key={i.id}>{i.label}</Breadcrumbs.Item>)}
    </Breadcrumbs>
    <p>You clicked item ID: {currentId}</p>
</div>
```

<!-- Storybook example -->

<BreadcrumbsEvents />

<!--/GITHUB_BLOCK-->

### Links

In `Breadcrumbs`, clicking an item normally triggers `onAction`. However, you can also use them as links to other pages or websites. To do that, add the `href` property to the `<Breadcrumbs.Item>` component:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs>
    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item href="/">Home</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="/components">Components</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsLinks />

<!--/GITHUB_BLOCK-->

### Root context

To help users understand the overall structure, some applications always show the starting point (root item) of the Breadcrumbs, even when other items are hidden due to space limitations.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Box overflow="hidden" width={200}>
    <Breadcrumbs showRoot>
        <Breadcrumbs.Item key="home">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item key="trendy">Trendy</Breadcrumbs.Item>
        <Breadcrumbs.Item key="2020 assets">March 2020 Assets</Breadcrumbs.Item>
        <Breadcrumbs.Item key="winter">Winter</Breadcrumbs.Item>
        <Breadcrumbs.Item key="holiday">Holiday</Breadcrumbs.Item>
    </Breadcrumbs>
</Box>
`}
>
<UIKit.Box overflow="hidden" width={200}>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item key="home">Home</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key="trendy">Trendy</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key="2020 assets">March 2020 Assets</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key="winter">Winter</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item key="holiday">Holiday</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</UIKit.Box>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Box overflow="hidden" width={200}>
  <Breadcrumbs showRoot>
    <Breadcrumbs.Item key="home">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item key="trendy">Trendy</Breadcrumbs.Item>
    <Breadcrumbs.Item key="2020 assets">March 2020 Assets</Breadcrumbs.Item>
    <Breadcrumbs.Item key="winter">Winter</Breadcrumbs.Item>
    <Breadcrumbs.Item key="holiday">Holiday</Breadcrumbs.Item>
  </Breadcrumbs>
</Box>
```

<!-- Storybook example -->

<BreadcrumbsRootContext />

<!--/GITHUB_BLOCK-->

### Separator

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs separator=">">
    <Breadcrumbs.Item>Region</Breadcrumbs.Item>
    <Breadcrumbs.Item>Country</Breadcrumbs.Item>
    <Breadcrumbs.Item>City</Breadcrumbs.Item>
    <Breadcrumbs.Item>District</Breadcrumbs.Item>
    <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs separator=">">
        <UIKit.Breadcrumbs.Item>Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Country</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>Street</UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs separator="›">
  {breadcrumbs}
</Breadcrumbs>
<Breadcrumbs separator="—">
  {breadcrumbs}
</Breadcrumbs>
<Breadcrumbs separator={<ChevronRight />}>
  {breadcrumbs}
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsSeparator />

<!--/GITHUB_BLOCK-->

### Breadcrumbs with icons

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <House /> uikit
    </Flex>
  </Breadcrumbs.Item>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <Flame /> components
    </Flex>
  </Breadcrumbs.Item>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <Rocket style={{minWidth: 16}} />
      <Text ellipsis variant="inherit">
        Breadcrumbs
      </Text>
    </Flex>
  </Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item>
            <UIKit.Flex alignItems="center" gap={1}>
                <UIKit.Icon data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12.5 12.618c.307-.275.5-.674.5-1.118V6.977a1.5 1.5 0 0 0-.585-1.189l-3.5-2.692a1.5 1.5 0 0 0-1.83 0l-3.5 2.692A1.5 1.5 0 0 0 3 6.978V11.5A1.496 1.496 0 0 0 4.493 13H5V9.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2V13h.507c.381-.002.73-.146.993-.382Zm2-1.118a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3V6.977A3 3 0 0 1 2.67 4.6l3.5-2.692a3 3 0 0 1 3.66 0l3.5 2.692a3.003 3.003 0 0 1 1.17 2.378V11.5Zm-5-2A.5.5 0 0 0 9 9H7a.5.5 0 0 0-.5.5V13h3V9.5Z" clip-rule="evenodd"/></svg>
                )} /> uikit
            </UIKit.Flex>
        </UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>
            <UIKit.Flex alignItems="center" gap={1}>
                <UIKit.Icon data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="m6.452 6.864 1.13-2.173a31.715 31.715 0 0 1 1.872-3.095c.964 1.045 1.906 2.3 2.612 3.622.748 1.402 1.184 2.789 1.184 4.032 0 1.427-.904 2.83-2.153 3.613.058-.265.09-.553.09-.863 0-1.255-.674-2.336-1.143-2.963a8.82 8.82 0 0 0-1.01-1.125l-.024-.02-.008-.008L9 7.88l-.001-.001C8.996 7.88 8.996 7.878 8 9a7.03 7.03 0 0 0 .984 1.133c.37.534.704 1.2.704 1.867 0 .77-.313 1.276-.618 1.587-.159.162-.279.38-.314.6a.786.786 0 0 0 0 .264.694.694 0 0 0 .06.182c.113.225.343.37.594.35 2.836-.235 5.34-2.87 5.34-5.733 0-3.149-2.177-6.538-4.357-8.845A1.313 1.313 0 0 0 9.435 0 1.32 1.32 0 0 0 8.35.556 33.486 33.486 0 0 0 6.25 4l-.955-1.337a.986.986 0 0 0-1.589-.018C2.62 4.123 1.25 6.249 1.25 9.25c0 2.863 2.504 5.498 5.34 5.733.25.02.481-.125.593-.35a.672.672 0 0 0 .06-.182.786.786 0 0 0 .001-.263 1.145 1.145 0 0 0-.314-.601c-.305-.31-.617-.817-.617-1.587 0-.666.333-1.333.703-1.867l.09-.128C7.544 9.405 8 9 8 9l-.997-1.12H7l-.003.003-.008.007-.024.021-.073.07a8.827 8.827 0 0 0-.937 1.056c-.47.626-1.143 1.707-1.143 2.962 0 .31.033.598.09.863C3.654 12.08 2.75 10.677 2.75 9.25c0-2.171.847-3.812 1.745-5.126l.534.748 1.423 1.992ZM8 9l.997-1.121L8 6.993l-.997.886L8 9Z" clipRule="evenodd" /></svg>
                )} /> components
            </UIKit.Flex>
        </UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item>
            <UIKit.Flex alignItems="center" gap={1}>
                <UIKit.Icon data={() => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill="currentColor" fill-rule="evenodd" d="M15.37 1.268a.75.75 0 0 0-.62-.634 7.745 7.745 0 0 0-7.516 3.055l-.156.212-2.59.112a.75.75 0 0 0-.433.16L.696 6.827a.75.75 0 0 0 .206 1.292L4.25 9.352c.673.273 1.13.56 1.484.913.352.353.64.811.913 1.484l1.234 3.35a.75.75 0 0 0 1.292.205l2.652-3.36a.75.75 0 0 0 .16-.431l.113-2.591.212-.156a7.745 7.745 0 0 0 3.058-7.498ZM4.794 5.501l1.144-.05-1.69 2.302-1.572-.58 2.118-1.672Zm4.032 7.822-.58-1.572 2.302-1.69-.05 1.145-1.672 2.117Zm5.127-11.277a6.246 6.246 0 0 0-5.511 2.531l-2.78 3.786c.425.237.8.51 1.132.842.332.332.606.707.842 1.133l3.786-2.78a6.246 6.246 0 0 0 2.53-5.512ZM2.378 13.952a5.36 5.36 0 0 1-.377.053 5.52 5.52 0 0 1 .05-.366c.104-.59.294-1.014.527-1.247.244-.244.694-.274 1.004.036.31.31.281.76.036 1.005-.223.223-.644.413-1.24.519ZM.48 15.069a7.796 7.796 0 0 1 .025-1.18c.082-.838.33-1.876 1.012-2.557.853-.854 2.253-.838 3.126.035.873.874.89 2.273.036 3.126-1.082 1.082-3.112 1.068-3.735 1.036a.487.487 0 0 1-.319-.145.486.486 0 0 1-.145-.316Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs></svg>
                )} />
                <UIKit.Text varian="inherit" ellipsis>
                    Breadcrumbs
                </UIKit.Text>
            </UIKit.Flex>
        </UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <House /> uikit
    </Flex>
  </Breadcrumbs.Item>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <Flame /> components
    </Flex>
  </Breadcrumbs.Item>
  <Breadcrumbs.Item>
    <Flex alignItems="center" gap={1}>
      <Rocket style={{minWidth: 16}} />
      <Text ellipsis variant="inherit">
        Breadcrumbs
      </Text>
    </Flex>
  </Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsWithIcons />

<!--/GITHUB_BLOCK-->

### Integration with routers

<!--GITHUB_BLOCK-->

#### React Router

```jsx
import {useLinkClickHandler, useHref} from 'react-router';
import {Breadcrumbs, BreadcrumbsItem} from '@gravity-ui/uikit';

function RouterLink({to, ...rest}) {
  const href = useHref(to);
  const onClick = useLinkClickHandler(to);
  return <BreadcrumbsItem {...rest} href={href} onClick={onClick} />;
}

function Navigation() {
  return (
    <Breadcrumbs itemComponent={RouterLink}>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/components">Components</RouterLink>
      <RouterLink to="/components/breadcrumbs">Breadcrumbs</RouterLink>
    </Breadcrumbs>
  );
}
```

#### Next.js

```jsx
import Link from 'next/link';
import {Breadcrumbs, BreadcrumbsItem} from '@gravity-ui/uikit';

function RouterLink({href, ...rest}) {
  return (
    <Link href={href} passHref legacyBehavior>
      <BreadcrumbsItem {...rest} />;
    </Link>
  );
}

function Navigation() {
  return (
    <Breadcrumbs itemComponent={RouterLink}>
      <RouterLink href="/">Home</RouterLink>
      <RouterLink href="/components">Components</RouterLink>
      <RouterLink href="/components/breadcrumbs">Breadcrumbs</RouterLink>
    </Breadcrumbs>
  );
}
```

#### Tanstack Router

```jsx
import {createLink} from '@tanstack/react-router';
import {Breadcrumbs, BreadcrumbsItem} from '@gravity-ui/uikit';

const RouterLink = createLink(BreadcrumbsItem);

function Navigation() {
  return (
    <Breadcrumbs itemComponent={RouterLink}>
      <RouterLink href="/">Home</RouterLink>
      <RouterLink href="/components">Components</RouterLink>
      <RouterLink href="/components/breadcrumbs">Breadcrumbs</RouterLink>
    </Breadcrumbs>
  );
}
```

<!-- Storybook example -->

<BreadcrumbsClientNavigation />

<!--/GITHUB_BLOCK-->

### Landmarks

When breadcrumbs are used as a main navigation element for a page, they can be placed in a [navigation landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html). Landmarks help the assistive technology users quickly find major sections of a page. To create a navigation landmark, place breadcrumbs inside a `<nav>` element with an `aria-label`:

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<nav aria-label="Breadcrumbs">
  <Breadcrumbs>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
  </Breadcrumbs>
</nav>
`}
>
    <nav aria-label="Breadcrumbs">
        <UIKit.Breadcrumbs>
            <UIKit.Breadcrumbs.Item href="/">Home</UIKit.Breadcrumbs.Item>
            <UIKit.Breadcrumbs.Item href="/components">Components</UIKit.Breadcrumbs.Item>
            <UIKit.Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</UIKit.Breadcrumbs.Item>
        </UIKit.Breadcrumbs>
    </nav>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<nav aria-label="Breadcrumbs">
  <Breadcrumbs>
    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/components/uikit/breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
  </Breadcrumbs>
</nav>
```

<!-- Storybook example -->

<BreadcrumbsLinks />

<!--/GITHUB_BLOCK-->

### Disabled items

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs>
    <Breadcrumbs.Item href="#Region">Region</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#Country" disabled>
        Country
    </Breadcrumbs.Item>
    <Breadcrumbs.Item href="#City">City</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#District">District</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#Street" disabled>
        Street
    </Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs>
        <UIKit.Breadcrumbs.Item href="#Region">Region</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="#Country" disabled>
            Country
        </UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="#City">City</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="#District">District</UIKit.Breadcrumbs.Item>
        <UIKit.Breadcrumbs.Item href="#Street" disabled>
            Street
        </UIKit.Breadcrumbs.Item>
    </UIKit.Breadcrumbs>
</ExampleBlock>

LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```jsx
<Breadcrumbs>
  <Breadcrumbs.Item href="#Region">Region</Breadcrumbs.Item>
  <Breadcrumbs.Item href="#Country" disabled>
    Country
  </Breadcrumbs.Item>
  <Breadcrumbs.Item href="#City">City</Breadcrumbs.Item>
  <Breadcrumbs.Item href="#District">District</Breadcrumbs.Item>
  <Breadcrumbs.Item href="#Street" disabled>
    Street
  </Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsDisabledItems />

<!--/GITHUB_BLOCK-->

## Properties

| Name             | Description                                                                  | Type                                       | Default |
| :--------------- | :--------------------------------------------------------------------------- | :----------------------------------------- | :------ |
| children         | Breadcrumb items                                                             | `React.ReactElement<BreadcrumbsItemProps>` |         |
| disabled         | Determines whether `Breadcrumbs` are disabled.                               | `boolean`                                  |         |
| showRoot         | Enables or disables always showing the root item if the items are collapsed. | `boolean`                                  |         |
| popupPlacement   | Style of the collapsed item popup.                                           | `PopupPlacement`                           |         |
| popupStyle       | Style of the collapsed item popup.                                           | `"staircase"`                              |         |
| qa               | `data-qa` HTML attribute, used for testing                                   | `string`                                   |         |
| separator        | Custom separator node.                                                       | `React.ReactNode`                          | "/"     |
| action           | `click` event handler.                                                       | `(id: Key) => void`                        |         |
| navigate         | Client-side navigation.                                                      | `(href: string) => void`                   |         |
| id               | Element's unique ID.                                                         | `string`                                   |         |
| className        | CSS class name for the element.                                              | `string`                                   |         |
| style            | Sets the inline style for the element.                                       | `CSSProperties`                            |         |
| aria-label       | Defines a string value that labels the current element.                      | `string`                                   |         |
| aria-labelledby  | Identifies the element(s) that label the current element.                    | `string`                                   |         |
| aria-describedby | Identifies the element(s) that describe the object.                          | `string`                                   |         |

### BreadcrumbsItemProps

| Name       | Description                                                    | Type                              | Default |
| :--------- | :------------------------------------------------------------- | :-------------------------------- | :------ |
| children   | Breadcrumbs content.                                           | `string`                          |         |
| title      | String representation of the item contents.                    | `string`                          |         |
| aria-label | Accessibility label for the item.                              | `string`                          |         |
| href       | URL to use for the hyperlink.                                  | `string`                          |         |
| target     | Target window for the link.                                    | `React.HTMLAttributeAnchorTarget` |         |
| rel        | Relationship between the linked resource and the current page. | `string`                          |         |
| disabled   | Whether the BreadcrumbsItem is disabled.                       | `boolean`                         |         |
