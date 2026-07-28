/**
 * A DEMO integration of @hello-pangea/dnd — deliberately OUTSIDE the reference
 * implementations of the contract (the library cannot be expressed by it). The
 * story shows how far wrappers in renderItem can take you, and at what price:
 *
 * - `Droppable`/`Draggable` are components with render props: a row is wrapped
 *   by the consumer in renderItem (as with dnd-kit), while the container
 *   droppableProps travel through getContainerDndProps;
 * - `provided.placeholder` must be the LAST child of the droppable element
 *   (the list root) — there is no channel for that in the contract, so in the
 *   demo it is smuggled through the renderItem of the last row; that works in
 *   the flat mode only (under virtualization the rows sit inside wrappers and
 *   the hack does not survive);
 * - the model of the library is shifting the rows with transforms, and it has
 *   no notion of before/after: the adapter does not fill `dropTarget` in (the
 *   indicator of the list is not drawn — the gap is shown by the shifted rows
 *   themselves), and destination.index from onDragEnd is translated into the
 *   {toId, position} of moveItem;
 * - dragHandleProps (role="button", tabIndex=0, the mandatory data-rfd-*) go
 *   to a SEPARATE handle in startContent, modelled on the integration in the
 *   old List: on the row itself they would overwrite role="option" and the
 *   roving tabIndex, while the keyboard Space lift of the library (a capture
 *   phase listener on window) would intercept the Space of the list. From a
 *   handle the keyboard dnd of rbd works without interfering with the keyboard
 *   model of the list; the price is nested interactive content inside
 *   role="option" (an ARIA violation inherited from the old List) and the loss
 *   of dragging by any point of the row.
 */
import * as React from 'react';

import type {DragStart, DropResult} from '@hello-pangea/dnd';

export interface UseHelloPangeaListDndOptions {
    /** The order of the option ids — destination.index is translated into {toId, position} by it */
    ids: readonly string[];
    onDrop: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

export function useHelloPangeaListDnd({ids, onDrop}: UseHelloPangeaListDndOptions): {
    draggingId: string | null;
    /** For the consumer's DragDropContext */
    onDragStart: (start: DragStart) => void;
    onDragEnd: (result: DropResult) => void;
} {
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
        // rbd reports the index in the RESULTING list (after the source has
        // been taken out) — translate it into the declarative {toId, position}
        // pair of the contract
        const withoutFrom = currentIds.filter((id) => id !== result.draggableId);
        if (destination.index >= withoutFrom.length) {
            onDropRef.current(result.draggableId, withoutFrom[withoutFrom.length - 1], 'after');
        } else {
            onDropRef.current(result.draggableId, withoutFrom[destination.index], 'before');
        }
    }, []);

    return {draggingId, onDragStart, onDragEnd};
}
