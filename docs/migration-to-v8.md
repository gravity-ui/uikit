# Migration to v8

[English](migration-to-v8.md) | [Русский](migration-to-v8-ru.md)

## Overview

This page collects the breaking changes of `@gravity-ui/uikit` v8 and the way through each of them. Every section says
what changed, how to keep the old behavior for now, and where to go next.

Components that are no longer developed move to the `@gravity-ui/uikit/legacy` entry point. In v8 these are
`DropdownMenu`, `List`, `Menu`, `Table` and `TableColumnSetup`. Components still available there keep their API, but no
removal date for `/legacy` is promised: plan the migration away from them.

## Quick checklist

1. Upgrade React and React DOM to 18 or 19, see [React 18 minimum](#react-18-minimum).
2. Install the optional peer dependencies of the entry points you import, see [Dependencies](#dependencies).
3. Find the imports and props that moved or are gone, and go through the matching sections below:

   ```bash
   grep -rnE "@gravity-ui/uikit/(unstable|legacy)" src
   grep -rlE "from ['\"]@gravity-ui/uikit['\"]" src | xargs grep -HnwE "List|ListItem|ListQa|Menu|DropdownMenu|Table|TableColumnSetup|withTable[A-Za-z]+"
   grep -rnE "virtualizationThreshold|renderSelectedOption\b|SelectItem|xxs|xxl|extraProps|onKeyPress|iconSize|anchorRef|onEscapeKeyDown|onOutsideClick|onEnterKeyDown|disableHeightTransition|arrowPosition|layersCount" src
   ```

4. Check custom CSS and tests against [Everything else](#everything-else).

## ThemeProvider is split into separate providers

The previous `ThemeProvider` is split into feature providers, composed by the new application-level
`Provider`. It keeps the previous props and also accepts
all `MobileProvider` props directly. Replace the full `ThemeProviderProps` type with `ProviderProps`.
Remove the extra mobile wrapper when moving its settings to `Provider`:

```diff
- import {ThemeProvider, MobileProvider, Platform} from '@gravity-ui/uikit';
+ import {Provider, Platform} from '@gravity-ui/uikit';

- <ThemeProvider theme="light" lang="ru" layout={{fixBreakpoints: true}}>
-   <MobileProvider mobile platform={Platform.IOS} __experimentalMobileModals>
-     <App />
-   </MobileProvider>
- </ThemeProvider>
+ <Provider theme="light" lang="ru" layout={{fixBreakpoints: true}}
+   mobile platform={Platform.IOS} __experimentalMobileModals>
+   <App />
+ </Provider>
```

Nested Providers are always scoped, even with `scoped={false}`. They inherit unspecified theme,
language, layout, and component-default settings, and apply theme and direction to a local wrapper.
Mobile settings and router hooks are not inherited: each Provider uses the MobileProvider defaults
unless passed explicitly, and `mobile` controls `.g-root_mobile` on body. To override individual
features, use the corresponding providers:

| Previous ThemeProvider prop                                 | Subtree provider                                           |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| `theme`, `direction`, `systemLightTheme`, `systemDarkTheme` | `ThemeProvider`                                            |
| `lang`, `fallbackLang`                                      | `LangProvider`                                             |
| `layout`                                                    | `LayoutProvider` (spread the former layout object's props) |
| `defaultProps`                                              | `DefaultPropsProvider`                                     |

The new `ThemeProvider` and its `ThemeProviderProps` handle only theme and direction. `lang`,
`fallbackLang`, `layout`, and `defaultProps` have been removed from them. Without a parent theme,
ThemeProvider applies classes and direction to body; use `scoped` for a local root. Inside Provider
or another ThemeProvider it is always scoped, even with `scoped={false}`:

```tsx
<Provider theme="light">
  <ThemeProvider theme="dark">
    <LangProvider lang="ru">
      <Toolbar />
    </LangProvider>
  </ThemeProvider>
</Provider>
```

Theme scopes no longer recreate language, layout, component-default, or mobile providers. In
particular, they preserve the parent's breakpoint mode and mobile/router settings. Portals retain
the local theme and direction.

Existing standalone MobileProvider and DefaultPropsProvider APIs remain available.
The newly public LayoutProvider inherits all parent layout settings; without a parent,
`fixBreakpoints` still defaults to `false`.

See [Theming](theming.md#providers) for the full API and defaults.

## React 18 minimum

UIKit v8 requires React and React DOM 18 or 19. Upgrade both packages (and `@types/react`, if used) before installing
v8. React 16 and 17 are no longer supported.

## Dependencies

`@hello-pangea/dnd`, `react-window`, `react-virtualized-auto-sizer` and `@tanstack/react-virtual` are optional peer
dependencies: they are no longer installed with the package. The root entry point needs none of them; install the ones
of the entry points you import:

| Entry point                          | What to install                                                     |
| :----------------------------------- | :------------------------------------------------------------------ |
| `@gravity-ui/uikit/virtualizer`      | `@tanstack/react-virtual`                                           |
| `@gravity-ui/uikit/hello-pangea-dnd` | `@hello-pangea/dnd`                                                 |
| `@gravity-ui/uikit/legacy`           | `@hello-pangea/dnd`, `react-window`, `react-virtualized-auto-sizer` |

## New entry points

Two entry points keep their dependencies out of the root one:

| Entry point                          | What is there                                                                                                                      |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `@gravity-ui/uikit/virtualizer`      | [`Virtualizer` and `ListVirtualizer`](../src/components/Virtualizer/README.md): only the visible window of a long list is rendered |
| `@gravity-ui/uikit/hello-pangea-dnd` | [`ListHelloPangeaDnd` and its parts](../src/components/HelloPangeaDnd/README.md): reordering `List` rows with `@hello-pangea/dnd`  |

## List

`List` from the root entry point is a new component: selection, virtualization and drag-and-drop are optional layers,
and there is no built-in filter. The v7 `List` with `ListItem`, `ListQa` and its other exports is in
`@gravity-ui/uikit/legacy` (CSS block `g-list-legacy`), which needs [three optional peers](#dependencies):

```diff
- import {List} from '@gravity-ui/uikit';
+ import {List} from '@gravity-ui/uikit/legacy';
```

To move to the new `List`, see the [List migration guide](migration-from-legacy-list.md): props, behavior differences,
test ids and CSS, and [staying on the legacy List](migration-from-legacy-list.md#staying-on-the-legacy-list).

## Select

`Select` draws its options with the new `List`. Details are in the [Select guide](migration-select-v8.md).

### Options drawn by the new List

- `virtualizationThreshold` is removed: wrap the `Select` in `ListVirtualizer` from `@gravity-ui/uikit/virtualizer`.
  Without it every option is rendered.
- Without `ListVirtualizer` the popup is as wide as its widest option; wrap the `Select` or set `popupWidth="fit"`.
- The `text` field of an option (`SelectOptionProps`) is removed: the text of an option comes from `getOptionText`.
- `renderFilter` no longer receives `value` and `onKeyDown`: both are in `inputProps`.
- `renderOption` always receives `isItemActive`, and `itemHeight` carries the new row heights.
- Option values must be unique, groups included.
- The DOM `id` of a row comes from the option value, a group header is no longer `role="option"`, and
  several `g-select-list__*` classes and `.g-list__item` are gone.
- `label` names the trigger instead of joining its value.
- The search by the first letters matches a prefix.

### Select popup position

The `Select` popup is positioned from the control instead of the whole component, so with an error message under the
control (`errorPlacement="outside"`, the default) it opens right under the control and covers the message while open.
The popup width did not change. There is no option to restore the old position.

The control is wrapped in a new wrapper element `g-select__anchor` between the root and the control
(`g-select-control`). Update selectors that rely on the control being a direct child of the root, such as
`.g-select > .g-select-control`.

### Select `renderSelectedOption`

`renderSelectedOption(option, index)` is removed. `renderSelectedOptions(options)` is called once with the whole
selection, so a summary such as "All ticket types" can be rendered without `renderControl`. Map the old function over
the options to keep the old look — as before, separators between the options are up to it; see the
[Select guide](migration-select-v8.md):

```diff
- <Select renderSelectedOption={renderOne} />
+ <Select renderSelectedOptions={(options) => options.map(renderOne)} />
```

### Select option names

The types of the options and the components for them are named after `Select.Option`, as in
`SegmentedRadioGroup`. There are no aliases for the old names:

| Before                      | After                         |
| :-------------------------- | :---------------------------- |
| type `SelectOption`         | type `SelectOptionProps`      |
| type `SelectOptionGroup`    | type `SelectOptionGroupProps` |
| component `SelectItem`      | component `SelectOption`      |
| component `SelectItemGroup` | component `SelectOptionGroup` |

```diff
- import {SelectItem, type SelectOption} from '@gravity-ui/uikit';
+ import {SelectOption, type SelectOptionProps} from '@gravity-ui/uikit';
```

The old `SelectOption` or `SelectOptionGroup` used as a type now fails with "'SelectOption' refers to a value, but is
being used as a type here": replace it with `SelectOptionProps` or `SelectOptionGroupProps`.

## Row heights of List, Select and Menu

The rows of `ListItemView`, and with it of `List`, `Select` and `Menu`, follow the heights of the controls of the same
size: 24, 28, 36 and 44px. Rows of size `l` and `xl` are 36 and 44px instead of 32 and 36, the rows of the mobile
`Select` are 44px instead of 32. A section header of `List` and a group header of `Select` take the height of a row of
their size. Fewer rows fit into a popup or a list of a fixed height. To keep a height of your own, set
`--g-list-item-view-min-height` on the class of the list: `className` of `List` and `Menu`, `popupClassName` and
`sheetClassName` of `Select`; the paddings of `List` and `Select` and the headers follow it. The heights `Select` counts with — the
virtualizer estimate and `itemHeight` — come from `getOptionHeight` and `getOptionGroupHeight`.

## Table and TableColumnSetup

`Table`, its HOCs (`withTableActions`, `withTableCopy`, `withTableSelection`, `withTableSettings`,
`withTableSorting`) and `TableColumnSetup` moved from the root entry point to `@gravity-ui/uikit/legacy`. Their API and
markup did not change, the CSS blocks of the table (`g-table`, `g-table-column-setup`, …) keep their names. The row
actions menu now uses `g-menu-legacy` instead of `g-menu`; classes inside the column settings popup also changed, see
below. New table features go to
[`@gravity-ui/table`](https://github.com/gravity-ui/table).

### If you cannot migrate now

Change the import, the rest of the code stays the same:

```diff
- import {Table, withTableSettings, TableColumnSetup} from '@gravity-ui/uikit';
+ import {Table, withTableSettings, TableColumnSetup} from '@gravity-ui/uikit/legacy';
```

The same applies to the types (`TableProps`, `TableColumnConfig`, `TableSettingsData`, `TableColumnSetupProps`, …).

- **`@gravity-ui/uikit/legacy` needs three optional peer dependencies.** `@hello-pangea/dnd` (the column settings
  popup is built on it), `react-window` and `react-virtualized-auto-sizer` (the legacy `List`) are no longer installed
  with the package, and the legacy entry point loads all of them whatever you import from it: install the three next to
  `@gravity-ui/uikit`.
- **The classes inside the column settings popup.** `g-tree-select` → `g-tree-select-legacy`, `g-tree-list` →
  `g-tree-list-legacy`, `g-list-container-view` → `g-list-container-view-legacy`, `g-list-item-view` →
  `g-list-item-view-legacy`; the size modifiers (`g-tree-select__popup_size_*`, `_size_*` and `_radius_*` of the rows)
  are gone. The popup looks the same; rewrite the overrides that targeted these classes.
- **`@deprecated`.** `Table`, its HOCs and `TableColumnSetup` are marked `@deprecated` in their types: linters with a
  `no-deprecated` rule start reporting their usages.
- **Translations.** The keyset names (`Table`, `withTableSettings`, `TableColumnSetupInner`, `TableColumnSetup`) are
  the same, overrides through `addComponentKeysets` keep working.

### Moving to `@gravity-ui/table`

`@gravity-ui/table` has a
[step-by-step guide from the uikit `Table`](https://github.com/gravity-ui/table/blob/main/docs/migration-from-uikit-table/migration-from-uikit-table.md):
props, every HOC, and `TableColumnSetup` (section 4.1). Its "Stay with the old table if…" list is a fair criterion: a
small interaction-free table without performance requirements can stay on the legacy one.

## Removed from `/unstable`

In v8 `@gravity-ui/uikit/unstable` is empty; the entrypoint stays for future experiments. Everything
has moved:

| Removed                                                                                                                 | Now                                                                                                                                          |
| :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `unstable_List`, `unstable_moveItem`, `unstable_useListFocusOwner` and the `unstable_List*` types                       | the same names without the prefix from `@gravity-ui/uikit`, see [the List guide](migration-from-legacy-list.md#from-gravity-uiuikitunstable) |
| `unstable_ListVirtualizer`, `unstable_ListVirtualizerProps`                                                             | `ListVirtualizer`, `ListVirtualizerProps` from `@gravity-ui/uikit/virtualizer`                                                               |
| `unstable_useListHelloPangeaDnd`, `unstable_UseListHelloPangeaDndOptions`, `unstable_UseListHelloPangeaDndResult`       | `useListHelloPangeaDnd`, `UseListHelloPangeaDndProps`, `UseListHelloPangeaDndResult` from `@gravity-ui/uikit/hello-pangea-dnd`               |
| `unstable_ColorPicker`, `unstable_ColorPickerProps`                                                                     | `ColorPicker`, `ColorPickerProps` from `@gravity-ui/uikit`                                                                                   |
| `unstable_FileDropZone`, `DropZoneFileRejection`, `FileDropZoneProps`                                                   | `FileDropZone` and the same types from `@gravity-ui/uikit`                                                                                   |
| `unstable_useDropZone`, `UseDropZoneEventHandler`, `UseDropZoneParams`, `UseDropZoneDroppableProps`, `UseDropZoneState` | `useDropZone` and the same types from `@gravity-ui/uikit`                                                                                    |
| `unstable_Menu` and the other `unstable_Menu*` names                                                                    | see [Menu and DropdownMenu](#menu-and-dropdownmenu)                                                                                          |
| `unstable_useList` family, `unstable_TreeList`, `unstable_TreeSelect`                                                   | see [useList, TreeList and TreeSelect removed from `/unstable`](#uselist-treelist-and-treeselect-removed-from-unstable)                      |

## useList, TreeList and TreeSelect removed from `/unstable`

The experimental `useList` family is gone from `@gravity-ui/uikit/unstable` without a replacement in the package: it
continues in [`@gravity-ui/normalized-list`](https://github.com/gravity-ui/normalized-list) under new names, see its
[migration guide](https://github.com/gravity-ui/normalized-list/blob/main/MIGRATION.md). Use a version of
`@gravity-ui/normalized-list` whose peer range includes `@gravity-ui/uikit` v8.

| `@gravity-ui/uikit/unstable`                                                                                                                                                                                                             | `@gravity-ui/normalized-list`                                           |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `unstable_TreeSelect`, `unstable_TreeSelectProps`                                                                                                                                                                                        | `UIKitNormalizedSelect`, `UIKitNormalizedSelectProps` from `/uikit`     |
| `unstable_TreeList`, `unstable_TreeListProps`                                                                                                                                                                                            | `UIKitNormalizedList`, `UIKitNormalizedListProps` from `/uikit`         |
| `unstable_useList`, `unstable_UseListResult`                                                                                                                                                                                             | `useNormalizedList`, `UseNormalizedListResult`                          |
| `unstable_ListItemView`, `unstable_ListItemViewProps`                                                                                                                                                                                    | `UIKitListItemView` from `/uikit`, `ListItemViewProps`                  |
| `unstable_ListItemExpandIcon`, `unstable_ListItemExpandIconProps`                                                                                                                                                                        | `UIKitListItemExpandIcon`, `UIKitListItemExpandIconProps` from `/uikit` |
| `unstable_ListContainer`, `unstable_ListContainerProps`, `unstable_ListContainerView`, `unstable_ListContainerViewProps`                                                                                                                 | the same names without the prefix                                       |
| `unstable_ListItemType`, `unstable_ListTreeItemType`, `unstable_ListItemId`                                                                                                                                                              | the same names without the prefix                                       |
| `unstable_useListFilter`, `unstable_useListKeydown`, `unstable_getListItemClickHandler`, `unstable_getItemRenderState`, `unstable_scrollToListItem`, `unstable_getListItemQa`, `unstable_getListParsedState`, `unstable_computeItemSize` | the same names without the prefix                                       |

Things to check after the switch, from the guide of the package:

- the CSS namespace is `g-nl-`: rewrite the overrides of the old classes and variables;
- `UIKitNormalizedSelect` has no built-in mobile `Sheet`, render it through `renderPopup`;
- the QA constants of the select are `NormalizedSelectQa`.

The column settings of the legacy `Table` keep working: they no longer depend on the removed family.

## Menu and DropdownMenu

`Menu` and `DropdownMenu` from the root entry point have moved to `@gravity-ui/uikit/legacy`. To keep their current
behavior, change only the imports (including `MenuProps`, `MenuItemProps`, `MenuGroupProps`, `DropdownMenuProps`,
`DropdownMenuItem`, and other related types):

```diff
- import {Menu, DropdownMenu} from '@gravity-ui/uikit';
+ import {Menu, DropdownMenu} from '@gravity-ui/uikit/legacy';
```

The former `unstable_Menu` family is now stable in the root entry point. Remove the `unstable_` prefix from its
components and types, and import them from `@gravity-ui/uikit`:

```diff
- import {unstable_Menu as Menu, unstable_MenuItem as MenuItem} from '@gravity-ui/uikit/unstable';
+ import {Menu, MenuItem} from '@gravity-ui/uikit';
```

The same applies to `MenuTrigger`, `MenuDivider`, `MenuSize`, `MenuProps`, and all `MenuItem*` and `MenuTriggerProps`
types. These names are no longer exported from `/unstable`.

The new `Menu` has a different API: pass items as `MenuItem` children and a trigger via `trigger` (or use `inline`).
The old `Menu.Item` props, `Menu.Group`, and `DropdownMenu.items` array remain available in `/legacy`. See the
[new Menu README](../src/components/Menu/README.md) for examples. The new menu uses `g-menu`, `g-menu-item`, and
`g-menu-divider` CSS classes instead of the former `g-lab-menu*` classes. The legacy components now use
`g-menu-legacy` and `g-dropdown-menu-legacy` instead of `g-menu` and `g-dropdown-menu`. Update custom selectors,
including those for the Tabs overflow menu. In `DefaultPropsProvider`, use `MenuLegacy` for the legacy menu; the
`DropdownMenu` key stays the same.

As with any `/legacy` import, install its optional peer dependencies: `@hello-pangea/dnd`, `react-window`, and
`react-virtualized-auto-sizer`.
The legacy `Menu`, `MenuItem`, `MenuGroup`, and `DropdownMenu` components are marked `@deprecated` in their types.

### ActionsPanel overflow menu

`ActionsPanel` now renders the stable `Menu` for overflow items and submenus. Rename `ActionsPanelItem.dropdown` to
`menu`. Its `menu.item` accepts `MenuItemProps` instead of `DropdownMenuItem`: rename `text` to `children` and
`action` to `onClick`.
Replace nested `items` arrays with a `Menu` passed directly in the `children` array. For example:

```tsx
menu: {
    item: {
        children: [
            'More',
            <Menu key="submenu" size="s">
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
            </Menu>,
        ],
    },
}
```

Use the new `MenuItemProps` type for explicitly typed items. Replace `iconStart` with `icon` and `iconEnd` with
`arrow`; pass native element props directly instead of through `extraProps`. Omit hidden items when building the
`actions` array. Custom CSS and tests targeting
`.g-dropdown-menu__*` or `li > div[role="menuitem"]` must use the new `g-menu-item` button/link markup. The overflow menu
no longer closes automatically when an ancestor scrolls.

## Breadcrumbs, Popover and Tabs removed from `/legacy`

The legacy `Breadcrumbs`, `Popover` and `Tabs` components, their types and related exports are no longer available
from `@gravity-ui/uikit/legacy`. Replace them with the current components from `@gravity-ui/uikit`:

| Removed legacy component | Replacement                                                                        | Migration guide                                                    |
| :----------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Breadcrumbs`            | [`Breadcrumbs`](../src/components/Breadcrumbs/README.md)                           | [Props, items and rendering](migration-from-legacy-breadcrumbs.md) |
| `Popover`                | [`Popover`](../src/components/Popover/README.md)                                   | [Content and behavior](migration-from-legacy-popover.md)           |
| `Tabs`                   | [`TabList`, `Tab`, `TabProvider` and `TabPanel`](../src/components/tabs/README.md) | [Items and selection](migration-from-legacy-tabs.md)               |

There is no temporary import path for these components in v8. The replacements are already available from the root
entry point in v7, so you can migrate before upgrading. Other legacy components remain available.

**Translations:** The legacy `Breadcrumbs` keyset is removed. The current component now uses the `Breadcrumbs` keyset
instead of `lab/Breadcrumbs`, so existing `Breadcrumbs.label_more` overrides keep working. Rename overrides of
`lab/Breadcrumbs` to `Breadcrumbs`; the current keyset also contains `breadcrumbs`.

## Button and Link `extraProps`

`Button` and `Link` no longer accept `extraProps`. Pass native element props directly to the component, including
when `Button` renders a link or a custom component.
The same applies to props based on `ButtonProps`, such as `MenuTriggerProps`, `AlertActionProps`,
`ActionsPanelItem.button.props`, and `Dialog.Footer` button props.

Previously, `type`, `disabled`, `className`, `onClickCapture`, and `rel` inside `extraProps` could be overridden by the
component. At the root, these props can change behavior: for example, a button can become a submit button or become
disabled. Moving `target="_blank"` to the root also adds `rel="noopener noreferrer"` when `rel` is not set, so the
Referer header is not sent.

```diff
- <Button extraProps={{title: 'Save', onClick: handleSave}}>Save</Button>
+ <Button title="Save" onClick={handleSave}>Save</Button>
- <Link href="/help" extraProps={{target: '_blank'}}>Help</Link>
+ <Link href="/help" target="_blank">Help</Link>
```

## `Button.Icon` side and `Disclosure` arrow position

`Button.Icon` `side` and `Disclosure` `arrowPosition` no longer accept the physical values `left` and `right`.
Use the logical values `start` and `end` instead. They follow the text direction: `start` is on the left in LTR and on the right in RTL.

```diff
- <Button.Icon side="left">...</Button.Icon>
+ <Button.Icon side="start">...</Button.Icon>
- <Button.Icon side="right">...</Button.Icon>
+ <Button.Icon side="end">...</Button.Icon>
- <Disclosure arrowPosition="left" />
+ <Disclosure arrowPosition="start" />
- <Disclosure arrowPosition="right" />
+ <Disclosure arrowPosition="end" />
```

## `configure` and `getConfig`

Each call to `configure` now creates a new configuration object. A previously saved result of `getConfig()` no longer
reflects later changes. If you need the current configuration after calling `configure`, call `getConfig()` again:

```ts
configure({lang: 'ru'});
const {lang} = getConfig(); // 'ru'
```

## Dialog layout

`Dialog` now uses smaller header and body paddings. The header has 12px above and 8px below its content, the body has
4px of vertical padding, and the footer has 24px above and 28px below its content. A typical dialog becomes 176px tall
instead of 190px. The close button moves to 12px from the top and 16px from the inline end on desktop; on mobile it is
12px from both edges. If the header or footer is absent, the dialog leaves 20px or 24px, respectively, between the body
and that edge. Check custom content and CSS overrides against the new spacing.

The root no longer has the `g-dialog_has-close` class. Update selectors that depend on it; the close button can be
selected through `.g-dialog:has(.g-dialog-btn-close)` when needed.

## Deprecated Modal and Dialog APIs

`Modal` and `Dialog` no longer accept `onClose`, `onEscapeKeyDown`, `onOutsideClick`, or `onEnterKeyDown`. Use `onOpenChange(open, event?, reason?)` for dismissal. The old `ModalCloseReason` type is replaced by the public `OpenChangeReason` type, importable from `@gravity-ui/uikit`.

| Old callback/reason                         | New `onOpenChange` call           |
| :------------------------------------------ | :-------------------------------- |
| `onClose(event, 'escapeKeyDown')`           | `(false, event, 'escape-key')`    |
| `onClose(event, 'outsideClick')`            | `(false, event, 'outside-press')` |
| `Dialog.onClose(event, 'closeButtonClick')` | `(false, event, 'click')`         |

The screen-reader dismiss button calls `onOpenChange(false, event)` with `reason === undefined`. Close when `open` becomes `false`; inspect `reason` only when a specific action needs it.

```diff
- <Modal open={open} onClose={() => setOpen(false)}>
+ <Modal open={open} onOpenChange={setOpen}>
```

`Dialog.size` has been removed. To keep the previous fixed width, pass the same value to `maxWidth` and enable `fullWidth`:

```diff
- <Dialog size="m" open={open} onClose={handleClose}>
+ <Dialog maxWidth="m" fullWidth open={open} onOpenChange={setOpen}>
```

Replace `onEnterKeyDown` with `initialFocus="apply"` for a confirmation without fields. For a dialog with fields, submit a form. `Dialog.Footer`'s apply button already has `type="submit"`; connect it to a form inside `Dialog.Body` with `propsButtonApply.form` so the body keeps its scrolling layout. Put the action only in `onSubmit`, not also in `onClickButtonApply`:

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <Dialog.Body>
    <form
      id="dialog-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleApply();
      }}
    >
      <TextInput />
    </form>
  </Dialog.Body>
  <Dialog.Footer textButtonApply="Apply" propsButtonApply={{form: 'dialog-form'}} />
</Dialog>
```

## HelpMark icon size

The `HelpMark` prop `iconSize` was renamed to `size`. Replace the prop name in `HelpMark` usages, including
`DefaultPropsProvider` defaults and `DefinitionList` note objects:

```diff
- <HelpMark iconSize="l" />
+ <HelpMark size="l" />
```

The values (`s`, `m`, `l`, `xl`) and the default (`m`) did not change.

## `LayerManager` `layerschange` event

The `layerschange` event no longer includes the deprecated `meta.layersCount` field. Use `meta.layers.length` to get
the number of layers. The `getLayersCount()` function remains available.

## Deprecated Popup API

`Popup` no longer accepts `anchorRef`, `onClose`, `onEscapeKeyDown`, or `onOutsideClick`. Pass the anchor DOM element through `anchorElement` and handle dismissal with `onOpenChange(open, event?, reason?)`. The `PopupAnchorRef` and `PopupCloseReason` types are also removed; use `PopupAnchorElement` and the public `OpenChangeReason` type instead.

Update these props in legacy `DropdownMenu.popupProps` and the `Popup` key of `DefaultPropsProvider` too.

| Old callback or reason            | `onOpenChange` equivalent              |
| :-------------------------------- | :------------------------------------- |
| `onClose(event, 'escapeKeyDown')` | `(false, event, 'escape-key')`         |
| `onClose(event, 'outsideClick')`  | `(false, event, 'outside-press')`      |
| `onEscapeKeyDown(event)`          | Check for `reason === 'escape-key'`    |
| `onOutsideClick(event)`           | Check for `reason === 'outside-press'` |

`onOpenChange` can also report other close reasons. Close when `open` is `false`; check `reason` only if the action depends on how the popup was dismissed. Keep the anchor in state so `Popup` receives it when the DOM node mounts:

```diff
- const anchorRef = React.useRef<HTMLButtonElement>(null);
+ const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
- <Button ref={anchorRef}>Open</Button>
- <Popup anchorRef={anchorRef} open={open} onClose={() => setOpen(false)} />
+ <Button ref={setAnchorElement}>Open</Button>
+ <Popup anchorElement={anchorElement} open={open} onOpenChange={setOpen} />
```

## Size names with multiple `x` characters

Size names with two or more `x` characters now use a number followed by one `x`:

| Before | After |
| :----- | :---- |
| `xxs`  | `2xs` |
| `xxl`  | `2xl` |
| `xxxl` | `3xl` |

Update `Label size="xxs"` to `size="2xs"`. The corresponding CSS modifier changes from
`.g-label_size_xxs` to `.g-label_size_2xs`; update custom selectors that target it.

For layout, rename `xxl` and `xxxl` keys in `LayoutTheme.breakpoints` and responsive prop maps.
If you use the deprecated `Col xxl` prop, move it to the `size` map as `{'2xl': value}`.
`useLayoutContext().activeMediaQuery` now returns `2xl` or `3xl` at those widths, and
`isMediaActive` accepts the new names. The breakpoint widths remain 1400px and 1920px.
Single-`x` sizes such as `xs` and `xl` keep their names.

## TextInput, PasswordInput, TextArea, and Select `error`

`TextInput`, `PasswordInput`, `TextArea`, and `Select` no longer accept the deprecated `error` prop. Use
`validationState="invalid"` to show the error state and `errorMessage` to show its message:

```diff
- <TextInput error="Required field" />
+ <TextInput validationState="invalid" errorMessage="Required field" />
- <TextArea error />
+ <TextArea validationState="invalid" />
- <Select error={hasError} />
+ <Select validationState={hasError ? 'invalid' : undefined} />
- <TextInput error={errorText} />
+ <TextInput validationState={errorText ? 'invalid' : undefined} errorMessage={errorText} />
```

The same replacement applies to all four components. When `error` was the only state signal, falsy values (`false`,
`''`, or `undefined`) did not set the invalid state.

## TextInput, PasswordInput, TextArea, and NumberInput `onKeyPress`

These components no longer accept the deprecated top-level `onKeyPress` prop. Use `onKeyDown` instead:

```diff
- <TextInput onKeyPress={handleKeyPress} />
+ <TextInput onKeyDown={handleKeyDown} />
```

Unlike `onKeyPress`, `onKeyDown` fires for non-character keys and during IME composition, and its `event.charCode` is
`0`. Check `event.key` and, if needed, `event.nativeEvent.isComposing`. To keep the old behavior temporarily, pass
`controlProps={{onKeyPress: handleKeyPress}}` to the component.

## `useColorGenerator` `theme` option

`useColorGenerator` no longer accepts the deprecated `theme` option. Remove it from the call; the hook automatically
uses the current theme from `ThemeProvider`:

```diff
- useColorGenerator({seed, theme: 'dark'})
+ useColorGenerator({seed})
```

## Sheet `open`

`Sheet` no longer accepts `visible` and `onClose`. The open state is the optional `open`, and the control mode follows
it as in `Menu`: with `open` the sheet is controlled and closes once the parent sets `open` to `false`;
without it the sheet closes itself and `onOpenChange` only reports the change. `defaultOpen` opens an uncontrolled
sheet on mount. Passing `onOpenChange` no longer switches the mode, so it is safe to add it for analytics.

| Old                                        | New                                                                                                     |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `visible={visible}` with `onOpenChange`    | `open={open}` with `onOpenChange`                                                                       |
| `visible={visible}` without `onOpenChange` | `open={open}` with `onOpenChange={setOpen}`, or `defaultOpen`                                           |
| `onClose`                                  | `onOpenChange` to react to dismissal, `onTransitionOutComplete` to clean up after the closing animation |

```diff
- <Sheet visible={visible} onClose={() => setVisible(false)}>
+ <Sheet open={open} onOpenChange={setOpen}>
```

`visible` is required in v7 and gone in v8: TypeScript reports the leftover prop, while plain JavaScript ignores it and
the sheet stays closed. An uncontrolled sheet cannot be reopened from outside; control it with `open` when it has to
open again. The `onOpenChange` reasons and the transition callbacks are unchanged.

## Everything else

| What                                                                                   | Change                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Select` ([#2660](https://github.com/gravity-ui/uikit/pull/2660))                      | The popup is 4px away from the control instead of 1px, the same offset as `Popup`.                                                                                                                                                                                                                                                                                                                 |
| Themes ([#2745](https://github.com/gravity-ui/uikit/pull/2745))                        | The theme variables are generated from `@gravity-ui/uikit-themer`. The SCSS module `@gravity-ui/uikit/styles/themes` and its `g-theme-*` mixins are removed: build a custom theme as in [Theming](theming.md#creating-a-custom-theme). No variable is renamed, but colors shift slightly and values are written as `rgb(r g b / a)` — update screenshot baselines and snapshots of literal values. |
| `Avatar` ([#2376](https://github.com/gravity-ui/uikit/pull/2376))                      | The `alt` prop is removed; the image is decorative (`alt=""`).                                                                                                                                                                                                                                                                                                                                     |
| Typography ([#2616](https://github.com/gravity-ui/uikit/pull/2616))                    | Accent texts take their weight from `--g-text-{group}-accent-font-weight`; `--g-text-accent-font-weight` is deprecated, and overriding it no longer affects `Breadcrumbs` and `Menu`.                                                                                                                                                                                                              |
| `Progress` ([#2151](https://github.com/gravity-ui/uikit/pull/2151))                    | The component no longer centers itself (`margin: 0 auto` is removed).                                                                                                                                                                                                                                                                                                                              |
| `Lang`, `Platform` ([#2715](https://github.com/gravity-ui/uikit/pull/2715))            | TypeScript enums are replaced with `as const` objects and union types; `Lang.Ru` still works.                                                                                                                                                                                                                                                                                                      |
| `Dialog.Footer` ([#2657](https://github.com/gravity-ui/uikit/pull/2657))               | On desktop the buttons no longer stretch and have no `min-width: 128px`; pass `width` in `propsButtonApply` and `propsButtonCancel`. On mobile they still stretch.                                                                                                                                                                                                                                 |
| Dependencies ([#2858](https://github.com/gravity-ui/uikit/pull/2858))                  | `lodash` is replaced with `es-toolkit` and is no longer installed with the package: add it to your dependencies if you import it.                                                                                                                                                                                                                                                                  |
| `Checkbox`, `Radio`, `Switch` ([#2342](https://github.com/gravity-ui/uikit/pull/2342)) | Size `l` uses the `body-1` font variant; the `g-control-label__control-container` wrapper is removed.                                                                                                                                                                                                                                                                                              |
| Hover styles ([#2832](https://github.com/gravity-ui/uikit/pull/2832))                  | `:hover` styles apply only on devices that can hover (`@media (hover: hover)`).                                                                                                                                                                                                                                                                                                                    |
| `button-reset` mixin ([#2862](https://github.com/gravity-ui/uikit/pull/2862))          | It also resets `margin`, `appearance`, `user-select`, `touch-action` and the tap highlight, and no longer sets `outline: none`: elements using it show the browser focus ring.                                                                                                                                                                                                                     |
| `Modal`, `Dialog` ([#2860](https://github.com/gravity-ui/uikit/pull/2860))             | The height is no longer animated when the content changes; `disableHeightTransition` is removed.                                                                                                                                                                                                                                                                                                   |
| `Keysets` type ([#2854](https://github.com/gravity-ui/uikit/pull/2854))                | It includes the `HelloPangeaDnd` keyset and, since [#2896](https://github.com/gravity-ui/uikit/pull/2896), `FileDropZone`: `addLanguageKeysets<Keysets>` needs their keys.                                                                                                                                                                                                                         |
| `Select` on mobile ([#2897](https://github.com/gravity-ui/uikit/pull/2897))            | `onClose` and `onOpenChange(false)` fire as soon as the sheet starts closing, as on desktop, not after the animation. A controlled `Select` closes the sheet only when its `open` becomes `false`. A controlled `filter` is no longer reset to an empty string on close.                                                                                                                           |
