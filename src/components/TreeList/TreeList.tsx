import React from 'react';

import {useUniqId} from '../../hooks';
import {
    ListItemView,
    getItemRenderState,
    isKnownStructureGuard,
    useList,
    useListKeydown,
} from '../useList';
import type {ListItemId} from '../useList';
import {block} from '../utils/cn';

import {TreeListContainer} from './components/TreeListContainer/TreeListContainer';
import type {TreeListProps, TreeListRenderContainerProps} from './types';

import './TreeList.scss';

const b = block('tree-list');

export const TreeList = <T,>(props: TreeListProps<T>) => {
    const {
        id,
        size = 'm',
        items,
        className,
        expandedById,
        disabledById,
        activeItemId,
        selectedById,
        getId,
        renderItem: propsRenderItem,
        renderContainer = TreeListContainer,
        onItemClick,
        multiple,
        setActiveItemId,
        containerRef: propsContainerRef,
    } = props; // do not use props spread. Pass props explicitly

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

    const handleItemClick = React.useCallback(
        (listItemId: ListItemId) => {
            onItemClick?.({
                id: listItemId,
                data: listParsedState.itemsById[listItemId],
                isGroup: listItemId in listParsedState.groupsState,
                disabled: disabledById
                    ? Boolean(disabledById[listItemId])
                    : Boolean(listParsedState.initialState.disabledById[listItemId]),
                isLastItem:
                    listParsedState.visibleFlattenIds[
                        listParsedState.visibleFlattenIds.length - 1
                    ] === listItemId,
            });
        },
        [
            disabledById,
            listParsedState.groupsState,
            listParsedState.initialState.disabledById,
            listParsedState.itemsById,
            listParsedState.visibleFlattenIds,
            onItemClick,
        ],
    );

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
        renderContextProps,
    ) => {
        const renderState = getItemRenderState({
            id: itemId,
            size,
            onItemClick: handleItemClick,
            ...listParsedState,
            ...{expandedById, disabledById, activeItemId, selectedById},
        });

        // assign components scope logic
        renderState.props.hasSelectionIcon = Boolean(multiple) && !renderState.context.groupState;

        if (propsRenderItem) {
            return propsRenderItem({
                data: renderState.data,
                props: renderState.props,
                itemState: renderState.context,
                index,
                renderContext: renderContextProps,
            });
        }

        const itemData = listParsedState.itemsById[itemId];

        return (
            <ListItemView
                {...renderState.props}
                // eslint-disable-next-line no-nested-ternary
                {...('getItemContent' in props
                    ? props.getItemContent(itemData)
                    : isKnownStructureGuard(itemData)
                      ? itemData
                      : {title: itemData as string})}
                {...renderContextProps}
            />
        );
    };

    // not JSX decl here is from weird `react-beautiful-dnd` render bug
    return renderContainer({
        id: `list-${treeListId}`,
        size,
        containerRef,
        className: b(null, className),
        ...listParsedState,
        ...{expandedById, disabledById, activeItemId, selectedById},
        renderItem,
    });
};
