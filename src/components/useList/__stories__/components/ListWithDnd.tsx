import React from 'react';

import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import type {
    DraggableProvided,
    DraggableStateSnapshot,
    DroppableProvided,
} from 'react-beautiful-dnd';

import {Icon} from '../../../Icon';
import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {ListItemView} from '../../components/ListItemView/ListItemView';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListKeydown} from '../../hooks/useListKeydown';
import {useListState} from '../../hooks/useListState';
import type {ListItemId, ListItemSize} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {createRandomizedData} from '../utils/makeData';
import {reorderArray} from '../utils/reorderArray';

export interface ListWithDndProps {
    itemsCount: number;
    size: ListItemSize;
}

export const ListWithDnd = ({size, itemsCount}: ListWithDndProps) => {
    const containerRef = React.useRef(null);

    const [items, setItems] = React.useState(
        createRandomizedData<{title: string}>({num: itemsCount, depth: 0}),
    );

    const filterState = useListFilter({items});

    const listState = useListState();

    const list = useList({
        getId: ({title}) => title,
        items: filterState.items,
        ...listState,
    });

    const onItemClick = React.useCallback(
        (id: ListItemId) => {
            if (id in list.groupsState) {
                listState.setExpanded((state) => ({
                    ...state,
                    [id]: id in state ? !state[id] : false,
                }));
            } else {
                // just toggle item by id
                listState.setSelected((state) => ({
                    [id]: !state[id],
                }));
            }

            listState.setActiveItemId(id);
        },
        [list.groupsState, listState],
    );

    useListKeydown({
        containerRef,
        onItemClick,
        ...list,
        ...listState,
    });

    return (
        <Flex direction="column" gap="5">
            <TextInput
                autoComplete="off"
                value={filterState.filter}
                onUpdate={filterState.onFilterUpdate}
                ref={filterState.filterRef}
            />
            <DragDropContext
                onDragEnd={({destination, source}) => {
                    if (destination?.index && destination?.index !== source.index) {
                        setItems((items) => reorderArray(items, source.index, destination.index));
                    }
                }}
            >
                <Droppable droppableId="droppable">
                    {(droppableProvided: DroppableProvided) => (
                        <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                            <ListContainerView ref={containerRef}>
                                {list.visibleFlattenIds.map((id, index) => {
                                    const {data, props} = getItemRenderState({
                                        id,
                                        size,
                                        onItemClick,
                                        ...list,
                                        ...listState,
                                    });

                                    return (
                                        <Draggable
                                            draggableId={String(index)}
                                            index={index}
                                            key={`item-key-${index}`}
                                        >
                                            {(
                                                provided: DraggableProvided,
                                                snapshot: DraggableStateSnapshot,
                                            ) => (
                                                <ListItemView
                                                    {...props}
                                                    {...data}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    isDragging={snapshot.isDragging}
                                                    ref={provided.innerRef}
                                                    endSlot={<Icon data={Grip} size={16} />}
                                                />
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {droppableProvided.placeholder}
                            </ListContainerView>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Flex>
    );
};
