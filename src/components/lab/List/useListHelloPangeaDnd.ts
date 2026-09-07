'use client';

import * as React from 'react';

import type {DragStart, DropResult} from '@hello-pangea/dnd';

export interface UseListHelloPangeaDndOptions {
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
 * through refs — the callbacks are stable.
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
        const withoutFrom = currentIds.filter((id) => id !== result.draggableId);
        if (destination.index >= withoutFrom.length) {
            onDropRef.current(result.draggableId, withoutFrom[withoutFrom.length - 1], 'after');
        } else {
            onDropRef.current(result.draggableId, withoutFrom[destination.index], 'before');
        }
    }, []);

    return {draggingId, onDragStart, onDragEnd};
}
