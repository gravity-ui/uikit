<!--GITHUB_BLOCK-->

# Virtualizer

<!--/GITHUB_BLOCK-->

The Virtualizer renders only the window of rows that is currently visible, which is what makes lists of tens of thousands of items affordable.

```tsx
import {ListVirtualizer, Virtualizer} from '@gravity-ui/uikit/virtualizer';
```

This entry point needs `@tanstack/react-virtual`: it is an optional peer dependency, so install it next to `@gravity-ui/uikit`.

Two things live here. `Virtualizer` is the engine — a scroll container that positions and measures rows you render yourself. `ListVirtualizer` is the virtualization layer of the [List](../lab/List/README.md): it wraps a `<List>`, and the list renders through the engine without any other change.

## Virtualizer

The element the component renders is the scroll container itself, so its height has to be limited. `getItemSize` is the estimate used before a row is rendered; unless `measure` is off, the measured height of a top-level row replaces it after mount, which is why rows of variable height need no configuration.

```tsx
import {Virtualizer} from '@gravity-ui/uikit/virtualizer';

const ROW_HEIGHT = 32;

function Log({records}) {
  return (
    <Virtualizer
      style={{height: 400}}
      count={records.length}
      getItemSize={() => ROW_HEIGHT}
      getItemKey={(index) => records[index].id}
      renderRow={({index}) => <div style={{height: ROW_HEIGHT}}>{records[index].message}</div>}
    />
  );
}
```

## ListVirtualizer

The wrapper is the only thing that changes — the list inside stays as it was. All of its configuration props are optional: without `estimateItemSize` the row heights come from the `size` of the list.

```tsx
import {unstable_List as List} from '@gravity-ui/uikit/unstable';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

function TrackList({tracks}) {
  return (
    <ListVirtualizer estimateItemSize={28}>
      <List
        aria-label="Archive"
        style={{maxHeight: 480}}
        items={tracks}
        getItemContent={(track) => track.title}
      />
    </ListVirtualizer>
  );
}
```

The root of the `List` becomes the scroll container, so limiting its height is up to you — otherwise the window degenerates into the full list. The details of the layer are in the [Virtualization](../lab/List/README.md#virtualization) section of the List.

> [!NOTE]
> A virtualized list is empty in server-rendered HTML: there is no viewport to measure against, so the rows appear only after hydration. Leave a list unvirtualized when its content has to be in the markup itself.

## Properties

### Virtualizer

The rest of the props go to the scroll container element.

| Name                  | Description                                                                                      |                          Type                          | Default |
| :-------------------- | :----------------------------------------------------------------------------------------------- | :----------------------------------------------------: | :-----: |
| count                 | The number of first level items in the list                                                      |                        `number`                        |         |
| getItemSize           | The height of an item, including its children; children arrive with the `parentKey`              |            `(index, parentKey?) => number`             |         |
| getItemKey            | The key of an item; children arrive with the `parentKey`                                         |              `(index, parentKey?) => Key`              |         |
| renderRow             | Renders a row: the item, the key of its parent and a callback rendering its children             | `(item, parentKey, renderChildren) => React.ReactNode` |         |
| measure               | Measure the actual heights of the top-level rows after mount instead of trusting `getItemSize`   |                       `boolean`                        | `true`  |
| overscan              | The number of rows rendered above and below the visible window                                   |                        `number`                        |   `0`   |
| disableVirtualization | Render every row; useful for a list known to be small                                            |                       `boolean`                        |         |
| persistedIndexes      | Rows kept in the window even when scrolled out; each entry is a path of indexes in the hierarchy |                   `Array<number[]>`                    |         |
| loading               | Whether more items are loading: until it turns back to `false`, `onLoadMore` is not called again |                       `boolean`                        |         |
| onLoadMore            | Called when the scroll gets near the end                                                         |                      `() => void`                      |         |
| apiRef                | Ref to the imperative API: `scrollToIndex`, `scrollToOffset`, `scrollOffset`, `scrollRect`       |              `React.Ref<VirtualizerApi>`               |         |
| containerRef          | Ref of the scroll container element                                                              |                `React.Ref<HTMLElement>`                |         |

### ListVirtualizer

| Name             | Description                                                                                      |            Type             |          Default          |
| :--------------- | :----------------------------------------------------------------------------------------------- | :-------------------------: | :-----------------------: |
| children         | The `<List>` inside                                                                              |         `ReactNode`         |                           |
| estimateItemSize | The height estimate of a row before it is rendered — a constant or a function of the row context | `number \| (ctx) => number` | by the `size` of the list |
| measure          | Measure the actual heights of the rows after mount (rows of variable height out of the box)      |          `boolean`          |          `true`           |
| overscan         | The buffer of rows outside of the visible window                                                 |          `number`           |            `5`            |
