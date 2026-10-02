# Migration from legacy Breadcrumbs

The legacy `Breadcrumbs` was available from `@gravity-ui/uikit/legacy` in v7 and is removed in v8. The current `Breadcrumbs` is exported from `@gravity-ui/uikit` in both versions, so you can migrate before upgrading.

## Quick example

```diff
- import {Breadcrumbs, FirstDisplayedItemsCount, LastDisplayedItemsCount} from '@gravity-ui/uikit/legacy';
+ import {Breadcrumbs} from '@gravity-ui/uikit';

- <Breadcrumbs
-   items={[
-     {text: 'Home', href: '/'},
-     {text: 'Catalog', href: '/catalog'},
-     {text: 'Item', href: '/catalog/item'},
-   ]}
-   firstDisplayedItemsCount={FirstDisplayedItemsCount.One}
-   lastDisplayedItemsCount={LastDisplayedItemsCount.One}
- />
+ <Breadcrumbs showRoot>
+   <Breadcrumbs.Item key="home" href="/">Home</Breadcrumbs.Item>
+   <Breadcrumbs.Item key="catalog" href="/catalog">Catalog</Breadcrumbs.Item>
+   <Breadcrumbs.Item key="item" href="/catalog/item">Item</Breadcrumbs.Item>
+ </Breadcrumbs>
```

## API mapping

| Legacy                                                    | Current                                       | Notes                                                                                                                                                                 |
| :-------------------------------------------------------- | :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items` array                                             | `<Breadcrumbs.Item>` children                 | Render with `.map()` for data-driven breadcrumbs; supply stable React `key` values.                                                                                   |
| Item `text`                                               | Item `children`                               | JSX content can replace a plain string.                                                                                                                               |
| Item `href`, `title`                                      | Same attributes on `Breadcrumbs.Item`         | The new item accepts anchor attributes.                                                                                                                               |
| Item `action(event)`                                      | Item `onClick(event)` or root `onAction(key)` | Use `onClick` for the event and `onAction` when the item's key is enough. `onAction` also handles keyboard activation of items without `href`.                        |
| `firstDisplayedItemsCount={FirstDisplayedItemsCount.One}` | `showRoot`                                    | Keeps the first item visible when the middle items collapse; omit for `Zero`.                                                                                         |
| `lastDisplayedItemsCount`                                 | No exact equivalent                           | The new component collapses items according to available width. `maxItems` caps the total visible count, but does not guarantee that two trailing items stay visible. |
| `renderItemDivider`                                       | `separator`                                   | Pass a React node instead of a render callback.                                                                                                                       |
| `renderRootContent`, `renderItemContent`                  | Content of each `Breadcrumbs.Item`            | Build the desired content while rendering each child.                                                                                                                 |
| `renderItem`                                              | Item children or `itemComponent`              | `itemComponent` customizes every item; there is no equivalent callback with `isCurrent` and `isPrevCurrent` arguments.                                                |
| Item `items` (nested popup entries)                       | No built-in equivalent                        | The current overflow popup lists the hidden breadcrumb items; render a separate menu if nested actions are needed.                                                    |
| `popupStyle`, `popupPlacement`, `qa`, `className`         | Same props                                    | Check custom CSS: the legacy `g-breadcrumbs-legacy` classes are removed.                                                                                              |

The legacy `BreadcrumbsItem`, `BreadcrumbsProps`, `FirstDisplayedItemsCount`, `LastDisplayedItemsCount` and render callback types are no longer exported from `/legacy`. Use the current `BreadcrumbsProps` and `BreadcrumbsItemProps` from the root entry point where needed.

## Translations

The current component uses the `Breadcrumbs` keyset in v8. Existing overrides of `Breadcrumbs.label_more` continue to apply; rename overrides of `lab/Breadcrumbs` to `Breadcrumbs`. The current keyset also contains `breadcrumbs`. See the [v8 migration guide](../../../docs/migration-to-v8.md#breadcrumbs-popover-and-tabs-removed-from-legacy).
