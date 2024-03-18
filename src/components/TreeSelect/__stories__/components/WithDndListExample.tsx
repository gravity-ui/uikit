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
import type {TreeSelectProps, TreeSelectRenderContainer, TreeSelectRenderItem} from '../../types';

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
        'value' | 'onUpdate' | 'items' | 'getItemContent' | 'getItemContent'
    > {}

const randomItems: CustomDataType[] = createRandomizedData({
    num: 10,
    depth: 0,
    getData: (title) => title,
}).map(({data}, idx) => ({someRandomKey: data, id: String(idx)}));

export const WithDndListExample = (storyProps: WithDndListExampleProps) => {
    const [items, setItems] = React.useState(randomItems);
    const [activeItemId, setActiveItemId] = React.useState<string | undefined>(undefined);
    const [value, setValue] = React.useState<string[]>([]);

    const renderContainer: TreeSelectRenderContainer<CustomDataType> = ({
        renderItem,
        visibleFlattenIds,
        containerRef,
        id,
    }) => {
        const handleDrugEnd: OnDragEndResponder = ({destination, source}) => {
            if (typeof destination?.index === 'number' && destination.index !== source.index) {
                setItems((currentItems) =>
                    reorderArray(currentItems, source.index, destination.index),
                );

                setActiveItemId(`${destination.index}`);
            }
        };

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
                                isDragging: snapshot.isDragging,
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
                                {visibleFlattenIds.map((listItemId, index) =>
                                    renderItem(listItemId, index),
                                )}
                                {droppableProvided.placeholder}
                            </div>
                        </ListContainerView>
                    )}
                </Droppable>
            </DragDropContext>
        );
    };

    const renderItem: TreeSelectRenderItem<CustomDataType> = ({
        data,
        props,
        index,
        renderContext: renderContextProps,
    }) => {
        const commonProps = {
            ...props,
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
            <Draggable draggableId={String(index)} index={index} key={`item-key-${index}`}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <DraggableListItem
                        provided={provided}
                        {...commonProps}
                        isDragging={snapshot.isDragging}
                    />
                )}
            </Draggable>
        );
    };

    return (
        <Flex>
            <TreeSelect
                {...storyProps}
                value={value}
                items={items}
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId}
                // you can omit this prop here. If prop `id` passed, TreeSelect would take it by default
                getId={({id}) => id}
                getItemContent={({someRandomKey}) => ({
                    title: someRandomKey,
                })}
                onItemClick={({id, isGroup, disabled}) => {
                    if (!isGroup && !disabled) {
                        setValue([id]);
                        setActiveItemId(id);
                    }
                }}
                renderContainer={renderContainer}
                renderItem={renderItem}
            />
        </Flex>
    );
};
