/**
 * Reordering with dnd-kit — the "state-only" form of an adapter: the adapter
 * carries draggingId only, and the props half is covered by the consumer with
 * the per-item `useSortable` hook in THEIR OWN row component through
 * renderItem (the hook cannot be called from a method of the adapter — rules
 * of hooks).
 *
 * Visually the example lives in the SHIFT model (the native one for sortable):
 * the transforms of dnd-kit are applied to every row — the neighbours smoothly
 * move apart and show the insertion point as a gap, while the adapter does not
 * fill `dropTarget` in (the insertion indicator of the list is not drawn —
 * otherwise the indication would be doubled). The indicator model is shown by
 * the pragmatic reference.
 *
 * In an application the list is imported from the package:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {DndContext} from '@dnd-kit/core';
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {useDndKitListDnd} from './useDndKitListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const tracks: TrackRecord[] = Array.from({length: 8}, (_, index) => ({
    id: `track-${index + 1}`,
    title: `${index + 1} · ${faker.music.songName()}`,
}));

function SortableRow({
    ctx,
    helpers,
}: {
    ctx: ListItemContext<TrackRecord>;
    helpers: ListItemHelpers;
}) {
    const {setNodeRef, setActivatorNodeRef, listeners, transform, transition, isDragging} =
        useSortable({id: ctx.id});
    return (
        <List.ItemView
            {...helpers.getItemProps({
                ref: setNodeRef,
                // The shift model: the transforms are applied to EVERY row —
                // the dragged one follows the cursor while the neighbours
                // smoothly (transition) move apart, showing the insertion
                // point as a gap
                style: {
                    transform: CSS.Transform.toString(transform),
                    transition,
                    ...(isDragging ? {position: 'relative' as const, zIndex: 2} : undefined),
                },
            })}
            {...helpers.getItemViewProps()}
            startContent={
                // A drag starts from the handle only: the listeners and the
                // activator ref live on it rather than on the row (the same
                // handle pattern as in the hello-pangea example). The
                // attributes of useSortable (role="button", tabIndex=0) are
                // not spread here either: they are needed by the keyboard dnd
                // only, which is outside the layer
                <span
                    ref={setActivatorNodeRef}
                    {...(listeners as React.DOMAttributes<HTMLElement>)}
                    style={{display: 'flex', cursor: 'grab'}}
                >
                    <Icon data={Grip} size={12} />
                </span>
            }
        >
            {ctx.item.title}
        </List.ItemView>
    );
}

export function ReorderDndKitExample() {
    const [items, setItems] = React.useState(tracks);
    const ids = items.map((record) => record.id);
    const {adapter, contextProps} = useDndKitListDnd({
        ids,
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    return (
        <DndContext {...contextProps}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <List
                    aria-label="Queue"
                    items={items}
                    dnd={adapter}
                    style={{width: 320}}
                    getItemContent={(record) => record.title}
                    renderItem={(ctx, helpers) => <SortableRow ctx={ctx} helpers={helpers} />}
                />
            </SortableContext>
        </DndContext>
    );
}
