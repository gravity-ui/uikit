'use client';

import React from 'react';

import {useUniqId} from '../../hooks';
import {
    ListContainer,
    ListItemView,
    getItemRenderState,
    useListItemClick,
    useListKeydown,
} from '../useList';
import {block} from '../utils/cn';

import type {TreeListContainerProps, TreeListOnItemClick, TreeListProps} from './types';

const b = block('tree-list');

export const TreeList = <T,>({
    qa,
    id,
    size = 'm',
    className,
    list,
    renderItem: propsRenderItem,
    renderContainer = ListContainer,
    onItemClick: propsOnItemClick,
    multiple,
    containerRef: propsContainerRef,
    withItemClick,
    mapItemDataToProps,
}: TreeListProps<T>) => {
    const uniqId = useUniqId();
    const treeListId = id ?? uniqId;
    const containerRefLocal = React.useRef<HTMLDivElement>(null);
    const containerRef = propsContainerRef ?? containerRefLocal;

    const defaultOnItemClick = useListItemClick({list, multiple});

    const onItemClick = React.useMemo(() => {
        if (propsOnItemClick === null) {
            return undefined;
        }

        const onClick = propsOnItemClick ?? defaultOnItemClick;

        const handler: TreeListOnItemClick<T> = (payload) => {
            onClick(payload);
            withItemClick?.(payload);
        };

        return handler;
    }, [defaultOnItemClick, propsOnItemClick, withItemClick]);

    useListKeydown({
        containerRef,
        onItemClick,
        list,
    });

    const renderItem: TreeListContainerProps<T>['renderItem'] = (
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
            onItemClick,
            list,
        });

        if (propsRenderItem) {
            return propsRenderItem({
                data: renderState.data,
                props: renderState.props,
                context: renderState.context,
                index,
                renderContainerProps,
                list,
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
        list,
        renderItem,
    });
};
