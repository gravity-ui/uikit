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

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="l" />
`}
>
    <UIKit.Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

You can also provide the `srcSet` property to load images of different sizes.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" srcSet="https://loremflickr.com/57/43/cats?lock=2879400393572352 1x, https://loremflickr.com/131/98/cats?lock=4373954936438784 2x, https://loremflickr.com/164/123/cats?lock=3007328513163264 3x, https://loremflickr.com/225/169/cats?lock=8243879964835840 4x" size="l" />
`}
>
    <UIKit.Avatar imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352" srcSet="https://loremflickr.com/57/43/cats?lock=2879400393572352 1x, https://loremflickr.com/131/98/cats?lock=4373954936438784 2x, https://loremflickr.com/164/123/cats?lock=3007328513163264 3x, https://loremflickr.com/225/169/cats?lock=8243879964835840 4x" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

The `Avatar` component has the `fallbackImgUrl` property which allows you to provide the image that is shown when an image loading error occurs, through the `imgUrl` link (CSP error or no original image).

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar imgUrl="random_link" fallbackImgUrl="https://loremflickr.com/640/480/cats?lock=3552647338524672" size="l" />
`}
>
    <UIKit.Avatar imgUrl="random_link" fallbackImgUrl="https://loremflickr.com/640/480/cats?lock=3552647338524672" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

### Icon

This component can be used to render avatars using icons. Use the `icon` property to provide an icon, just like you would do in case of the `Icon` component.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
import {GraduationCap} from '@gravity-ui/icons';

<Avatar icon={GraduationCap} size="l" />
`}
>
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" />
</ExampleBlock>

LANDING_BLOCK-->

### Text

This component can be used to render avatars using text. Use the `text` property for that. The text is rendered as initials (first letters of two words) or just two first letters of a single word.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar text="Charles Darwin" size="l" />
<Avatar text="Guardian" size="l" />
`}
>
    <UIKit.Avatar text="Charles Darwin" size="l" />
    <UIKit.Avatar text="Guardian" size="l" />
</ExampleBlock>

LANDING_BLOCK-->

## Appearance

### Theme and view

The `Avatar` component has predefined themes (`normal`, `brand`) and views (`filled`, `outlined`).

The default theme is `normal` and the default view is `filled`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
import {GraduationCap} from '@gravity-ui/icons';

<Avatar icon={GraduationCap} size="l" theme="normal" view="filled" />
<Avatar icon={GraduationCap} size="l" theme="brand" view="filled" />
<Avatar icon={GraduationCap} size="l" theme="normal" view="outlined" />
<Avatar icon={GraduationCap} size="l" theme="brand" view="outlined" />
`}
>
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" theme="normal" view="filled" />
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" theme="brand" view="filled" />
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" theme="normal" view="outlined" />
    <UIKit.Avatar icon={'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M6.836 3.202 1.74 5.386a.396.396 0 0 0 0 .728l5.096 2.184a2.5 2.5 0 0 0 .985.202h.358a2.5 2.5 0 0 0 .985-.202l5.096-2.184a.396.396 0 0 0 0-.728L9.164 3.202A2.5 2.5 0 0 0 8.179 3h-.358a2.5 2.5 0 0 0-.985.202ZM1.5 7.642l1.5.644v3.228a2 2 0 0 0 1.106 1.789l.806.403a7 7 0 0 0 6.193.033l.909-.442a2 2 0 0 0 1.125-1.798V8.226l1.712-.734a1.896 1.896 0 0 0 0-3.484L9.755 1.823A4 4 0 0 0 8.179 1.5h-.358a4 4 0 0 0-1.576.323L1.15 4.008A1.896 1.896 0 0 0 0 5.75v4.5a.75.75 0 0 0 1.5 0V7.643Zm3 3.872V8.929l1.745.748A4 4 0 0 0 7.821 10h.358a4 4 0 0 0 1.576-.323l1.884-.808v2.63a.5.5 0 0 1-.282.45l-.909.442a5.5 5.5 0 0 1-4.865-.027l-.807-.403a.5.5 0 0 1-.276-.447Z" clip-rule="evenodd"/></svg>'} size="l" theme="brand" view="outlined" />
</ExampleBlock>

LANDING_BLOCK-->

### Custom colors

You can also provide custom colors through the `backgroundColor`, `borderColor`, and `color` properties (the latter works only for icon and text avatars). These colors have a higher priority than the theme colors.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar text="Charles Darwin" size="l" backgroundColor="var(--g-color-base-danger-medium)" color="var(--g-color-text-primary)" />
<Avatar text="Charles Darwin" size="l" borderColor="var(--g-color-line-misc)" />
`}
>
    <UIKit.Avatar text="Charles Darwin" size="l" backgroundColor="var(--g-color-base-danger-medium)" color="var(--g-color-text-primary)" />
    <UIKit.Avatar text="Charles Darwin" size="l" borderColor="var(--g-color-line-misc)" />
</ExampleBlock>

LANDING_BLOCK-->

### Size

Use the `size` property to manage the `Avatar` size. The default size is `m`. The possible values are `3xs`, `2xs`, `xs`, `s`, `m`, `l`, and `xl`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar text="Charles Darwin" theme="brand" size="3xs" />
<Avatar text="Charles Darwin" theme="brand" size="2xs" />
<Avatar text="Charles Darwin" theme="brand" size="xs" />
<Avatar text="Charles Darwin" theme="brand" size="s" />
<Avatar text="Charles Darwin" theme="brand" size="m" />
<Avatar text="Charles Darwin" theme="brand" size="l" />
<Avatar text="Charles Darwin" theme="brand" size="xl" />
`}
>
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="3xs" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="2xs" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="xs" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="s" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="m" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="l" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" size="xl" />
</ExampleBlock>

LANDING_BLOCK-->

### Shape

Use the `shape` property to manage the `Avatar` shape. The default shape is `circle`. The possible values are `circle` and `square`.

<!--LANDING_BLOCK

<ExampleBlock
    code={`
<Avatar text="Charles Darwin" theme="brand" shape="circle" />
<Avatar text="Charles Darwin" theme="brand" shape="square" />
`}
>
    <UIKit.Avatar text="Charles Darwin" theme="brand" shape="circle" />
    <UIKit.Avatar text="Charles Darwin" theme="brand" shape="square" />
</ExampleBlock>

LANDING_BLOCK-->

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
