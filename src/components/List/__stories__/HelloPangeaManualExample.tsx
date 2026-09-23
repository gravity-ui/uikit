/**
 * Drag and drop with @hello-pangea/dnd under the hood: the wiring
 * `ListHelloPangeaDnd` does for you (the DragAndDrop story of the List),
 * written by hand — for when the kit does not fit. The pieces:
 *
 * - the state half of the adapter (`draggingId`) comes from
 *   `useListHelloPangeaDnd` — without it the core provides neither
 *   data-dragging nor the suspension of activation on hover;
 * - `role="grid"`: the handle of rbd is a real button (role="button"), and
 *   interactive descendants are valid in the grid role model only. The rows
 *   become `role="row"`, the handle and the content live in their own
 *   `getCellProps()` cells, and `←`/`→` move focus between them;
 * - `dragHandleProps` go to a SEPARATE handle in the `dragHandle` slot of the
 *   view: on the row itself role="button"/tabIndex=0 would overwrite the role
 *   of the row, and the Space lift of the keyboard sensor of rbd would
 *   intercept the Space of the list. The `tabIndex={-1}` on top of them is the
 *   grid contract (one tab stop per list): rbd looks the handle up by its own
 *   data attribute and focuses it programmatically;
 * - `provided.placeholder` must be the last child of the droppable element
 *   (the list root) — the `placeholder` field of the adapter puts it there;
 * - the index of `Draggable` is the position in `items`: `ctx.index` counts
 *   section headers too, and rbd needs contiguous indexes;
 * - dropTarget is not filled in: the model of the library is shifting the
 *   rows, and the indicator of the list is not needed.
 *
 * In an application:
 * `import {List, moveItem} from '@gravity-ui/uikit'`
 * `import {HelloPangeaDragHandle, useListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
// eslint-disable-next-line no-restricted-imports
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';

import {HelloPangeaDragHandle, useListHelloPangeaDnd} from '../../HelloPangeaDnd';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

interface TrackRecord {
    id: string;
    title: string;
}

const tracks: TrackRecord[] = Array.from({length: 8}, (_, index) => ({
    id: `track-${index + 1}`,
    title: `${index + 1} · ${faker.music.songName()}`,
}));

function PangeaRow({
    ctx,
    helpers,
    index,
}: {
    ctx: ListItemContext<TrackRecord>;
    helpers: ListItemHelpers;
    index: number;
}) {
    return (
        <Draggable draggableId={ctx.id} index={index} isDragDisabled={ctx.state.disabled}>
            {(dragProvided, dragSnapshot) => (
                <List.ItemView
                    {...helpers.getItemProps({
                        ...dragProvided.draggableProps,
                        ref: dragProvided.innerRef,
                        // The per-frame shift styles have to be applied by the
                        // row itself, through the composition contract (a
                        // shallow merge of style).
                        // For the duration of an ACTIVE drag the inline
                        // `transition: opacity ...` of rbd is suppressed (it is
                        // meant for combine, which is not used here): otherwise
                        // the ghost styles of the list ([data-dragging]: the
                        // background plus opacity) would be applied out of sync
                        // and the row would flash dark at the start. The drop
                        // animation is left alone
                        style: {
                            ...(dragProvided.draggableProps.style as React.CSSProperties),
                            ...(dragSnapshot.isDragging && !dragSnapshot.isDropAnimating
                                ? {transition: 'none'}
                                : undefined),
                        },
                    })}
                    {...helpers.getItemViewProps()}
                    dragHandle={
                        // A cell with interactive content: the handle button is
                        // valid inside a gridcell (inside role="option" it is
                        // not). HelloPangeaDragHandle adds tabIndex={-1} and the
                        // accessible name (axe: aria-command-name)
                        <span {...helpers.getCellProps()}>
                            <HelloPangeaDragHandle
                                {...(dragProvided.dragHandleProps ?? undefined)}
                            />
                        </span>
                    }
                >
                    <span {...helpers.getCellProps()}>{ctx.item.title}</span>
                </List.ItemView>
            )}
        </Draggable>
    );
}

export function HelloPangeaManualExample() {
    const [items, setItems] = React.useState(tracks);
    const ids = items.map((record) => record.id);
    const {draggingId, onDragStart, onDragEnd} = useListHelloPangeaDnd({
        ids,
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId="playlist">
                {(provided) => (
                    <List
                        role="grid"
                        aria-label="Vinyl"
                        items={items}
                        style={{width: 320}}
                        dnd={{
                            getContainerDndProps: () => ({
                                ...provided.droppableProps,
                                ref: provided.innerRef,
                            }),
                            draggingId,
                            placeholder: provided.placeholder,
                        }}
                        getItemContent={(record) => record.title}
                        renderItem={(ctx, helpers) => (
                            <PangeaRow ctx={ctx} helpers={helpers} index={ids.indexOf(ctx.id)} />
                        )}
                    />
                )}
            </Droppable>
        </DragDropContext>
    );
}
