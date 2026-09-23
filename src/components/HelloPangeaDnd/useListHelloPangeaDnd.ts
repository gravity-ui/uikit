'use client';

import * as React from 'react';

// eslint-disable-next-line no-restricted-imports
import type {DragStart, DropResult} from '@hello-pangea/dnd';

export interface UseListHelloPangeaDndProps {
    /** Row ids in list order — `destination.index` is translated into `{toId, position}` by it */
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
 * State half of the @hello-pangea/dnd integration: the row wraps itself in `Draggable` in
 * `renderItem`, `droppableProps` go through `getContainerDndProps`; this hook gives `draggingId`
 * for the `dnd` prop and translates `destination.index` into `{toId, position}` for `moveItem`.
 * `dropTarget` stays empty (the library shifts the rows). Put `dragHandleProps` on a separate
 * handle inside a cell, not on the row (role/tabIndex, Space lift). `ids`/`onDrop` are read
 * through refs — the callbacks are stable. Several lists may share one `DragDropContext`: the
 * handlers of every hook can be called for every drag — a hook takes the drags of its own ids and
 * the drops inside the same droppable only; a transfer between lists is the consumer's.
 */
export function useListHelloPangeaDnd({
    ids,
    onDrop,
}: UseListHelloPangeaDndProps): UseListHelloPangeaDndResult {
    const [draggingId, setDraggingId] = React.useState<string | null>(null);

    const idsRef = React.useRef(ids);
    idsRef.current = ids;
    const onDropRef = React.useRef(onDrop);
    onDropRef.current = onDrop;

    // Under a DragDropContext shared by several lists every hook hears every drag: a row of
    // another list is not this list's dragging row
    const onDragStart = React.useCallback((start: DragStart) => {
        setDraggingId(idsRef.current.includes(start.draggableId) ? start.draggableId : null);
    }, []);

    const onDragEnd = React.useCallback((result: DropResult) => {
        setDraggingId(null);
        const destination = result.destination;
        // A move into another droppable is a transfer between the lists — not a reorder of this one
        if (!destination || destination.droppableId !== result.source.droppableId) {
            return;
        }
        const currentIds = idsRef.current;
        const fromIndex = currentIds.indexOf(result.draggableId);
        if (fromIndex === -1 || destination.index === fromIndex) {
            return;
        }
        const withoutFrom = currentIds.filter((id) => id !== result.draggableId);
        if (destination.index >= withoutFrom.length) {
            onDropRef.current(result.draggableId, withoutFrom[withoutFrom.length - 1], 'after');
        } else {
            onDropRef.current(result.draggableId, withoutFrom[destination.index], 'before');
        }
    }, []);

    return {draggingId, onDragStart, onDragEnd};
}
