import React from 'react';

import {Grip} from '@gravity-ui/icons';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import type {OnDragEndResponder} from 'react-beautiful-dnd';

import {useUniqId} from '../../../../../hooks';
import {Icon} from '../../../../Icon';
import {TreeSelect} from '../../../../TreeSelect/TreeSelect';
import {TreeSelectItem} from '../../../../TreeSelect/TreeSelectItem';
import type {TreeSelectItemProps} from '../../../../TreeSelect/TreeSelectItem';
import type {RenderContainerType, RenderItem, TreeSelectProps} from '../../../../TreeSelect/types';
import {ListContainerView} from '../../../../useList';

const reorderArray = <T extends unknown>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export type DndTreeSelectItem = TreeSelectItemProps & {
    id: string;
    isDragDisabled?: boolean;
};

export type RenderDndContainer = (container: {
    renderList: () => React.JSX.Element;
}) => React.JSX.Element;

const DEFAULT_RENDER_CONTAINER: RenderDndContainer = ({renderList}) => renderList();

export type DndTreeSelectProps<T extends DndTreeSelectItem> = Omit<
    TreeSelectProps<T>,
    'items' | 'renderContainer' | 'renderItem'
> & {
    items: T[];
    setItems: (_: T[]) => void;
    renderContainer?: RenderDndContainer;
    initialDroppableId?: string;
};

export function DndTreeSelect<T extends DndTreeSelectItem>({
    items,
    setItems,
    initialDroppableId,
    renderContainer: propsRenderContainer = DEFAULT_RENDER_CONTAINER,
    ...treeSelectNativeProps
}: DndTreeSelectProps<T>) {
    const uniqId = useUniqId();

    const renderContainer = React.useCallback<RenderContainerType<DndTreeSelectItem>>(
        ({renderItem, visibleFlattenIds, items: _items, containerRef, id}) => {
            const handleDrugEnd: OnDragEndResponder = ({destination, source}) => {
                if (destination?.index !== undefined && destination?.index !== source.index) {
                    const newItemsOrder = reorderArray(items, source.index, destination.index);

                    setItems(newItemsOrder);
                }
            };

            const visibleFlattenItemList = visibleFlattenIds.map((visibleFlattenId, idx) =>
                renderItem(visibleFlattenId, idx),
            );

            const renderList = () => (
                <ListContainerView ref={containerRef} id={id}>
                    <DragDropContext onDragEnd={handleDrugEnd}>
                        <Droppable droppableId={initialDroppableId ?? uniqId}>
                            {(droppableProvided) => {
                                return (
                                    <div
                                        {...droppableProvided.droppableProps}
                                        ref={droppableProvided.innerRef}
                                    >
                                        {visibleFlattenItemList}
                                        {droppableProvided.placeholder}
                                    </div>
                                );
                            }}
                        </Droppable>
                    </DragDropContext>
                </ListContainerView>
            );

            return propsRenderContainer({renderList});
        },
        [items, setItems, propsRenderContainer],
    );

    const renderDndItem = React.useCallback<RenderItem<DndTreeSelectItem>>(
        (item, state, _, idx) => {
            const endSlot =
                item.endSlot ?? (item.isDragDisabled ? undefined : <Icon data={Grip} size={16} />);

            const commonProps = {
                ...state,
                ...item,
                endSlot,
            };

            return (
                <Draggable
                    draggableId={state.id}
                    index={Number(idx)}
                    key={`item-key-${state.id}`}
                    isDragDisabled={item.isDragDisabled}
                >
                    {(provided, snapshot) => {
                        const style: React.CSSProperties = {
                            ...provided.draggableProps.style,
                        };

                        // not expected offset appears, one way to fix - remove this offsets explicitly
                        if (snapshot.isDragging) {
                            style.left = undefined;
                            style.top = undefined;
                        }

                        return (
                            <TreeSelectItem
                                ref={provided.innerRef}
                                {...commonProps}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={style}
                                active={snapshot.isDragging}
                            />
                        );
                    }}
                </Draggable>
            );
        },
        [],
    );

    return (
        <TreeSelect
            {...treeSelectNativeProps}
            items={items}
            renderContainer={renderContainer}
            renderItem={renderDndItem}
        />
    );
}
