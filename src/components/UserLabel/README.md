# UserLabel

The `UserLabel` component can be used to display users or user-related information.

## Type

Used to manage avatar appearance. Use `"person"` for a personalized entity and `"email"`, for an email address. If you do not need any avatar, use `"empty"`.

<!--SANDBOX
import {UserLabel} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <UserLabel type="person" text="Charles Darwin" />
            <UserLabel type="email" text="email@example.com" />
            <UserLabel type="empty" text="Alan Turing" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<UserLabel type="person" text="Charles Darwin (person)" />
<UserLabel type="email" text="email@example.com (email)" />
<UserLabel type="empty" text="Alan Turing (empty)" />
```

<!--/GITHUB_BLOCK-->

## Avatar

This component can be used with a custom avatar. It only works with `type: 'person'`. You can provide an image, a property of the [Avatar](../Avatar/README.md) component, or a custom React node.

<!--SANDBOX
import {GraduationCap} from '@gravity-ui/icons';
import {UserLabel} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <UserLabel
                type="person"
                avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg/193px-Charles_Darwin_by_Julia_Margaret_Cameron%2C_c._1868.jpg"
                text="Charles Darwin"
            />
            <UserLabel type="person" avatar={{icon: GraduationCap}} text="Charles Darwin" />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
import {GraduationCap} from '@gravity-ui/icons';

<UserLabel type="person" avatar="<url>" text="Charles Darwin" />
<UserLabel type="person" avatar={{icon: GraduationCap}} text="Charles Darwin" />
```

<!--/GITHUB_BLOCK-->

## Interactivity

This component is also interactive: it can be clickable or closable.

<!--SANDBOX
import {UserLabel} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <UserLabel text="Charles Darwin" onClick={() => alert('onClick triggered')} />
            <UserLabel text="Charles Darwin" onCloseClick={() => alert('onCloseClick triggered')} />
        </>
    );
}
SANDBOX-->

<!--GITHUB_BLOCK-->

```tsx
<UserLabel text="Charles Darwin" onClick={() => alert('onClick triggered')} />
<UserLabel text="Charles Darwin" onCloseClick={() => alert('onCloseClick triggered')} />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name         | Description                                     |                                    Type                                     |   Default    |
| :----------- | :---------------------------------------------- | :-------------------------------------------------------------------------: | :----------: |
| type         | Avatar appearance                               |                       `'person'` `'email'` `'empty'`                        |  `'person'`  |
| view         | `UserLabel` view                                |                           `'outlined'` `'clear'`                            | `'outlined'` |
| size         | Avatar size                                     |               `'3xs'` `'2xs'` `'xs'` `'s'` `'m'` `'l'` `'xl'`               |    `'s'`     |
| avatar       | User avatar                                     | [AvatarProps](../Avatar/README.md#properties) `string` `React.ReactElement` |              |
| text         | Visible text                                    |                              `React.ReactNode`                              |              |
| description  | User description                                |                              `React.ReactNode`                              |              |
| onClick      | `click` event handler for the component         |                                 `Function`                                  |              |
| onCloseClick | `click` event handler for the cross-icon button |                                 `Function`                                  |              |
| className    | Custom CSS class for the root element           |                                  `string`                                   |              |
| style        | HTML style attribute                            |                            `React.CSSProperties`                            |              |
| qa           | `data-qa` HTML attribute, used for testing      |                                  `string`                                   |              |

## CSS API

| Name                                     | Description                                             |
| :--------------------------------------- | :------------------------------------------------------ |
| `--g-user-label-size`                    | Size for avatar (width and height) and height for label |
| `--g-user-label-border-radius`           | Label border radius                                     |
| `--g-user-label-padding`                 | Label horizontal padding                                |
| `--g-user-label-gap`                     | Gap between elements (avatar, text, close icon)         |
| `--g-user-label-text-font-weight`        | Text font weight                                        |
| `--g-user-label-text-font-size`          | Text font size                                          |
| `--g-user-label-text-line-height`        | Text line height                                        |
| `--g-user-label-description-font-weight` | Description font weight                                 |
| `--g-user-label-description-font-size`   | Description font size                                   |
| `--g-user-label-description-line-height` | Description line height                                 |
