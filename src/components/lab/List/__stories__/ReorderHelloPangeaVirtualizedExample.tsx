/**
 * Reordering with @hello-pangea/dnd on top of virtualization — the model of
 * the virtual mode of the old List:
 *
 * - `mode="virtual"`: the placeholder is not needed (the last-row hack of the
 *   flat example goes away), but `renderClone` is mandatory — while dragging,
 *   the original Draggable renders null and the row is drawn by a clone
 *   outside the tree of the list (it survives the original being unmounted
 *   from the window);
 * - `getContainerForClone`: the default document.body lies outside .g-root —
 *   the CSS variables of the theme do not resolve inside the clone (margins,
 *   paddings and colors would collapse). The list root does not fit either:
 *   the contain of the virtualizer makes it a containing block for
 *   position: fixed;
 * - the ghost of the clone (opacity) is applied by hand: the
 *   `[data-dragging]` style of the list does not reach through the portal, and
 *   the dragged item has to look the same across all the examples;
 * - rows of variable height work through measure (the engine ignores the
 *   transiently emptied wrapper of the original), but the measurements must
 *   not CHANGE while dragging — rbd snapshots the geometry on lift;
 * - `role="grid"`: the handle of rbd is a real button, and interactive content
 *   inside a row is valid in the grid role model only. The grid/row/gridcell
 *   roles survive the absolute+top wrappers of the virtualizer just as
 *   listbox/option do, and the numbering of the window travels through
 *   aria-rowcount/aria-rowindex.
 *
 * In an application the list is imported from the package:
 * `import {unstable_List as List, unstable_moveItem as moveItem} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import type {DraggableProvidedDragHandleProps} from '@hello-pangea/dnd';

import {Icon} from '../../../Icon';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {List} from '../List';
import {moveItem} from '../moveItem';
import type {ListItemContext, ListItemHelpers} from '../types';

import {useHelloPangeaListDnd} from './useHelloPangeaListDnd';

interface TrackRecord {
    id: string;
    title: string;
}

const ROW_ESTIMATE = 28;

const vinylArchive: TrackRecord[] = Array.from({length: 1000}, (_, index) => ({
    id: `vinyl-${index + 1}`,
    // Every fourth title is long enough to wrap: rows of variable height
    title: `${String(index + 1).padStart(4, '0')} · ${faker.music.songName()}${
        index % 4 === 0 ? ` (${faker.music.genre()} remaster — ${faker.company.catchPhrase()})` : ''
    }`,
}));

const getTrackContent = (record: TrackRecord) => record.title;

function PangeaGrip(props: Partial<DraggableProvidedDragHandleProps>) {
    // rbd turns the handle into a keyboard-draggable button (role="button",
    // tabIndex=0) — it needs an accessible name, otherwise axe reports
    // aria-command-name.
    // tabIndex={-1} is the grid contract: the list stays a single tab stop and
    // the handle is reached with ←/→ (rbd looks it up by its own data attribute)
    return (
        <span
            {...props}
            tabIndex={-1}
            aria-label="Drag to reorder"
            style={{display: 'flex', cursor: 'grab'}}
        >
            <Icon data={Grip} size={12} />
        </span>
    );
}

function PangeaVirtualRow({
    ctx,
    helpers,
}: {
    ctx: ListItemContext<TrackRecord>;
    helpers: ListItemHelpers;
}) {
    return (
        <Draggable draggableId={ctx.id} index={ctx.index} isDragDisabled={ctx.state.disabled}>
            {(dragProvided) => (
                <List.ItemView
                    {...dragProvided.draggableProps}
                    {...helpers.getItemProps({
                        ref: dragProvided.innerRef,
                        // The per-frame shift styles have to be applied by the
                        // row itself, through the composition contract (a
                        // shallow merge of style)
                        style: dragProvided.draggableProps.style as React.CSSProperties,
                    })}
                    {...helpers.getItemViewProps()}
                    // dragHandleProps go to a separate handle: on the row they
                    // would overwrite the role of the row and intercept the
                    // Space of the list. The cell around the handle is a
                    // requirement of the grid model: interactive content is
                    // valid inside a gridcell only
                    startContent={
                        <span {...helpers.getCellProps()}>
                            <PangeaGrip {...(dragProvided.dragHandleProps ?? undefined)} />
                        </span>
                    }
                >
                    <span {...helpers.getCellProps()}>{ctx.item.title}</span>
                </List.ItemView>
            )}
        </Draggable>
    );
}

export function ReorderHelloPangeaVirtualizedExample() {
    const [items, setItems] = React.useState(vinylArchive);
    const ids = items.map((record) => record.id);
    const {draggingId, onDragStart, onDragEnd} = useHelloPangeaListDnd({
        ids,
        onDrop: (fromId, toId, position) => setItems(moveItem(items, fromId, toId, position)),
    });
    const cloneContainerRef = React.useRef<HTMLDivElement>(null);
    return (
        <div ref={cloneContainerRef}>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="vinyl-archive"
                    mode="virtual"
                    getContainerForClone={() => cloneContainerRef.current ?? document.body}
                    renderClone={(cloneProvided, _snapshot, rubric) => (
                        // The clone is a purely visual copy of the row outside
                        // the tree of the list: getItemProps is neither present
                        // nor needed here (the role, the id and the handlers
                        // stay on the original)
                        <List.ItemView
                            {...cloneProvided.draggableProps}
                            ref={cloneProvided.innerRef}
                            style={{...cloneProvided.draggableProps.style, opacity: 0.5}}
                            size="m"
                            active
                            startContent={
                                <PangeaGrip {...(cloneProvided.dragHandleProps ?? undefined)} />
                            }
                        >
                            {items[rubric.source.index]?.title}
                        </List.ItemView>
                    )}
                >
                    {(provided) => (
                        <ListVirtualizer<TrackRecord> estimateItemSize={ROW_ESTIMATE}>
                            {/* The List root is the scroll container and the
                                droppable element of rbd at the same time
                                (innerRef travels through the adapter) */}
                            <List
                                role="grid"
                                aria-label="Vinyl archive"
                                style={{height: 480, width: 400}}
                                items={items}
                                dnd={{
                                    getContainerDndProps: () => ({
                                        ...provided.droppableProps,
                                        ref: provided.innerRef,
                                    }),
                                    draggingId,
                                }}
                                getItemContent={getTrackContent}
                                renderItem={(ctx, helpers) => (
                                    <PangeaVirtualRow ctx={ctx} helpers={helpers} />
                                )}
                            />
                        </ListVirtualizer>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
