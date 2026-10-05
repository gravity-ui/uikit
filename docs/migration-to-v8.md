# Migration to v8

[English](migration-to-v8.md) | [Русский](migration-to-v8-ru.md)

## Overview

This page collects the breaking changes of `@gravity-ui/uikit` v8 and the way through each of them. Every section
says what changed, how to keep the old behavior for now, and where to go next.

Components that are no longer developed move to the `@gravity-ui/uikit/legacy` entry point. Components still available
there keep their API, but no removal date for `/legacy` is promised: plan the migration away from them.

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

## TextInput, TextArea, and Select `error`

`TextInput`, `TextArea`, and `Select` no longer accept the deprecated `error` prop. Use
`validationState="invalid"` to show the error state and `errorMessage` to show its message:

```diff
- <TextInput error="Required field" />
+ <TextInput validationState="invalid" errorMessage="Required field" />
- <TextArea error />
+ <TextArea validationState="invalid" />
- <Select error={hasError} />
+ <Select validationState={hasError ? 'invalid' : undefined} />
```

The same replacement applies to all three components. Omit `validationState` when the old `error` value was `false`.

## TextInput `onKeyPress`

`TextInput` no longer accepts the deprecated top-level `onKeyPress` prop. Use `onKeyDown` instead:

```diff
- <TextInput onKeyPress={handleKeyPress} />
+ <TextInput onKeyDown={handleKeyDown} />
```

`onKeyDown` also fires for non-character keys; check `event.key` if the old handler processed only typed characters.

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

| Removed legacy component | Replacement                                                                        | Migration guide                                                                |
| :----------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `Breadcrumbs`            | [`Breadcrumbs`](../src/components/Breadcrumbs/README.md)                           | [Props, items and rendering](../src/components/Breadcrumbs/migration-guide.md) |
| `Popover`                | [`Popover`](../src/components/Popover/README.md)                                   | [Content and behavior](../src/components/Popover/migration-guide.md)           |
| `Tabs`                   | [`TabList`, `Tab`, `TabProvider` and `TabPanel`](../src/components/tabs/README.md) | [Items and selection](../src/components/tabs/migration-guide.md)               |

There is no temporary import path for these components in v8. The replacements are already available from the root
entry point in v7, so you can migrate before upgrading. Other legacy components remain available.

**Translations:** The legacy `Breadcrumbs` keyset is removed. The current component now uses the `Breadcrumbs` keyset
instead of `lab/Breadcrumbs`, so existing `Breadcrumbs.label_more` overrides keep working. Rename overrides of
`lab/Breadcrumbs` to `Breadcrumbs`; the current keyset also contains `breadcrumbs`.

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

## Dialog layout

`Dialog` now uses smaller header and body paddings. The header has 12px above and 8px below its content, the body has
4px of vertical padding, and the footer has 24px above and 28px below its content. A typical dialog becomes 176px tall
instead of 190px. The close button moves to 12px from the top and 16px from the inline end on desktop; on mobile it is
12px from both edges. If the header or footer is absent, the dialog leaves 20px or 24px, respectively, between the body
and that edge. Check custom content and CSS overrides against the new spacing.

The root no longer has the `g-dialog_has-close` class. Update selectors that depend on it; the close button can be
selected through `.g-dialog:has(.g-dialog-btn-close)` when needed.

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
- **`DefaultPropsProvider` no longer accepts the `TableColumnSetup` key.** `TableColumnSetup` does not read defaults
  from the provider: pass them to the component explicitly.
- **Translations.** The keyset names (`Table`, `withTableSettings`, `TableColumnSetupInner`, `TableColumnSetup`) are
  the same, overrides through `addComponentKeysets` keep working.

### Moving to `@gravity-ui/table`

`@gravity-ui/table` has a
[step-by-step guide from the uikit `Table`](https://github.com/gravity-ui/table/blob/main/docs/migration-from-uikit-table/migration-from-uikit-table.md):
props, every HOC, and `TableColumnSetup` (section 4.1). Its "Stay with the old table if…" list is a fair criterion: a
small interaction-free table without performance requirements can stay on the legacy one.

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

## `useColorGenerator` `theme` option

`useColorGenerator` no longer accepts the deprecated `theme` option. Remove it from the call; the hook automatically
uses the current theme from `ThemeProvider`:

```diff
- useColorGenerator({seed, theme: 'dark'})
+ useColorGenerator({seed})
```
