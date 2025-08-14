import * as React from 'react';

import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import type {DraggableProvided, DraggableStateSnapshot, DroppableProvided} from '@hello-pangea/dnd';

import {Icon} from '../../../Icon';
import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ListContainerView} from '../../components/ListContainerView';
import {ListItemView} from '../../components/ListItemView';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListKeydown} from '../../hooks/useListKeydown';
import type {ListItemSize} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {getListItemClickHandler} from '../../utils/getListItemClickHandler';
import {createRandomizedData} from '../utils/makeData';
import {reorderArray} from '../utils/reorderArray';

export interface ListWithDndProps {
    itemsCount: number;
    size: ListItemSize;
    'aria-label'?: string;
}

export const ListWithDnd = ({size, itemsCount, 'aria-label': ariaLabel}: ListWithDndProps) => {
    const containerRef = React.useRef(null);

    const [items, setItems] = React.useState(
        createRandomizedData<{title: string}>({num: itemsCount, depth: 0}),
    );

    const filterState = useListFilter({items});

    const list = useList({
        getItemId: ({title}) => title,
        items: filterState.items,
    });

    const onItemClick = getListItemClickHandler({list});

    useListKeydown({
        containerRef,
        onItemClick,
        list,
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
                            <ListContainerView
                                ref={containerRef}
                                extraProps={{'aria-label': ariaLabel}}
                            >
                                {list.structure.visibleFlattenIds.map((id, index) => {
                                    const {props} = getItemRenderState({
                                        id,
                                        size,
                                        onItemClick,
                                        mapItemDataToContentProps: (x) => x,
                                        list,
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
                                                    content={{
                                                        ...props.content,
                                                        endSlot: <Icon data={Grip} size={16} />,
                                                    }}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    dragging={snapshot.isDragging}
                                                    ref={provided.innerRef}
                                                    role="option"
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
