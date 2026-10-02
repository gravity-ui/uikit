# Migration to the new layout API

The layout update turns `Box` into a responsive style-prop primitive, rebuilds `Flex` on top of the same props, and adds `Grid`. Most existing `Box` and `Flex` usages continue to render, but the spacing API and several `Flex` shortcuts are breaking changes.

## Migration checklist

1. Replace `Box`/`Flex` `spacing` objects with logical margin and padding props.
2. Replace removed `Flex` shortcuts (`grow`, `basis`, `shrink`, `centerContent`, `gapRow`, and `space`).
3. Convert spacing-scale values used by `Flex` to `spacing-*` tokens.
4. Check code that depends on the wrapper elements previously created by `Flex space`.
5. Check usages that set the same CSS property through both a layout prop and `style`.

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

## `Box`

### Replace `spacing`

The `spacing` prop has been removed. Replace it with explicit logical margin and padding props:

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

### `style` precedence changed

Generated layout props now override the same property in `style`. Do not specify the same property in both places.

```diff
- <Box width={100} style={{width: 200}} /> // previously 200px
+ <Box width={200} />
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

`gap`, `columnGap`, and `rowGap` now accept normal CSS values, spacing tokens, responsive values, and two-value arrays where supported:

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

After migration, run TypeScript and visual tests. The most useful search terms for locating old API usage are `spacing=`, `grow`, `basis`, `shrink`, `centerContent`, `gapRow`, and `space` on `Box`/`Flex` elements.
