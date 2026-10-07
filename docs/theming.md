# Theming, Colors & Branding

[English](theming.md) | [Русский](theming-ru.md)

We use and recommend CSS variables for theming.

Everything is driven by CSS custom properties prefixed with `--g-*`. There is no runtime styling API you need to call — you set variables and components pick them up.

```tsx
import {Provider, Button} from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

export const App = () => (
  <Provider theme="system">
    <Button view="action">Branded button</Button>
  </Provider>
);
```

## How theming works

All variables live on the root class `.g-root`, which `ThemeProvider` assigns to `<body>` by
default when used without a parent theme (use `scoped` for a local root). Color variables additionally live on a
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

Select the application theme via `Provider`:

```tsx
<Provider theme="dark">{...}</Provider>
```

The default is `"system"`, which follows the OS color-scheme preference and resolves to `light`
or `dark`. You can control what `system` resolves to with `systemLightTheme` / `systemDarkTheme`.
Read the requested/resolved theme with `useTheme` / `useThemeValue`; switch it by updating the `theme` prop.

## Providers

`Provider` is the application provider. Nested Providers are always scoped, even with
`scoped={false}`, and inherit unspecified theme, language, layout, and component-default settings.
Mobile settings use independent defaults. Use a feature provider to configure just one feature. All listed components and prop types are exported from `@gravity-ui/uikit`.

### Provider

`ProviderProps` combines the theme props below, `lang` and `fallbackLang`, the mobile props below,
`children`, and these settings:

| Prop           | Type                                    | Behavior                                                   |
| -------------- | --------------------------------------- | ---------------------------------------------------------- |
| `layout`       | `Omit<LayoutProviderProps, 'children'>` | Layout configuration, media queries, and breakpoint mode   |
| `defaultProps` | `DefaultPropsMap`                       | Component defaults; explicit component props take priority |

It composes `LayoutProvider`, `DefaultPropsProvider`, `ThemeProvider`, `LangProvider`, and
`MobileProvider`, and installs a private shared tooltip delay group. Configure that group with
`defaultProps={{TooltipDelayGroup: {skipDelay: 500}}}`. Nested Providers and theme scopes share the same group.

### ThemeProvider

`ThemeProviderProps` accepts `children` and these optional props:

| Prop               | Type        | Default without a parent theme              |
| ------------------ | ----------- | ------------------------------------------- |
| `theme`            | `Theme`     | `system`                                    |
| `systemLightTheme` | `RealTheme` | `light`                                     |
| `systemDarkTheme`  | `RealTheme` | `dark`                                      |
| `direction`        | `Direction` | `ltr`                                       |
| `scoped`           | `boolean`   | `false`; always `true` inside another theme |
| `rootClassName`    | `string`    | Empty; added to body or the scoped wrapper  |

Read the requested theme with `useTheme`, the resolved theme with `useThemeValue`, system mappings
with `useThemeSettings`, and direction with `useDirection`. Change theme by updating the provider's
`theme` prop. See [Scoped themes](#scoped-themes) for local overrides.

### LangProvider

`LangProviderProps` accepts `children`, `lang`, and `fallbackLang`. Language names support built-in
`en` and `ru` as well as custom languages registered through the i18n API. Nested providers inherit
unspecified options. When either language option is specified without a parent language context,
the remaining option defaults to `en`. With neither option, the provider passes through the parent
context, or `useLang` reads the global `configure` settings when there is no parent context.

```tsx
<LangProvider lang="ru" fallbackLang="en">
  <LocalizedContent />
</LangProvider>
```

### LayoutProvider

`LayoutProviderProps` accepts `children`, `config` (partial `LayoutTheme`), `initialMediaQuery`
(a breakpoint name for the initial/SSR render), and `fixBreakpoints`. Nested providers inherit the
theme, `fixBreakpoints`, and active breakpoint, including the parent's initial breakpoint during
SSR. `config` merges with the parent theme without mutating it. Explicit settings override inherited
ones; custom breakpoints or a different `fixBreakpoints` mode calculate a local active breakpoint.
Without a parent provider, `fixBreakpoints` defaults to `false` and the initial breakpoint is `s`,
or `xs` when `fixBreakpoints` is enabled. It adds no DOM wrapper. See [Layout](layout.md).

```tsx
<LayoutProvider config={layoutConfig} fixBreakpoints>
  <ResponsiveContent />
</LayoutProvider>
```

### MobileProvider and mobile settings

The existing public `MobileProvider` remains available. `Provider` accepts all its settings
directly, with the same defaults:

| Prop          | Type                                     | Default                          |
| ------------- | ---------------------------------------- | -------------------------------- |
| `mobile`      | `boolean`                                | `false`                          |
| `platform`    | `Platform` (`browser`, `ios`, `android`) | `Platform.BROWSER`               |
| `useHistory`  | `MobileProviderProps['useHistory']`      | No-op history                    |
| `useLocation` | `MobileProviderProps['useLocation']`     | Empty pathname, search, and hash |

`useHistory` supports router history v4/v5: `back` is adapted to `goBack` when `goBack` is absent.
`mobile` toggles `.g-root_mobile` on body through `MobileProvider` and is read by `useMobile`;
`usePlatform` reads the platform. Every Provider uses the mobile defaults independently, including
nested and explicitly scoped Providers. Mobile settings and router hooks are not inherited;
pass them explicitly when needed. Scoped behavior applies to theme and direction; the mobile class
continues to be managed on body.
`Modal` and `Dialog` use mobile rendering whenever `mobile` is enabled.

```tsx
import {Platform, Provider} from '@gravity-ui/uikit';

<Provider mobile platform={Platform.IOS}>
  <App />
</Provider>;
```

Use `MobileProvider` when a separate mobile context is needed; its body-class behavior is unchanged.
Changing a nested theme preserves the current mobile context.

## Default component props

Use `Provider.defaultProps` to set application-wide defaults for UIKit components:

```tsx
import type {DefaultPropsMap} from '@gravity-ui/uikit';
import {Button, Provider} from '@gravity-ui/uikit';

const defaultProps = {
  Button: {size: 'l', view: 'outlined'},
} satisfies DefaultPropsMap;

<Provider defaultProps={defaultProps}>
  <Button>Large outlined button</Button>
</Provider>;
```

Use `DefaultPropsProvider` to override defaults for a subtree without creating another theme
scope:

```tsx
import type {DefaultPropsMap} from '@gravity-ui/uikit';
import {Button, DefaultPropsProvider} from '@gravity-ui/uikit';

const actionButtonDefaults = {
  Button: {view: 'action'},
} satisfies DefaultPropsMap;

<DefaultPropsProvider defaultProps={actionButtonDefaults}>
  <Button>Action button</Button>
</DefaultPropsProvider>;
```

Explicit component props have the highest priority. A prop set to `undefined` does not override a
default. Nested providers inherit entries for other components, but replace the complete defaults
object for the same component. For example, an inner `Button: {view: 'action'}` replaces both the
`view` and `size` from an outer `Button: {view: 'outlined', size: 'l'}`. Resetting all inherited
defaults for a subtree is not currently supported.

Keep the `defaultProps` object referentially stable by defining it outside render or wrapping it in
`React.useMemo`. Passing an inline object creates a new context value on every parent render and
causes components that consume defaults to update.

### Defaults for components from other libraries

Libraries built on top of UIKit can use the same provider for their own components. The library
should keep `@gravity-ui/uikit` in `peerDependencies`, augment `DefaultPropsMap` from its public
type declarations, and apply defaults with `useDefaultProps`:

```tsx
import {useDefaultProps} from '@gravity-ui/uikit';

import type {DatePickerProps} from './DatePicker';

declare module '@gravity-ui/uikit' {
  interface DefaultPropsMap {
    '@gravity-ui/date-components/DatePicker'?: Partial<DatePickerProps>;
  }
}

export function DatePicker(rawProps: DatePickerProps) {
  const props = useDefaultProps('@gravity-ui/date-components/DatePicker', rawProps);
  // ...
}
```

Use package-qualified component names to avoid collisions with other libraries. Once the library's
types are imported, consumers can configure its components alongside UIKit components:

```tsx
const defaultProps = {
  Button: {size: 'l'},
  '@gravity-ui/date-components/DatePicker': {size: 'l'},
} satisfies DefaultPropsMap;
```

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

- `--g-color-private-black-50` — translucent (`rgb(0 0 0 / 0.05)`), blends with what's behind it.
- `--g-color-private-black-50-solid` — opaque (`rgb(242 242 242)`), the pre-flattened equivalent.

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

A theme is just a set of `--g-*` values on a `.g-root_theme_{name}` class. To add one, generate a
complete token set (see below) and scope it to your theme's class:

```css
/* my-theme.css — imported after styles.css */
.g-root_theme_custom {
  --g-color-base-brand: rgb(117, 155, 255);
  /* …the full token set… */
}
```

Then pass your theme name to the provider:

```tsx
<Provider theme="custom">{...}</Provider>
```

If you only need to retint one of the built-in themes, don't declare a new theme at all — just
override the brand tokens on the built-in theme class (`.g-root_theme_light` /
`.g-root_theme_dark`), as shown in [Branding](#branding) above.

> **Generate the full token set — don't hand-write it.** Use the
> [Themer web tool](https://gravity-ui.com/themer) or
> [`@gravity-ui/uikit-themer`](https://github.com/gravity-ui/uikit-themer) (see below); overriding
> just a few tokens leaves selection, focus, links and `*-contrast` colors on the default accent.

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
  npm install @gravity-ui/uikit-themer@^2
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

Nest `ThemeProvider` inside `Provider` to apply a different theme to one region. It automatically
creates a local `div` with `.g-root`, the theme class, and `dir`, and updates React context for
descendants. It never changes the global root when nested, even with `scoped={false}`.

```tsx
import {Provider, ThemeProvider} from '@gravity-ui/uikit';

<Provider theme="light">
  <Page />
  <ThemeProvider theme="dark">
    <Toolbar />
  </ThemeProvider>
</Provider>;
```

Unspecified theme, direction, and system-theme mappings inherit from the nearest parent theme.
Nested scopes can contain other `ThemeProvider`s. Their portals, including popups and dialogs,
retain the local theme and direction even when mounted into `document.body` or a custom container.
A theme scope does not reset language, layout, component defaults, mobile settings, or tooltip delay groups.

Without a parent theme, `ThemeProvider` applies its theme and direction to `body` by default;
pass `scoped` to create a local root instead. A standalone `ThemeProvider` configures only theming:
it does not install the other feature providers or a tooltip delay group.

For a CSS-only region (no context update), apply the class from `getRootClassName({theme: 'dark'})`.
