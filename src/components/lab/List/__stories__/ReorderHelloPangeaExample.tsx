/**
 * Reordering with @hello-pangea/dnd — the target case for migrating off the
 * old List (which is built on this library). The library cannot be expressed
 * by the props contract, so the integration is compositional, modelled on the
 * old List:
 *
 * - the state half of the adapter (`draggingId`) travels through the `dnd`
 *   prop — without it the core provides neither data-dragging nor the
 *   suspension of activation on hover;
 * - `role="grid"`: the handle of rbd is a real button (role="button",
 *   tabIndex=0), and interactive descendants are valid in the grid role model
 *   only. The rows become `role="row"`, the handle and the content live in
 *   their own `getCellProps()` cells, and `←`/`→` move focus between them —
 *   the handle is reachable with the keyboard rather than merely valid;
 * - `dragHandleProps` go to a SEPARATE handle in startContent (as in the old
 *   List): on the row itself role="button"/tabIndex=0 would overwrite the role
 *   of the row, and the Space lift of the keyboard sensor of rbd would
 *   intercept the Space of the list. The `tabIndex={-1}` on top of them is the
 *   grid contract (one tab stop per list): the handle is reached with ←/→, and
 *   rbd does not care (it looks the handle up by its own data attribute and
 *   focuses it programmatically);
 * - `provided.placeholder` must be the last child of the droppable element
 *   (the list root) — there is no channel for that in the contract, so it is
 *   smuggled through the renderItem of the last row (this works in the flat
 *   mode only);
 * - dropTarget is not filled in: the model of the library is shifting the
 *   rows, and the indicator of the list is not needed.
 *
 * In an application the list is imported from the package:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';

import {Icon} from '../../../Icon';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {useHelloPangeaListDnd} from './useHelloPangeaListDnd';

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
    isLast,
    placeholder,
}: {
    ctx: ListItemContext<TrackRecord>;
    helpers: ListItemHelpers;
    isLast: boolean;
    placeholder: React.ReactNode;
}) {
    return (
        <React.Fragment>
            <Draggable draggableId={ctx.id} index={ctx.index} isDragDisabled={ctx.state.disabled}>
                {(dragProvided, dragSnapshot) => (
                    <List.ItemView
                        {...dragProvided.draggableProps}
                        {...helpers.getItemProps({
                            ref: dragProvided.innerRef,
                            // The per-frame shift styles have to be applied by
                            // the row itself, through the composition contract
                            // (a shallow merge of style).
                            // For the duration of an ACTIVE drag the inline
                            // `transition: opacity ...` of rbd is suppressed
                            // (it is meant for combine, which is not used
                            // here): otherwise the ghost styles of the list
                            // ([data-dragging]: the background plus opacity)
                            // would be applied out of sync — the background
                            // instantly, the opacity through the transition —
                            // and the row would flash dark at the start.
                            // The drop animation is left alone (patching style
                            // by the snapshot is the regular way to customize
                            // rbd)
                            style: {
                                ...(dragProvided.draggableProps.style as React.CSSProperties),
                                ...(dragSnapshot.isDragging && !dragSnapshot.isDropAnimating
                                    ? {transition: 'none'}
                                    : undefined),
                            },
                        })}
                        {...helpers.getItemViewProps()}
                        startContent={
                            // A cell with interactive content: the handle
                            // button is valid inside a gridcell (inside
                            // role="option" it is not)
                            <span {...helpers.getCellProps()}>
                                {/* rbd turns the handle into a keyboard-
                                    draggable button (role="button",
                                    tabIndex=0), so it needs an accessible
                                    name — otherwise axe reports
                                    aria-command-name */}
                                <span
                                    {...(dragProvided.dragHandleProps ?? undefined)}
                                    // A grid is ONE tab stop: the interactive
                                    // content of a cell is reached with ←/→,
                                    // while the tabIndex=0 of dragHandleProps
                                    // would make the handle of every row a
                                    // separate Tab stop
                                    tabIndex={-1}
                                    aria-label="Drag to reorder"
                                    style={{display: 'flex', cursor: 'grab'}}
                                >
                                    <Icon data={Grip} size={12} />
                                </span>
                            </span>
                        }
                    >
                        <span {...helpers.getCellProps()}>{ctx.item.title}</span>
                    </List.ItemView>
                )}
            </Draggable>
            {/* The placeholder must be the last child of the droppable element
                (the list root) — it is smuggled through the renderItem of the
                last row */}
            {isLast ? placeholder : null}
        </React.Fragment>
    );
}

export function ReorderHelloPangeaExample() {
    const [items, setItems] = React.useState(tracks);
    const ids = items.map((record) => record.id);
    const {draggingId, onDragStart, onDragEnd} = useHelloPangeaListDnd({
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
                        }}
                        getItemContent={(record) => record.title}
                        renderItem={(ctx, helpers) => (
                            <PangeaRow
                                ctx={ctx}
                                helpers={helpers}
                                isLast={ctx.index === items.length - 1}
                                placeholder={provided.placeholder}
                            />
                        )}
                    />
                )}
            </Droppable>
        </DragDropContext>
    );
}
