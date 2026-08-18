/**
 * A reference dnd adapter on top of dnd-kit — the "state-only" form of the
 * contract: the adapter carries draggingId only, and the props half is covered
 * by the consumer with the per-item `useSortable` hook in THEIR OWN row
 * component through renderItem (a per-item hook cannot be called from a method
 * of the adapter — rules of hooks).
 *
 * The example lives in the SHIFT model (the native one for sortable): the
 * neighbours smoothly move apart with the transforms of dnd-kit and the
 * insertion point is shown by the gap — that is why the adapter does NOT fill
 * `dropTarget` in. The rule of the layer is one of the two: either you fill
 * dropTarget in and the list draws the insertion indicator, or you apply
 * transforms to the neighbours and get the shift; together they produce a
 * double indication. The indicator model is shown by the
 * pragmatic-drag-and-drop reference.
 *
 * The DndContext/SortableContext wrappers are rendered by the consumer around
 * the list, with the `contextProps` of this hook spread onto them. In
 * onDragEnd the reorder is translated into the {toId, position} of moveItem by
 * comparing indexes: moving down is after, moving up is before (as in
 * arrayMove).
 */
import * as React from 'react';

import type {DndContextProps} from '@dnd-kit/core';
import {PointerSensor, closestCenter, useSensor, useSensors} from '@dnd-kit/core';

import type {ListDndAdapter} from '../types';

export interface UseDndKitListDndOptions {
    /** The order of the option ids — before/after for onDrop is computed from it */
    ids: readonly string[];
    onDrop: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

export function useDndKitListDnd({ids, onDrop}: UseDndKitListDndOptions): {
    adapter: ListDndAdapter;
    /** To be spread onto the DndContext the consumer wraps the list into */
    contextProps: DndContextProps;
} {
    const [draggingId, setDraggingId] = React.useState<string | null>(null);

    // The distance constraint keeps a click on a row a click (activation,
    // selection): a drag starts only after the pointer has moved
    const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {distance: 4}}));

    const getPosition = (fromId: string, toId: string): 'before' | 'after' =>
        ids.indexOf(fromId) < ids.indexOf(toId) ? 'after' : 'before';

    const contextProps: DndContextProps = {
        sensors,
        collisionDetection: closestCenter,
        onDragStart: ({active}) => setDraggingId(String(active.id)),
        onDragEnd: ({active, over}) => {
            if (over && over.id !== active.id) {
                onDrop(
                    String(active.id),
                    String(over.id),
                    getPosition(String(active.id), String(over.id)),
                );
            }
            setDraggingId(null);
        },
        onDragCancel: () => setDraggingId(null),
    };

    const adapter = React.useMemo<ListDndAdapter>(() => ({draggingId}), [draggingId]);

    return {adapter, contextProps};
}
