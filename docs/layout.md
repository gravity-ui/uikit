# Layout components and spacings

This guide covers UIKit's layout foundations: a shared **spacing** scale (`--g-spacing-*`, used
everywhere via tokens and props) and a responsive **grid** (`Container`/`Row`/`Col`), plus the
flexbox-based `Flex`/`Box` primitives built on top of them. Compose pages from these instead of
raw `div`s and inline styles.

[English](layout.md) | [Русский](layout-ru.md)

## Spacing

Spacing in UIKit is a **scale**, not free-form pixels. You reference a step (`1`, `2`, … `10`)
and the design system turns it into a concrete size. Sticking to the scale is what keeps rhythm
consistent across the whole app, and lets you rescale everything from a single variable.

### The scale

Every step is a multiple of a base unit (`--g-spacing-base`, `4px` by default), so `step × 4px`:

| Step  | CSS variable       | Size |
| ----- | ------------------ | ---- |
| `0`   | `--g-spacing-0`    | 0    |
| `0.5` | `--g-spacing-half` | 2px  |
| `1`   | `--g-spacing-1`    | 4px  |
| `2`   | `--g-spacing-2`    | 8px  |
| `3`   | `--g-spacing-3`    | 12px |
| `4`   | `--g-spacing-4`    | 16px |
| `5`   | `--g-spacing-5`    | 20px |
| `6`   | `--g-spacing-6`    | 24px |
| `7`   | `--g-spacing-7`    | 28px |
| `8`   | `--g-spacing-8`    | 32px |
| `9`   | `--g-spacing-9`    | 36px |
| `10`  | `--g-spacing-10`   | 40px |

Because every step is derived from `--g-spacing-base`, changing that one value rescales the
entire spacing system proportionally (see [Customization](#customization)).

### Ways to apply spacing

There are three ways to consume the scale — pick by context:

**1. Component props** — spacing **between** children of `Flex`/`Grid`, via the `gap` prop:

```tsx
import {Flex} from '@gravity-ui/uikit';

<Flex gap="spacing-5">
  <Button />
  <Button />
</Flex>; // 20px between children
```

**2. CSS custom properties** — the same steps as `--g-spacing-{step}` variables, for use in your
own styles (e.g. `--g-spacing-half` for the `0.5` step):

```css
.example-class {
  margin-right: var(--g-spacing-5); /* 20px */
  padding: var(--g-spacing-2) var(--g-spacing-4);
}
```

**3. The `spacing()` utility** — for one-off margins/paddings on any element without hand-writing
class names. It returns a generated class name string:

```tsx
import {spacing} from '@gravity-ui/uikit';

<>
  <Button className={spacing({mr: 5})}>button 1</Button>
  <Button className={spacing({mt: 2, px: 4})}>button 2</Button>
</>;
```

`sp` is a shorter alias: `import {sp} from '@gravity-ui/uikit'` → `sp({mr: 5})`.

Supported keys (each takes a scale step):

| Key                 | Property                          |
| ------------------- | --------------------------------- |
| `m`                 | `margin`                          |
| `mt` `mr` `mb` `ml` | `margin-top/right/bottom/left`    |
| `mx`                | horizontal margin (left + right)  |
| `my`                | vertical margin (top + bottom)    |
| `p`                 | `padding`                         |
| `pt` `pr` `pb` `pl` | `padding-top/right/bottom/left`   |
| `px`                | horizontal padding (left + right) |
| `py`                | vertical padding (top + bottom)   |

You can pass a second argument to merge extra class names: `spacing({mr: 5}, myClassName)`.

> **Rule of thumb:** `gap` for spacing between siblings in a `Flex`/`Grid`; the `spacing()`/`sp()`
> utility for one-off offsets on an element; raw `--g-spacing-*` variables inside your own CSS.
> Always use scale steps, never hard-coded pixels.

### Customization

Override the base unit to rescale the whole system. Do it via CSS at the project level:

```css
:root {
  --g-spacing-base: 5px; /* now step 5 = 25px, etc. */
}
```

Or through the layout theme, which keeps the JS `Space` values and CSS variables in sync:

```tsx
import {Provider, LayoutTheme} from '@gravity-ui/uikit';

const config: LayoutTheme = {
    spaceBaseSize: 5,
};

export const App = () => {
    return (
        <Provider layout={{config}}>
            {...}
        </Provider>
    );
};
```

## Screen sizes:

We use **mobile-first** approach. It means that you should adapt your app for desktop after completing development of mobile version.
The default breakpoints are:

- `xs` - < 576px
- `s` - ≥ 576px;
- `m` - ≥ 768px;
- `l` - ≥ 980px;
- `xl` - ≥ 1200px;
- `2xl` - ≥ 1400px;
- `3xl` - ≥ 1920px;

To override a breakpoint use the `breakpoints` property in the layout config:

```tsx
const APP_LAYOUT_THEME: LayoutTheme = {
    spaceBaseSize: 4,
    components: {
        container: {
            gutters: 'spacing-3',
            media: {
                l: {
                    gutters: 'spacing-5',
                },
            },
        },
    },
    breakpoints: {
        s: 320,
        l: 1080,
    },
};

<Provider layout={{config: APP_LAYOUT_THEME}}>
    {...}
</Provider>;
```

Use `LayoutProvider` to configure layout for a subtree. Unspecified settings, including the active
breakpoint during SSR and updates, are inherited from the parent. Partial `config` merges with the
parent theme without mutating it. Custom breakpoints calculate a local active breakpoint;
`initialMediaQuery` overrides its initial value. Without a parent, the initial breakpoint is `xs`.

## Box

The `Box` component is a developer friend and basic block to build other components. Aware about spacing, its own sizes and most commonly used CSS properties.

Use it to declaratively describe elements with a fixed height/width. It also has built-in support for the most commonly used properties, such as `overflow`.
It is mainly used as a base unit for other components such as `Flex` and `Card`.

It is also well suited for use as a base for data loading containers, for example:

```tsx
import React, {Suspense} from 'react';
import {Flex, Loader} from '@gravity-ui/uikit';

// `Flex` extended from `Box` component and enriched flexbox model properties
<Flex justifyContent="center" alignItems="center" width="100%" height="100%">
  <Suspense fallback={<Loader size="m" />}>
    <LazyLoadedComponent />
  </Suspense>
</Flex>;
```

## Layout Grid

Main components to describe 12-th column grid layout for your app.
Supports nested grids. This should be used when you have mobile and desktop app versions.

```tsx
import {Row, Col} from '@gravity-ui/uikit';

<Row gap="spacing-5">
  <Col size="4">...</Col>
  <Col size="4">...</Col>
  <Col size="4">...</Col>
</Row>;
```

### Row

**Props**

- `gap` sets spacing between columns and wrapped lines;
- `columnGap` sets horizontal spacing;
- `rowGap` sets vertical spacing.

All gaps accept responsive objects, `spacing-*` tokens, CSS lengths, and numbers as pixels.
For example, `gap="spacing-2"` uses the spacing scale, while `gap={2}` means `2px`.
Use `gap` alone, or separate `rowGap` and `columnGap` for different axis values. These props map
directly to CSS; mixing shorthand and longhands makes precedence depend on declaration order and
can cause conflicts during React updates.

`Row` uses CSS Grid with 12 equal tracks. It also accepts `Box` style props, Grid alignment
props, native element props, `as`, and refs.

### Col

How many columns of your 12-th column layout will take content.
Must be used as a child of `Row` component.

**Props**

- `size` - number of grid tracks to span. If omitted, the column spans all 12 tracks on its own row.

Use `size` for responsive sizing. The separate breakpoint props `s`, `m`, `l`, `xl`, and `xxl`
have been removed; for example, use `size={{xs: 12, m: 6}}` instead of `s={12} m={6}` when `s`
previously applied to the narrowest screens. See [the breakpoint migration](migration-to-v8.md#layout-breakpoints-and-container-gutters).

```tsx
import {Row, Col} from '@gravity-ui/uikit';

<Row
  /**
   * In this example we override default theme behavior.
   *
   * gap={{xs: 'spacing-1', xl: 'spacing-5'}}
   */
  gap="spacing-5"
>
  <Col
    // Will be:
    // 12 for "xs" and "s"
    // 6 for "m" and "l"
    // 4 for "xl" and "2xl"
    size={[12, {m: 6, xl: 4}]}
  />
</Row>;
```

`Row` uses native CSS gaps, and CSS Grid accounts for the gaps when sizing tracks. Columns
whose sizes add up to 12 fit on one line. Columns without `size` each occupy a full row instead
of sharing the remaining space. Use explicit sizes for columns that should share a row, or
`Flex` for dynamically distributed space. `Col` accepts `Box` style props, including padding
and backgrounds, without generated gutter padding or negative margins.

`justifyContent` aligns the grid tracks, not individual columns within an incomplete row.
Use `justifyItems` or `justifySelf` to align content within a grid cell. Flex sizing props
such as `flexGrow` do not affect columns inside `Row`.

## Container

Centers page content using `Box` and normal block flow. Use responsive style props to adjust
padding, width, and spacing between rows.

**Props**

- `gutters` sets logical horizontal padding, defaulting to the layout theme. It accepts responsive
  objects, `spacing-*` tokens, CSS lengths, and numbers in pixels;
- `size` caps the content width at the configured breakpoint width. Gutters and borders are added
  outside that cap. For example, `size="l"` uses `layout.breakpoints.l`;
- `maxWidth` accepts a CSS length or number in pixels, not a breakpoint name. Explicit `maxWidth`,
  `maxInlineSize`, or `style.maxInlineSize` overrides the `size` cap;
- `rowGap` sets `margin-block-start` between adjacent direct-child `Row` elements, defaulting to
  the layout theme. It accepts responsive objects, spacing tokens, CSS lengths, and pixel values;
- all other `Box` style props are supported. Flex container alignment and gap props are not.

Like `Box` and `Flex`, `Container` does not set `box-sizing`. With the default `content-box`,
`size="l"` allows 980px of content plus gutters and borders. Leave width unset to fit a narrower
parent automatically; `width="100%"` with gutters can overflow it. Application CSS can override
box sizing. Without `size`, no breakpoint cap is applied.

The first row has no added margin. Other elements interrupt row adjacency and receive no added
spacing. Nested rows are unaffected; nested containers resolve their own `rowGap` from props or
theme defaults rather than inheriting the outer container's value.

```tsx
import {Container} from '@gravity-ui/uikit';

<Container size="l" gutters={{xs: 'spacing-3', l: 'spacing-5'}} rowGap="spacing-4">
  {children}
</Container>;
```

Set `gutters={0}` to disable gutters. The theme configuration uses `gutters` and
`rowGap` too. All three components support polymorphic `as`, native props, and refs.
The standard `paddingInline` style prop is also supported and overrides theme defaults. Explicit
`gutters` takes precedence over `paddingInline`.
See the [migration guide](../src/components/layout/migration-guide.md) for the removed spacing props.

## Flex

CSS `Flexbox` model representation in `jsx` world. Use `gap`, `columnGap`, and `rowGap` to manage space between children. All flex properties are available as props.
The most commonly used properties support object syntax to override behavior at different screen sizes.

### Examples

_Space between children components in row direction_

```jsx
import {Flex, TextInput, Button} from '@gravity-ui/uikit';

<Flex gap="spacing-5">
  <TextInput />
  <Button />
</Flex>;
```

_Nested `Flex` example_

```jsx
import {Flex, TextInput, Button, Table} from '@gravity-ui/uikit';

<Flex direction="column" gap="spacing-5">
  <Flex gap="spacing-5">
    <TextInput />
    <Button />
  </Flex>
  <Table />
</Flex>;
```

_Responsible example_

```jsx
import {Flex, TextInput, Button} from '@gravity-ui/uikit';

<Flex
  // direction: column will be applied to l, xl, 2xl, 3xl screen sizes here
  direction={{l: 'column'}}
  gap={{xs: 'spacing-5', m: 'spacing-3'}}
>
  <TextInput />
  <Button />
</Flex>;
```

## Hooks

### useLayoutContext

Hook `useLayoutContext` provide ability to use `LayoutTheme` and helper functions to work with media queries.

It returns the following methods and objects:

- `theme` - `LayoutTheme` object;
- `activeMediaQuery` - returns current [Screen sizes](#screen-sizes) keys.

```tsx
import {useLayoutContext} from '@gravity-ui/uikit';

const Component = () => {
  const {activeMediaQuery} = useLayoutContext();

  return (
    <>{activeMediaQuery === 'l' ? <Text>I render only on screen resolution "l"</Text> : null}</>
  );
};
```

- `isMediaActive` - returns `true` if passed value is equal to or greater than the current active media. It is necessary to implement logic of adaptive elements for **mobile-first** approach.

```tsx
import {useLayoutContext} from '@gravity-ui/uikit';

// this example will be shown on xl, 2xl and 3xl screen sizes
const Component = () => {
  const {isMediaActive} = useLayoutContext();

  return (
    <>{isMediaActive('xl') ? <Text>I render on "xl", "2xl" and "3xl" screen sizes</Text> : null}</>
  );
};
```

- `getClosestMediaProps` - it works in a similar way as `isMediaActive`, but takes a map with screen media as an argument. Returns the nearest available value in the map taking into account the **mobile-first** approach.

```tsx
import {useLayoutContext} from '@gravity-ui/uikit';

const mapOfPropsByScreen = {
  s: "i'm will be shown on 's' and 'n' screen size",
  l: "i'm will be shown on 'l' and 'xl' screen size",
  '2xl': "i'm will be shown on '2xl' and '3xl' screen size",
};

const Component = () => {
  const {getClosestMediaProps} = useLayoutContext();

  return <Text>{getClosestMediaProps(mapOfPropsByScreen)}</Text>;
};
```
