'use client';

import * as React from 'react';

// eslint-disable-next-line no-restricted-imports
import type {DragStart, DropResult} from '@hello-pangea/dnd';

import {warnOnce} from '../utils/warn';

import {LIST_HELLO_PANGEA_DND_STATE_CHANNEL} from './stateChannel';
import type {
    ListHelloPangeaDndStateChannel,
    ListHelloPangeaDndStateConnection,
} from './stateChannel';

export interface UseListHelloPangeaDndProps {
    /**
     * Row ids in list order — `destination.index` is translated into `{toId, position}` by it.
     *  default: the ids of the ListHelloPangeaDnd given this state
     */
    ids?: readonly string[];
    /**
     * The drop — pair it with `moveItem(items, fromId, toId, position)`. The ListHelloPangeaDnd
     *  given this state calls its own `onItemsUpdate`/`onDrop` as well
     */
    onDrop?: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

export interface UseListHelloPangeaDndResult {
    /** What is being dragged — goes into the `dnd` prop of the list */
    draggingId: string | null;
    /** For the `DragDropContext` of the consumer */
    onDragStart: (start: DragStart) => void;
    /** For the `DragDropContext` of the consumer; calls `onDrop` on a real move */
    onDragEnd: (result: DropResult) => void;
    /**
     * The channel of the ListHelloPangeaDnd given this state
     * @internal
     */
    readonly [LIST_HELLO_PANGEA_DND_STATE_CHANNEL]: ListHelloPangeaDndStateChannel;
}

/**
 * State half of the @hello-pangea/dnd integration: the row wraps itself in `Draggable` in
 * `renderItem`, `droppableProps` go through `getContainerDndProps`; this hook gives `draggingId`
 * for the `dnd` prop and translates `destination.index` into `{toId, position}` for `moveItem`.
 * `dropTarget` stays empty (the library shifts the rows). Put `dragHandleProps` on a separate
 * handle inside a cell, not on the row (role/tabIndex, Space lift). `ids`/`onDrop` are read
 * through refs — the callbacks are stable. Several lists may share one `DragDropContext`: a hook
 * ignores the drags of other ids and the drops into other droppables.
 */
export function useListHelloPangeaDnd({
    ids,
    onDrop,
}: UseListHelloPangeaDndProps = {}): UseListHelloPangeaDndResult {
    const [draggingId, setDraggingId] = React.useState<string | null>(null);

    const latestRef = React.useRef({ids, onDrop});
    latestRef.current = {ids, onDrop};
    const connectionRef = React.useRef<{
        owner: object;
        connection: ListHelloPangeaDndStateConnection;
    } | null>(null);
    const [channel] = React.useState<ListHelloPangeaDndStateChannel>(() => ({
        connect: (owner, connection) => {
            if (connectionRef.current && connectionRef.current.owner !== owner) {
                warnOnce(
                    '[useListHelloPangeaDnd] One state is given to several ListHelloPangeaDnd: create a state per list.',
                );
            }
            connectionRef.current = {owner, connection};
        },
        disconnect: (owner) => {
            if (connectionRef.current?.owner === owner) {
                connectionRef.current = null;
            }
        },
        hasOwnDrop: () => latestRef.current.onDrop !== undefined,
    }));

    const getIds = () => latestRef.current.ids ?? connectionRef.current?.connection.ids ?? [];
    const drop = (fromId: string, toId: string, position: 'before' | 'after') => {
        latestRef.current.onDrop?.(fromId, toId, position);
        connectionRef.current?.connection.onDrop(fromId, toId, position);
    };
    const getIdsRef = React.useRef(getIds);
    getIdsRef.current = getIds;
    const dropRef = React.useRef(drop);
    dropRef.current = drop;

    const onDragStart = React.useCallback((start: DragStart) => {
        setDraggingId(getIdsRef.current().includes(start.draggableId) ? start.draggableId : null);
    }, []);

    const onDragEnd = React.useCallback((result: DropResult) => {
        setDraggingId(null);
        const destination = result.destination;
        // A move into another droppable is a transfer between the lists — not a reorder of this one
        if (!destination || destination.droppableId !== result.source.droppableId) {
            return;
        }
        const currentIds = getIdsRef.current();
        const fromIndex = currentIds.indexOf(result.draggableId);
        if (fromIndex === -1 || destination.index === fromIndex) {
            return;
        }
        const withoutFrom = currentIds.filter((id) => id !== result.draggableId);
        if (destination.index >= withoutFrom.length) {
            dropRef.current(result.draggableId, withoutFrom[withoutFrom.length - 1], 'after');
        } else {
            dropRef.current(result.draggableId, withoutFrom[destination.index], 'before');
        }
    }, []);

    return {draggingId, onDragStart, onDragEnd, [LIST_HELLO_PANGEA_DND_STATE_CHANNEL]: channel};
}
