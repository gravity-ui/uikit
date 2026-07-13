# Theming, Colors & Branding

We use and recommend CSS variables for theming.

Everything is driven by CSS custom properties prefixed with `--g-*`. There is no runtime styling API you need to call — you set variables and components pick them up.

```tsx
import {ThemeProvider, Button} from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

export const App = () => (
  <ThemeProvider theme="system">
    <Button view="action">Branded button</Button>
  </ThemeProvider>
);
```

## How theming works

All variables live on the root class `.g-root`, which `ThemeProvider` assigns to `<body>` by
default (change the target with the `scoped` prop). Color variables additionally live on a
per-theme class `.g-root_theme_{themeName}`, so switching the theme swaps one set of values for
another.

```
.g-root                      → structural tokens (spacing, typography metrics, border radius)
.g-root_theme_light          → color tokens for the light theme
.g-root_theme_dark           → color tokens for the dark theme
```

To customize anything, you provide new values for these CSS variables — for a single theme, for
several themes, or globally. If you support more than one theme, set color overrides **per theme**.

## Themes

UIKit ships 4 built-in themes:

| Theme      | Description                          |
| ---------- | ------------------------------------ |
| `light`    | Default light theme                  |
| `dark`     | Default dark theme                   |
| `light-hc` | Light, high-contrast (accessibility) |
| `dark-hc`  | Dark, high-contrast (accessibility)  |

Select the theme via `ThemeProvider`:

```tsx
<ThemeProvider theme="dark">{...}</ThemeProvider>
```

The default is `"system"`, which follows the OS color-scheme preference and resolves to `light`
or `dark`. You can control what `system` resolves to with `systemLightTheme` / `systemDarkTheme`.
Read or switch the theme at runtime with the `useTheme` / `useThemeValue` hooks.

## Color token layers

Colors are organized in **two layers**. Components and app code should only ever reference the
**semantic** layer.

### Private tokens

`--g-color-private-*` are the raw palette — the actual RGB values, organized by hue and by a
numeric scale. They exist so the semantic layer has something to point at. **Do not use them
directly in application code**; they are an implementation detail and can change.

Hue families: `black`, `white`, `blue`, `green`, `yellow`, `orange`, `red`, `purple`,
`cool-grey`.

Two flavors per step:

- `--g-color-private-black-50` — translucent (`rgba(0, 0, 0, 0.05)`), blends with what's behind it.
- `--g-color-private-black-50-solid` — opaque (`rgb(242, 242, 242)`), the pre-flattened equivalent.

Use `-solid` variants when a translucent color would let an underlying element bleed through
(e.g. overlapping elements, shadows).

### Semantic tokens

`--g-color-{group}-{role}` describe _intent_, not a specific hue. This is the layer you consume.

| Group                                             | Purpose                         | Examples                                                                 |
| ------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------ |
| `--g-color-base-*`                                | Backgrounds & fills             | `base-background`, `base-brand`, `base-generic`, `base-danger-medium`    |
| `--g-color-text-*`                                | Text colors                     | `text-primary`, `text-secondary`, `text-hint`, `text-brand`, `text-link` |
| `--g-color-line-*`                                | Borders, dividers, underlines   | `line-generic`, `line-brand`, `line-focus`, `line-danger`                |
| `--g-color-sfx-*`                                 | Effects — shadows, veils, fades | `sfx-shadow`, `sfx-veil`, `sfx-fade`                                     |
| `--g-color-infographics-*` / `--g-color-scroll-*` | Charts, scrollbars              | `infographics-axis`, `scroll-handle`                                     |

**Meaning conventions inside a group:**

- **Statuses** — `info` (blue), `positive` (green), `warning` (yellow), `danger` (red),
  `utility` (purple), `misc` (cool grey), plus `brand`, `generic` and `neutral`.
- **Intensity** — `light` → `medium` → `heavy` go from subtle background fills to strong,
  filled surfaces. `heavy` fills are meant to carry contrasting (`*-contrast`) text on top.
- **Interaction** — a `-hover` suffix is the hover counterpart of the base token
  (e.g. `base-brand` / `base-brand-hover`).
- **Text hierarchy** — `text-primary` > `text-secondary` > `text-hint` (decreasing emphasis).

```css
/* status background + matching text */
.alert-danger {
  background: var(--g-color-base-danger-light);
  color: var(--g-color-text-danger);
}
```

## Branding

Branding is a subset of theming: override a small, curated set of variables to make UIKit look
like your product. In most cases you only need the accent color, fonts, and border radius.

### Accent / brand color

The accent color is what makes an app feel branded — action buttons, active controls, links, and
selection highlights. Override this group (per theme):

| Variable                            | Used for                                          |
| ----------------------------------- | ------------------------------------------------- |
| `--g-color-base-brand`              | Brand background (action button, active controls) |
| `--g-color-base-brand-hover`        | Hover background                                  |
| `--g-color-base-selection`          | Lighter brand tint (List/Table row selection)     |
| `--g-color-base-selection-hover`    | Hover of the selection tint                       |
| `--g-color-line-brand`              | Brand lines (active tab underline)                |
| `--g-color-text-brand`              | Brand text                                        |
| `--g-color-text-brand-heavy`        | Brand text over a background                      |
| `--g-color-text-brand-contrast`     | Text placed **on top of** a brand background      |
| `--g-color-text-link`               | Links                                             |
| `--g-color-text-link-hover`         | Hover of links                                    |
| `--g-color-text-link-visited`       | Visited links                                     |
| `--g-color-text-link-visited-hover` | Hover of visited links                            |

```css
.g-root {
  --g-color-base-brand: rgb(117, 155, 255);
  --g-color-base-brand-hover: rgb(99, 143, 255);
  --g-color-base-selection: rgba(82, 130, 255, 0.05);
  --g-color-base-selection-hover: rgba(82, 130, 255, 0.1);
  --g-color-line-brand: rgb(117, 155, 255);
  --g-color-text-brand: rgb(117, 155, 255);
  --g-color-text-brand-contrast: rgb(255, 255, 255);
  --g-color-text-link: rgb(117, 155, 255);
  --g-color-text-link-hover: rgb(82, 130, 255);
}
```

> Set these on the theme class (e.g. `.g-root_theme_light`) if the brand color should differ
> between light and dark; use `.g-root` for values shared by all themes.

### Typography

Configure fonts, weights, and per-variant metrics via `--g-font-family-*` and `--g-text-*`
variables on the root class. Full reference — variants, sizing tokens, and customization — lives
in the [**typography guide**](typography.md).

```css
.g-root {
  --g-font-family-sans: 'Inter', sans-serif;
  --g-text-header-font-weight: 600;
}
```

### Shape (border radius)

Controls share a border-radius scale: `--g-border-radius-{size}` where size is one of
`xs`, `s`, `m`, `l`, `xl`. Use a token, never a hard-coded `px` value.

```css
/* your own component, in Gravity style */
.my-card {
  border-radius: var(--g-border-radius-m);
}
```

Individual components expose their own radius variable aligned to the same scale, so you can
tune one component without touching the global scale — e.g. `--g-button-border-radius`,
`--g-card-border-radius`, `--g-modal-border-radius`, `--g-popup-border-radius`,
`--g-text-input-border-radius`, `--g-list-container-border-radius`, `--g-focus-border-radius`.

```css
.g-root {
  --g-border-radius-m: 8px; /* whole scale step */
  --g-button-border-radius: var(--g-border-radius-l); /* just buttons */
}
```

## Using colors in your code

Consume semantic tokens directly in CSS. In JS/TSX, prefer the `Text` component's `color` prop
and component `view`/`theme` props over inline colors.

```css
.card {
  background: var(--g-color-base-generic);
  color: var(--g-color-text-primary);
  border: 1px solid var(--g-color-line-generic);
  border-radius: var(--g-border-radius-l);
}
```

```tsx
import {Text} from '@gravity-ui/uikit';

<Text color="secondary">Muted caption</Text>;
```

Because these are theme-aware tokens, the same markup renders correctly in every theme and
respects any brand overrides — no conditional theme logic in your components.

## Creating a custom theme

Define a theme from scratch, or extend one of the built-ins with the SCSS mixins:

```scss
@use '@gravity-ui/uikit/styles/themes';

// Start from the light theme, then override
.g-root_theme_custom {
  @include themes.g-theme-light;

  // your overrides
  --g-color-base-brand: rgb(117, 155, 255);
}
```

Available mixins: `themes.g-theme-light`, `themes.g-theme-dark`, `themes.g-theme-light-hc`,
`themes.g-theme-dark-hc`. Then pass your theme name to the provider:

```tsx
<ThemeProvider theme="custom">{...}</ThemeProvider>
```

### Rebranding: do it completely

> **Don't override just 2–4 tokens.** If you only set `--g-color-base-brand`, then selection,
> focus, links and `*-contrast` colors stay on the default accent and your UI ends up
> mismatched. Override the **full brand token set** (the [accent table](#accent--brand-color)
> above) — and provide values for **each theme** you support (dark themes usually need a
> brighter brand color than light).

Practical ways to produce a complete, consistent token set:

- **[Themer web tool](https://gravity-ui.com/themer)** — pick a couple of brand colors in the
  browser and export a ready theme as CSS or JSON.
- **[`@gravity-ui/uikit-themer`](https://github.com/gravity-ui/uikit-themer)** — the same
  generator as a library, for producing themes programmatically or wiring them into a build step.

  ```shell
  npm install @gravity-ui/uikit-themer
  ```

  ```ts
  import {generateCSS, updateBaseColor, DEFAULT_THEME} from '@gravity-ui/uikit-themer';

  // Change a base color; private/dependent tokens are recalculated for you.
  const theme = updateBaseColor({
    theme: DEFAULT_THEME,
    colorToken: 'brand',
    value: {light: '#007AFF', dark: '#007AFF'},
  });

  // Emit CSS with .g-root_theme_light / .g-root_theme_dark blocks.
  const css = generateCSS({theme, ignoreDefaultValues: true});
  ```

  It also exposes `generateJSON` / `parseCSS` / `parseJSON` and CSS↔JSON converters. Always use
  `updateBaseColor` (rather than editing tokens by hand) so the private palette regenerates and
  the theme stays internally consistent.

- **SCSS mixins** — extend a built-in theme (above) and layer overrides on top.

Whichever you use, **import the generated theme file _after_ `styles.css`** so it wins the
cascade; `ThemeProvider` activates it via the theme class automatically. Keep the brand
definition in a single theme file — don't search-and-replace `--g-*` variables across your codebase.

### Scoped themes

To apply a different theme to just one region (e.g. a dark toolbar in a light app), nest a
`scoped` provider — it sets the theme class locally and updates React context for descendants
without polluting the global root:

```tsx
<ThemeProvider scoped theme="dark">
  <Toolbar />
</ThemeProvider>
```

For a CSS-only region (no context update), apply the class from `getRootClassName({theme: 'dark'})`.
