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

Use the `size` property to manage the `User` size. The default size is `m`. The possible values are `xs`, `s`, `m`, `l`, and `xl`.

This property is also provided to the internal `Avatar` component.

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

| Name            | Description                                |                                  Type                                  | Default |
| :-------------- | :----------------------------------------- | :--------------------------------------------------------------------: | :-----: |
| avatar          | User avatar                                | `React.ReactElement` [avatar property](../Avatar/README.md#properties) |         |
| name            | User name                                  |                           `React.ReactNode`                            |         |
| description     | User description                           |                           `React.ReactNode`                            |         |
| size            | User section size                          |                    `'xs'` `'s'` `'m'` `'l'` `'xl'`                     |   `m`   |
| aria-label      | `aria-label` for the user section          |                                `string`                                |         |
| aria-labelledby | `aria-labelledby` for the user section     |                                `string`                                |         |
| className       | Custom CSS class for the root element      |                                `string`                                |         |
| style           | HTML style attribute                       |                         `React.CSSProperties`                          |         |
| qa              | `data-qa` HTML attribute, used for testing |                                `string`                                |         |
