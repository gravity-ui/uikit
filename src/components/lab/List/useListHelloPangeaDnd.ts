'use client';

import * as React from 'react';

import type {DragStart, DropResult} from '@hello-pangea/dnd';

export interface UseListHelloPangeaDndOptions {
    /**
     * The ids of the rows in the order of the list — `destination.index` of
     * the library is translated into `{toId, position}` by it
     */
    ids: readonly string[];
    /** The drop — pair it with `moveItem(items, fromId, toId, position)` */
    onDrop: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

export interface UseListHelloPangeaDndResult {
    /** What is being dragged — goes into the `dnd` prop of the list */
    draggingId: string | null;
    /** For the `DragDropContext` of the consumer */
    onDragStart: (start: DragStart) => void;
    /** For the `DragDropContext` of the consumer; calls `onDrop` on a real move */
    onDragEnd: (result: DropResult) => void;
}

/**
 * The state half of the @hello-pangea/dnd integration — the recommended
 * drag-and-drop library of the list. Its wrappers cannot be expressed by the
 * adapter contract (`Droppable`/`Draggable` are components with render
 * props), so the integration is compositional: the row is wrapped in
 * `Draggable` by the consumer in `renderItem`, the `droppableProps` of the
 * container travel through `getContainerDndProps`, and this hook carries what
 * is left:
 *
 * - `draggingId` for the `dnd` prop — without it the list does not know that
 *   a drag is going on: no `data-dragging`, and the activation keeps following
 *   the cursor;
 * - the translation of the drop: the model of the library is shifting the
 *   rows with transforms, and it has no notion of before/after — `dropTarget`
 *   stays empty (the indicator of the list is not drawn, the gap is shown by
 *   the shifted rows themselves), and `destination.index` from `onDragEnd` is
 *   translated into the `{toId, position}` pair of `moveItem`.
 *
 * ```tsx
 * const {draggingId, onDragStart, onDragEnd} = useListHelloPangeaDnd({
 *     ids: items.map((item) => item.id),
 *     onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
 * });
 * <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
 *     <Droppable droppableId="order">
 *         {(provided) => (
 *             <List
 *                 dnd={{
 *                     getContainerDndProps: () => ({...provided.droppableProps, ref: provided.innerRef}),
 *                     draggingId,
 *                 }}
 *                 renderItem={(ctx, helpers) => <SortableRow ctx={ctx} helpers={helpers} />}
 *                 {...}
 *             />
 *         )}
 *     </Droppable>
 * </DragDropContext>
 * ```
 *
 * The `dragHandleProps` of the library (role="button", tabIndex=0, the
 * mandatory data-rfd-*) go to a SEPARATE handle inside a cell of the row
 * rather than onto the row itself: there they would overwrite its role and
 * the roving tabIndex, while the keyboard Space lift of the library (a capture
 * phase listener on window) would intercept the Space of the list. From a
 * handle the keyboard dnd of the library works without interfering with the
 * keyboard model of the list; the price is that a drag starts from the handle
 * only.
 *
 * `ids` and `onDrop` are read through refs: the callbacks are stable and may
 * be handed to the `DragDropContext` as they are.
 */
export function useListHelloPangeaDnd({
    ids,
    onDrop,
}: UseListHelloPangeaDndOptions): UseListHelloPangeaDndResult {
    const [draggingId, setDraggingId] = React.useState<string | null>(null);

    const idsRef = React.useRef(ids);
    idsRef.current = ids;
    const onDropRef = React.useRef(onDrop);
    onDropRef.current = onDrop;

    const onDragStart = React.useCallback((start: DragStart) => {
        setDraggingId(start.draggableId);
    }, []);

    const onDragEnd = React.useCallback((result: DropResult) => {
        setDraggingId(null);
        const destination = result.destination;
        if (!destination) {
            return;
        }
        const currentIds = idsRef.current;
        const fromIndex = currentIds.indexOf(result.draggableId);
        if (fromIndex === -1 || destination.index === fromIndex) {
            return;
        }
        // The library reports the index in the RESULTING list (after the
        // source has been taken out) — translate it into the declarative
        // {toId, position} pair of the contract
        const withoutFrom = currentIds.filter((id) => id !== result.draggableId);
        if (destination.index >= withoutFrom.length) {
            onDropRef.current(result.draggableId, withoutFrom[withoutFrom.length - 1], 'after');
        } else {
            onDropRef.current(result.draggableId, withoutFrom[destination.index], 'before');
        }
    }, []);

    return {draggingId, onDragStart, onDragEnd};
}
