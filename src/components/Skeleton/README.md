<!--GITHUB_BLOCK-->

# Skeleton

<!--/GITHUB_BLOCK-->

```tsx
import {Skeleton} from '@gravity-ui/uikit';
```

The Skeleton component displays a placeholder preview of your content before the data gets loaded. This preview is shown in order to reduce the loading time frustration.

## Animation

Use the `animation` prop to control the loading animation. The default is `'gradient'`.

| Value        | Description                            |
| :----------- | :------------------------------------- |
| `'gradient'` | Sliding gradient shimmer — **default** |
| `'pulse'`    | Opacity pulse                          |
| `'none'`     | No animation                           |

## Shape

Use the `shape` prop to control the border-radius of the skeleton. The default is `'rounded'`.

| Value       | Description                                                                   |
| :---------- | :---------------------------------------------------------------------------- |
| `'rounded'` | Rounded corners using a size-aware border-radius token — **default**          |
| `'sharp'`   | No rounding (`border-radius: 0`)                                              |
| `'circle'`  | Fully circular (`border-radius: 50%`, `aspect-ratio: 1`)                      |
| `'square'`  | Square aspect ratio (`aspect-ratio: 1`) with the same rounding as `'rounded'` |

## Size

Use the `size` prop to set the skeleton height (and width for `'circle'` / `'square'` shapes). The default is `'m'`. Each size also adjusts the border-radius token used by `'rounded'` and `'square'` shapes.

| Value  | Description          |
| :----- | :------------------- |
| `'xs'` | Extra small          |
| `'s'`  | Small                |
| `'m'`  | Medium — **default** |
| `'l'`  | Large                |
| `'xl'` | Extra large          |

<!--GITHUB_BLOCK-->

```tsx
<Skeleton size="xs" style={{width: 120}} />
<Skeleton size="m"  style={{width: 200}} />
<Skeleton size="xl" style={{width: 280}} />

<Skeleton shape="circle" size="l" />
<Skeleton shape="square" size="l" />
```

<!--/GITHUB_BLOCK-->

## Text placeholder

Set `isText` to `true` to render a skeleton that inherits `font-size` and `line-height` from the parent context. Place multiple skeletons inside a `<Text variant="...">` element for multiline placeholders.

<!--GITHUB_BLOCK-->

```tsx
<Text variant="body-1">
  <Skeleton isText style={{width: 400}} />
  <Skeleton isText style={{width: 400}} />
  <Skeleton isText style={{width: 240}} />
</Text>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name        | Description                                                                                                                   |                         Type                         |  Default   |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------: | :--------: |
| `style`     | Custom CSS properties for the root element                                                                                    |                `React.CSSProperties`                 |            |
| `className` | Custom CSS class for the root element                                                                                         |                       `string`                       |            |
| `qa`        | `data-qa` HTML attribute, used for testing                                                                                    |                       `string`                       |            |
| `animation` | Animation type to apply to the skeleton                                                                                       |        `'gradient'` \| `'pulse'` \| `'none'`         | `gradient` |
| `shape`     | Border-radius variant. `'circle'` and `'square'` also enforce `aspect-ratio: 1`; `'sharp'` removes all rounding.              | `'rounded'` \| `'sharp'` \| `'square'` \| `'circle'` | `rounded`  |
| `size`      | Preset height (and width for `'circle'`/`'square'` shapes). Also controls the border-radius token for `'rounded'`/`'square'`. |     `'xs'` \| `'s'` \| `'m'` \| `'l'` \| `'xl'`      |    `m`     |
| `isText`    | When `true`, height is derived from the parent's `font-size` and `line-height`. Useful for inline text placeholders.          |                      `boolean`                       |            |
