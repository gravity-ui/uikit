<!--GITHUB_BLOCK-->

# HelloPangeaDnd

<!--/GITHUB_BLOCK-->

The entry point that integrates the [List](../lab/List/README.md) with `@hello-pangea/dnd`, the recommended drag-and-drop library.

```tsx
import {useListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd';
```

`@hello-pangea/dnd` ships as a dependency of the package, so there is nothing extra to install.

The wrappers of the library cannot be expressed by the adapter contract of the list, so the integration is compositional: `DragDropContext` and `Droppable` go around the list, the row wraps itself in `Draggable` inside `renderItem`, and this hook carries the state half — `draggingId` for the `dnd` prop of the list together with the handlers of the `DragDropContext`. It also translates the `destination.index` of the library into the `{toId, position}` pair of `moveItem`.

```tsx
import {DragDropContext, Droppable} from '@hello-pangea/dnd';
import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable';
import {useListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd';

function SortableList({items, setItems}) {
  const {draggingId, onDragStart, onDragEnd} = useListHelloPangeaDnd({
    ids: items.map((item) => item.id),
    onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
  });

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="order">
        {(provided) => (
          <List
            // role="grid": the drag handle of the library is a focusable button, and
            // interactive content inside a row is valid in the grid role model only
            role="grid"
            aria-label="Order"
            items={items}
            dnd={{
              draggingId,
              getContainerDndProps: () => ({
                ref: provided.innerRef,
                ...provided.droppableProps,
              }),
            }}
            // renderDraggableRow wraps the row in <Draggable>, see the List documentation
            renderItem={renderDraggableRow}
          />
        )}
      </Droppable>
    </DragDropContext>
  );
}
```

The complete example, including `renderItem` and the placement of the drag handle, is in the [Drag and drop](../lab/List/README.md#drag-and-drop) section of the List.

## Properties

### useListHelloPangeaDnd

The props:

| Name   | Description                                                                                           |                                  Type                                   |
| :----- | :---------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------: |
| ids    | The ids of the rows in the order of the list — `destination.index` of the library is translated by it |                           `readonly string[]`                           |
| onDrop | The drop — pair it with `moveItem(items, fromId, toId, position)`                                     | `(fromId: string, toId: string, position: 'before' \| 'after') => void` |

What it returns:

| Name        | Description                                                  |              Type              |
| :---------- | :----------------------------------------------------------- | :----------------------------: |
| draggingId  | What is being dragged — goes into the `dnd` prop of the list |        `string \| null`        |
| onDragStart | For the `DragDropContext`                                    |  `(start: DragStart) => void`  |
| onDragEnd   | For the `DragDropContext`; calls `onDrop` on a real move     | `(result: DropResult) => void` |
