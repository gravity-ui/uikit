import React from 'react';

import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import type {
    DraggableProvided,
    DraggableRubric,
    DraggableStateSnapshot,
    DroppableProvided,
    OnDragEndResponder,
} from 'react-beautiful-dnd';

import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {ListContainerView} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {reorderArray} from '../../../useList/__stories__/utils/reorderArray';
import {TreeSelect} from '../../TreeSelect';
import {TreeSelectItem} from '../../TreeSelectItem';
import type {TreeSelectItemProps} from '../../TreeSelectItem';
import type {TreeSelectProps} from '../../types';

const DraggableListItem = ({
    provided,
    ...props
}: {provided?: DraggableProvided} & TreeSelectItemProps) => {
    return (
        <TreeSelectItem
            {...provided?.dragHandleProps}
            {...provided?.draggableProps}
            ref={provided?.innerRef}
            {...props}
        />
    );
};

type CustomDataType = {someRandomKey: string; id: string};

export interface WithDndListExampleProps
    extends Omit<
        TreeSelectProps<CustomDataType>,
        'value' | 'onUpdate' | 'items' | 'getItemContent' | 'renderControlContent'
    > {}

const randomItems: CustomDataType[] = createRandomizedData({
    num: 10,
    depth: 0,
    getData: (title) => title,
}).map(({data}, idx) => ({someRandomKey: data, id: String(idx)}));

export const WithDndListExample = (storyProps: WithDndListExampleProps) => {
    const [items, setItems] = React.useState(randomItems);
    const [value, setValue] = React.useState<string[]>([]);

    const handleDrugEnd: OnDragEndResponder = ({destination, source}) => {
        if (typeof destination?.index === 'number' && destination.index !== source.index) {
            setItems((items) => reorderArray(items, source.index, destination.index));
        }
    };

    return (
        <Flex>
            <TreeSelect
                {...storyProps}
                value={value}
                items={items}
                // you can omit this prop here. Id if passed, would taken by default
                getId={({id}) => id}
                renderControlContent={({someRandomKey}) => ({
                    title: someRandomKey,
                })}
                onItemClick={(_data, {id, isGroup, disabled}) => {
                    if (!isGroup && !disabled) {
                        setValue([id]);
                    }
                }}
                renderContainer={({renderItem, visibleFlattenIds, containerRef, id}) => {
                    return (
                        <DragDropContext onDragEnd={handleDrugEnd}>
                            <Droppable
                                droppableId="droppable"
                                renderClone={(
                                    provided: DraggableProvided,
                                    snapshot: DraggableStateSnapshot,
                                    rubric: DraggableRubric,
                                ) => {
                                    return renderItem(
                                        visibleFlattenIds[rubric.source.index],
                                        rubric.source.index,
                                        {
                                            provided,
                                            active: snapshot.isDragging,
                                        },
                                    );
                                }}
                            >
                                {(droppableProvided: DroppableProvided) => (
                                    <ListContainerView ref={containerRef} id={id}>
                                        <div
                                            {...droppableProvided.droppableProps}
                                            ref={droppableProvided.innerRef}
                                        >
                                            {visibleFlattenIds.map((id, index) =>
                                                renderItem(id, index),
                                            )}
                                            {droppableProvided.placeholder}
                                        </div>
                                    </ListContainerView>
                                )}
                            </Droppable>
                        </DragDropContext>
                    );
                }}
                renderItem={({data, props, index, renderContext: renderContextProps}) => {
                    const commonProps = {
                        ...props,
                        // selected: value.initem.uniqId,
                        title: data.someRandomKey,
                        endSlot: <Icon data={Grip} size={16} />,
                    };

                    // here passed props from `renderContainer` method.
                    if (renderContextProps) {
                        return (
                            <DraggableListItem
                                key={`item-key-${index}`}
                                {...commonProps}
                                {...renderContextProps}
                            />
                        );
                    }
                    return (
                        <Draggable
                            draggableId={String(index)}
                            index={index}
                            key={`item-key-${index}`}
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
