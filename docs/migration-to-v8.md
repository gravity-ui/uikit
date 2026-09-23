# Migration to v8

[English](migration-to-v8.md) | [Русский](migration-to-v8-ru.md)

## Overview

This page collects the breaking changes of `@gravity-ui/uikit` v8 and the way through each of them. Every section
says what changed, how to keep the old behavior for now, and where to go next.

Components that are no longer developed move to the `@gravity-ui/uikit/legacy` entry point. They keep their API
there, but no removal date for `/legacy` is promised: plan the migration away from them.

## Table and TableColumnSetup

`Table`, its HOCs (`withTableActions`, `withTableCopy`, `withTableSelection`, `withTableSettings`,
`withTableSorting`) and `TableColumnSetup` moved from the root entry point to `@gravity-ui/uikit/legacy`. Their API,
markup and CSS classes (`g-table`, `g-table-column-setup`, …) did not change. New table features go to
[`@gravity-ui/table`](https://github.com/gravity-ui/table).

### If you cannot migrate now

Change the import, the rest of the code stays the same:

```diff
- import {Table, withTableSettings, TableColumnSetup} from '@gravity-ui/uikit';
+ import {Table, withTableSettings, TableColumnSetup} from '@gravity-ui/uikit/legacy';
```

The same applies to the types (`TableProps`, `TableColumnConfig`, `TableSettingsData`, `TableColumnSetupProps`, …).

- **`@hello-pangea/dnd` is an optional peer dependency now.** The popup of `withTableSettings` and
  `TableColumnSetup` is built on it: install it next to `@gravity-ui/uikit` if you use either of them.
  `Table` and the other HOCs do not need it.
- **`DefaultPropsProvider` no longer accepts the `TableColumnSetup` key.** Legacy components do not read the default
  props: pass them to `TableColumnSetup` explicitly.
- **Translations.** The keyset names (`Table`, `withTableSettings`, `TableColumnSetupInner`, `TableColumnSetup`) are
  the same, overrides through `addComponentKeysets` keep working.

### Moving to `@gravity-ui/table`

`@gravity-ui/table` has a
[step-by-step guide from the uikit `Table`](https://github.com/gravity-ui/table/tree/main/docs/migration-from-uikit-table):
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
