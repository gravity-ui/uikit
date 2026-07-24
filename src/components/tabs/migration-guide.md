# Migration from legacy Tabs

The legacy `Tabs` (`@gravity-ui/uikit/legacy`) is a single all-in-one component: pass an `items` array or `Tabs.Item` children, plus `activeTab`/`onSelectTab`, and it renders a `role="tablist"` container with built-in active-tab-tracking logic (including "first item active by default").

The new tabs API (`@gravity-ui/uikit`) splits this into four composable pieces:

- [`TabProvider`](./README.md#tabprovider) — optional context, only needed when a `TabList` and its `TabPanel`s are separated by your own layout markup (so they aren't direct siblings) and need to share `value`/`onUpdate` through context instead of props
- [`TabList`](./README.md#tablist) — the `role="tablist"` container (equivalent of legacy `Tabs`'s root); holds `value`/`onUpdate` directly in the common case
- [`Tab`](./README.md#tab) — an individual tab trigger (equivalent of `Tabs.Item`)
- [`TabPanel`](./README.md#tabpanel) — new, optional; a content region tied to a `value`, with no legacy equivalent (previously you managed panel visibility yourself)

**There is no items-array mode in the new API** — always render `<Tab>` children directly (via `.map()` if your tabs are data-driven).

## Quick example

```diff
- <Tabs
-   activeTab={activeTab}
-   onSelectTab={(tabId) => setActiveTab(tabId)}
-   items={[
-     {id: 'first', title: 'First Tab'},
-     {id: 'second', title: 'Second Tab'},
-   ]}
- />
+ <TabList value={activeTab} onUpdate={setActiveTab}>
+   <Tab value="first">First Tab</Tab>
+   <Tab value="second">Second Tab</Tab>
+ </TabList>
```

`TabProvider` isn't needed here — pass `value`/`onUpdate` straight to `TabList`. Only reach for `TabProvider` when a `TabList` and its `TabPanel`s are separated by other markup (so they can't share `value`/`onUpdate` as plain props) and need to pick up shared state from context instead:

```tsx
<TabProvider value={activeTab} onUpdate={setActiveTab}>
  <div className="custom-layout">
    <TabList>
      <Tab value="first">First Tab</Tab>
      <Tab value="second">Second Tab</Tab>
    </TabList>
    <SomeCustomWrapper>
      <TabPanel value="first">First content</TabPanel>
      <TabPanel value="second">Second content</TabPanel>
    </SomeCustomWrapper>
  </div>
</TabProvider>
```

## `Tabs` → `TabList`/`TabProvider`

| Legacy                                                   | New                                                | Notes                                                                                                                                                                        |
| -------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeTab`                                              | `value` (on `TabList`, or lifted to `TabProvider`) | same concept, renamed                                                                                                                                                        |
| `onSelectTab`                                            | `onUpdate`                                         | same concept, renamed                                                                                                                                                        |
| `allowNotSelected`                                       | _(nothing to set)_                                 | new `value` is optional already — just don't pass a value that matches any `Tab`'s `value`, and none will render active                                                      |
| _(implicit: first item active if `activeTab` is unset)_  | _(none)_                                           | new `TabList` never auto-selects a tab — if your code relied on that fallback, pass the first item's `value` explicitly as the initial `value`                               |
| `items` (array prop)                                     | `children` (`<Tab>` elements)                      | render tabs via `.map()` instead of passing a data array — see [full example](#full-example) below                                                                           |
| `wrapTo`                                                 | _(none needed — wrap inside your own `.map()`)_    | since tabs are already plain JSX children, wrapping a `<Tab>` in another element is just normal JSX composition, no dedicated API required                                   |
| `size` (`'m'` \| `'l'` \| `'xl'`)                        | `size`                                             | same values, same meaning                                                                                                                                                    |
| `direction` (`'horizontal'` \| `'vertical'`, deprecated) | _(horizontal only)_                                | **no vertical mode in the new component** — if you still render `direction="vertical"` tabs, there is no built-in replacement; you'll need to build your own vertical layout |
| `className`                                              | `className`                                        | same                                                                                                                                                                         |
| `qa`                                                     | `qa`                                               | same                                                                                                                                                                         |
| `AriaLabelingProps` (`aria-label`, etc.)                 | same, via native HTML attributes                   | `TabListProps` extends `React.HTMLAttributes<HTMLDivElement>`, so `aria-*` props pass straight through                                                                       |

`TabList` also gains props with no legacy counterpart, worth adopting during migration:

- `contentOverflow` (`'wrap'` \| `'scroll'` \| `'collapse'`, default `'wrap'`) — `'collapse'` gives a built-in "More" overflow menu; useful if your legacy usage hand-rolled its own overflow/"more" handling
- `moreLabel` — label for the `'collapse'` overflow trigger
- `activateOnFocus` — activates a tab as soon as it receives keyboard focus, instead of requiring a separate activation; only enable this if the associated panel's content can be shown immediately

## `Tabs.Item` → `Tab`

| Legacy                                                 | New                                       | Notes                                                                                                                                                                       |
| ------------------------------------------------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                   | `value`                                   | renamed                                                                                                                                                                     |
| `title` (`string` \| `React.ReactNode`)                | `children`                                | content moves from a prop to JSX children                                                                                                                                   |
| `icon`                                                 | `icon`                                    | same                                                                                                                                                                        |
| `counter`                                              | `counter`                                 | same                                                                                                                                                                        |
| `label` (`{content, theme}`)                           | `label` (`{content, theme}`)              | identical shape                                                                                                                                                             |
| `disabled`                                             | `disabled`                                | same                                                                                                                                                                        |
| `onClick(tabId)`                                       | _(none — remove)_                         | selection is now handled globally by `TabList`'s/`TabProvider`'s `onUpdate`, not per-item — there's nothing to wire up on `Tab` itself                                      |
| `meta` (description, only ever shown in vertical mode) | _(none)_                                  | tied to legacy's vertical layout, which has no new equivalent; render your own subtext inside `children` if you still need it                                               |
| `hint` (sets the HTML `title` tooltip attribute)       | _(no dedicated prop, but works natively)_ | `Tab` spreads native `button`/`a` attributes directly, so passing the native `title="..."` attribute reproduces this exactly                                                |
| `hasOverflow` (ellipsis/`min-width: 0` CSS flag)       | _(none)_                                  | apply your own `text-overflow`/`min-width` styling on `children` if truncation is still needed                                                                              |
| `extraProps`                                           | _(none needed)_                           | `Tab` already spreads native DOM props directly — `TabButtonProps`/`TabLinkProps` extend `ButtonHTMLAttributes`/`AnchorHTMLAttributes` — just pass them straight on `<Tab>` |
| —                                                      | `href` (new)                              | passing `href` renders `Tab` as an `<a>` — legacy `Tabs.Item` had no link mode                                                                                              |
| —                                                      | `component` (new)                         | polymorphic root override (render `Tab` as a router `Link`, etc.) — no legacy equivalent                                                                                    |

## CSS variables

The base set carries over unchanged: `--g-tabs-border-width`, `--g-tabs-item-height`, `--g-tabs-item-border-width`, `--g-tabs-item-gap`.

`--g-tabs-vertical-item-height`/`--g-tabs-vertical-item-padding` have no meaning in the new component, since it has no vertical layout to apply them to.

## Full example

```diff
- <Tabs
-   activeTab={activeTab}
-   onSelectTab={(tabId) => setActiveTab(tabId)}
-   items={[
-     {id: 'overview', title: 'Overview', icon: <Icon data={InfoIcon} />},
-     {id: 'comments', title: 'Comments', counter: 4},
-     {id: 'settings', title: 'Settings', disabled: true},
-   ]}
- />
+ <TabList value={activeTab} onUpdate={setActiveTab}>
+   {[
+     {value: 'overview', title: 'Overview', icon: <Icon data={InfoIcon} />},
+     {value: 'comments', title: 'Comments', counter: 4},
+     {value: 'settings', title: 'Settings', disabled: true},
+   ].map(({value, title, ...rest}) => (
+     <Tab key={value} value={value} {...rest}>
+       {title}
+     </Tab>
+   ))}
+ </TabList>
```

## Migration from `@gravity-ui/components`'s AdaptiveTabs

`AdaptiveTabs` (from the separate `@gravity-ui/components` package) is superseded by `TabList`'s `contentOverflow="collapse"` mode — both solve "collapse tabs that don't fit into a 'More' menu", but the implementations differ in a few behaviors described below.

### Quick example

```diff
- <AdaptiveTabs
-   activeTab={activeTab}
-   onSelectTab={(tabId) => setActiveTab(tabId)}
-   items={[
-     {id: 'first', title: 'First Tab'},
-     {id: 'second', title: 'Second Tab'},
-   ]}
- />
+ <TabList value={activeTab} onUpdate={setActiveTab} contentOverflow="collapse">
+   {[
+     {value: 'first', title: 'First Tab'},
+     {value: 'second', title: 'Second Tab'},
+   ].map(({value, title}) => (
+     <Tab key={value} value={value}>
+       {title}
+     </Tab>
+   ))}
+ </TabList>
```

### `AdaptiveTabsProps` → `TabList`/`Tab`

| Legacy (`AdaptiveTabs`)                                                          | New                           | Notes                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items` (`TabItem<T>[]`)                                                         | `children` (`<Tab>` elements) | same conversion as [legacy `Tabs`' `items` prop above](#tabs--tablisttabprovider) — render via `.map()`                                                                                                                                                                                 |
| `activeTab`                                                                      | `value`                       | same concept, renamed                                                                                                                                                                                                                                                                   |
| `onSelectTab(tabId, event?)`                                                     | `onUpdate(value)`             | same concept, renamed — note the optional `event` second argument is dropped                                                                                                                                                                                                            |
| `allowNotSelected`                                                               | _(nothing to set)_            | same reasoning as [legacy `Tabs`' `allowNotSelected`](#tabs--tablisttabprovider) — just don't pass a matching `value`                                                                                                                                                                   |
| `wrapTo`                                                                         | _(usually removable)_         | `AdaptiveTabs`' built-in item only rendered `title`/`hint`/`active`/`disabled`, so `wrapTo` was the only way to add `icon`/`counter`/`label` — the new `Tab` supports all three natively, see below                                                                                     |
| `size` (`'m'` \| `'l'` \| `'xl'`)                                                | `size`                        | same values, same meaning                                                                                                                                                                                                                                                               |
| `className`                                                                      | `className`                   | same                                                                                                                                                                                                                                                                                    |
| `breakpointsConfig`                                                              | _(none)_                      | `AdaptiveTabs` proportionally shrinks each tab's max width (as a % of container width) as the container narrows, _before_ anything overflows; `contentOverflow="collapse"` has no such gradual-shrink step — a tab is either shown at full width or moved entirely into the "More" menu |
| `moreControlProps` (`virtualizationThreshold`, `popupWidth`)                     | _(none)_                      | the new "More" menu (`TabMore`) is a plain `Menu`, not a virtualized `Select` — there's nothing to tune besides `moreLabel`                                                                                                                                                             |
| _(implicit: entire bar becomes a single `Select` below the smallest breakpoint)_ | _(none)_                      | this is a real behavior gap, not just a rename — at minimum, `contentOverflow="collapse"` always keeps the active tab visible (as the menu's own trigger once nothing else fits), it never replaces the whole tab bar with one control                                                  |

`TabList` also gains `moreLabel` and `activateOnFocus`, described in the [legacy `Tabs` section above](#tabs--tablisttabprovider).

### `TabItem<T>` → `Tab`

| Legacy (`AdaptiveTabs`' `TabItem<T>`) | New                                      | Notes                                                                                                                                                         |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                  | `value`                                  | renamed                                                                                                                                                       |
| `title`                               | `children`                               | content moves from a prop to JSX children                                                                                                                     |
| `hint`                                | native `title` attribute                 | same as [legacy `Tabs.Item`'s `hint`](#tabsitem--tab) — `Tab` spreads native attributes directly                                                              |
| `disabled`                            | `disabled`                               | same                                                                                                                                                          |
| —                                     | `icon`, `counter`, `label` (new, native) | `AdaptiveTabs` had no built-in support for these — reaching them required a custom `wrapTo`; the new `Tab` accepts them directly as props, no wrapping needed |
