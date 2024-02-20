<!--GITHUB_BLOCK-->

# UserLabel &middot; [![storybook](https://img.shields.io/badge/Storybook-UserLabel-3bc935)](https://preview.gravity-ui.com/uikit/?path=/story/components-data-display-userlabel--default)

<!--/GITHUB_BLOCK-->

The `UserLabel` component can be used to display users or user-related information.

### Type

Used to manage avatar appearance. Use "person" for a personalized entity and "email" for an email adresses. Use "empty" for cases when you do not need any avatar.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<UserLabel type="person" text="Charles Darwin" />
<UserLabel type="email" text="email@example.com" />
<UserLabel type="empty" text="Alan Turing" />
`}
>
    <UIKit.UserLabel type="person" text="Charles Darwin" />
    <UIKit.UserLabel type="email" text="email@example.com" />
    <UIKit.UserLabel type="empty" text="Alan Turing" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<UserLabel type="person" text="Charles Darwin (person)" />
<UserLabel type="email" text="email@example.com (email)" />
<UserLabel type="empty" text="Alan Turing (other)" />
```

<!--/GITHUB_BLOCK-->

### Avatar

This component can be used with a custom avatar. It works only with `type: 'person'`. You are able to provide an image, a props of [Avatar](../Avatar/README.md) component or custom React node.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
import {GraduationCap} from '@gravity-ui/icons';

<UserLabel type="person" avatar="<url>" text="Charles Darwin" />
<UserLabel type="person" avatar={{icon: GraduationCap}} text="Charles Darwin" />
`}
>
    <UIKit.UserLabel type="person" avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg/193px-Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg" text="Charles Darwin" />
    <UIKit.UserLabel type="person" avatar={{icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'}} text="Charles Darwin" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
import {GraduationCap} from '@gravity-ui/icons';

<UserLabel type="person" avatar="<url>" text="Charles Darwin" />
<UserLabel type="person" avatar={{icon: GraduationCap}} text="Charles Darwin" />
```

<!--/GITHUB_BLOCK-->

### Interactivity

This component is also interactive. It can be clickable or closable.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<UserLabel text="Charles Darwin" onClick={() => alert('onClick triggered')} />
<UserLabel text="Charles Darwin" onCloseClick={() => alert('onCloseClick triggered')} />
`}
>
    <UIKit.UserLabel text="Charles Darwin" onClick={() => alert('onClick triggered')} />
    <UIKit.UserLabel text="Charles Darwin" onCloseClick={() => alert('onCloseClick triggered')} />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<UserLabel text="Charles Darwin" onClick={() => alert('onClick triggered')} />
<UserLabel text="Charles Darwin" onCloseClick={() => alert('onCloseClick triggered')} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name         | Description                                 |                                    Type                                     |   Default    |
| :----------- | :------------------------------------------ | :-------------------------------------------------------------------------: | :----------: |
| type         | Avatar appearance                           |                       `'person'` `'email'` `'empty'`                        |  `'person'`  |
| avatar       | User avatar                                 | [AvatarProps](../Avatar/README.md#properties) `string` `React.ReactElement` |              |
| text         | Visible text                                |                                  `string`                                   |              |
| view         | UserLabel view                              |                           `'outlined'` `'clear'`                            | `'outlined'` |
| onClick      | `click` event handler for component itself  |                                 `Function`                                  |              |
| onCloseClick | `click` event handler for button with cross |                                 `Function`                                  |              |
| className    | Custom CSS class for root element           |                                  `string`                                   |              |
| style        | HTML style attribute                        |                            `React.CSSProperties`                            |              |
| qa           | HTML `data-qa` attribute, used in tests     |                                  `string`                                   |              |
