import React from 'react';

import {useUniqId} from '../../hooks';
import {ListItemView, getItemRenderState, useList, useListKeydown} from '../useList';
import type {ListItemId} from '../useList';
import {block} from '../utils/cn';

import {TreeListContainer} from './components/TreeListContainer/TreeListContainer';
import type {TreeListProps, TreeListRenderContainerProps} from './types';

const b = block('tree-list');

export const TreeList = <T,>({
    qa,
    id,
    size = 'm',
    items,
    className,
    expandedById,
    disabledById,
    activeItemId,
    selectedById,
    defaultGroupsExpanded = true,
    getId,
    renderItem: propsRenderItem,
    renderContainer = TreeListContainer,
    onItemClick,
    multiple,
    setActiveItemId,
    containerRef: propsContainerRef,
    mapItemDataToProps,
}: TreeListProps<T>) => {
    const uniqId = useUniqId();
    const treeListId = id ?? uniqId;
    const containerRefLocal = React.useRef<HTMLDivElement>(null);
    const containerRef = propsContainerRef ?? containerRefLocal;

    const listParsedState = useList({
        items,
        getId,
        expandedById,
        disabledById,
        activeItemId,
        selectedById,
    });

    const handleItemClick = React.useMemo(() => {
        if (onItemClick) {
            return (listItemId: ListItemId) => {
                onItemClick?.({
                    id: listItemId,
                    index: listParsedState.idToFlattenIndex[listItemId],
                    data: listParsedState.itemsById[listItemId],
                    expanded:
                        // eslint-disable-next-line no-nested-ternary
                        expandedById && listItemId in expandedById
                            ? expandedById[listItemId]
                            : listItemId in listParsedState.initialState.expandedById
                              ? listParsedState.initialState.expandedById[listItemId]
                              : defaultGroupsExpanded,
                    disabled: disabledById
                        ? Boolean(disabledById[listItemId])
                        : Boolean(listParsedState.initialState.disabledById[listItemId]),
                    selected: selectedById
                        ? Boolean(selectedById[listItemId])
                        : Boolean(listParsedState.initialState.selectedById[listItemId]),

                    context: {
                        isLastItem:
                            listParsedState.visibleFlattenIds[
                                listParsedState.visibleFlattenIds.length - 1
                            ] === listItemId,
                        groupState: listParsedState.groupsState[listItemId],
                        itemState: listParsedState.itemsState[listItemId],
                    },
                });
            };
        }

        return undefined;
    }, [
        defaultGroupsExpanded,
        disabledById,
        expandedById,
        selectedById,
        listParsedState,
        onItemClick,
    ]);

    useListKeydown({
        containerRef,
        onItemClick: handleItemClick,
        ...listParsedState,
        activeItemId,
        disabledById,
        setActiveItemId,
    });

    const renderItem: TreeListRenderContainerProps<T>['renderItem'] = (
        itemId,
        index,
        renderContainerProps,
    ) => {
        const renderState = getItemRenderState({
            qa,
            id: itemId,
            size,
            multiple,
            mapItemDataToProps,
            onItemClick: handleItemClick,
            ...listParsedState,
            expandedById,
            disabledById,
            activeItemId,
            selectedById,
            defaultExpanded: defaultGroupsExpanded,
        });

        if (propsRenderItem) {
            return propsRenderItem({
                data: renderState.data,
                props: renderState.props,
                context: renderState.context,
                index,
                renderContainerProps,
            });
        }

        return <ListItemView {...renderState.props} {...renderContainerProps} />;
    };

    // not JSX decl here is from weird `react-beautiful-dnd` render bug
    return renderContainer({
        qa,
        id: `list-${treeListId}`,
        size,
        containerRef,
        className: b(null, className),
        ...listParsedState,
        expandedById,
        disabledById,
        activeItemId,
        selectedById,
        renderItem,
    });
};
