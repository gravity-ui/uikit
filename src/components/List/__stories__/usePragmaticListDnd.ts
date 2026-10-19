/**
 * A reference dnd adapter on top of @atlaskit/pragmatic-drag-and-drop — the
 * "full" form of the contract: both the props (ref registration of the rows)
 * and the state.
 *
 * The model of the library: registration of DOM elements
 * (`draggable`/`dropTargetForElements`) plus a global `monitorForElements`; it
 * returns no props at all and sets the native `draggable="true"` attribute on
 * the element itself. The before/after edge is computed by closest-edge from
 * the hitbox add-on.
 *
 * A drag starts from the handle only: the `dragHandle` of the library. The
 * handle arrives as a second per-id ref (`getHandleRef`) — the method lives on
 * the adapter object and does not interfere with the contract of the list (the
 * core ignores extra fields of the `dnd` prop); a row is re-registered once
 * both nodes are known. Without a handle a drag would start from anywhere in
 * the row.
 *
 * The obligations of an adapter are visible here literally:
 * - the per-id ref callbacks are stable (the caches in
 *   rowRefsRef/handleRefsRef) — otherwise the composition of the core would
 *   recreate the fork and trigger a re-registration in the library on every
 *   render;
 * - dropTarget is deduplicated before setState — dragover fires an event on
 *   every pixel.
 */
import * as React from 'react';

import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
    draggable,
    dropTargetForElements,
    monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
    attachClosestEdge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

import type {ListDndAdapter, ListDropTarget} from '../types';

export interface UsePragmaticListDndOptions {
    onDrop: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

export interface PragmaticListDnd extends ListDndAdapter {
    /** The ref of the row handle: a drag starts from it only (the `dragHandle` of the library) */
    getHandleRef: (id: string) => React.RefCallback<HTMLElement>;
}

const ITEM_ID_KEY = 'listStoryItemId';

function getItemId(data: Record<string | symbol, unknown>): string | undefined {
    const id = data[ITEM_ID_KEY];
    return typeof id === 'string' ? id : undefined;
}

export function usePragmaticListDnd({onDrop}: UsePragmaticListDndOptions): PragmaticListDnd {
    const [draggingId, setDraggingId] = React.useState<string | null>(null);
    const [dropTarget, setDropTarget] = React.useState<ListDropTarget | null>(null);

    const onDropRef = React.useRef(onDrop);
    onDropRef.current = onDrop;

    const nodesRef = React.useRef(
        new Map<string, {element: HTMLElement | null; handle: HTMLElement | null}>(),
    );
    const rowRefsRef = React.useRef(new Map<string, React.RefCallback<HTMLElement>>());
    const handleRefsRef = React.useRef(new Map<string, React.RefCallback<HTMLElement>>());
    const cleanupsRef = React.useRef(new Map<string, () => void>());

    // (Re-)registration of a row: it is called on every change of its nodes —
    // the handle (a descendant) mounts before the row, so by the time of the
    // registration it is already known
    const register = React.useCallback((id: string) => {
        cleanupsRef.current.get(id)?.();
        cleanupsRef.current.delete(id);
        const nodes = nodesRef.current.get(id);
        const element = nodes?.element;
        if (!element) {
            return;
        }
        cleanupsRef.current.set(
            id,
            combine(
                draggable({
                    element,
                    dragHandle: nodes?.handle ?? undefined,
                    getInitialData: () => ({[ITEM_ID_KEY]: id}),
                }),
                dropTargetForElements({
                    element,
                    getData: ({input}) =>
                        attachClosestEdge(
                            {[ITEM_ID_KEY]: id},
                            {element, input, allowedEdges: ['top', 'bottom']},
                        ),
                }),
            ),
        );
    }, []);

    const getItemRef = React.useCallback(
        (id: string): React.RefCallback<HTMLElement> => {
            let ref = rowRefsRef.current.get(id);
            if (!ref) {
                ref = (element) => {
                    const nodes = nodesRef.current.get(id) ?? {element: null, handle: null};
                    nodes.element = element;
                    nodesRef.current.set(id, nodes);
                    register(id);
                };
                rowRefsRef.current.set(id, ref);
            }
            return ref;
        },
        [register],
    );

    const getHandleRef = React.useCallback(
        (id: string): React.RefCallback<HTMLElement> => {
            let ref = handleRefsRef.current.get(id);
            if (!ref) {
                ref = (element) => {
                    const nodes = nodesRef.current.get(id) ?? {element: null, handle: null};
                    nodes.handle = element;
                    nodesRef.current.set(id, nodes);
                    register(id);
                };
                handleRefsRef.current.set(id, ref);
            }
            return ref;
        },
        [register],
    );

    React.useEffect(
        () =>
            monitorForElements({
                canMonitor: ({source}) => getItemId(source.data) !== undefined,
                onDragStart: ({source}) => {
                    setDraggingId(getItemId(source.data) ?? null);
                },
                onDrag: ({location, source}) => {
                    const target = location.current.dropTargets[0];
                    const targetId = target ? getItemId(target.data) : undefined;
                    const edge = target ? extractClosestEdge(target.data) : null;
                    const next: ListDropTarget | null =
                        targetId !== undefined &&
                        targetId !== getItemId(source.data) &&
                        (edge === 'top' || edge === 'bottom')
                            ? {id: targetId, position: edge === 'top' ? 'before' : 'after'}
                            : null;
                    setDropTarget((prev) =>
                        prev?.id === next?.id && prev?.position === next?.position ? prev : next,
                    );
                },
                onDrop: ({location, source}) => {
                    const fromId = getItemId(source.data);
                    const target = location.current.dropTargets[0];
                    const toId = target ? getItemId(target.data) : undefined;
                    const edge = target ? extractClosestEdge(target.data) : null;
                    if (
                        fromId !== undefined &&
                        toId !== undefined &&
                        fromId !== toId &&
                        (edge === 'top' || edge === 'bottom')
                    ) {
                        onDropRef.current(fromId, toId, edge === 'top' ? 'before' : 'after');
                    }
                    setDraggingId(null);
                    setDropTarget(null);
                },
            }),
        [],
    );

    // The contract is declarative: every state change produces a new adapter
    // object; the core memoizes the rows by their ctx slice, so this is cheap
    return React.useMemo<PragmaticListDnd>(
        () => ({
            getItemDndProps: (id) => ({ref: getItemRef(id)}),
            getHandleRef,
            draggingId,
            dropTarget,
        }),
        [draggingId, dropTarget, getItemRef, getHandleRef],
    );
}
