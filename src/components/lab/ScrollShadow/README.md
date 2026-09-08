# unstable_ScrollShadow

> The `unstable_ScrollShadow` component is experimental. Its API can change in a minor or patch release.

`ScrollShadow` is a native scroll container that adds shadows only at the edges where more content is available. It can track the block axis, the inline axis, or both logical axes and therefore adapts to RTL layouts.

## Basic usage

Set a constrained block or inline size on the component so its content can overflow:

```tsx
import {unstable_ScrollShadow as ScrollShadow} from '@gravity-ui/uikit/unstable';

<ScrollShadow style={{maxBlockSize: 320}}>
  <LongContent />
</ScrollShadow>;
```

`ScrollShadow` itself is the element with native scrolling. You do not need to add another element with `overflow: auto`.
It is keyboard-focusable by default so that keyboard users can scroll it; pass another `tabIndex` when an application needs different focus behavior.

## Axes and positions

The API uses logical directions. The default `axis="block"` works for vertically scrolling content. Use the inline axis for horizontal content, or both axes for a large two-dimensional surface:

```tsx
<ScrollShadow axis="inline">...</ScrollShadow>
<ScrollShadow axis="both">...</ScrollShadow>
```

`position` limits shadows to the logical start, logical end, or both edges. A shadow is still hidden when the scroll position has reached that edge:

```tsx
<ScrollShadow position="end">...</ScrollShadow>
```

## CSS API

The shadow depth and edge fade color are customized with CSS variables:

```css
.custom-scroll-shadow {
  --g-scroll-shadow-size: 40px;
  --g-scroll-shadow-color: rgba(61, 152, 255, 0.35);
}
```

| Variable                  | Description     | Default                                                            |
| :------------------------ | :-------------- | :----------------------------------------------------------------- |
| `--g-scroll-shadow-size`  | Shadow depth    | `24px`                                                             |
| `--g-scroll-shadow-color` | Edge fade color | `--g-color-sfx-shadow` (light), `--g-color-base-background` (dark) |

## Properties

`ScrollShadow` accepts native `div` attributes, including `className`, `style`, `onScroll`, and ARIA attributes.

| Name       | Description                                              | Type                            | Default   |
| :--------- | :------------------------------------------------------- | :------------------------------ | :-------- |
| `axis`     | Logical scroll axis to observe                           | `"block" \| "inline" \| "both"` | `"block"` |
| `position` | Logical edges where a shadow can appear                  | `"start" \| "end" \| "both"`    | `"both"`  |
| `disabled` | Hides all shadows while keeping native scrolling enabled | `boolean`                       | `false`   |
| `children` | Scrollable content                                       | `React.ReactNode`               |           |
