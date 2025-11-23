'use client';

import * as React from 'react';

import {useUniqId} from '../../hooks';
import {
    ListContainer,
    ListItemView,
    getItemRenderState,
    getListItemClickHandler,
    useListKeydown,
} from '../useList';
import type {ListOnItemClick} from '../useList';
import {block} from '../utils/cn';

import type {TreeListContainerProps, TreeListProps} from './types';

const b = block('tree-list');

export const TreeList = <T, P extends {} = {}>({
    qa,
    id,
    size = 'm',
    className,
    list,
    multiple,
    containerRef: propsContainerRef,
    renderItem: propsRenderItem,
    renderContainer = ListContainer,
    onItemClick: propsOnItemClick,
    mapItemDataToContentProps,
}: TreeListProps<T, P>) => {
    const uniqId = useUniqId();
    const treeListId = id ?? uniqId;
    const containerRefLocal = React.useRef<HTMLDivElement>(null);
    const containerRef = propsContainerRef ?? containerRefLocal;

    const onItemClick = React.useMemo(() => {
        if (propsOnItemClick === null) {
            return undefined;
        }

        const handler: ListOnItemClick = (arg, e) => {
            const payload = {id: arg.id, list};

            if (propsOnItemClick) {
                propsOnItemClick?.(payload, e);
            } else {
                const baseOnClick = getListItemClickHandler({list, multiple});

                baseOnClick(payload, e);
            }
        };

        return handler;
    }, [propsOnItemClick, list, multiple]);

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
        const renderState = getItemRenderState<T>({
            qa,
            id: itemId,
            size,
            multiple,
            mapItemDataToContentProps,
            onItemClick,
            list,
        });

        if (propsRenderItem) {
            return propsRenderItem({
                id: itemId,
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

    // not JSX decl here is from weird `@hello-pangea/dnd` render bug
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
