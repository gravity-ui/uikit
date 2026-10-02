# Migration to v8

[English](migration-to-v8.md) | [Русский](migration-to-v8-ru.md)

## Overview

This page collects the breaking changes of `@gravity-ui/uikit` v8 and the way through each of them. Every section
says what changed, how to keep the old behavior for now, and where to go next.

Components that are no longer developed move to the `@gravity-ui/uikit/legacy` entry point. Components still available
there keep their API, but no removal date for `/legacy` is promised: plan the migration away from them.

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
[new Menu README](../src/components/Menu/README.md) for examples. Custom CSS targeting the old `g-menu` or
`g-dropdown-menu` classes may need updating when switching to the new component (`g-lab-menu`). The `Menu` and
`DropdownMenu` keys in `DefaultPropsProvider` still apply to the legacy components.

As with any `/legacy` import, install its optional peer dependencies: `@hello-pangea/dnd`, `react-window`, and
`react-virtualized-auto-sizer`.
The legacy `Menu`, `MenuItem`, `MenuGroup`, and `DropdownMenu` components are marked `@deprecated` in their types.

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

## Table and TableColumnSetup

`Table`, its HOCs (`withTableActions`, `withTableCopy`, `withTableSelection`, `withTableSettings`,
`withTableSorting`) and `TableColumnSetup` moved from the root entry point to `@gravity-ui/uikit/legacy`. Their API and
markup did not change, the CSS blocks of the table (`g-table`, `g-table-column-setup`, …) keep their names; only the
classes inside the column settings popup changed, see below. New table features go to
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
- **`DefaultPropsProvider` no longer accepts the `TableColumnSetup` key.** Legacy components do not read the default
  props: pass them to `TableColumnSetup` explicitly.
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
