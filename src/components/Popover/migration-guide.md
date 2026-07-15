# Migration from legacy Popover

The legacy `Popover` (`@gravity-ui/uikit/legacy`) is a fully-styled tooltip/popover: it renders its own title, content, links, action/cancel buttons, close button and colored themes.

The new `Popover` (`@gravity-ui/uikit`) is a thin, headless wrapper around [`Popup`](../Popup/README.md) — it only handles trigger interactivity (hover/click, delays, dismiss, focus) and renders whatever `content` you pass it, without any built-in title/buttons/theme styling.

**`Popup` applies no styling to `content` at all — not even padding.** It only draws its own surface (background/border/shadow/border-radius); everything inside is rendered flush against that surface's edges. Because of this, `content` must always be wrapped in an [`Alert`](../Alert/README.md) (or another component that supplies its own padding/layout) — plain text or a bare `div` will visually stick to the popup's edges. Render an `Alert` as `content` even for a simple one-line message. `Alert`'s `theme="clear"` is designed for exactly this: no background/border of its own (the new `Popover`/`Popup` already provides the surface), just a title/message/actions/close-button layout with proper padding.

## Quick example

```diff
- <Popover content="Some text" title="Title" theme="info">
-   <Button>Trigger</Button>
- </Popover>
+ <Popover
+   content={
+     <Alert
+       theme="clear"
+       title="Title"
+       // title is set and theme !== "announcement" → dim the message
+       message={<Text color="secondary">Some text</Text>}
+     />
+   }
+   hasArrow
+ >
+   <Button>Trigger</Button>
+ </Popover>
```

Note that `hasArrow` is set explicitly above.

## Behavior and positioning props

| Legacy                                                                      | New                                                         | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openOnHover`                                                               | `trigger` (`'all'` \| `'click'`)                            | `openOnHover={false}` → `trigger="click"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `behavior` + `delayOpening`/`delayClosing`                                  | `openDelay`/`closeDelay`                                    | Legacy enum: `immediate` = `[0, 0]`, `delayed` = `[300, 300]` (default), `delayedClosing` = `[0, 300]`. Only set `openDelay`/`closeDelay` explicitly if the legacy usage customized `behavior`/`delayOpening`/`delayClosing` away from the default — map the resulting `[open, close]` pair directly. If the legacy call never touched those props (just relied on the `"delayed"` default), prefer the new `Popover`'s own default (`openDelay=500`/`closeDelay=250`) instead of forcing `300`/`300` to match — there's nothing to preserve, and the new default is a reasonable one on its own |
| `hasArrow` (default `true`)                                                 | `hasArrow` (default `false`)                                | same prop, opposite default — set explicitly to keep an arrow                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `placement` (default `['right', 'bottom']`, or `['left', 'bottom']` in RTL) | `placement` (default `'bottom'`, Floating UI's own default) | same prop, different default — set explicitly to keep the old position                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tooltipOffset`                                                             | `offset`                                                    | same Floating UI offset concept                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `disablePortal`                                                             | `disablePortal`                                             | same                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `strategy`                                                                  | `strategy`                                                  | same                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `initialOpen` / imperative `ref`                                            | `open` + `onOpenChange`                                     | new `Popover` is always controlled/uncontrolled via `open`, no `initialOpen` — seed your own state to `true` if you need an initially-open popover                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `onOpenChange`                                                              | `onOpenChange`                                              | same name, new signature adds `(open, event, reason)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `disabled`                                                                  | `disabled`                                                  | same                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `focusTrap`                                                                 | `modal`                                                     | same concept (trap focus while open)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `autoFocus`                                                                 | `initialFocus={0}`                                          | roughly equivalent — focuses the first focusable element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `restoreFocusRef`                                                           | `returnFocus`                                               | same concept, accepts a ref or a boolean                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `qa`                                                                        | `qa`                                                        | same, but is now passed straight to `Popup` instead of being suffixed with `-tooltip`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `className` (on the trigger wrapper `div`)                                  | apply to your trigger element directly                      | new `Popover` has no wrapper `div` — `children` itself receives the interaction props                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

## Props with no equivalent

- **`anchorRef`/`anchorElement`** (detached/anchor-only mode, popover with no visible trigger child) — new `Popover` always requires a `children` trigger element to attach interaction props to. For a detached anchor, use [`Popup`](../Popup/README.md) directly — it already accepts `anchorElement`/`anchorRef` and needs no trigger.
- **Imperative `ref`** (`openTooltip`/`closeTooltip`, `PopoverInstanceProps`) — new `Popover` exposes no ref API. Replace with a controlled `open` + `onOpenChange` state that you toggle yourself.
- **`autoclosable={false}`** (stays open once hovered, only closes on an explicit trigger click) — no direct equivalent. Reproduce with controlled `open` state where your `onOpenChange` ignores hover-driven close events and only reacts to explicit close actions.
- **`offset` (`{top, left, block, inline}`)** — this shifted the _trigger wrapper_ via inline style, not the popup itself. New `Popover` has no wrapper to apply this to — wrap your trigger element yourself with the desired offset instead.

## Content props → `Alert`

Render `<Alert theme="clear" ... />` as `content`. `Popup` already supplies the background/border/shadow/border-radius surface, so an `Alert` with its own filled/outlined surface would double it up — `theme="clear"` gives just padding and layout. This padding isn't optional cosmetics: `Popup` itself has none, so skipping `Alert` (or any other padding-providing wrapper) leaves `content` rendered flush against the popup's edges.

| Legacy                                                               | `Alert` equivalent                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` (`string`)                                                   | `title`                                                                                                                                                                                                                                            |
| `content` (`ReactNode`)                                              | `message` — dim it with `<Text color="secondary">` when `title` is set and `theme !== 'announcement'`, see note below                                                                                                                              |
| `htmlContent` (raw HTML string)                                      | no direct equivalent — render it yourself, e.g. `message={<div dangerouslySetInnerHTML={{__html: htmlContent}} />}`                                                                                                                                |
| `contentClassName`                                                   | `className` on the `Alert`                                                                                                                                                                                                                         |
| `tooltipActionButton` + `tooltipCancelButton` (`{text, onClick}`)    | `actions={<Alert.Actions><Alert.Action view="..." onClick={...}>text</Alert.Action><Alert.Action view="..." onClick={...}>text</Alert.Action></Alert.Actions>}` — see note below                                                                   |
| `links` (`{text, href, target, onClick}[]`) + `forceLinksAppearance` | no built-in equivalent — render your own links inside `message`                                                                                                                                                                                    |
| `hasClose` + `onCloseClick`                                          | `onClose` — passing it automatically renders `Alert`'s own close button, no separate boolean needed                                                                                                                                                |
| `size` (`'s'` \| `'l'`)                                              | `size` (`'s'` \| `'m'` \| `'l'`) — `'s'` → `'s'`, `'l'` → `'l'` is closest, but check padding: `--g-popover-padding`/`--g-popover-max-width` have no `Alert` equivalent, use `--g-alert-padding` or your own `style`/`className` for custom sizing |

When a legacy tooltip had both a `title` and a `theme` other than `"announcement"`, its content was dimmed to a secondary color (`src/components/legacy/Popover/components/Content/Content.tsx`: `secondary={hasTitle ? theme !== 'announcement' : false}`, applied via `opacity: 0.7`). `Alert` doesn't dim `message` based on `title`/`theme` on its own, so wrap `message` in [`Text`](../Text/README.md) with `color="secondary"` yourself when that condition holds:

```tsx
<Alert theme="clear" title="Title" message={<Text color="secondary">Some text</Text>} />
```

`Alert`'s `actions` prop also accepts a plain `AlertAction[]` array of `{text, handler}` descriptors, which is simpler — but `AlertActions` only reads `text`/`handler` off each item, so there's no way to set a per-button `view` through that form. Legacy gave the action/cancel buttons a `view` that depended on `theme` (`src/components/legacy/Popover/components/Buttons/helpers/getButtonView.ts`), so reproducing the original look needs the `<Alert.Actions>`/`<Alert.Action view="...">` form with an explicit `view` per your legacy `theme`:

| Legacy `theme`   | Action button `view` | Cancel button `view` |
| ---------------- | -------------------- | -------------------- |
| `info` (default) | `normal`             | `flat`               |
| `special`        | `normal-contrast`    | `flat-contrast`      |
| `announcement`   | `normal-contrast`    | `outlined`           |

## Theme mapping (approximate)

Legacy `theme`: `'info'` \| `'special'` \| `'announcement'`. `Alert` `theme`: `'normal'` \| `'info'` \| `'success'` \| `'warning'` \| `'danger'` \| `'utility'` \| `'clear'`.

- `theme="info"` (legacy default, plain surface) → `Alert theme="clear"`, relying on `Popup`'s own neutral surface. Closest match.
- `theme="special"` (brand-colored solid surface) → keep `Alert theme="clear"` (layout only) and set the surface color on `Popup`'s own CSS variables — via `style` on the new `Popover`, not inside `Alert` — using the same variables legacy set for this theme:

  ```tsx
  <Popover
    style={{
      '--g-popup-background-color': 'var(--g-color-base-brand)',
      '--g-popup-border-color': 'var(--g-color-base-brand)',
    }}
    content={<Alert theme="clear" style={{color: 'var(--g-color-text-brand-contrast)'}} ... />}
    ...
  >
  ```

  `--g-popup-background-color`/`--g-popup-border-color` are read by `Popup` itself (`src/components/Popup/Popup.scss`), the same way legacy's `.popover-legacy__tooltip_theme_special` set them on the tooltip root (`src/components/legacy/Popover/Popover.scss`) — setting them on `Alert` instead would only paint its own content box, not the actual `Popup` surface/border behind it. The text `color` override still belongs on the content (`Alert`/`Text`), since it's about the readability of what's drawn on top of that surface, not the surface itself — `--g-color-text-brand-contrast` (a real design token) is a safer choice than a hardcoded light color, since it already resolves to whichever of light/dark text reads better against `--g-color-base-brand` per theme. Action/cancel buttons still use the `normal-contrast`/`flat-contrast` views from the [button-view table above](#content-props--alert), which are already designed to read on a colored background.

- `theme="announcement"` (dark solid surface with contrast buttons) has **no exact `Alert` equivalent** — none of `Alert`'s filled themes are that dark/neutral color. Either accept the closest palette-wise `Alert` theme (`normal`), or apply the same `Popover`-level `style` approach as `special` above using `var(--g-color-base-simple-hover-solid)` (the variable legacy used for this theme's `--g-popup-background-color`/`--g-popup-border-color`).

## Full example

```diff
- <Popover
-   title="Update available"
-   content="A new version is ready to install."
-   tooltipActionButton={{text: 'Update', onClick: handleUpdate}}
-   tooltipCancelButton={{text: 'Dismiss', onClick: handleDismiss}}
-   hasClose
-   onCloseClick={handleClose}
-   theme="info"
-   placement={['right', 'bottom']}
- >
-   <Button>Trigger</Button>
- </Popover>
+ <Popover
+   content={
+     <Alert
+       theme="clear"
+       title="Update available"
+       // title is set and theme was "info" (!== "announcement") → dim the message
+       message={<Text color="secondary">A new version is ready to install.</Text>}
+       // theme was "info" → action view="normal", cancel view="flat"
+       actions={
+         <Alert.Actions>
+           <Alert.Action view="normal" onClick={handleUpdate}>
+             Update
+           </Alert.Action>
+           <Alert.Action view="flat" onClick={handleDismiss}>
+             Dismiss
+           </Alert.Action>
+         </Alert.Actions>
+       }
+       onClose={handleClose}
+     />
+   }
+   hasArrow
+   placement={['right', 'bottom']}
+ >
+   <Button>Trigger</Button>
+ </Popover>
```
