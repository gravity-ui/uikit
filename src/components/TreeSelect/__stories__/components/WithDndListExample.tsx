import React from 'react';

import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import type {OnDragEndResponder} from 'react-beautiful-dnd';

import {useUniqId} from '../../../../hooks';
import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {ListContainerView} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../../TreeSelect';
import {TreeSelectItem} from '../../TreeSelectItem';
import type {TreeSelectItemProps} from '../../TreeSelectItem';
import type {TreeSelectProps, TreeSelectRenderContainer, TreeSelectRenderItem} from '../../types';

const reorderArray = <T extends unknown>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

type Item = {
    title: React.ReactNode;
    id: string;
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

    const renderContainer: TreeSelectRenderContainer<CustomDataType> = React.useCallback(
        ({renderItem, visibleFlattenIds, containerRef, id}) => {
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
        },
        [setItems],
    );

    const renderItem: TreeSelectRenderItem<CustomDataType> = React.useCallback(
        ({data, props, index, renderContext: renderContextProps}) => {
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
                            active={snapshot.isDragging}
                        />
                    )}
                </Draggable>
            );
        },
        [],
    );

    return (
        <Flex>
            <TreeSelect
                {...storyProps}
                value={value}
                items={items}
                // you can omit this prop here. If prop `id` passed, TreeSelect would take it by default
                getId={({id}) => id}
                renderControlContent={({someRandomKey}) => ({
                    title: someRandomKey,
                })}
                onItemClick={(_data, {id, isGroup, disabled}) => {
                    if (!isGroup && !disabled) {
                        setValue([id]);
                    }
                }}
                renderContainer={renderContainer}
                renderItem={renderItem}
            />
        </Flex>
    );
};
