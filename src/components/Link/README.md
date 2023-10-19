<!--GITHUB_BLOCK-->

# Link

<!--/GITHUB_BLOCK-->

```tsx
import {Link} from '@gravity-ui/uikit';
```

`Link` is a part of text that, when clicked, takes the user to another part of the page, another page inside the service, or an external website page.

The main difference from [Button](../Button) is the navigation function. Most often, a `Link` leads to other pages or opens new browser tabs.

## Appearance

There are three types available: `normal`(the usual brown), `primary`(black), and `secondary`(gray). You can manage it though the `view` property. You can also display whether the link has been clicked using the `visitable` property.

### Normal

This is the most familiar and well-established 'link' pattern. It is used to visually highlight an element inside a text, table, and as part of navigation. You can use it to navigate both internal pages and external sources, including documentation. Additionally, this type is used for error pages and zero states.

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

Just like primary `Link`, this type is used when it is natively clear to the user that an element is clickable, while navigating through it is not essential and affects a small number of scenarios. The main task is not to distract the user from the key points on the page. The 'Secondary' type is most often used in breadcrumbs or when displaying secondary attributes.

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

## Href

The `href` property is optional. If it is skipped, the `Link` will behave like a `Button`.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Link href="#">Link with href</Link>
<Link>Link without href</Link>
`}>
    <UIKit.Link href="#">Link with href</UIKit.Link>
    <UIKit.Link>Link without href</UIKit.Link>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Link href="#">Link with href</Link>
<Link>Link without href</Link>
```

<!--/GITHUB_BLOCK-->

## Usage

A `Link` can be used both as an independent text element and as part of the text:

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<Text>
    <Link>what roles are active in the service</Link>
</Text>
<Text>
    Currently, this role can only be assigned to a <Link>folder</Link> or <Link>cloud</Link>
</Text>
`}>
    <UIKit.Text>
        <UIKit.Link>what roles are active in the service</UIKit.Link>
    </UIKit.Text>
    <UIKit.Text>
        Currently, this role can only be assigned to a <UIKit.Link>folder</UIKit.Link> or <UIKit.Link>cloud</UIKit.Link>
    </UIKit.Text>
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<Text>
    <Link>What roles are available in the service</Link>
</Text>
<Text>
    Currently, this role can only be assigned to a <Link>folder</Link> or <Link>cloud</Link>
</Text>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name       | Description                                |                                     Type                                     |  Default   |
| :--------- | :----------------------------------------- | :--------------------------------------------------------------------------: | :--------: |
| view       | Link appearance                            |                    `"normal" \| "primary" \| "secondary"`                    | `"normal"` |
| visitable  | Display `:visitable` CSS state             |                            `boolean \| undefined`                            |
| href       | HTML `href` attribute                      |                            `string \| undefined`                             |
| target     | HTML `target` attribute                    |                            `string \| undefined`                             |
| rel        | HTML `rel` attribute                       |                            `string \| undefined`                             |
| title      | HTML `title` attribute                     |                            `string \| undefined`                             |
| children   | Link content                               |                              `React.ReactNode`                               |
| extraProps | Any additional props                       |                            `Record \| undefined`                             |
| onClick    | `click` event handler                      | `React.MouseEventHandler<HTMLAnchorElement \| HTMLSpanElement> \| undefined` |
| onFocus    | `focus` event handler                      | `React.FocusEventHandler<HTMLAnchorElement \| HTMLSpanElement> \| undefined` |
| onBlur     | `blur` event handler                       | `React.FocusEventHandler<HTMLAnchorElement \| HTMLSpanElement> \| undefined` |
| id         | HTML `id` attribute                        |                            `string \| undefined`                             |
| style      | HTML `style` attribute                     |                      `React.CSSProperties \| undefined`                      |
| className  | HTML `class` attribute                     |                            `string \| undefined`                             |
| qa         | HTML `data-qa` attribute, used for testing |                            `string \| undefined`                             |
| ref        | React ref to Link DOM node                 |                `React.ForwardedRef<HTMLElement> \| undefined`                |
