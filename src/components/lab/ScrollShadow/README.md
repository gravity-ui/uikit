# unstable_ScrollShadow

> The `unstable_ScrollShadow` component is experimental. Its API can change in a minor or patch release.

`ScrollShadow` is a native scroll container that fades content at edges where more content is available. It supports block, inline, and both logical axes, including RTL layouts.

## Basic usage

Give the container a constrained size so its content can overflow:

```tsx
import {unstable_ScrollShadow as ScrollShadow} from '@gravity-ui/uikit/unstable';

<ScrollShadow style={{maxBlockSize: 320}} role="region" aria-label="Updates">
  <LongContent />
</ScrollShadow>;
```

The component itself scrolls. When its content overflows, it gets `tabIndex={0}` so keyboard users can scroll it. Pass `tabIndex` to override this behavior. A focusable scroll region should have an accessible name, for example `role="region"` and `aria-label`.

## Existing scroll elements

Use `unstable_useScrollShadow` when another component owns the scroll element. Apply the returned class and scroll handler to that element. The hook returns logical edge visibility for other UI:

```tsx
import * as React from 'react';
import {unstable_useScrollShadow} from '@gravity-ui/uikit/unstable';

function ExistingScroller() {
  const ref = React.useRef<HTMLDivElement>(null);
  const shadow = unstable_useScrollShadow({ref});

  return (
    <div
      ref={ref}
      className={shadow.className}
      onScroll={shadow.onScroll}
      tabIndex={shadow.state.hasOverflow ? 0 : undefined}
      role="region"
      aria-label="Updates"
      style={{maxBlockSize: 320, overflow: 'auto'}}
    >
      <LongContent />
    </div>
  );
}
```

`shadow.state` contains `blockStart`, `blockEnd`, `inlineStart`, `inlineEnd`, and `hasOverflow`. A true edge value means there is more content in that logical direction and the edge is enabled by `axis`, `position`, and `disabled`.

## Axes and positions

`axis="block"` is the default. Use `inline` for horizontal content or `both` for a two-dimensional surface:

```tsx
<ScrollShadow axis="inline">...</ScrollShadow>
<ScrollShadow axis="both">...</ScrollShadow>
```

`position` limits fades to the logical start, end, or both. A fade disappears after scrolling to its edge:

```tsx
<ScrollShadow position="end">...</ScrollShadow>
```

## CSS API

The fade uses a mask on the scroll container, so opaque children and sticky content fade too. It follows the surface behind the container in every theme. Set the depth with a CSS variable:

```css
.custom-scroll-shadow {
  --g-scroll-shadow-size: 40px;
}
```

| Name                     | Description | Default |
| :----------------------- | :---------- | :------ |
| `--g-scroll-shadow-size` | Fade depth  | `24px`  |

## Properties

`ScrollShadow` accepts native `div` attributes, including `className`, `style`, `onScroll`, and ARIA attributes.

| Name       | Description                                | Type                            | Default                    |
| :--------- | :----------------------------------------- | :------------------------------ | :------------------------- |
| `axis`     | Logical scroll axis to observe             | `"block" \| "inline" \| "both"` | `"block"`                  |
| `position` | Logical edges where a fade can appear      | `"start" \| "end" \| "both"`    | `"both"`                   |
| `disabled` | Hides fades while keeping native scrolling | `boolean`                       | `false`                    |
| `qa`       | Value of the root `data-qa` attribute      | `string`                        |                            |
| `tabIndex` | Keyboard focus order                       | `number`                        | `0` when content overflows |
| `children` | Scrollable content                         | `React.ReactNode`               |                            |
