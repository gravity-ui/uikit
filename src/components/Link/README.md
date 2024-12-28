<!--GITHUB_BLOCK-->

# Link

<!--/GITHUB_BLOCK-->

```tsx
import {Link} from '@gravity-ui/uikit';
```

`Link` is a part of text that, when clicked, takes the user to another part of the page, another page within the service, or an external website page.

Its main difference from [Button](../Button) is the navigation function. Most often, a `Link` leads to another page or opens a new browser tab.

## Appearance

There are three types of links available: `normal` (the usual brown), `primary` (black), and `secondary` (gray). You can manage it with the `view` property. You can also enable displaying that the link has already been clicked using the `visitable` property.

### Normal

This is the most familiar and well-established `link` pattern. It is used to visually highlight an element inside a text or table, and as part of navigation. You can use it to navigate to both internal pages and external sources, including documentation. Additionally, this type is used for error pages and zero states.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link view="normal" href="#">Link</Link>
`}>
    <UIKit.Link view="normal" href="#">Link</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link view="normal" href="#">
  Link
</Link>
```

<!--/GITHUB_BLOCK-->

### Primary

This type is used when it is natively clear that an element is clickable, but using a brown `Link` will overload the interface and prevent you from properly highlighting key points on a page.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link view="primary" href="#">Link</Link>
`}>
    <UIKit.Link view="primary" href="#">Link</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link view="primary" href="#">
  Link
</Link>
```

<!--/GITHUB_BLOCK-->

### Secondary

Just like primary `Link`, this type is used when it is natively clear to the user that an element is clickable, while navigating through it is not essential and affects a small number of scenarios. Its main goal is not to distract the user from the key points on the page. The `Secondary` type is most often used in breadcrumbs or when displaying secondary attributes.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link view="secondary" href="#">Link</Link>
`}>
    <UIKit.Link view="secondary" href="#">Link</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link view="secondary" href="#">
  Link
</Link>
```

<!--/GITHUB_BLOCK-->

### Visitable

This property is used to show that the `Link` has already been clicked.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link href="https://gravity-ui.com/" visitable>Link</Link>
`}>
    <UIKit.Link href="https://gravity-ui.com/" visitable>Link</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link href="https://gravity-ui.com/" visitable>
  Link
</Link>
```

<!--/GITHUB_BLOCK-->

## `href`

The `href` property is required.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link href="#">Link with href</Link>
`}>
    <UIKit.Link href="#">Link with href</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link href="#">Link with href</Link>
```

<!--/GITHUB_BLOCK-->

## Usage

You can use a `Link` both as an independent text element and as part of the text:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Text>
    <Link href="#">what roles are active in the service</Link>
</Text>
<Text>
    Currently, this role can only be assigned to a <Link href="#">folder</Link> or <Link href="#">cloud</Link>
</Text>
`}>
    <UIKit.Text>
        <UIKit.Link href="#">what roles are active in the service</UIKit.Link>
    </UIKit.Text>
    <UIKit.Text>
        Currently, this role can only be assigned to a <UIKit.Link href="#">folder</UIKit.Link> or <UIKit.Link href="#">cloud</UIKit.Link>
    </UIKit.Text>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text>
    <Link href="#">What roles are available in the service</Link>
</Text>
<Text>
    Currently, this role can only be assigned to a <Link href="#">folder</Link> or <Link href="#">cloud</Link>
</Text>
```

<!--/GITHUB_BLOCK-->

## Properties

`Link` accepts any valid `a` element props in addition to these:

| Name      | Description                                |                 Type                 |  Default   |
| :-------- | :----------------------------------------- | :----------------------------------: | :--------: |
| children  | `Link` content                             |          `React.ReactNode`           |            |
| href      | `href` HTML attribute                      |               `string`               |            |
| qa        | `data-qa` HTML attribute, used for testing |               `string`               |            |
| underline | Displays underline underneath the `Link`   |              `boolean`               |  `false`   |
| view      | `Link` appearance                          | `"normal"` `"primary"` `"secondary"` | `"normal"` |
| visitable | Displays the `:visitable` CSS state        |              `boolean`               |  `false`   |
