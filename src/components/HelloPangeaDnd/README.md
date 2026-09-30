<!--GITHUB_BLOCK-->

# HelloPangeaDnd

<!--/GITHUB_BLOCK-->

The entry point that makes a [List](../List/README.md) reorderable with `@hello-pangea/dnd`, the recommended drag-and-drop library.

```tsx
import {ListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd';
```

This entry point needs `@hello-pangea/dnd`: install it next to `@gravity-ui/uikit`.

## Usage

Wrap the list and give it `role="grid"`: the drag handle is interactive, and interactive content inside a row is valid in the grid role model only. The wrapper owns the `DragDropContext` and the `Droppable`, takes the same `items` as the list and gives the reordered array back.

```tsx
import {List} from '@gravity-ui/uikit';
import {ListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd';

function Playlist() {
  const [tracks, setTracks] = React.useState(initialTracks);

  return (
    <ListHelloPangeaDnd items={tracks} onItemsChange={setTracks}>
      <List role="grid" aria-label="Playlist" items={tracks} getItemContent={(t) => t.title} />
    </ListHelloPangeaDnd>
  );
}
```

Each row gets a handle at its outermost edge. The mouse drags a row by the handle; the keyboard reaches the handle with `←`/`→`, lifts the row with `Space`, moves it with `↑`/`↓` and drops it with `Space` (`Escape` cancels). Rows the list disables are not draggable, and `isDragDisabled` pins more of them. The name of the handle and the instructions the library gives to screen readers follow the language set with `configure` (under a `DragDropContext` of your own, pass its `dragHandleUsageInstructions` yourself).

A list inside a `Sheet`, a `Dialog` or an animated popup drags the same way: the kit compensates for a transformed ancestor. For data that is not an array in memory, use `onDrop` instead of `onItemsChange`.

The kit covers flat lists: the library needs contiguous indexes, and they are counted over `items`. Sections are not draggable.

The children of the wrapper are the list and nothing else: the adapter goes to the nearest List below, so a Select or a Menu placed next to the list would take it. `getItemId` and `isDragDisabled` should be stable — an inline function re-renders every row on each render of the parent.

### The slots of a row

The default row is `ListHelloPangeaDnd.Row`. Render it in `renderItem` to fill the slots of the row view.

```tsx
<List
  role="grid"
  aria-label="Playlist"
  items={tracks}
  getItemContent={(t) => t.title}
  renderItem={(ctx, helpers) => (
    <ListHelloPangeaDnd.Row
      ctx={ctx}
      helpers={helpers}
      description={ctx.item.artist}
      endContent={<Label>{ctx.item.duration}</Label>}
      handlePlacement="end"
    />
  )}
/>
```

### Custom markup

When a row is not `List.ItemView`, write the `Draggable` yourself and take the wiring from `getHelloPangeaRowProps`; the handle and the content get a cell each. The index of the `Draggable` is the position of the item in `items`.

```tsx
import {Draggable} from '@hello-pangea/dnd';
import {HelloPangeaDragHandle, getHelloPangeaRowProps} from '@gravity-ui/uikit/hello-pangea-dnd';

<List
  role="grid"
  aria-label="Speakers"
  items={people}
  renderItem={(ctx, helpers) => (
    <Draggable draggableId={ctx.id} index={people.indexOf(ctx.item)}>
      {(provided, snapshot) => {
        const {rowProps, handleProps, cellProps} = getHelloPangeaRowProps({
          ctx,
          helpers,
          provided,
          snapshot,
        });
        return (
          <article {...rowProps}>
            <span {...cellProps}>
              <HelloPangeaDragHandle {...handleProps} />
            </span>
            <span {...cellProps}>{ctx.item.name}</span>
          </article>
        );
      }}
    </Draggable>
  )}
/>;
```

Spread `handleProps` rather than the `dragHandleProps` of the library: besides the grid contract they keep a touch drag alive under virtualization.

`HelloPangeaDragHandle` is the grip with an accessible name; its children replace the icon.

### Virtualization

Put `ListVirtualizer` **outside** the wrapper: the wrapper reads the virtualization of the list and switches the `Droppable` to the virtual mode.

```tsx
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

<ListVirtualizer estimateItemSize={28}>
  <ListHelloPangeaDnd items={tracks} onItemsChange={setTracks}>
    <List
      role="grid"
      aria-label="Archive"
      style={{height: 480}}
      items={tracks}
      getItemContent={(t) => t.title}
    />
  </ListHelloPangeaDnd>
</ListVirtualizer>;
```

The dragged row is drawn by a clone — a copy of the `Row` — so a custom row needs `renderClone`: it gets the item and the `provided` and `snapshot` of the clone. Row heights must not change during a drag: the library measures them on lift.

### Several lists

Under a `DragDropContext` of your own — several lists, moves between them — the wrapper renders no context. Give each list the state of `useListHelloPangeaDnd` and a `droppableId`, and call the handlers of every state from the context; the drop goes to the `onDrop` of the hook. A state reorders its own list only; a move from one list into another is yours to handle in `onDragEnd`.

```tsx
import {DragDropContext} from '@hello-pangea/dnd';
import {List, moveItem} from '@gravity-ui/uikit';
import {ListHelloPangeaDnd, useListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd';

const todo = useListHelloPangeaDnd({
  ids: todoItems.map((item) => item.id),
  onDrop: (fromId, toId, position) => setTodoItems(moveItem(todoItems, fromId, toId, position)),
});
const done = useListHelloPangeaDnd({
  ids: doneItems.map((item) => item.id),
  onDrop: (fromId, toId, position) => setDoneItems(moveItem(doneItems, fromId, toId, position)),
});

<DragDropContext
  onDragStart={(start) => {
    todo.onDragStart(start);
    done.onDragStart(start);
  }}
  onDragEnd={(result) => {
    todo.onDragEnd(result);
    done.onDragEnd(result);
  }}
>
  <ListHelloPangeaDnd items={todoItems} state={todo} droppableId="todo">
    <List role="grid" aria-label="To do" items={todoItems} getItemContent={(i) => i.title} />
  </ListHelloPangeaDnd>
  <ListHelloPangeaDnd items={doneItems} state={done} droppableId="done">
    <List role="grid" aria-label="Done" items={doneItems} getItemContent={(i) => i.title} />
  </ListHelloPangeaDnd>
</DragDropContext>;
```

Without `state` every wrapper renders a `DragDropContext` of its own, and nested contexts duplicate the sensors of the library.

## Properties

### ListHelloPangeaDnd

| Name           | Description                                                                                        |                                      Type                                       |        Default        |
| :------------- | :------------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------------: | :-------------------: |
| items          | The items of the list inside, in the same order                                                    |                                 `readonly T[]`                                  |                       |
| getItemId      | The id of an item                                                                                  |                              `(item: T) => string`                              | the one of the `List` |
| onItemsChange  | The reordered array, `moveItem` already applied                                                    |                             `(items: T[]) => void`                              |                       |
| onDrop         | The drop as ids and an edge                                                                        |     `(fromId: string, toId: string, position: 'before' \| 'after') => void`     |                       |
| droppableId    | The id of the `Droppable`                                                                          |                                    `string`                                     |      an auto id       |
| isDragDisabled | Rows that cannot be dragged, in addition to the disabled ones                                      |                             `(item: T) => boolean`                              |                       |
| renderClone    | Virtual mode: the copy of a dragged row, required for custom rows                                  |               `(item: T, provided, snapshot) => React.ReactNode`                |  a copy of the `Row`  |
| state          | `useListHelloPangeaDnd` state for your own `DragDropContext` — see [Several lists](#several-lists) |                          `UseListHelloPangeaDndResult`                          |                       |
| droppableProps | Passed to the `Droppable`                                                                          | `Pick<DroppableProps, 'isDropDisabled' \| 'ignoreContainerClipping' \| 'type'>` |                       |
| children       | The `List`, with `role="grid"`                                                                     |                                   `ReactNode`                                   |                       |

### ListHelloPangeaDnd.Row

| Name            | Description                                                      |         Type          |      Default      |
| :-------------- | :--------------------------------------------------------------- | :-------------------: | :---------------: |
| ctx             | The first argument of `renderItem`                               |   `ListItemContext`   |                   |
| helpers         | The second argument of `renderItem`                              |   `ListItemHelpers`   |                   |
| children        | The content of the row                                           |      `ReactNode`      |   `ctx.content`   |
| startContent    | The start slot of the view                                       |      `ReactNode`      |                   |
| description     | The second line of the view                                      |      `ReactNode`      |                   |
| endContent      | The end slot of the view                                         |      `ReactNode`      |                   |
| handleLabel     | The accessible name of the handle                                |       `string`        | "Drag to reorder" |
| handlePlacement | The edge of the handle: the outermost slot or after `endContent` |  `'start' \| 'end'`   |     `'start'`     |
| className       | The CSS class of the row                                         |       `string`        |                   |
| style           | The inline style of the row                                      | `React.CSSProperties` |                   |
| qa              | The `data-qa` attribute of the row                               |       `string`        |                   |

### getHelloPangeaRowProps

Takes `{ctx, helpers, provided, snapshot, handleLabel?}` — the arguments of `renderItem` and of the render function of `Draggable` — and returns:

| Name        | Description                                                                                        |           Type           |
| :---------- | :------------------------------------------------------------------------------------------------- | :----------------------: |
| rowProps    | The props of the row: the ones of the list with the draggable props and the ref of the library     |    `ListItemDOMProps`    |
| handleProps | The props of the handle: `dragHandleProps`, `tabIndex={-1}` and the name; decorative when disabled | `HelloPangeaHandleProps` |
| cellProps   | The props of a cell                                                                                |    `ListCellDOMProps`    |

### HelloPangeaDragHandle

Takes the props of a `span` and:

| Name     | Description                       |    Type     |      Default      |
| :------- | :-------------------------------- | :---------: | :---------------: |
| label    | The accessible name of the handle |  `string`   | "Drag to reorder" |
| children | The content instead of the grip   | `ReactNode` |   the grip icon   |

### useListHelloPangeaDnd

The state of the drag for a `DragDropContext` of your own — the `state` of the wrapper, or the `dnd` prop of a list wired by hand. The props:

| Name   | Description                                                                                           |                                  Type                                   |
| :----- | :---------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------: |
| ids    | The ids of the rows in the order of the list — `destination.index` of the library is translated by it |                           `readonly string[]`                           |
| onDrop | The drop — pair it with `moveItem(items, fromId, toId, position)`                                     | `(fromId: string, toId: string, position: 'before' \| 'after') => void` |

What it returns:

| Name        | Description                                               |              Type              |
| :---------- | :-------------------------------------------------------- | :----------------------------: |
| draggingId  | What is being dragged — goes into the adapter of the list |        `string \| null`        |
| onDragStart | For the `DragDropContext`                                 |  `(start: DragStart) => void`  |
| onDragEnd   | For the `DragDropContext`; calls `onDrop` on a real move  | `(result: DropResult) => void` |
