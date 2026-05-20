<!--GITHUB_BLOCK-->

# Skeleton

<!--/GITHUB_BLOCK-->

```tsx
import {Skeleton} from '@gravity-ui/uikit';
```

The Skeleton component displays a placeholder preview of your content before the data gets loaded. This preview is shown in order to reduce the loading time frustration.

## Variant

Use the `variant` prop to select the skeleton variant. The default is `'rounded'`.

| Value       | Description                                                                                                                                                             |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'square'`  | Sharp corners (`border-radius: 0`)                                                                                                                                      |
| `'rounded'` | Slight rounding (`border-radius: 5px`) — **default**                                                                                                                    |
| `'circle'`  | Fully circular; best for square elements (`border-radius: 50%`)                                                                                                         |
| `'text'`    | Inherits `font-size` and `line-height` from the parent context. Use for multiline text placeholders — place multiple skeletons inside a `<Text variant="...">` element. |

<!--GITHUB_BLOCK-->

```tsx
// Circle placeholder
<Skeleton variant="circle" style={{width: 40, height: 40}} />

// Single-line text placeholder
<Text variant="body-1">
    <Skeleton variant="text" style={{width: 200}} />
</Text>

// Multiline text placeholder
<Text variant="body-1">
    <Skeleton variant="text" style={{width: 400}} />
    <Skeleton variant="text" style={{width: 400}} />
    <Skeleton variant="text" style={{width: 240}} />
</Text>
```

<!--/GITHUB_BLOCK-->

## Children (wrapping mode)

Pass a single `React.ReactElement` as `children` to use the skeleton as an overlay that inherits the exact dimensions of the wrapped element. The child is rendered inside the skeleton container (with `aria-hidden="true"`) so the skeleton matches the real component's size automatically.

<!--GITHUB_BLOCK-->

```tsx
// Wraps a Button — skeleton adopts its size
<Skeleton>
    <Button size="m">Save</Button>
</Skeleton>

// Wraps a circular Avatar
<Skeleton variant="circle">
    <Avatar size="l" shape="circle" imgUrl={url} alt="User" aria-label="avatar"/>
</Skeleton>
```

<!--/GITHUB_BLOCK-->

## Properties

| Name      | Description                                                                                            |                        Type                         |  Default   |
| :-------- | :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------: | :--------: |
| style     | Custom CSS properties for root element                                                                 |                `React.CSSProperties`                |            |
| className | Custom CSS class for the root element                                                                  |                      `string`                       |            |
| qa        | `data-qa` HTML attribute, used for testing                                                             |                      `string`                       |            |
| animation | Animation type to apply to the skeleton                                                                |        `'gradient'` \| `'pulse'` \| `'none'`        | `gradient` |
| variant   | Visual variant. `'text'` clips height based on the parent context; Other values control border-radius. | `'square'` \| `'rounded'` \| `'circle'` \| `'text'` | `rounded`  |
| children  | Element to wrap; skeleton adopts its size                                                              |                `React.ReactElement`                 |            |
