'use client';

import type * as React from 'react';

import {block} from '../../../../../../utils/cn';
import {useListKeydown} from '../useListKeydown';

import type {TreeListContainerProps, TreeListProps} from './types';

const b = block('tree-list-legacy');

export const TreeList = <T, P extends {} = {}>({
    id,
    className,
    list,
    containerRef,
    renderItem: propsRenderItem,
    renderContainer,
    onItemClick,
    mapItemDataToContentProps,
}: TreeListProps<T, P>) => {
    useListKeydown({
        containerRef,
        onItemClick,
        list,
    });

    const renderItem: TreeListContainerProps<T, P>['renderItem'] = (
        itemId,
        index,
        renderContainerProps,
    ) => {
        return propsRenderItem({
            data: list.structure.itemsById[itemId],
            props: {
                id: itemId,
                selected: Boolean(list.state.selectedById[itemId]),
                active: itemId === list.state.activeItemId,
                onClick: (e: React.SyntheticEvent) => onItemClick({id: itemId}, e),
                selectionViewType: 'multiple',
                content: mapItemDataToContentProps(list.structure.itemsById[itemId]),
            },
            index,
            renderContainerProps,
        });
    };

    // not JSX decl here is from weird `@hello-pangea/dnd` render bug
    return renderContainer({
        id: `list-${id}`,
        containerRef,
        className: b(null, className),
        list,
        renderItem,
    });
};
