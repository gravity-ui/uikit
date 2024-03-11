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
import {ListContainerView, ListItemView, useListState} from '../../../useList';
import type {ListItemViewProps} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {reorderArray} from '../../../useList/__stories__/utils/reorderArray';
import {TreeList} from '../../TreeList';
import type {TreeListProps, TreeListRenderContainer, TreeListRenderItem} from '../../types';

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
    extends Omit<TreeListProps<CustomDataType>, 'items' | 'getItemContent' | 'getItemContent'> {}

const randomItems: CustomDataType[] = createRandomizedData({
    num: 10,
    depth: 0,
    getData: (title) => title,
}).map(({data}, idx) => ({someRandomKey: data, id: String(idx)}));

export const WithDndListExample = (storyProps: WithDndListExampleProps) => {
    const [items, setItems] = React.useState(randomItems);
    const listState = useListState();

    const renderContainer: TreeListRenderContainer<CustomDataType> = ({
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

    const renderItem: TreeListRenderItem<CustomDataType> = ({
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
                        active={snapshot.isDragging || commonProps.active}
                    />
                )}
            </Draggable>
        );
    };

    return (
        <TreeList
            {...storyProps}
            {...listState}
            items={items}
            getItemContent={({someRandomKey}) => ({title: someRandomKey})}
            // you can omit this prop here. If prop `id` passed, TreeSelect would take it by default
            getId={({id}) => id}
            onItemClick={(_data, {id, isGroup, disabled}) => {
                if (!isGroup && !disabled) {
                    listState.setSelected((prevState) => ({
                        [id]: !prevState[id],
                    }));

                    listState.setActiveItemId(id);
                }
            }}
            renderContainer={renderContainer}
            renderItem={renderItem}
        />
    );
};
