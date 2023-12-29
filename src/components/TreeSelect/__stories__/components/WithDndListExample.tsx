import React from 'react';

import {Grip} from '@gravity-ui/icons';
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableRubric,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    OnDragEndResponder,
} from 'react-beautiful-dnd';

import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {ListContainerView, ListItemView, ListItemViewProps} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {reorderArray} from '../../../useList/__stories__/utils/reorderArray';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

const DraggableListItem = ({
    provided,
    ...props
}: {provided?: DraggableProvided} & ListItemViewProps) => {
    return (
        <ListItemView
            {...provided?.dragHandleProps}
            {...provided?.draggableProps}
            ref={provided?.innerRef}
            {...props}
        />
    );
};

export interface WithDndListExampleProps
    extends Omit<TreeSelectProps<string>, 'value' | 'onUpdate' | 'items' | 'getItemContent'> {}

export const WithDndListExample = (props: WithDndListExampleProps) => {
    const [items, setItems] = React.useState(() =>
        createRandomizedData({num: 10, depth: 0, getData: (title) => title}),
    );
    const [value, setValue] = React.useState<string[]>([]);

    const handleDrugEnd: OnDragEndResponder = ({destination, source}) => {
        if (destination?.index && destination?.index !== source.index) {
            setItems((items) => reorderArray(items, source.index, destination.index));
        }
    };

    return (
        <Flex>
            <TreeSelect
                {...props}
                value={value}
                items={items}
                onItemClick={(_, {id, isGroup, disabled}) => {
                    if (!isGroup && !disabled) {
                        setValue([id]);
                    }
                }}
                renderContainer={({renderItem, flattenIdsOrder, containerRef, id}) => {
                    return (
                        <DragDropContext onDragEnd={handleDrugEnd}>
                            <Droppable
                                droppableId="droppable"
                                renderClone={(
                                    provided: DraggableProvided,
                                    snapshot: DraggableStateSnapshot,
                                    rubric: DraggableRubric,
                                ) => {
                                    return renderItem(flattenIdsOrder[rubric.source.index], {
                                        provided,
                                        active: snapshot.isDragging,
                                    });
                                }}
                            >
                                {(droppableProvided: DroppableProvided) => (
                                    <ListContainerView ref={containerRef} id={id}>
                                        <div
                                            {...droppableProvided.droppableProps}
                                            ref={droppableProvided.innerRef}
                                        >
                                            {flattenIdsOrder.map((id) => renderItem(id))}
                                            {droppableProvided.placeholder}
                                        </div>
                                    </ListContainerView>
                                )}
                            </Droppable>
                        </DragDropContext>
                    );
                }}
                renderItem={(item, state, _listContext, renderContextProps) => {
                    const commonProps = {
                        ...state,
                        title: item,
                        endSlot: <Icon data={Grip} size={16} />,
                    };

                    // here passed props from `renderContainer` method.
                    if (renderContextProps) {
                        return (
                            <DraggableListItem
                                key={`item-key-${state.id}`}
                                {...commonProps}
                                {...renderContextProps}
                            />
                        );
                    }
                    return (
                        <Draggable
                            draggableId={state.id}
                            index={Number(state.id)}
                            key={`item-key-${state.id}`}
                        >
                            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                <DraggableListItem
                                    provided={provided}
                                    {...commonProps}
                                    active={snapshot.isDragging}
                                />
                            )}
                        </Draggable>
                    );
                }}
            />
        </Flex>
    );
};
