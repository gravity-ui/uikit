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
import {ListContainerView, ListItemView, useList} from '../../../useList';
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
            role="option"
        />
    );
};

type CustomDataType = {someRandomKey: string; id: string};

const randomItems: CustomDataType[] = createRandomizedData({
    num: 10,
    depth: 0,
    getData: (title) => title,
}).map(({data}, idx) => ({someRandomKey: data, id: String(idx)}));

export interface WithDndListStoryProps
    extends Omit<TreeListProps<CustomDataType>, 'items' | 'mapItemDataToContentProps'> {}

export const WithDndListStory = (storyProps: WithDndListStoryProps) => {
    const [items, setItems] = React.useState(randomItems);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const list = useList({
        items,
        // you can omit this prop here. If prop `id` passed, TreeSelect would take it by default
        getItemId: ({id}) => id,
    });

    React.useLayoutEffect(() => {
        containerRef?.current?.focus();
    }, []);

    const renderContainer: TreeListRenderContainer<CustomDataType> = ({
        renderItem,
        list,
        containerRef,
        id,
    }) => {
        const handleDrugEnd: OnDragEndResponder = ({destination, source}) => {
            if (typeof destination?.index === 'number' && destination.index !== source.index) {
                setItems((currentItems) =>
                    reorderArray(currentItems, source.index, destination.index),
                );

                list.state.setActiveItemId(`${destination.index}`);
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
                        <ListContainerView ref={containerRef} id={id}>
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

    const renderItem: TreeListRenderItem<CustomDataType> = ({
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
        <TreeList
            {...storyProps}
            list={list}
            containerRef={containerRef}
            mapItemDataToContentProps={({someRandomKey}) => ({title: someRandomKey})}
            renderContainer={renderContainer}
            renderItem={renderItem}
        />
    );
};
