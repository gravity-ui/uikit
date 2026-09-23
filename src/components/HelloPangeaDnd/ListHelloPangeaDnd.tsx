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
import {useListHelloPangeaDnd} from './useListHelloPangeaDnd';
import type {UseListHelloPangeaDndResult} from './useListHelloPangeaDnd';

import './HelloPangeaDnd.scss';

const b = block('hello-pangea-dnd');

export interface ListHelloPangeaDndProps<T> {
    /** The items of the List inside, in the same order */
    items: readonly T[];
    /** The same default as the List: `item.id`, a string item is its own id */
    getItemId?: (item: T) => string;
    /** The reordered array — `moveItem` already applied */
    onItemsChange?: (items: T[]) => void;
    /** The drop as `{fromId, toId, position}` — for data that is not an array in memory */
    onDrop?: (fromId: string, toId: string, position: 'before' | 'after') => void;
    /** default: an auto id */
    droppableId?: string;
    /** Rows that cannot be dragged, in addition to the disabled ones. Keep it stable */
    isDragDisabled?: (item: T) => boolean;
    /**
     * Virtual mode: the visual copy of the dragged row. default — a copy of the `Row`; a custom
     *  row without `Row` must pass its own
     */
    renderClone?: (
        item: T,
        provided: DraggableProvided,
        snapshot: DraggableStateSnapshot,
    ) => React.ReactNode;
    /**
     * The result of `useListHelloPangeaDnd` when the `DragDropContext` is yours (several lists,
     *  moves between them): the wrapper renders no context of its own then
     */
    state?: UseListHelloPangeaDndResult;
    /** The virtual mode of `Droppable`. default: on under `ListVirtualizer` */
    virtual?: boolean;
    /** Passed to `Droppable` */
    droppableProps?: Pick<DroppableProps, 'isDropDisabled' | 'ignoreContainerClipping' | 'type'>;
    /** The List (`role="grid"`) */
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
            // The library needs no placeholder in the virtual mode
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
    onItemsChange,
    onDrop,
    droppableId,
    isDragDisabled,
    renderClone,
    state: externalState,
    virtual: virtualProp,
    droppableProps,
    children,
}: ListHelloPangeaDndProps<T>) {
    const ids = React.useMemo(
        () =>
            items.map((item) =>
                getItemId ? getItemId(item) : (defaultGetItemId(item) ?? String(item)),
            ),
        [items, getItemId],
    );

    if (!externalState && !onItemsChange && !onDrop) {
        warnOnce(
            '[ListHelloPangeaDnd] Pass `onItemsChange` or `onDrop`: without them a drop changes nothing.',
        );
    }
    // Called unconditionally (the rules of hooks); ignored under an external context
    const ownState = useListHelloPangeaDnd({
        ids,
        onDrop: (fromId, toId, position) => {
            onDrop?.(fromId, toId, position);
            onItemsChange?.(moveItem(items, fromId, toId, position, getItemId));
        },
    });
    const state = externalState ?? ownState;

    const autoId = useUniqId();
    const virtualization = React.useContext(ListVirtualizationContext);
    const virtual = virtualProp ?? virtualization !== null;
    const registry = useRowRegistry(state.draggingId);

    const kit = React.useMemo<HelloPangeaKitContextValue>(() => {
        const indexes = new Map(ids.map((id, index) => [id, index]));
        return {getIndex: (id) => indexes.get(id), isDragDisabled, registry};
    }, [ids, isDragDisabled, registry]);

    const cloneContainerRef = React.useRef<HTMLDivElement>(null);
    const renderCloneOfRow: DraggableChildrenFn = (provided, snapshot, rubric) => {
        const index = rubric.source.index;
        if (renderClone) {
            return renderClone(items[index], provided, snapshot);
        }
        const rowSnapshot = registry.get(ids[index]);
        if (!rowSnapshot) {
            warnOnce(
                '[ListHelloPangeaDnd] The dragged row was not rendered by ListHelloPangeaDnd.Row: pass `renderClone` for custom rows under virtualization.',
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
        <DragDropContext onDragStart={state.onDragStart} onDragEnd={state.onDragEnd}>
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
