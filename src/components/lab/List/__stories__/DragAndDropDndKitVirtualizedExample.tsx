/**
 * Drag and drop with dnd-kit on top of virtualization — an example of
 * plugging another library into the adapter contract (the recommended library
 * is @hello-pangea/dnd, see the DragAndDrop stories). The recipe dnd-kit
 * prescribes for virtual lists is DragOverlay:
 *
 * - The dragged item is drawn by an OVERLAY (it flies with the cursor), while
 *   the original is hidden for the duration of the drag (opacity 0, the slot
 *   is preserved): the shift strategy is a preview of the result, the
 *   neighbours cover the original slot, and a visible original would be
 *   overlapped by them. Unmounting the hidden original while scrolling is
 *   harmless (the counterpart of renderClone in hello-pangea);
 * - the neighbours inside the window are shifted by the transforms of sortable
 *   (the shift model, as in the flat example) — the adapter does not fill
 *   dropTarget in;
 * - DragOverlay renders where it is declared (there is no portal into the
 *   body) — keep it inside the themed tree so that the CSS variables are
 *   available;
 * - a drag starts from the Grip handle only (the listeners and
 *   setActivatorNodeRef live on it).
 *
 * In an application the list is imported from the package:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {DndContext, DragOverlay} from '@dnd-kit/core';
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {useDndKitListDnd} from './useDndKitListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const sortableQueue: TrackRecord[] = Array.from({length: 2000}, (_, index) => ({
    id: `sq-${index + 1}`,
    title: `${String(index + 1).padStart(4, '0')} · ${faker.music.songName()}`,
}));

const getTrackContent = (record: TrackRecord) => record.title;

function SortableVirtualRow({
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
                // The DragOverlay flies with the cursor while the original is
                // HIDDEN for the duration of the drag (opacity 0, the slot is
                // preserved): the shift strategy is a preview of the result,
                // the neighbours cover the original slot, and a visible
                // original would be overlapped by them. The cursor transform is
                // not applied to the original; unmounting it from the window is
                // harmless
                style: isDragging
                    ? {opacity: 0}
                    : {transform: CSS.Transform.toString(transform), transition},
            })}
            {...helpers.getItemViewProps()}
            startContent={
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

export function DragAndDropDndKitVirtualizedExample() {
    const [items, setItems] = React.useState(sortableQueue);
    const ids = items.map((record) => record.id);
    const {adapter, contextProps} = useDndKitListDnd({
        ids,
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    const draggingItem = adapter.draggingId
        ? items.find((record) => record.id === adapter.draggingId)
        : undefined;
    return (
        <DndContext {...contextProps}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <ListVirtualizer estimateItemSize={28}>
                    {/* The List root is the scroll container: the consumer MUST limit its height */}
                    <List
                        aria-label="Big sortable queue"
                        style={{height: 480, width: 400}}
                        items={items}
                        dnd={adapter}
                        getItemContent={getTrackContent}
                        renderItem={(ctx, helpers) => (
                            <SortableVirtualRow ctx={ctx} helpers={helpers} />
                        )}
                    />
                </ListVirtualizer>
            </SortableContext>
            {/* The overlay is a visual copy of the row outside the list (a
                ghost, like the clone in hello-pangea); getItemProps is neither
                present nor needed here */}
            <DragOverlay>
                {draggingItem ? (
                    <List.ItemView
                        size="m"
                        active
                        style={{opacity: 0.5}}
                        startContent={
                            <span style={{display: 'flex', cursor: 'grabbing'}}>
                                <Icon data={Grip} size={12} />
                            </span>
                        }
                    >
                        {draggingItem.title}
                    </List.ItemView>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
