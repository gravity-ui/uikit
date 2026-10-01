'use client';

import * as React from 'react';

// eslint-disable-next-line no-restricted-imports
import {DragDropContext, Droppable} from '@hello-pangea/dnd';
// eslint-disable-next-line no-restricted-imports
import type {
    DraggableChildrenFn,
    DraggableProvided,
    DraggableStateSnapshot,
    DroppableProps,
    DroppableProvided,
} from '@hello-pangea/dnd';

import {useLayoutEffect} from '../../hooks/useLayoutEffect';
import {useUniqId} from '../../hooks/useUniqId';
import {ListDndContext} from '../List/DndContext';
import {ListVirtualizationContext} from '../List/VirtualizationContext';
import {moveItem} from '../List/moveItem';
import type {ListDndAdapter, ListItemContext, ListItemHelpers} from '../List/types';
import {defaultGetItemId} from '../List/utils';
import {block} from '../utils/cn';
import {warnOnce} from '../utils/warn';

import {HelloPangeaRowClone, ListHelloPangeaDndRow} from './ListHelloPangeaDndRow';
import {HelloPangeaKitContext} from './context';
import type {
    HelloPangeaKitContextValue,
    HelloPangeaRowRegistry,
    HelloPangeaRowSnapshot,
} from './context';
import {toContainingBlock} from './fixedPosition';
import i18n from './i18n';
import {LIST_HELLO_PANGEA_DND_STATE_CHANNEL} from './stateChannel';
import {useListHelloPangeaDnd} from './useListHelloPangeaDnd';
import type {UseListHelloPangeaDndResult} from './useListHelloPangeaDnd';

import './HelloPangeaDnd.scss';

const b = block('hello-pangea-dnd');

export interface ListHelloPangeaDndProps<T> {
    /** The items of the List inside, in the same order */
    items: readonly T[];
    /** The same default as the List: `item.id`, a string item is its own id. Keep it stable */
    getItemId?: (item: T) => string;
    /** The reordered array — `moveItem` already applied */
    onItemsUpdate?: (items: T[]) => void;
    /** The drop as `(fromId, toId, position)` — for data that is not an array in memory */
    onDrop?: (fromId: string, toId: string, position: 'before' | 'after') => void;
    /** default: an auto id */
    droppableId?: string;
    /** Rows that cannot be dragged, in addition to the disabled ones. Keep it stable */
    getItemDragDisabled?: (item: T) => boolean;
    /**
     * Virtual mode: the visual copy of the dragged row. default — a copy of the `Row`; a custom
     *  row without `Row` must pass its own
     */
    renderClone?: (clone: {
        item: T;
        provided: DraggableProvided;
        snapshot: DraggableStateSnapshot;
    }) => React.ReactNode;
    /**
     * `useListHelloPangeaDnd` state for your own `DragDropContext`: no context is rendered, the
     *  wrapper hands its ids and handlers to that state
     */
    state?: UseListHelloPangeaDndResult;
    /** Passed to `Droppable` */
    droppableProps?: Pick<DroppableProps, 'isDropDisabled' | 'ignoreContainerClipping' | 'type'>;
    /** The List (`role="grid"`) and nothing else: any List-based component here takes the adapter */
    children: React.ReactNode;
}

// Stable: rows are memoized by the identity of renderItem
function renderDefaultRow(ctx: ListItemContext<unknown>, helpers: ListItemHelpers) {
    return <ListHelloPangeaDndRow ctx={ctx} helpers={helpers} />;
}

interface AdapterProviderProps {
    provided: DroppableProvided;
    draggingId: string | null;
    virtual: boolean;
    children: React.ReactNode;
}

function AdapterProvider({provided, draggingId, virtual, children}: AdapterProviderProps) {
    const {droppableProps, innerRef, placeholder} = provided;
    const adapter = React.useMemo<ListDndAdapter>(
        () => ({
            getContainerDndProps: () => ({...droppableProps, ref: innerRef}),
            draggingId,
            // The virtual mode of the library forbids a placeholder: the space of the dragged row
            // (its original renders nothing while the clone is dragged) is kept by the virtualizer
            placeholder: virtual ? undefined : placeholder,
            renderItem: renderDefaultRow,
        }),
        [droppableProps, innerRef, placeholder, draggingId, virtual],
    );
    return <ListDndContext.Provider value={adapter}>{children}</ListDndContext.Provider>;
}

interface RegistryEntry {
    snapshot: HelloPangeaRowSnapshot;
    mounted: boolean;
}

function useRowRegistry(draggingId: string | null): HelloPangeaRowRegistry {
    const draggingIdRef = React.useRef(draggingId);
    draggingIdRef.current = draggingId;
    const [entries] = React.useState(() => new Map<string, RegistryEntry>());
    const [registry] = React.useState<HelloPangeaRowRegistry>(() => ({
        set: (id, snapshot) => entries.set(id, {snapshot, mounted: true}),
        release: (id) => {
            const entry = entries.get(id);
            if (!entry) {
                return;
            }
            if (draggingIdRef.current === id) {
                entry.mounted = false;
            } else {
                entries.delete(id);
            }
        },
        get: (id) => entries.get(id)?.snapshot,
    }));
    // The snapshots kept for the drag are dropped after it
    React.useEffect(() => {
        if (draggingId !== null) {
            return;
        }
        for (const [id, entry] of entries) {
            if (!entry.mounted) {
                entries.delete(id);
            }
        }
    }, [draggingId, entries]);
    return registry;
}

function ListHelloPangeaDndComponent<T>({
    items,
    getItemId,
    onItemsUpdate,
    onDrop,
    droppableId,
    getItemDragDisabled,
    renderClone,
    state: externalState,
    droppableProps,
    children,
}: ListHelloPangeaDndProps<T>) {
    const ids = React.useMemo(
        () =>
            items.map((item) =>
                // Stringified the way the List reads ids: a numeric id is a string in ctx.id
                String(getItemId ? getItemId(item) : (defaultGetItemId(item) ?? item)),
            ),
        [items, getItemId],
    );

    if (!externalState && !onItemsUpdate && !onDrop) {
        warnOnce(
            '[ListHelloPangeaDnd] Pass `onItemsUpdate` or `onDrop`: without them a drop changes nothing.',
        );
    }
    const handleDrop = (fromId: string, toId: string, position: 'before' | 'after') => {
        onDrop?.(fromId, toId, position);
        onItemsUpdate?.(moveItem(items, fromId, toId, position, getItemId));
    };
    // Called unconditionally (the rules of hooks); ignored under an external context
    const ownState = useListHelloPangeaDnd({ids, onDrop: handleDrop});
    const state = externalState ?? ownState;

    // Under an external context the drop reaches the state of the consumer: the wrapper hands it
    // its ids and its handlers
    useLayoutEffect(() => {
        if (!externalState) {
            return undefined;
        }
        const channel = externalState[LIST_HELLO_PANGEA_DND_STATE_CHANNEL];
        channel.connect({ids, onDrop: handleDrop});
        return () => channel.disconnect();
    });

    const autoId = useUniqId();
    // The virtual mode follows ListVirtualizer: it has to stand outside the wrapper
    const virtual = React.useContext(ListVirtualizationContext) !== null;
    const registry = useRowRegistry(state.draggingId);

    const kit = React.useMemo<HelloPangeaKitContextValue>(() => {
        const indexes = new Map(ids.map((id, index) => [id, index]));
        return {getIndex: (id) => indexes.get(id), getItemDragDisabled, registry};
    }, [ids, getItemDragDisabled, registry]);

    const cloneContainerRef = React.useRef<HTMLDivElement>(null);
    const renderCloneOfRow: DraggableChildrenFn = (rawProvided, snapshot, rubric) => {
        const index = rubric.source.index;
        // The clone is position: fixed as well: out of the offset of a transformed ancestor
        const provided = {
            ...rawProvided,
            draggableProps: {
                ...rawProvided.draggableProps,
                style: toContainingBlock(
                    rawProvided.draggableProps.style as React.CSSProperties | undefined,
                    cloneContainerRef.current,
                ) as typeof rawProvided.draggableProps.style,
            },
        };
        if (renderClone) {
            return renderClone({item: items[index], provided, snapshot});
        }
        const rowSnapshot = registry.get(ids[index]);
        if (!rowSnapshot) {
            warnOnce(
                '[ListHelloPangeaDnd] Pass `renderClone` for custom rows under virtualization.',
            );
            return (
                <div
                    {...provided.draggableProps}
                    {...(provided.dragHandleProps ?? undefined)}
                    ref={provided.innerRef}
                />
            );
        }
        return <HelloPangeaRowClone snapshot={rowSnapshot} provided={provided} />;
    };

    const droppable = (
        <Droppable
            {...droppableProps}
            droppableId={droppableId ?? autoId}
            mode={virtual ? 'virtual' : 'standard'}
            // The virtual mode needs a clone: the original of the dragged row may leave the window.
            // A plain list drags the original itself — a clone would unmount the touched handle,
            // and the touch events of the library would stop reaching it
            renderClone={virtual ? renderCloneOfRow : undefined}
            getContainerForClone={() => cloneContainerRef.current ?? document.body}
        >
            {(provided) => (
                <AdapterProvider
                    provided={provided}
                    draggingId={state.draggingId}
                    virtual={virtual}
                >
                    <HelloPangeaKitContext.Provider value={kit}>
                        {children}
                    </HelloPangeaKitContext.Provider>
                </AdapterProvider>
            )}
        </Droppable>
    );

    const content = (
        <React.Fragment>
            {droppable}
            {virtual ? <div ref={cloneContainerRef} className={b('clone-container')} /> : null}
        </React.Fragment>
    );

    return externalState ? (
        content
    ) : (
        <DragDropContext
            onDragStart={state.onDragStart}
            onDragEnd={state.onDragEnd}
            dragHandleUsageInstructions={i18n('label_drag-handle-instructions')}
        >
            {content}
        </DragDropContext>
    );
}

/**
 * Reorder of a List with `@hello-pangea/dnd`: owns `DragDropContext` and `Droppable`, hands the
 *  adapter and the default draggable row to the List inside. Flat lists only
 */
export const ListHelloPangeaDnd = Object.assign(ListHelloPangeaDndComponent, {
    Row: ListHelloPangeaDndRow,
});
