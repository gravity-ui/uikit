<!--GITHUB_BLOCK-->

# Skeleton

<!--/GITHUB_BLOCK-->

The Skeleton component displays a placeholder preview of your content before the data gets loaded. This preview is shown in order to reduce the loading time frustration.

```tsx
import {Skeleton} from '@gravity-ui/uikit';
```

## Animation

Use the `animation` prop to control the loading animation. The default is `'gradient'`.

| Value        | Description                            |
| :----------- | :------------------------------------- |
| `'gradient'` | Sliding gradient shimmer — **default** |
| `'pulse'`    | Opacity pulse                          |
| `'none'`     | No animation                           |

## Variant

Use the `variant` prop to choose a preset appearance. The default is `'rect'`.

| Value      | Description                                                                               |
| :--------- | :---------------------------------------------------------------------------------------- |
| `'rect'`   | Rounded corners using a size-aware border-radius token — **default**                      |
| `'circle'` | Fully circular (`border-radius: 50%`, `aspect-ratio: 1`)                                  |
| `'square'` | Square aspect ratio (`aspect-ratio: 1`) with the same rounding as `'rect'`                |
| `'text'`   | Text line placeholder — height inherits `font-size` and `line-height` from parent context |

## Size

Use the `size` prop to set a preset skeleton height (and width for `'circle'` / `'square'` variants). Each size also adjusts the border-radius token used by `'rect'` and `'square'` variants. When `size` is omitted, set dimensions with `width` and `height` instead.

| Value  | Description |
| :----- | :---------- |
| `'xs'` | Extra small |
| `'s'`  | Small       |
| `'m'`  | Medium      |
| `'l'`  | Large       |
| `'xl'` | Extra large |

<!--GITHUB_BLOCK-->

```tsx
<Skeleton size="xs" width={120} />
<Skeleton size="m"  width={200} />
<Skeleton size="xl" width={280} />

<Skeleton variant="circle" size="l" />
<Skeleton variant="square" size="l" />
```

<!--/GITHUB_BLOCK-->

## Text placeholder

Use `variant="text"` to render a skeleton that inherits `font-size` and `line-height` from the parent context. Place multiple skeletons inside a `<Text variant="...">` element for multiline placeholders.

<!--GITHUB_BLOCK-->

```tsx
<Text variant="body-1">
  <Skeleton variant="text" width={400} />
  <Skeleton variant="text" width={400} />
  <Skeleton variant="text" width={240} />
</Text>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name        | Description                                                                                                                  |                       Type                       |  Default   |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------: | :--------: |
| `style`     | Custom CSS properties for the root element                                                                                   |              `React.CSSProperties`               |            |
| `className` | Custom CSS class for the root element                                                                                        |                     `string`                     |            |
| `qa`        | `data-qa` HTML attribute, used for testing                                                                                   |                     `string`                     |            |
| `animation` | Animation type to apply to the skeleton                                                                                      |      `'gradient'` \| `'pulse'` \| `'none'`       | `gradient` |
| `variant`   | Preset appearance. `'circle'` and `'square'` enforce `aspect-ratio: 1`. `'text'` inherits typography from parent context.    | `'rect'` \| `'square'` \| `'circle'` \| `'text'` |   `rect`   |
| `size`      | Preset height (and width for `'circle'`/`'square'` variants). Also controls the border-radius token for `'rect'`/`'square'`. |   `'xs'` \| `'s'` \| `'m'` \| `'l'` \| `'xl'`    |            |
| `width`     | Custom width. Alias for `style.width`                                                                                        |               `number` \| `string`               |            |
| `height`    | Custom height. Alias for `style.height`                                                                                      |               `number` \| `string`               |            |
