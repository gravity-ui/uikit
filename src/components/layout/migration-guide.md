# Migration to the new layout API

The layout update gives `Box`, `Flex`, `Container`, `Row`, and `Col` responsive style props and adds `Grid`. The spacing API, box sizing, grid gutters, and several `Flex` shortcuts are breaking changes.

## Migration checklist

1. Replace `Box`/`Flex` `spacing` objects with logical margin and padding props.
2. Replace removed `Flex` shortcuts (`grow`, `basis`, `shrink`, `centerContent`, `gapRow`, and `space`).
3. Convert spacing-scale values used by `Flex` to `spacing-*` tokens.
4. Check code that depends on the wrapper elements previously created by `Flex space`.
5. Convert `Container` gutters to spacing tokens and replace `spaceRow`, and `Row` `space` and `spaceRow`.
6. Rename breakpoint-based `Container.maxWidth` to `size`; keep `maxWidth` for CSS lengths or pixel values.
7. Check usages that set the same CSS property through both a layout prop and `style`.
8. Review `Box`/`Flex` sizes that relied on `border-box`; set `box-sizing` explicitly where needed.

## Spacing values and CSS units

Layout style props now follow CSS value semantics:

- numbers are pixels: `gap={2}` means `2px`;
- strings are passed through as CSS values: `gap="1rem"` means `1rem`;
- design-system spacing uses `spacing-*` tokens: `gap="spacing-2"` means `calc(var(--g-spacing-base) * 2)` (8px with the default theme).

This differs from the old `Flex` API, where numeric and numeric-string `gap`, `gapRow`, and `space` values were spacing-scale steps.

```diff
- <Flex gap={2} />
- <Flex gap="2" />
+ <Flex gap="spacing-2" />
```

The same rule applies to `gap`, `columnGap`, `rowGap`, margins, paddings, insets, sizes, and `Grid` track sizes. Existing numeric `Box` sizes keep their practical meaning because React also treated numbers such as `width={200}` as pixels.

All style props accept responsive objects. Values use mobile-first fallback: a value remains active until a larger configured breakpoint overrides it.

```tsx
<Box padding={{xs: 'spacing-2', m: 'spacing-4'}} width={{xs: '100%', l: 640}} />
```

## Box sizing

Previously, `Box` enforced `box-sizing: border-box`, and `Flex` inherited that rule through `Box`. Neither component now sets `box-sizing`. For their default `div` elements, the CSS default is `content-box` unless application styles override it.

With `content-box`, declared widths and heights describe the content area. Padding and borders add to the total size instead of fitting inside it. This also affects logical sizes such as `inlineSize` and `blockSize`, and their minimum and maximum constraints. For example, `width={200}` with `paddingInline="spacing-4"` now produces a 232px-wide box with the default spacing scale and no borders, rather than a 200px-wide box.

Review fixed-size layouts and `width="100%"` elements with padding or borders, which can now overflow their parent. To preserve the old sizing, set `boxSizing` through `style` or `box-sizing` in an application CSS class:

```tsx
<Box width={200} paddingInline="spacing-4" style={{boxSizing: 'border-box'}} />
<Flex width="100%" padding="spacing-2" style={{boxSizing: 'border-box'}} />
```

If your application already applies a `border-box` reset to these elements, their sizing remains unchanged. `Container` also leaves box sizing to CSS. With the default `content-box`, its width cap excludes gutters and borders.

## `Box`

### Replace `spacing`

The `spacing` prop has been removed, from `Card` too, which is built on `Box`. Replace it with explicit logical margin
and padding props:

| Old `spacing` key | New `Box` prop       |
| ----------------- | -------------------- |
| `m`               | `margin`             |
| `mt`              | `marginBlockStart`   |
| `mr`              | `marginInlineEnd`    |
| `mb`              | `marginBlockEnd`     |
| `ml`              | `marginInlineStart`  |
| `mx`              | `marginInline`       |
| `my`              | `marginBlock`        |
| `p`               | `padding`            |
| `pt`              | `paddingBlockStart`  |
| `pr`              | `paddingInlineEnd`   |
| `pb`              | `paddingBlockEnd`    |
| `pl`              | `paddingInlineStart` |
| `px`              | `paddingInline`      |
| `py`              | `paddingBlock`       |

```diff
- <Box spacing={{mt: 2, px: 4}} />
+ <Box marginBlockStart="spacing-2" paddingInline="spacing-4" />
```

The new props are logical and therefore adapt to RTL. If an old `ml` or `mr` usage intentionally targeted a physical side, set the physical CSS property through `style`.

### New style props

`Box` now supports responsive props in these groups:

- flex/grid item layout: `flex`, `flexGrow`, `flexBasis`, `flexShrink`, `alignSelf`, `justifySelf`, `placeSelf`, `order`, and grid placement props;
- logical and physical sizes: `inlineSize`, `blockSize`, `width`, `height`, and their `min*`/`max*` variants;
- position and logical insets;
- logical margins and paddings;
- background, border color/width, and border radius tokens.

Use UIKit token names for color and radius props, without the CSS variable prefix:

```tsx
<Box backgroundColor="generic" borderColor="generic" borderWidth={1} borderRadius="m" />
```

### Native props in types

`BoxProps` and the props types of the other layout components no longer include native HTML attributes: the component
infers them from `as` at the call site. An interface that extends `BoxProps` and uses `onClick`, `id` or `role` has to
declare them:

```tsx
interface PanelProps
  extends BoxProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof BoxProps> {}
```

### `style` precedence

Explicit `style` values override generated layout props for the same CSS property. Avoid specifying the same property in both places. Size props such as `width` now map to logical CSS properties such as `inline-size`, so physical and logical aliases can also conflict.

```diff
- <Box inlineSize={100} style={{inlineSize: 200}} /> // renders at 200px
+ <Box inlineSize={200} />
```

## `Flex`

Replace removed shortcuts as follows:

| Old prop        | New prop(s)                                   |
| --------------- | --------------------------------------------- |
| `grow`          | `flexGrow`                                    |
| `basis`         | `flexBasis`                                   |
| `shrink`        | `flexShrink`                                  |
| `centerContent` | `justifyContent="center" alignItems="center"` |
| `gapRow`        | `rowGap`                                      |
| `space`         | `gap`                                         |
| `justifyItems`  | remove; it has no effect in a flex container  |

```diff
- <Flex grow basis="auto" shrink={0} />
+ <Flex flexGrow flexBasis="auto" flexShrink={0} />

- <Flex centerContent />
+ <Flex justifyContent="center" alignItems="center" />

- <Flex gapRow={2} />
+ <Flex rowGap="spacing-2" />

- <Flex space="4" />
+ <Flex gap="spacing-4" />
```

`gap`, `columnGap`, and `rowGap` now accept normal CSS values, spacing tokens, responsive values, and two-value arrays where supported. They map directly to native CSS properties, without gap parsing or normalization. Use `gap` alone for equal gaps, or separate `rowGap` and `columnGap` for different gaps. Mixing the shorthand and longhands makes precedence depend on declaration order and can clear unchanged axis values during React updates.

```tsx
<Flex rowGap="spacing-2" columnGap="spacing-4" />
```

Responsive gaps are also supported:

```tsx
<Flex direction={{xs: 'column', m: 'row'}} gap={{xs: 'spacing-2', m: ['spacing-3', 'spacing-5']}} />
```

### `space` no longer wraps children

Legacy `space` emulated gaps with negative margins and wrapped every truthy child in an extra `div`. The replacement uses native CSS `gap` and renders children directly.

Review code that relies on:

- selectors targeting the generated wrapper;
- child elements being wrapped in block-level `div`s;
- the container's old negative margins or child padding;
- React tree traversal or tests that expect the wrappers.

In most cases, removing wrapper-specific CSS is sufficient.

## `Grid`

`Grid` is new and shares all `Box` style props. It adds responsive CSS Grid props such as `areas`, `rows`, `columns`, `autoRows`, `autoColumns`, `autoFlow`, alignment, and gaps.

```tsx
import {Grid, minmax, repeat} from '@gravity-ui/uikit';

<Grid columns={{xs: '1fr', m: repeat(2, minmax(0, '1fr'))}} gap="spacing-4">
  {children}
</Grid>;
```

The exported helpers generate CSS track values:

- `repeat(count, fragment)`;
- `minmax(min, max)`;
- `fitContent(dimension)`.

Use `spacing-*` inside track arrays when a track should use the UIKit spacing scale; plain numbers are pixels.

## Polymorphic elements and refs

`Box`, `Flex`, and `Grid` retain the `as` prop and infer native props from the selected element:

```tsx
<Box as="section" aria-labelledby="title" />
<Flex as="ul" role="list" />
<Grid as="main" />
```

After migration, run TypeScript and visual tests. TypeScript does not catch every change: numbers and numeric strings in `gap`, `rowGap`, `columnGap` and `gutters` are valid values that now mean pixels, and `Container maxWidth="l"` is a valid CSS value that no longer caps the width. The most useful search terms for locating old API usage are `spacing=`, `grow`, `basis`, `shrink`, `centerContent`, `gapRow`, `space`, `gap=`, `gutters=` and `maxWidth=`.

## `Container`, `Row`, and `Col`

`Row` now uses CSS Grid with 12 equal tracks and native CSS gaps instead of negative margins and generated column padding. All three components accept `Box` style props, `as`, native element props, and refs. Explicit column sizing through `size`, including responsive objects and tuples, is unchanged. Each unsized `Col` now spans all 12 tracks on its own row instead of sharing remaining space. Use explicit sizes to share a row, or use `Flex` for flexible widths. `Col` takes its width from the tracks of `Row`: outside a `Row` its `size` no longer sets a percentage width. The deprecated `Col` props `s`, `m`, `l`, `xl`, and `xxl` have been removed. Move them into `size`:

```diff
- <Col s={12} m={6} l={4} />
+ <Col size={{s: 12, m: 6, l: 4}} />

- <Col size={12} m={6} />
+ <Col size={[12, {m: 6}]} />
```

| Old prop                    | Replacement                     |
| --------------------------- | ------------------------------- |
| `Container gutters={3}`     | `Container gutters="spacing-3"` |
| `Container gutters={false}` | `Container gutters={0}`         |
| `Container spaceRow="2"`    | `Container rowGap="spacing-2"`  |
| `Container maxWidth="l"`    | `Container size="l"`            |
| `Row space="3"`             | `Row gap="spacing-3"`           |
| `Row spaceRow="2"`          | `Row rowGap="spacing-2"`        |

`Container size="l"` restores the breakpoint-based width cap under a new name. It reads the configured `l` breakpoint and caps the content width, excluding gutters and borders with the default `content-box` sizing. Leave width unset to fit narrower parents automatically; `width="100%"` plus gutters can overflow. Application CSS can override box sizing. Omit `size` for an uncapped container. `maxWidth` remains a normal responsive CSS style prop; explicit `maxWidth`, `maxInlineSize`, or `style.maxInlineSize` overrides the breakpoint cap.

The old `Row space` set both gaps and `spaceRow` overrode the vertical one, so `space` alone becomes `gap`, and `space` with `spaceRow` becomes `columnGap` with `rowGap`. Use `columnGap` to override only horizontal spacing. Numbers are pixels, CSS strings pass through, and spacing-scale values require `spacing-*` tokens. `gap` also supports two-value arrays, with row spacing first and column spacing second.

```diff
- <Container gutters={3} spaceRow={4} maxWidth="l">
-   <Row space={3} spaceRow={2}>
+ <Container gutters="spacing-3" rowGap="spacing-4" size="l">
+   <Row columnGap="spacing-3" rowGap="spacing-2">
      <Col size={{xs: 12, m: 6}}>Content</Col>
    </Row>
  </Container>
```

Keep `components.container.gutters` and rename `components.container.spaceRow` to `rowGap` in layout theme configuration, including `media` overrides. Convert theme spacing steps to tokens too. Zero values now override inherited theme spacing.

`gutters` keeps its name but now accepts responsive values, spacing tokens, CSS lengths, and numbers in pixels. Use `gutters={0}` instead of `gutters={false}`. The standard `paddingInline` style prop remains available and overrides theme defaults; explicit `gutters` takes precedence over `paddingInline`.

`Container` is based on `Box`, not `Flex`. Its `rowGap` applies `margin-block-start` only between adjacent direct-child `Row` elements. The first row, non-row children, and nested rows receive no added spacing. Each nested container resolves its own row spacing from props or theme defaults. Flex container alignment and gap props are no longer supported; use `Flex` for spacing arbitrary children. `Col` backgrounds and borders now cover the column's content box instead of its old gutter padding. Review selectors that depend on old modifier classes (`g-flex_center-content`, `g-flex_s_*`, `g-row_s_*`, `g-row_sr_*`, `g-container_sr_*`, `g-box_overflow_*`) or on `Col` padding; `overflow` of `Box` is now an inline style. CSS Grid handles gap sizing directly, so gaps defined in CSS classes also work when no inline gap overrides them.

`Row` accepts Grid alignment props instead of Flex alignment props. `justifyContent` aligns the tracks rather than columns in a partially filled row. Use `justifyItems` or column `justifySelf` for alignment inside cells. Flex sizing props such as `flexGrow` no longer affect `Col` inside a `Row`.
