# UIKit v2 changelog

## Typography

### BREAKING

- CSS var renamed: `--yc-font-family` → `--yc-text-body-font-family`
- CSS var renamed: `--yc-text-body-font-size` → `--yc-text-body-1-font-size`
- CSS var renamed: `--yc-text-body-line-height` → `--yc-text-body-1-line-height`
- CSS var renamed: `--yc-text-body2-font-size` → `--yc-text-body-2-font-size`
- CSS var renamed: `--yc-text-body2-line-height` → `--yc-text-body-2-line-height`
- CSS var renamed: `--yc-text-body3-font-size` → `--yc-text-body-3-font-size`
- CSS var renamed: `--yc-text-body3-line-height` → `--yc-text-body-3-line-height`
- CSS var removed: `--yc-text-lead-font-size` (possible replacement - `--yc-text-subheader-3-font-size`)
- CSS var removed: `--yc-text-lead-line-height` (possible replacement - `--yc-text-subheader-3-line-height`)
- CSS var renamed: `--yc-text-header-font-size` → `--yc-text-header-1-font-size`
- CSS var renamed: `--yc-text-header-line-height` → `--yc-text-header-1-line-height`
- CSS var renamed: `--yc-text-title-font-size` → `--yc-text-header-2-font-size`
- CSS var renamed: `--yc-text-title-line-height` → `--yc-text-header-2-line-height`
- CSS var renamed: `--yc-text-display1-font-size` → `--yc-text-display-1-font-size`
- CSS var renamed: `--yc-text-display1-line-height` → `--yc-text-display-1-line-height`
- CSS var renamed: `--yc-text-display2-font-size` → `--yc-text-display-2-font-size`
- CSS var renamed: `--yc-text-display2-line-height` → `--yc-text-display-2-line-height`
- CSS var renamed: `--yc-text-display3-font-size` → `--yc-text-display-3-font-size`
- CSS var renamed: `--yc-text-display3-line-height` → `--yc-text-display-3-line-height`
- CSS var renamed: `--yc-text-code-1-inline-font-size` → `--yc-text-code-inline-1-font-size`
- CSS var renamed: `--yc-text-code-1-inline-line-height` → `--yc-text-code-inline-1-line-height`
- CSS var renamed: `--yc-text-code-2-inline-font-size` → `--yc-text-code-inline-2-font-size`
- CSS var renamed: `--yc-text-code-2-inline-line-height` → `--yc-text-code-inline-2-line-height`
- CSS var renamed: `--yc-text-code-3-inline-font-size` → `--yc-text-code-inline-3-font-size`
- CSS var renamed: `--yc-text-code-3-inline-line-height` → `--yc-text-code-inline-3-line-height`
- CSS var removed: `--yc-text-code-font-size` (possible replacement - `--yc-text-code-1-font-size`)
- CSS var removed: `--yc-text-code-line-height` (possible replacement - `--yc-text-code-1-line-height`)
- Body line-height: `16px` → `18px`

### New

- CSS var added: `--yc-text-body-short-font-size`
- CSS var added: `--yc-text-body-short-line-height`
- CSS var added: `--yc-text-header-font-weight`
- CSS var added: `--yc-text-subheader-font-weight`
- CSS var added: `--yc-text-display-font-weight`
- CSS var added: `--yc-text-display-4-font-size`
- CSS var added: `--yc-text-display-4-line-height`
- CSS var added: `--yc-text-subheader-1-font-size`
- CSS var added: `--yc-text-subheader-1-line-height`
- CSS var added: `--yc-text-subheader-2-font-size`
- CSS var added: `--yc-text-subheader-2-line-height`
- CSS var added: `--yc-text-subheader-3-font-size`
- CSS var added: `--yc-text-subheader-3-line-height`
- CSS var added: `--yc-text-caption-1-font-size`
- CSS var added: `--yc-text-caption-1-line-height`
- CSS var added: `--yc-text-caption-2-font-size`
- CSS var added: `--yc-text-caption-2-line-height`
- Mixins added: `text-body-1`, `text-body-2`, `text-body-3`, `text-body-short`, `text-caption-1`, `text-caption-2`, `text-header-1`, `text-header-2`, `text-subheader-1`, `text-subheader-2`, `text-subheader-3`, `text-display-1`, `text-display-2`, `text-display-3`, `text-display-4`, `text-code-1`, `text-code-2`, `text-code-3`, `text-code-inline-1`, `text-code-inline-2`, `text-code-inline-3`

## Styles

### BREAKING

- CSS var removed: `--yc-color-loader-active`
- CSS var removed: `--yc-color-loader-inactive`
- CSS var removed: `--yc-color-base-selection-solid`
- CSS var removed: `--yc-color-base-selection-hover-solid`
- CSS var renamed: `--yc-tooltip-max-width` → `--yc-popover-max-width`

### New

Some CSS variables are now available for overwrite. Every `-yc-my-*` variable can be set to redefine base theme. Here full list of such variables:

- `--yc-my-scrollbar-width`
- `--yc-my-border-radius-s`
- `--yc-my-border-radius-m`
- `--yc-my-border-radius-l`
- `--yc-my-border-radius-xl`
- `--yc-my-color-brand-normal`
- `--yc-my-color-brand-normal-hover`
- `--yc-my-color-brand-light`
- `--yc-my-color-brand-selection`
- `--yc-my-color-brand-selection-hover`
- `--yc-my-color-brand-link`
- `--yc-my-color-brand-link-hover`
- `--yc-my-color-brand-text-contrast`

## Components

### BREAKING

- DropdownMenu: default switcher size changed from `s` to `m`
- Button: `clear` view was removed, consider using `flat-secondary` instead
- Tooltip: component was renamed to `Popover`
- HelpTooltip: component was renamed to `HelpPopover`

### New

- New `Tooltip` component
