# Layout components and spacings

This guide covers UIKit's layout foundations: a shared **spacing** scale (`--g-spacing-*`, used
everywhere via tokens and props) and a responsive **grid** (`Container`/`Row`/`Col`), plus the
flexbox-based `Flex`/`Box` primitives built on top of them. Compose pages from these instead of
raw `div`s and inline styles.

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

**1. Component props** — spacing **between** children of `Flex`/`Box`, via the `gap` prop:

```tsx
import {Flex} from '@gravity-ui/uikit';

<Flex gap={5}>
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

> **Rule of thumb:** `gap` for spacing between siblings in a `Flex`/`Box`; the `spacing()`/`sp()`
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
import {ThemeProvider, LayoutTheme} from '@gravity-ui/uikit';

const config: LayoutTheme = {
    spaceBaseSize: 5,
};

export const App = () => {
    return (
        <ThemeProvider layout={{config, fixBreakpoints: true}}>
            {...}
        </ThemeProvider>
    );
};
```

## Screen sizes:

We use **mobile-first** approach. It means that you should adapt your app for desktop after completing development of mobile version.
The default breakpoints are:

- `xs` - < 576px
- `s` - ≥ 576px;
- `m` - ≥ 768px;
- `l` - ≥ 1080px;
- `xl` - ≥ 1200px;
- `xxl` - ≥ 1400px;
- `xxxl` - ≥ 1920px;

To override a breakpoint use the `breakpoints` property in the layout config:

```tsx
const APP_LAYOUT_THEME: LayoutTheme = {
    spaceBaseSize: 4,
    components: {
        container: {
            gutters: 3,
            media: {
                l: {
                    gutters: 5,
                },
            },
        },
    },
    breakpoints: {
        s: 320,
        l: 980,
    },
};

<ThemeProvider layout={{config: APP_LAYOUT_THEME}}>
    {...}
</ThemeProvider>;
```

## Box

The `Box` component is a developer friend and basic block to build other components. Aware about spacing, its own sizes and most commonly used CSS properties.

Use it to declaratively describe elements with a fixed height/width. It also has built-in support for the most commonly used properties, such as `overflow`.
It is mainly used as a base unit for other components such as `Flex` and `Card`.

It is also well suited for use as a base for data loading containers, for example:

```tsx
import React, {Suspense} from 'react';
import {Flex, Loader} from '@gravity-ui/uikit';

// `Flex` extended from `Box` component and enriched flexbox model properties
<Flex centerContent width="100%" height="100%">
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

<Row space="5">
  <Col size="4">...</Col>
  <Col size="4">...</Col>
  <Col size="4">...</Col>
</Row>;
```

### Row

**Props**

- `space` - specify horizontal spacing between child `Col` components;
- `spaceRow` - specify vertical spacing between child `Col` components. By default, it takes values from the `space` prop.

### Col

How many columns of your 12-th column layout will take content.
Must be used as a child of `Row` component.

**Props**

- `size` - column width in column number (if omitted the column will occupy all free space in the row)

```tsx
import {Row, Col} from '@gravity-ui/uikit';

<Row
  /**
   * In this example we override default theme behavior.
   *
   * space={{s: '1', xl:'5'}}
   */
  space="5"
>
  <Col
    // Will be:
    // 12 for "xs" and "s"
    // 6 for "m" and "l"
    // 4 for "xl" and "xxl"
    size={[12, {m: 6, xl: 4}]}
  />
</Row>;
```

> Grid system use negative margins under the hood. So you can specify background-color css property directly in `Col` components. Use wrapper components in such cases.

## Container

Center you content. Almost always it should be one per page. Manage max width corresponding to current screen size

**Props**

- `gutters` - left and right content padding. Needed when you content width equals screen width;
- `maxWidth` - limits screen width for specific screen size;
- `spaceRow` - ability to specify spacing between children `Row` components

## Flex

CSS `Flexbox` model representation in `jsx` world. Has built-in `spacing` to manage space between children. All flex properties are available in props.
For most used properties it supports object syntax config to override behavior in different screen sizes.

#### Examples

_Space between children components in row direction_

```jsx
import {Flex, TextInput, Button} from '@gravity-ui/uikit';

<Flex space="5">
  <TextInput />
  <Button />
</Flex>;
```

_Nested `Flex` example_

```jsx
import {Flex, TextInput, Button, Table} from '@gravity-ui/uikit';

<Flex direction="column" space="5">
  <Flex space="5">
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
  // direction: column will be applied to l, xl, xxl, xxxl screen sizes here
  direction={{l: 'column'}}
  space={{s: '5', m: '3'}}
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

// this example will be shown on xl, xxl and xxxl screen sizes
const Component = () => {
  const {isMediaActive} = useLayoutContext();

  return (
    <>{isMediaActive('xl') ? <Text>I render on "xl", "xxl" and "xxxl" screen sizes</Text> : null}</>
  );
};
```

- `getClosestMediaProps` - it works in a similar way as `isMediaActive`, but takes a map with screen media as an argument. Returns the nearest available value in the map taking into account the **mobile-first** approach.

```tsx
import {useLayoutContext} from '@gravity-ui/uikit';

const mapOfPropsByScreen = {
  s: "i'm will be shown on 's' and 'n' screen size",
  l: "i'm will be shown on 'l' and 'xl' screen size",
  xxl: "i'm will be shown on 'xxl' and 'xxxl' screen size",
};

const Component = () => {
  const {getClosestMediaProps} = useLayoutContext();

  return <Text>{getClosestMediaProps(mapOfPropsByScreen)}</Text>;
};
```
