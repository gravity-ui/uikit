<!--GITHUB_BLOCK-->

# User

<!--/GITHUB_BLOCK-->

```tsx
import {User} from '@gravity-ui/uikit';
```

This is a general component for displaying a user avatar with an info block. It uses the [Avatar](../Avatar/README.md) component to render the avatar. It can also accept a custom React node as an avatar.

## Name and description

The `User` component has the `name` and `description` properties to display an info block.

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

Use the `size` property to manage the `User` size. The default size is `m`. The possible values are `3xs`, `2xs`, `xs`, `s`, `m`, `l`, and `xl`.

This property is also provided to the internal `Avatar` component.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="3xs" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="2xs" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xs" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="s" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="m" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
<User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xl" />
`}
>
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="3xs" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="2xs" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xs" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="s" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="m" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="l" />
    <UIKit.User avatar={{text: 'Charles Darwin', theme: 'brand'}} name="Charles Darwin" description="charles@mail.ai" size="xl" />
</ExampleBlock>

LANDING_BLOCK-->

## Properties

| Name             | Description                                |                                    Type                                     | Default |
| :--------------- | :----------------------------------------- | :-------------------------------------------------------------------------: | :-----: |
| avatar           | User avatar                                | [AvatarProps](../Avatar/README.md#properties) `string` `React.ReactElement` |         |
| name             | User name                                  |                              `React.ReactNode`                              |         |
| description      | User description                           |                              `React.ReactNode`                              |         |
| size             | User section size                          |               `'3xs'` `'2xs'` `'xs'` `'s'` `'m'` `'l'` `'xl'`               |   `m`   |
| aria-label       | `aria-label` for the user section          |                                  `string`                                   |         |
| aria-labelledby  | `aria-labelledby` for the user section     |                                  `string`                                   |         |
| aria-describedby | `aria-describedby` for the user section    |                                  `string`                                   |         |
| aria-details     | `aria-details` for the user section        |                                  `string`                                   |         |
| className        | Custom CSS class for the root element      |                                  `string`                                   |         |
| style            | HTML style attribute                       |                            `React.CSSProperties`                            |         |
| qa               | `data-qa` HTML attribute, used for testing |                                  `string`                                   |         |

## CSS API

| Name                               | Description                       |
| :--------------------------------- | :-------------------------------- |
| `--g-user-avatar-offset`           | Gap between avatar and text block |
| `--g-user-name-font-weight`        | Name font weight                  |
| `--g-user-name-font-size`          | Name font size                    |
| `--g-user-name-line-height`        | Name line height                  |
| `--g-user-description-font-weight` | Description font weight           |
| `--g-user-description-font-size`   | Description font size             |
| `--g-user-description-line-height` | Description line height           |
