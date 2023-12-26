import React from 'react';

import {Grip} from '@gravity-ui/icons';
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
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
import type {ListItemId, ListSizeTypes} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {createRandomizedData} from '../utils/makeData';
import {reorderArray} from '../utils/reorderArray';

export interface ListWithDndProps {
    itemsCount: number;
    size: ListSizeTypes;
}

export const ListWithDnd = ({size, itemsCount}: ListWithDndProps) => {
    const containerRef = React.useRef(null);

    const [items, setItems] = React.useState(
        createRandomizedData<{title: string}>({num: itemsCount, depth: 0}),
    );

    const filterState = useListFilter({items});

    const listState = useListState();

    const listParsedState = useList({
        items: filterState.items,
    });

    const onItemClick = React.useCallback(
        (id: ListItemId) => {
            if (id in listParsedState.groupsState) {
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
        [listParsedState.groupsState, listState],
    );

    useListKeydown({
        containerRef,
        onItemClick,
        ...listParsedState,
        ...listState,
    });

    return (
        <Flex direction="column" gap="5">
            <TextInput
                autoComplete="off"
                value={filterState.filter}
                onUpdate={filterState.onChange}
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
                                {listParsedState.flattenIdsOrder.map((id, index) => {
                                    const [data, state, _listContext] = getItemRenderState({
                                        id,
                                        size,
                                        onItemClick,
                                        ...listParsedState,
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
                                                    {...state}
                                                    {...data}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    active={snapshot.isDragging}
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
