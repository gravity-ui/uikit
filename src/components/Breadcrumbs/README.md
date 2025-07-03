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
    <UIKitExamples.BreadcrumbsCustomIconExample />
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

### End content

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Breadcrumbs endContent={<div style={{paddingInlineStart: 4}}><Button>Push</Button></div>}>
    <Breadcrumbs.Item>Region</Breadcrumbs.Item>
    <Breadcrumbs.Item>Country</Breadcrumbs.Item>
    <Breadcrumbs.Item>City</Breadcrumbs.Item>
    <Breadcrumbs.Item>District</Breadcrumbs.Item>
    <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
`}
>
    <UIKit.Breadcrumbs endContent={<div style={{paddingInlineStart: 4}}><UIKit.Button>Push</UIKit.Button></div>}>
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
<Breadcrumbs
  endContent={
    <Flex gap={1} spacing={{pl: 1}}>
      <Button>Test1</Button>
      <Button>Test2</Button>
    </Flex>
  }
>
  <Breadcrumbs.Item>Region</Breadcrumbs.Item>
  <Breadcrumbs.Item>Country</Breadcrumbs.Item>
  <Breadcrumbs.Item>City</Breadcrumbs.Item>
  <Breadcrumbs.Item>District</Breadcrumbs.Item>
  <Breadcrumbs.Item>Street</Breadcrumbs.Item>
</Breadcrumbs>
```

<!-- Storybook example -->

<BreadcrumbsEndContent />

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
| id               | Element's unique ID.                                                         | `string`                                   |         |
| className        | CSS class name for the element.                                              | `string`                                   |         |
| style            | Sets the inline style for the element.                                       | `CSSProperties`                            |         |
| aria-label       | Defines a string value that labels the current element.                      | `string`                                   |         |
| aria-labelledby  | Identifies the element(s) that label the current element.                    | `string`                                   |         |
| aria-describedby | Identifies the element(s) that describe the object.                          | `string`                                   |         |
| endContent       | User's node rendered after last breadcrumb item.                             | `React.ReactNode`                          |         |

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
