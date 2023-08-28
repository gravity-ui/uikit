<!--GITHUB_BLOCK-->

# Link

<!--/GITHUB_BLOCK-->

```tsx
import {Link} from '@gravity-ui/uikit';
```

`Link` - is a part of the text, that, when clicked, takes the user to another part of the page, another page inside the service, or to a page of another external service.

The main difference from the [Button](../Button) is the navigation function. `Link` more often lead to other pages or open new browser tabs.

## Appearance

There can be three types: `normal`(the usual brown), `primary`(black), `secondary`(gray). It is controlled by the `view` property. It is also possible to display visited state using the `visitable` property.

### Normal

The most familiar and well-established pattern of use for users. It is used to visually highlight an element inside a text, table, and as part of navigation. It is used to navigate to pages inside the service and to external sources, including documentation. Also, they are used on error pages and zero states.

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

They are used when it is natively clear to the user that it is possible to interact with an element, but visually using brown `Link` will overload the interface and disrupt the balance of accents on the page.

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

Like primary `Link`, they are used when it is natively clear to the user that an element can be interacted with, and the need to navigate through them is secondary and affects a small number of scenarios. The main task is not to argue with the accents on the page. It is more often used in bread crumbs or when displaying secondary attributes.

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

Used to show that the `Link` has already been visited.

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

`href` property is optional. If it is absent, then `Link` wil act like `Button`.

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

Сan be used as an independent text element, or as part of the text

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
    <Link>what roles are active in the service</Link>
</Text>
<Text>
    Currently, this role can only be assigned to a <Link>folder</Link> or <Link>cloud</Link>
</Text>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name       | Description                             |                                     Type                                     |  Default   |
| :--------- | :-------------------------------------- | :--------------------------------------------------------------------------: | :--------: |
| view       | Link appearance                         |                    `"normal" \| "primary" \| "secondary"`                    | `"normal"` |
| visitable  | Display css `:visitable` state          |                            `boolean \| undefined`                            |
| href       | HTML `href` attribute                   |                            `string \| undefined`                             |
| target     | HTML `target` attribute                 |                            `string \| undefined`                             |
| rel        | HTML `rel` attribute                    |                            `string \| undefined`                             |
| title      | HTML `title` attribute                  |                            `string \| undefined`                             |
| children   | Link content                            |                              `React.ReactNode`                               |
| extraProps | Any additional props                    |                            `Record \| undefined`                             |
| onClick    | `click` event handler                   | `React.MouseEventHandler<HTMLAnchorElement \| HTMLSpanElement> \| undefined` |
| onFocus    | `focus` event handler                   | `React.FocusEventHandler<HTMLAnchorElement \| HTMLSpanElement> \| undefined` |
| onBlur     | `blur` event handler                    | `React.FocusEventHandler<HTMLAnchorElement \| HTMLSpanElement> \| undefined` |
| id         | HTML `id` attribute                     |                            `string \| undefined`                             |
| style      | HTML `style` attribute                  |                      `React.CSSProperties \| undefined`                      |
| className  | HTML `class` attribute                  |                            `string \| undefined`                             |
| qa         | HTML `data-qa` attribute, used in tests |                            `string \| undefined`                             |
| ref        | React ref to Link DOM node              |                `React.ForwardedRef<HTMLElement> \| undefined`                |
