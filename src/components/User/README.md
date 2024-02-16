<!--GITHUB_BLOCK-->

# User &middot; [![storybook](https://img.shields.io/badge/Storybook-User-3bc935)](https://preview.gravity-ui.com/uikit/?path=/story/components-data-display-user--default)

<!--/GITHUB_BLOCK-->

```tsx
import {User} from '@gravity-ui/uikit';
```

General component for displaying a user avatar with a info block. It uses [Avatar](../Avatar/README.md) component to render the avatar. Also, it accepts custom react node as an avatar.

## Name and description

`User` component has properties `name` and `description` to display a info block.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
`}
>
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

## Size

To control the size of the `User` use the `size` property. The default size is `m`. Possible values: `xs`, `s`, `m`, `l`, `xl`.

This propeperty passes to the internal `Avatar` component too.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xs" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="s" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="m" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xl" />
`}
>
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xs" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="s" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="m" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xl" />
</ExampleBlock>

LANDING_BLOCK-->

## Properties

| Name            | Description                             |                                Type                                | Default |
| :-------------- | :-------------------------------------- | :----------------------------------------------------------------: | :-----: |
| avatar          | User avatar                             | [AvatarProps](../Avatar/README.md#properties) `React.ReactElement` |         |
| name            | User name                               |                         `React.ReactNode`                          |         |
| description     | User description                        |                         `React.ReactNode`                          |         |
| size            | User block size                         |                  `'xs'` `'s'` `'m'` `'l'` `'xl'`                   |   `m`   |
| aria-label      | `aria-label` for user block             |                              `string`                              |         |
| aria-labelledby | `aria-labelledby` for user block        |                              `string`                              |         |
| className       | Custom CSS class for root element       |                              `string`                              |         |
| style           | HTML style attribute                    |                       `React.CSSProperties`                        |         |
| qa              | HTML `data-qa` attribute, used in tests |                              `string`                              |         |
