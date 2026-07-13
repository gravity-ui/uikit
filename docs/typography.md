# Typography

UIKit's type scale is a fixed set of **text variants**, each with predefined `font-size` and
`line-height`. Render text with the `Text` component and a `variant` — **not** raw `<h1>`/`<p>`
tags or inline `font-size`. This keeps sizing consistent and theme-aware across the app.

```tsx
import {Text} from '@gravity-ui/uikit';

<Text variant="header-1">Page title</Text>; // not <h1>
<Text variant="body-2" color="secondary">
  Supporting copy
</Text>;
```

> Setup: import `@gravity-ui/uikit/styles/fonts.css` **before** `styles.css` at the app entry
> point, and wrap the app in `ThemeProvider`. See [theming](theming.md).

## Text variants

| Group     | Variants                                                  | Typical use                 |
| --------- | --------------------------------------------------------- | --------------------------- |
| Display   | `display-1`, `display-2`, `display-3`, `display-4`        | Hero / marketing headings   |
| Header    | `header-1`, `header-2`                                    | Page and section titles     |
| Subheader | `subheader-1`, `subheader-2`, `subheader-3`               | Sub-sections, card titles   |
| Body      | `body-1` (root default), `body-2`, `body-3`, `body-short` | Running text, UI copy       |
| Caption   | `caption-1`, `caption-2`                                  | Hints, labels, metadata     |
| Code      | `code-1`…`code-3`, `code-inline-1`…`code-inline-3`        | Code blocks and inline code |

The root node renders with the `body-1` variant.

## Font families

Two families, configurable via variables:

- `--g-font-family-sans` — sans-serif, the default UI font
- `--g-font-family-monospace` — monospace, used by the `code-*` variants

## Sizing tokens

Each variant exposes its metrics as CSS variables:

- `--g-text-{variant}-font-size`
- `--g-text-{variant}-line-height`

```css
/* e.g. --g-text-header-1-font-size, --g-text-body-2-line-height */
.custom-title {
  font-size: var(--g-text-header-1-font-size);
  line-height: var(--g-text-header-1-line-height);
}
```

Prefer `<Text variant="…">` over consuming these tokens directly; reach for the variables only
when styling a non-`Text` element that must match the scale.

## Font weight

`font-weight` is set per variant **group** (`body`, `header`, `subheader`, `display`, `caption`,
`code`) via `--g-text-{group}-font-weight`. There is also a standalone `--g-text-accent-font-weight`
usable independently of any variant.

## Customization

Override the font family, weights, or per-variant metrics on the root class (see
[theming](theming.md) for how the `--g-*` variables and root class work):

```css
.g-root {
  --g-font-family-sans: 'Inter', sans-serif;

  --g-text-header-font-weight: 600;
  --g-text-subheader-font-weight: 600;
  --g-text-display-font-weight: 600;
  --g-text-accent-font-weight: 600;

  /* fine-tune a single variant's metrics */
  --g-text-body-1-font-size: 15px;
  --g-text-body-1-line-height: 20px;
}
```
