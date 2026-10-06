# Migration from legacy List

In v8 the name `List` in `@gravity-ui/uikit` belongs to a new component, and the `List` of v7 lives in `@gravity-ui/uikit/legacy` with its API unchanged. This guide maps every prop, method, type and CSS hook of the legacy list to the new one. To postpone the migration, see [Staying on the legacy List](#staying-on-the-legacy-list).

The legacy `List` is one class with everything built in: a filter input, sorting, virtualization and a row wrapper of its own. It works in indexes and keeps a copy of `items` in its state.

The new [`List`](../src/components/List/README.md) is a navigable `listbox` that works in item ids and renders exactly the `items` it is given. What used to be built in is added from the outside:

| Built into the legacy list      | In the new list                                                                                                   |
| :------------------------------ | :---------------------------------------------------------------------------------------------------------------- |
| The row wrapper, `ListItem`     | [`List.ItemView`](../src/components/List/README.md#listitemview) or markup of your own in `renderItem`            |
| The filter input                | An input of your own, connected with [`useListFocusOwner`](../src/components/List/README.md#uselistfocusowner)    |
| Virtualization, on by default   | [`ListVirtualizer`](../src/components/Virtualizer/README.md#listvirtualizer) from `@gravity-ui/uikit/virtualizer` |
| Sorting, `sortable`             | [`ListHelloPangeaDnd`](../src/components/HelloPangeaDnd/README.md) from `@gravity-ui/uikit/hello-pangea-dnd`      |
| A selected row painted by index | The selection layer: `selectionMode` and `selectedIds`                                                            |

> [!IMPORTANT]
> The legacy list rendered a filter input and virtualized its rows unless told otherwise: `filterable` and `virtualized` defaulted to `true`. The new list does neither until you add them.

## Quick example

```diff
- <List
-   items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']}
-   itemsHeight={160}
-   filterable={false}
-   virtualized={false}
- />
+ <List
+   aria-label="Numbers"
+   items={['one', 'two', 'three', 'four', 'five', 'six', 'seven']}
+   style={{height: 160, overflow: 'auto'}}
+ />
```

- `aria-label` or `aria-labelledby` is required: a list has no visible label of its own, and it says so in development.
- The root of the list is its scroll container. Limit its height and set `overflow: auto` yourself; `itemsHeight` is gone.
- A string item is its own id and its own content. Objects need `getItemContent`, and `getItemId` unless they have an `id` field.

## Items and rendering

| Legacy                                      | New                                                    | Notes                                                                                                                          |
| :------------------------------------------ | :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `items`                                     | `items`                                                | Rendered as passed: the list keeps no copy. `item.disabled` is still read, through `getItemDisabled`                           |
| `itemKey(item)`                             | `getItemId(item)`                                      | Reads `item.id` by default. Ids have to be unique and stable: there is no fallback to the index                                |
| `renderItem(item, isItemActive, itemIndex)` | `getItemContent(item)` or `renderItem(ctx, helpers)`   | The legacy function drew the content of a row, and so does `getItemContent`. The new `renderItem` draws the whole row          |
| The default render, `String(item)`          | A string item renders itself                           | An object without `getItemContent` renders an empty row and a development warning                                              |
| `ListItem`                                  | `List.ItemView`, exported on its own as `ListItemView` | See below                                                                                                                      |
| `emptyPlaceholder`                          | —                                                      | Render the placeholder instead of the list while `items` is empty                                                              |
| `itemClassName`                             | `getItemProps({className})` in `renderItem`            |                                                                                                                                |
| `itemsClassName`                            | `className`                                            | There is no inner wrapper: the root holds the rows                                                                             |
| `className`, `qa`                           | `className`, `qa`                                      |                                                                                                                                |
| `size`                                      | `size`                                                 | The same values with another meaning: the legacy prop sized the filter input, the new one sets the density of the rows         |
| `id`                                        | `id`                                                   | The id of the root and the base of the row ids                                                                                 |
| `role`, any role, `list` by default         | `role`: `listbox` by default, or `grid`                | The rows are `option`s, and `row`s in a grid. A grid is for rows with interactive content: a button, a checkbox, a drag handle |

The legacy list wrapped whatever `renderItem` returned in a row of its own. The new `renderItem` returns the row itself: `getItemProps()` carries the role, the id and the handlers of the row, and `getItemViewProps()` passes its state to the view.

```diff
  <List
    items={mailboxes}
-   itemHeight={36}
-   filterable={false}
-   virtualized={false}
-   renderItem={(item) => (
-     <Flex gap={2} alignItems="center">
-       <Icon data={item.icon} size={16} />
-       {item.name}
-     </Flex>
-   )}
+   aria-label="Mailboxes"
+   getItemTextValue={(item) => item.name}
+   renderItem={(ctx, {getItemProps, getItemViewProps}) => (
+     <List.ItemView
+       {...getItemProps()}
+       {...getItemViewProps()}
+       startContent={<Icon data={ctx.item.icon} size={16} />}
+     >
+       {ctx.item.name}
+     </List.ItemView>
+   )}
  />
```

`isItemActive` is `ctx.state.active`, and `itemIndex` is `ctx.index`, which counts section headers as rows.

`ListItem` was the row wrapper of the legacy list, exported for rows rendered outside of it. Its replacement is [`ListItemView`](../src/components/ListItemView/README.md):

| `ListItem`                                              | `ListItemView`                                                                                                                                                             |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item`, `renderItem`                                    | `children`                                                                                                                                                                 |
| `active`, `selected`                                    | `active`, and `selected` together with `selectionStyle="highlight"`: the view paints no selection without a style. Inside `renderItem`, `getItemViewProps()` supplies both |
| `item.disabled`                                         | `disabled`                                                                                                                                                                 |
| `itemClassName`, `style`, `height`                      | `className`, `style`                                                                                                                                                       |
| `onActivate`, `onClick`, `role`, `listId`, `itemIndex`  | The DOM props of the row: `onMouseEnter`, `onClick`, `role`, `id`                                                                                                          |
| `sortable`, `sortHandleAlign`, `provided`, `isDragging` | The `dragHandle` slot, see [Sorting](#sorting)                                                                                                                             |

## Activity and selection

| Legacy                                          | New                                                                          | Notes                                                                                                                 |
| :---------------------------------------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `activeItemIndex`                               | `activeItemId`, `defaultActiveItemId`                                        | An id instead of an index; `null` means that nothing is active                                                        |
| `onChangeActive(index)`                         | `onActiveItemUpdate(id)`                                                     | `null` instead of `undefined`                                                                                         |
| `selectedItemIndex`, a number or an array       | `selectionMode` with `selectedIds`, `defaultSelectedIds`, `onSelectedUpdate` | The legacy prop only painted the rows. The new layer also handles the gestures: a click, `Space`, ranges with `Shift` |
| `onItemClick(item, index, fromKeyboard, event)` | `onItemAction(id, item, event)`                                              | A click or `Enter`, plus `Space` while a selection mode is on. `fromKeyboard` is `'key' in event`                     |
| `deactivateOnLeave`                             | —                                                                            | See [Behavior differences](#behavior-differences)                                                                     |
| `autoFocus`                                     | —                                                                            | It focused the built-in filter: set `autoFocus` on your own input                                                     |

```diff
- const [selectedIndex, setSelectedIndex] = React.useState(0);
+ const [selectedIds, setSelectedIds] = React.useState([languages[0]]);

  <List
    items={languages}
-   filterable={false}
-   virtualized={false}
-   selectedItemIndex={selectedIndex}
-   onItemClick={(_item, index) => setSelectedIndex(index)}
+   aria-label="Languages"
+   selectionMode="single"
+   selectedIds={selectedIds}
+   onSelectedUpdate={setSelectedIds}
  />
```

A selected row is highlighted in the `single` mode and marked with a check in `multiple`. An `onItemAction` passed alongside is called by the same gesture, after the selection has been updated. To keep the selection read-only, the way `selectedItemIndex` was, pass `selectedIds` without `onSelectedUpdate`.

### Behavior differences

- **The `items` are yours.** The legacy list kept a copy of `items`: it reordered the copy after a drop and filtered it itself. The new list renders the array you pass, so a drop or a filter changes nothing until your state does.
- **The active item is not reset.** With `deactivateOnLeave` the legacy list dropped the active item when the pointer or the focus left it. Now the item stays active and only its indication goes out: the hover is the CSS `:hover` of a row, and the keyboard cursor is hidden while the mouse is in use or the focus is elsewhere. `onActiveItemUpdate` is not called with `null` on leave.
- **The list is a tab stop.** The legacy root was out of the tab order and took the keys of its filter input. The new list is a single tab stop, and DOM focus sits on its active row — or stays in your input with `useListFocusOwner`. To move the focus into the list from your code, focus its tab stop: `listRef.current?.querySelector<HTMLElement>('[tabindex="0"]')?.focus()`.
- **Focus is not taken from the outside.** An `activeItemId` that comes from your code moves the highlight and the tab stop, but not DOM focus.
- **The list scrolls its own root rather than the page.** The active row is brought into view on mount, on a key, when rows change around it, and when `activeItemId` changes from your code while the pointer is off the list. A row activated by the pointer is not scrolled to, and the list does not move under a pointer that rests on it — unless nothing was active before. For that the root has to scroll, see [Quick example](#quick-example); a root that does not falls back to `scrollIntoView`, and only on a key. `onScrollToItem` has no equivalent, and neither has `activateItem(index, false)`: to show a row, make it active.

Disabled items, the activation on hover — now switched off with `activateOnHover={false}` — and the `click` event published to the `eventBroker` under the `List` component id work as before.

## Keyboard

| Key                                                    | Legacy                                                                  | New                                                                                                         |
| :----------------------------------------------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `↑` / `↓`                                              | The previous/next item, cycling at the edges                            | The same                                                                                                    |
| `PageUp` / `PageDown`                                  | A page — the visible rows under virtualization, ten otherwise — cycling | Ten items, stopping at the first/last one                                                                   |
| `Home` / `End`                                         | The first/last item; left to the caret when pressed in an input         | The same                                                                                                    |
| `Enter`                                                | `onItemClick` of the active item                                        | `onItemAction` of the active item                                                                           |
| `Space`                                                | Moves the focus to the filter, like any other key                       | Selects the active item while a selection mode is on                                                        |
| Character keys                                         | Move the focus to the filter                                            | Typeahead: jump to the item that starts with the typed text. With an input as the focus owner they go to it |
| `Shift` + `↑`/`↓`, `Shift` + click, `Ctrl`/`Cmd` + `A` | —                                                                       | Ranges and select-all in the `multiple` mode                                                                |
| `←` / `→`                                              | —                                                                       | Into the interactive content of a row and back, with `role="grid"`                                          |

Typeahead searches the content of a row when it is a string; pass `getItemTextValue` otherwise. The complete table is in the [README](../src/components/List/README.md#keyboard).

The legacy list was driven from an external element by forwarding its `onKeyDown` to the instance of the list. `useListFocusOwner` replaces that: the element takes the props of the owner, the list takes the owner, and the focus stays in the element.

```diff
- const listRef = React.useRef<List<string>>(null);
+ const focusOwner = useListFocusOwner();
+ const {onKeyDown, ...inputProps} = focusOwner.getInputProps({'aria-label': 'Framework'});

- <TextInput onKeyDown={(event) => listRef.current?.onKeyDown(event)} />
- <List ref={listRef} items={frameworks} filterable={false} virtualized={false} />
+ <TextInput controlProps={inputProps} onKeyDown={onKeyDown} />
+ <List focusOwner={focusOwner} aria-label="Frameworks" items={frameworks} />
```

## Heights and virtualization

| Legacy                                | New                                | Notes                                                                                                                                                                                                                                                             |
| :------------------------------------ | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `itemHeight`, a number or a function  | —                                  | The height of a row follows `size`: at least 24, 28, 36 or 44 pixels, growing with the content. For a height of your own pass `getItemProps({style: {height, minHeight: height}})` in `renderItem`: `height` alone does not go below the `min-height` of the view |
| `itemsHeight`, a number or a function | `style` or `className` of the root | `height` or `max-height`, plus `overflow: auto`                                                                                                                                                                                                                   |
| `virtualized`, `true` by default      | `ListVirtualizer` around the list  | Nothing is virtualized until the list is wrapped                                                                                                                                                                                                                  |

```diff
+ import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

- <List
-   items={tracks}
-   itemsHeight={480}
-   filterable={false}
-   renderItem={(track) => track.title}
- />
+ <ListVirtualizer>
+   <List
+     aria-label="Tracks"
+     style={{height: 480}}
+     items={tracks}
+     getItemContent={(track) => track.title}
+   />
+ </ListVirtualizer>
```

- `@gravity-ui/uikit/virtualizer` needs `@tanstack/react-virtual`, an optional peer dependency: install it next to the package. `react-window` and `react-virtualized-auto-sizer` are needed by the legacy entry point only.
- The heights are measured. `estimateItemSize` of the wrapper — a number or a function of the row context, by the `size` of the list by default — is only the guess used before a row is rendered, so rows of different heights need no function like `itemHeight`.
- The wrapper makes the root scroll; limiting its height is still up to you, in any way CSS allows. The legacy requirement — `itemsHeight` or a parent with `display: flex` — is gone.
- A virtualized list is empty in server-rendered HTML: the rows appear after hydration.

## Filtering

There is no built-in filter. Render an input of your own, filter `items` before passing them, and connect the two with `useListFocusOwner` so that the arrows and `Enter` work from the input.

| Legacy                                 | New                     | Notes                                                                              |
| :------------------------------------- | :---------------------- | :--------------------------------------------------------------------------------- |
| `filterable`, `true` by default        | —                       | No input is rendered                                                               |
| `filter`, `onFilterUpdate`             | The state of your input | The legacy README calls the handler `onChangeFilter`; the prop is `onFilterUpdate` |
| `filterItem`                           | `items.filter()`        | The default was a case-sensitive `String(item).includes(filter)`                   |
| `onFilterEnd({items})`                 | —                       | The filtered array is yours already                                                |
| `filterPlaceholder`, `filterClassName` | The props of your input |                                                                                    |

```diff
  function FrameworkPicker({onPick}: {onPick: (framework: string) => void}) {
+   const [query, setQuery] = React.useState('');
+   const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
+   const focusOwner = useListFocusOwner();
+   const {onKeyDown, ...inputProps} = focusOwner.getInputProps({'aria-label': 'Framework'});
+
+   const filter = (value: string) =>
+     frameworks.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
+
    return (
-     <List
-       items={frameworks}
-       filterPlaceholder="Search"
-       filterItem={(value) => (item) => item.toLowerCase().includes(value.toLowerCase())}
-       onItemClick={(item) => onPick(item)}
-     />
+     <React.Fragment>
+       <TextInput
+         value={query}
+         placeholder="Search"
+         hasClear
+         controlProps={inputProps}
+         onKeyDown={onKeyDown}
+         onUpdate={(value) => {
+           setQuery(value);
+           // Typing is filtering: the activity moves to the first match
+           setActiveItemId(filter(value)[0] ?? null);
+         }}
+       />
+       <List
+         focusOwner={focusOwner}
+         aria-label="Frameworks"
+         items={filter(query)}
+         activeItemId={activeItemId}
+         onActiveItemUpdate={setActiveItemId}
+         onItemAction={(id) => onPick(id)}
+       />
+     </React.Fragment>
    );
  }
```

- The props of the owner make the input a `combobox` that points at the active row with `aria-activedescendant`, as the built-in filter did.
- `TextInput` sets its own `onKeyDown` after spreading `controlProps`, so the handler is passed separately.
- Keep the activity controlled and point it at the first match while filtering: `Enter` then applies what the user sees.

## Sorting

| Legacy                                           | New                                                                       | Notes                                                                                 |
| :----------------------------------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| `sortable`                                       | `ListHelloPangeaDnd` around the list, and `role="grid"`                   | The drag handle is interactive content, which is valid in a grid only                 |
| `onSortEnd({oldIndex, newIndex})`                | `onItemsUpdate(items)` or `onDrop(fromId, toId, position)` of the wrapper | `onItemsUpdate` gets the reordered array                                              |
| `sortHandleAlign`: `left` or `right`             | `handlePlacement` of `ListHelloPangeaDnd.Row`: `start` or `end`           | The edges are logical: in RTL `end` is the left one                                   |
| `List.moveListElement(list, oldIndex, newIndex)` | `moveItem(items, fromId, toId, position)`                                 | Ids and an edge instead of indexes. It returns a new array instead of mutating `list` |

```diff
+ import {ListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd';

  const [tracks, setTracks] = React.useState(initialTracks);

- <List
-   items={tracks}
-   itemKey={(track) => track.id}
-   sortable
-   filterable={false}
-   virtualized={false}
-   renderItem={(track) => track.title}
-   onSortEnd={({oldIndex, newIndex}) =>
-     setTracks((prev) => List.moveListElement([...prev], oldIndex, newIndex))
-   }
- />
+ <ListHelloPangeaDnd items={tracks} onItemsUpdate={setTracks}>
+   <List
+     role="grid"
+     aria-label="Playlist"
+     items={tracks}
+     getItemContent={(track) => track.title}
+   />
+ </ListHelloPangeaDnd>
```

- `@gravity-ui/uikit/hello-pangea-dnd` needs `@hello-pangea/dnd`, an optional peer dependency, and React 18 or later.
- The handle sits at the start edge of a row. For `sortHandleAlign="right"` render the row of the kit yourself: `renderItem={(ctx, helpers) => <ListHelloPangeaDnd.Row ctx={ctx} helpers={helpers} handlePlacement="end" />}`.
- The legacy list switched sorting off while its filter was not empty. The kit knows nothing of your filter: `onItemsUpdate` gets the `items` of the wrapper reordered, so a filtered list would come back without its hidden items. Pin the rows with `getItemDragDisabled` while a filter is on.
- For `virtualized` together with `sortable` put `ListVirtualizer` outside the wrapper.
- The kit covers flat lists: sections are not draggable.

## Loading more

`loading` and `onLoadMore` have no counterpart. The legacy list appended a loader row and called `onLoadMore` when the row came into view; the same is done with a row of your own and `useIntersection`.

```diff
+ const LOADER = {id: 'loader', disabled: true};
+
+ function LoaderRow({onIntersect}: {onIntersect?: () => void}) {
+   // State rather than a ref: the observer is attached in an effect
+   const [element, setElement] = React.useState<HTMLDivElement | null>(null);
+
+   useIntersection({element, onIntersect});
+
+   return (
+     <Flex ref={setElement} justifyContent="center">
+       <Loader size="s" />
+     </Flex>
+   );
+ }
+
  function Tracks({tracks, loading, onLoadMore}: TracksProps) {
+   const items = React.useMemo(() => (loading ? [...tracks, LOADER] : tracks), [tracks, loading]);
+
    return (
      <List
-       items={tracks}
-       itemsHeight={300}
-       filterable={false}
-       renderItem={(track) => track.title}
-       loading={loading}
-       onLoadMore={onLoadMore}
+       aria-label="Tracks"
+       style={{height: 300, overflow: 'auto'}}
+       items={items}
+       getItemTextValue={(item) => ('title' in item ? item.title : '')}
+       renderItem={(ctx, {getItemProps, getItemViewProps}) =>
+         'title' in ctx.item ? (
+           <List.ItemView {...getItemProps()} {...getItemViewProps()}>
+             {ctx.item.title}
+           </List.ItemView>
+         ) : (
+           <div {...getItemProps()}>
+             <LoaderRow onIntersect={ctx.index === 0 ? undefined : onLoadMore} />
+           </div>
+         )
+       }
      />
    );
  }
```

- The loader is a disabled item, so the keyboard and the pointer skip it.
- `ctx.index === 0` repeats the legacy rule: an empty list does not ask for more.
- The same code works under `ListVirtualizer`: the row is rendered once the window reaches the end.

## Ref API

The new `List` is a function component, and its `ref` is the root element — the scroll container. The methods and the fields of the instance are gone.

| Legacy                                | New                                   | Notes                                                                                                                                 |
| :------------------------------------ | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `getItems()`, `getItemsWithLoading()` | —                                     | The list has no copy of `items`                                                                                                       |
| `getActiveItem()`                     | The id passed to `onActiveItemUpdate` |                                                                                                                                       |
| `activateItem(index, scrollTo)`       | A controlled `activeItemId`           | The list brings the row into view itself, on the conditions of [Behavior differences](#behavior-differences); there is no flag for it |
| `onKeyDown(event)`                    | `useListFocusOwner()`                 | See [Keyboard](#keyboard)                                                                                                             |
| `refFilter`                           | The ref of your input                 |                                                                                                                                       |
| `refContainer`                        | `ref`                                 | It pointed at the `react-window` instance or at the inner container; now the root is what scrolls                                     |
| `uniqId`                              | `id`                                  | Pass an id of your own to know it                                                                                                     |
| `state`, `loadingItem`, `blurTimer`   | —                                     | Internals of the class                                                                                                                |
| `List.moveListElement()`              | `moveItem()`                          | See [Sorting](#sorting)                                                                                                               |
| `List.findNextIndex()`                | —                                     | Navigation is internal                                                                                                                |

## Types

| Legacy                                  | New                                     | Notes                                                                |
| :-------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------- |
| `ListProps<T>`                          | `ListProps<T>`                          | Another shape under the same name; the type argument is required now |
| `ListItemData<T>`                       | `T`                                     | `disabled` is read by `getItemDisabled`                              |
| `ListItemProps<T>`                      | `ListItemViewProps`                     |                                                                      |
| `ListSortParams`                        | —                                       | See the arguments of `onItemsUpdate` and `onDrop`                    |
| `ListSortHandleAlign`                   | `'start' \| 'end'` of `handlePlacement` |                                                                      |
| `listDefaultProps`, `List.defaultProps` | —                                       | The new list is a function component without default props           |
| `defaultRenderItem`                     | —                                       | A string item renders itself                                         |

## Test ids and CSS

| Legacy                                                               | New                                          | Notes                                                                                   |
| :------------------------------------------------------------------- | :------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `ListQa.ACTIVE_ITEM`: `data-qa="list-active-item"` on the active row | `data-active` on the active row              | `Select` still marks its active option with the same string, now `SelectQa.ACTIVE_ITEM` |
| `data-qa="list-loader"`                                              | —                                            | The loader is a row of your own                                                         |
| The row id, `<id>-item-<index>`                                      | Derived from the id of the item              | Do not build it by hand: query the rows by their role or data attributes                |
| `role="list"` with `listitem` rows                                   | `listbox` with `option`s, `grid` with `row`s |                                                                                         |

In v8 the CSS block of the legacy list is `g-list-legacy`, and `.g-list` is the root of the new list — a column of rows with nothing else inside. The overrides written for v7:

| Legacy                                                                                   | New                                                                             |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| `.g-list__items`                                                                         | `className` of the list                                                         |
| `.g-list__filter`, `.g-list__empty-placeholder`, `.g-list__loading-indicator`            | Elements of your own                                                            |
| `.g-list__item`, `.g-list__item-content`                                                 | `className` in `getItemProps()`, the slots of `List.ItemView`                   |
| `.g-list__item_active`                                                                   | The hover and the keyboard cursor of the row view, see below                    |
| `.g-list__item_selected`, `.g-list__item_inactive`, `.g-list__item_dragging`             | `data-selected`, `data-disabled`, `data-dragging` on the row                    |
| `.g-list__item_sortable`, `.g-list__item_sort-handle-align_*`, `.g-list__item-sort-icon` | The row and the handle of [the kit](../src/components/HelloPangeaDnd/README.md) |
| `.g-list_mobile`, `.g-list__items_virtualized`                                           | —                                                                               |
| `--g-list-item-padding`                                                                  | `--g-list-item-view-padding-inline` and `--g-list-item-view-padding-block`      |

A `List.ItemView` row is tuned with the variables of its [CSS API](../src/components/ListItemView/README.md#css-api). The variables apply to a row of any size; `size` only supplies the default geometry — the paddings, the minimum height, the corner radius. The rows of the legacy list were square, and `--g-list-item-view-border-radius: 0` brings that back.

```diff
- .playlist .g-list__item_active {
-   background: var(--g-color-base-generic-hover);
- }
- .playlist {
-   --g-list-item-padding: 0 12px;
- }
+ .playlist {
+   --g-list-item-view-background-color-hover: var(--g-color-base-generic-hover);
+   --g-list-item-view-padding-inline: 12px;
+   --g-list-item-view-border-radius: 0;
+ }
```

A row drawn with markup of your own in `renderItem` is styled by the [data attributes](../src/components/List/README.md#data-attributes) of the row. `data-active` stays on the last active row after the pointer has left, so draw the hover with `:hover` and the keyboard cursor by `ctx.state.cursorVisible`.

## Props with no equivalent

| Legacy                                                                                                        | What to do instead                                                                    |
| :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| `filterable`, `filter`, `filterItem`, `filterPlaceholder`, `filterClassName`, `onFilterUpdate`, `onFilterEnd` | An input of your own — [Filtering](#filtering)                                        |
| `sortable`, `sortHandleAlign`, `onSortEnd`                                                                    | `ListHelloPangeaDnd` — [Sorting](#sorting)                                            |
| `virtualized`, `itemHeight`, `itemsHeight`                                                                    | `ListVirtualizer` and CSS — [Heights and virtualization](#heights-and-virtualization) |
| `loading`, `onLoadMore`                                                                                       | A loader row — [Loading more](#loading-more)                                          |
| `emptyPlaceholder`, `itemClassName`, `itemsClassName`                                                         | [Items and rendering](#items-and-rendering)                                           |
| `deactivateOnLeave`, `onScrollToItem`, `autoFocus`                                                            | Nothing to set — [Behavior differences](#behavior-differences)                        |

## From `@gravity-ui/uikit/unstable`

The new list was available in v7 under `unstable_` names. They are removed:

| `@gravity-ui/uikit/unstable`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | v8                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unstable_List`, `unstable_moveItem`, `unstable_useListFocusOwner`                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `List`, `moveItem`, `useListFocusOwner` from `@gravity-ui/uikit`                                                                                                |
| `unstable_ListProps`, `unstable_ListSelectionProps`, `unstable_ListDndAdapter`, `unstable_ListDndProps`, `unstable_ListDropTarget`, `unstable_ListItemContext`, `unstable_ListItemHelpers`, `unstable_ListItemGetters`, `unstable_ListItemActionEvent`, `unstable_ListPropsOverrides`, `unstable_ListItemDOMProps`, `unstable_ListCellDOMProps`, `unstable_ListItemViewStateProps`, `unstable_ListSectionHeaderProps`, `unstable_ListFocusOwner`, `unstable_ListFocusOwnerInputProps`, `unstable_ListRole`, `unstable_ListSize` | The same names without the prefix from `@gravity-ui/uikit`                                                                                                      |
| `unstable_ListVirtualizer`, `unstable_ListVirtualizerProps`                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `ListVirtualizer`, `ListVirtualizerProps` from `@gravity-ui/uikit/virtualizer`                                                                                  |
| `unstable_useListHelloPangeaDnd`, `unstable_UseListHelloPangeaDndOptions`, `unstable_UseListHelloPangeaDndResult`                                                                                                                                                                                                                                                                                                                                                                                                               | `useListHelloPangeaDnd`, `UseListHelloPangeaDndProps`, `UseListHelloPangeaDndResult` from `@gravity-ui/uikit/hello-pangea-dnd`; `ListHelloPangeaDnd` is shorter |

`unstable_ListItemView` was not the row of this list: it belonged to the `useList` family, see [Migration to v8](./migration-to-v8.md#uselist-treelist-and-treeselect-removed-from-unstable).

## Full example

A playlist with a filter, a selected track and sorting.

```diff
- import {List} from '@gravity-ui/uikit';
+ import {List, TextInput, useListFocusOwner} from '@gravity-ui/uikit';
+ import {ListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd';

  const matches = (track: Track, query: string) =>
    track.title.toLowerCase().includes(query.toLowerCase());

  function Playlist() {
    const [tracks, setTracks] = React.useState(initialTracks);
    const [query, setQuery] = React.useState('');
-   const [selectedId, setSelectedId] = React.useState(initialTracks[0].id);
+   const [selectedIds, setSelectedIds] = React.useState([initialTracks[0].id]);
+   const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
+   const focusOwner = useListFocusOwner();
+   const {onKeyDown, ...inputProps} = focusOwner.getInputProps({'aria-label': 'Search'});

    const visible = query ? tracks.filter((track) => matches(track, query)) : tracks;
+   // Sorting is off while the filter is on, as it was in the legacy list
+   const getItemDragDisabled = React.useCallback(() => query !== '', [query]);

    return (
-     <List
-       items={visible}
-       itemKey={(track) => track.id}
-       itemsHeight={320}
-       virtualized={false}
-       filter={query}
-       filterPlaceholder="Search"
-       onFilterUpdate={setQuery}
-       sortable
-       selectedItemIndex={visible.findIndex((track) => track.id === selectedId)}
-       renderItem={(track) => track.title}
-       onItemClick={(track) => setSelectedId(track.id)}
-       onSortEnd={({oldIndex, newIndex}) =>
-         setTracks((prev) => List.moveListElement([...prev], oldIndex, newIndex))
-       }
-     />
+     <React.Fragment>
+       <TextInput
+         value={query}
+         placeholder="Search"
+         hasClear
+         controlProps={inputProps}
+         onKeyDown={onKeyDown}
+         onUpdate={(value) => {
+           setQuery(value);
+           setActiveItemId(tracks.find((track) => matches(track, value))?.id ?? null);
+         }}
+       />
+       <ListHelloPangeaDnd
+         items={visible}
+         onItemsUpdate={setTracks}
+         getItemDragDisabled={getItemDragDisabled}
+       >
+         <List
+           role="grid"
+           focusOwner={focusOwner}
+           aria-label="Playlist"
+           style={{height: 320, overflow: 'auto'}}
+           items={visible}
+           getItemContent={(track) => track.title}
+           activeItemId={activeItemId}
+           onActiveItemUpdate={setActiveItemId}
+           selectionMode="single"
+           selectedIds={selectedIds}
+           onSelectedUpdate={setSelectedIds}
+         />
+       </ListHelloPangeaDnd>
+     </React.Fragment>
    );
  }
```

With an input as the focus owner `←`/`→` belong to its caret, so the drag handle is reached with the pointer only. A list that has to be sorted from the keyboard keeps the focus itself: drop `focusOwner`, and the user tabs from the input into the list.

## Staying on the legacy List

Change the import, the rest of the code stays the same:

```diff
- import {List, ListItem, ListQa} from '@gravity-ui/uikit';
- import type {ListItemData, ListProps} from '@gravity-ui/uikit';
+ import {List, ListItem, ListQa} from '@gravity-ui/uikit/legacy';
+ import type {ListItemData, ListProps} from '@gravity-ui/uikit/legacy';
```

- **`@gravity-ui/uikit/legacy` needs three optional peer dependencies.** `@hello-pangea/dnd`, `react-window` and `react-virtualized-auto-sizer` are no longer installed with the package, and the entry point loads all of them whatever you import from it: install the three next to `@gravity-ui/uikit`.
- **The CSS block is `g-list-legacy`.** Rewrite the selectors of your overrides: `.g-list` becomes `.g-list-legacy`, `.g-list__item` becomes `.g-list-legacy__item`, and so on. Left as they are, they stop applying — and `.g-list` starts matching the root of the new list. `--g-list-item-padding` keeps its name.
- **`@deprecated`.** `List` and `ListItem` are marked `@deprecated` in their types: linters with a `no-deprecated` rule start reporting their usages.

No removal date is promised for `@gravity-ui/uikit/legacy`, see [Migration to v8](./migration-to-v8.md#overview).
