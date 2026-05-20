<!--GITHUB_BLOCK-->

# Avatar

<!--/GITHUB_BLOCK-->

```tsx
import {Avatar} from '@gravity-ui/uikit';
```

This component is intended for rendering avatars. It has three basic avatar types: image, icon, and text (name initials). All these types have special properties to configure the behavior and appearance.

## Types

### Image

This component can be used to render avatars using images. To provide an image, use the `imgUrl` property.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return <Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="l" />;
}
SANDBOX-->

You can also provide the `srcSet` property to load images of different sizes.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <Avatar
            imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352"
            srcSet="https://loremflickr.com/57/43/cats?lock=2879400393572352 1x, https://loremflickr.com/131/98/cats?lock=4373954936438784 2x, https://loremflickr.com/164/123/cats?lock=3007328513163264 3x, https://loremflickr.com/225/169/cats?lock=8243879964835840 4x"
            size="l"
        />
    );
}
SANDBOX-->

The `Avatar` component has the `fallbackImgUrl` property which allows you to provide the image that is shown when an image loading error occurs, through the `imgUrl` link (CSP error or no original image).

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <Avatar
            imgUrl="random_link"
            fallbackImgUrl="https://loremflickr.com/640/480/cats?lock=3552647338524672"
            size="l"
        />
    );
}
SANDBOX-->

### Icon

This component can be used to render avatars using icons. Use the `icon` property to provide an icon, just like you would do in case of the `Icon` component.

<!--SANDBOX
import {GraduationCap} from '@gravity-ui/icons';
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return <Avatar icon={GraduationCap} size="l" />;
}
SANDBOX-->

### Text

This component can be used to render avatars using text. Use the `text` property for that. The text is rendered as initials (first letters of two words) or just two first letters of a single word.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar text="Charles Darwin" size="l" />
            <Avatar text="Guardian" size="l" />
        </>
    );
}
SANDBOX-->

## Appearance

### Theme and view

The `Avatar` component has predefined themes (`normal`, `brand`) and views (`filled`, `outlined`).

The default theme is `normal` and the default view is `filled`.

<!--SANDBOX
import {GraduationCap} from '@gravity-ui/icons';
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar icon={GraduationCap} size="l" theme="normal" view="filled" />
            <Avatar icon={GraduationCap} size="l" theme="brand" view="filled" />
            <Avatar icon={GraduationCap} size="l" theme="normal" view="outlined" />
            <Avatar icon={GraduationCap} size="l" theme="brand" view="outlined" />
        </>
    );
}
SANDBOX-->

### Custom colors

You can also provide custom colors through the `backgroundColor`, `borderColor`, and `color` properties (the latter works only for icon and text avatars). These colors have a higher priority than the theme colors.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar
                text="Charles Darwin"
                size="l"
                backgroundColor="var(--g-color-base-danger-medium)"
                color="var(--g-color-text-primary)"
            />
            <Avatar text="Charles Darwin" size="l" borderColor="var(--g-color-line-misc)" />
        </>
    );
}
SANDBOX-->

### Size

Use the `size` property to manage the `Avatar` size. The default size is `m`. The possible values are `3xs`, `2xs`, `xs`, `s`, `m`, `l`, and `xl`.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar text="Charles Darwin" theme="brand" size="3xs" />
            <Avatar text="Charles Darwin" theme="brand" size="2xs" />
            <Avatar text="Charles Darwin" theme="brand" size="xs" />
            <Avatar text="Charles Darwin" theme="brand" size="s" />
            <Avatar text="Charles Darwin" theme="brand" size="m" />
            <Avatar text="Charles Darwin" theme="brand" size="l" />
            <Avatar text="Charles Darwin" theme="brand" size="xl" />
        </>
    );
}
SANDBOX-->

### Shape

Use the `shape` property to manage the `Avatar` shape. The default shape is `circle`. The possible values are `circle` and `square`.

<!--SANDBOX
import {Avatar} from '@gravity-ui/uikit';

export default function () {
    return (
        <>
            <Avatar text="Charles Darwin" theme="brand" shape="circle" />
            <Avatar text="Charles Darwin" theme="brand" shape="square" />
        </>
    );
}
SANDBOX-->

## Properties

### Common

| Name             | Description                                |                      Type                       | Default  |
| :--------------- | :----------------------------------------- | :---------------------------------------------: | :------: |
| size             | Avatar size                                | `'3xs'` `'2xs'` `'xs'` `'s'` `'m'` `'l'` `'xl'` |   `m`    |
| theme            | Avatar theme                               |              `'normal'` `'brand'`               | `normal` |
| view             | Avatar filling and outlining options       |             `'filled'` `'outlined'`             | `filled` |
| shape            | Avatar shape                               |              `'circle'` `'square'`              | `circle` |
| backgroundColor  | Custom background color                    |                    `string`                     |          |
| borderColor      | Custom border color                        |                    `string`                     |          |
| title            | `title` HTML attribute                     |                    `string`                     |          |
| aria-label       | `aria-label` for the avatar section        |                    `string`                     |          |
| aria-labelledby  | `aria-labelledby` for the avatar section   |                    `string`                     |          |
| aria-describedby | `aria-describedby` for avatar block        |                    `string`                     |          |
| aria-details     | `aria-details` for avatar block            |                    `string`                     |          |
| className        | Custom CSS class for the root element      |                    `string`                     |          |
| style            | `style` HTML attribute                     |              `React.CSSProperties`              |          |
| qa               | `data-qa` HTML attribute, used for testing |                    `string`                     |          |

### Image-specific

| Name            | Description                               |        Type        |   Default   |
| :-------------- | :---------------------------------------- | :----------------: | :---------: |
| imgUrl          | `img` `src` HTML attribute                |      `string`      |             |
| fallbackImgUrl  | Fallback image shown if an error occurred |      `string`      |             |
| sizes           | `img` `sizes` HTML attribute              |      `string`      |             |
| srcSet          | `img` `srcSet` HTML attribute             |      `string`      |             |
| alt             | `img` `alt` HTML attribute                |      `string`      | props.title |
| loading         | `img` `loading` HTML attribute            | `'eager'` `'lazy'` |             |
| withImageBorder | Add default border for the image          |     `boolean`      |             |

### Icon-specific

| Name  | Description        |    Type    | Default |
| :---- | :----------------- | :--------: | :-----: |
| icon  | Source of SVG icon | `IconData` |         |
| color | Custom icon color  |  `string`  |         |

### Text-specific

| Name  | Description       |   Type   | Default |
| :---- | :---------------- | :------: | :-----: |
| text  | Avatar text       | `string` |         |
| color | Custom text color | `string` |         |

## CSS API

| Name                            | Description             |
| :------------------------------ | :---------------------- |
| `--g-avatar-size`               | Size (width and height) |
| `--g-avatar-border-width`       | Border width            |
| `--g-avatar-inner-border-width` | Inner border width      |
| `--g-avatar-border-color`       | Border color            |
| `--g-avatar-background-color`   | Background color        |
| `--g-avatar-text-color`         | Icon and text color     |
| `--g-avatar-font-weight`        | Text font weight        |
| `--g-avatar-font-size`          | Text font size          |
| `--g-avatar-line-height`        | Text line height        |
