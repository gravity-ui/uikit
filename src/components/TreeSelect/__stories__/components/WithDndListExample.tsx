import * as React from 'react';

import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import type {
    DraggableProvided,
    DraggableRubric,
    DraggableStateSnapshot,
    DroppableProvided,
    OnDragEndResponder,
} from '@hello-pangea/dnd';

import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import type {ListItemViewProps} from '../../../useList';
import {ListContainerView, ListItemView} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {reorderArray} from '../../../useList/__stories__/utils/reorderArray';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps, TreeSelectRenderContainer, TreeSelectRenderItem} from '../../types';

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

type CustomDataType = {someRandomKey: string; id: string};

export interface WithDndListExampleProps
    extends Omit<
        TreeSelectProps<CustomDataType>,
        'value' | 'onUpdate' | 'items' | 'mapItemDataToContentProps'
    > {}

const randomItems: CustomDataType[] = createRandomizedData({
    num: 10,
    depth: 0,
    getData: (title) => title,
}).map(({data}, idx) => ({someRandomKey: data, id: String(idx)}));

export const WithDndListExample = (storyProps: WithDndListExampleProps) => {
    const [items, setItems] = React.useState(randomItems);

    const renderContainer: TreeSelectRenderContainer<CustomDataType> = ({
        renderItem,
        list,
        containerRef,
        id,
        className,
    }) => {
        const handleDrugEnd: OnDragEndResponder = ({destination, source}) => {
            if (typeof destination?.index === 'number' && destination.index !== source.index) {
                setItems((currentItems) =>
                    reorderArray(currentItems, source.index, destination.index),
                );
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
                            list.structure.visibleFlattenIds[rubric.source.index],
                            rubric.source.index,
                            {
                                provided,
                                dragging: snapshot.isDragging,
                            },
                        );
                    }}
                >
                    {(droppableProvided: DroppableProvided) => (
                        <ListContainerView ref={containerRef} id={id} className={className}>
                            <div
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef}
                            >
                                {list.structure.visibleFlattenIds.map((listItemId, index) =>
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
        renderContainerProps,
    }) => {
        const commonProps: ListItemViewProps = {
            ...props,
            content: {
                ...props.content,
                title: data.someRandomKey,
                endSlot: <Icon data={Grip} size={16} />,
            },
        };

        // here passed props from `renderContainer` method.
        if (renderContainerProps) {
            return (
                <DraggableListItem
                    key={`item-key-${index}`}
                    {...commonProps}
                    {...renderContainerProps}
                />
            );
        }
        return (
            <Draggable draggableId={String(index)} index={index} key={`item-key-${index}`}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <DraggableListItem
                        provided={provided}
                        {...commonProps}
                        dragging={snapshot.isDragging}
                    />
                )}
            </Draggable>
        );
    };

    return (
        <Flex>
            <TreeSelect
                {...storyProps}
                items={items}
                // you can omit this prop here. If prop `id` passed, TreeSelect would take it by default
                getItemId={({id}) => id}
                mapItemDataToContentProps={({someRandomKey}) => ({
                    title: someRandomKey,
                })}
                renderContainer={renderContainer}
                renderItem={renderItem}
            />
        </Flex>
    );
};
