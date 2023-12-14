import React from 'react';

import type {TreeSelectProps} from 'src/unstable';

import type {GetItemContent} from '../../types';
import {ListGroupItemView} from '../ListGroupItemView/ListGroupItemView';
import {ListItemView} from '../ListItemView/ListItemView';

import type {RenderItem, RenderItemContext} from './types';

interface BuilderProps<T> extends Pick<TreeSelectProps<T>, 'groupsBehavior' | 'groupAction'> {
    itemWrapper?(
        getOriginalNode: () => React.JSX.Element,
        context: RenderItemContext,
    ): React.JSX.Element;
    /**
     * Known how map data (T) to list item props
     */
    getItemContent: GetItemContent<T>;
}

export const defaultItemRendererBuilder = function <T>({
    groupsBehavior = 'expandable',
    groupAction = 'items-count',
    getItemContent,
    itemWrapper,
}: BuilderProps<T>): RenderItem<T> {
    return (item, state, {isLastItem, itemState, groupState}) => {
        const itemContent = getItemContent(item, {
            id: state.id,
            isGroup: Boolean(groupState),
            isLastItem,
        });

        const getNode = () =>
            groupState ? (
                <ListGroupItemView
                    {...itemState}
                    {...state}
                    defaultExpandIcon={groupsBehavior === 'expandable'}
                    childrenCount={
                        groupAction === 'items-count' ? groupState.childrenIds.length : undefined
                    }
                    selectable={groupsBehavior === 'selectable'}
                    activeOnHover={groupsBehavior === 'selectable'}
                    {...itemContent}
                    role="treeitem"
                />
            ) : (
                <ListItemView {...itemState} {...state} {...itemContent} role="treeitem" />
            );

        const node = itemWrapper
            ? itemWrapper(getNode, {isLastItem, itemState, groupState})
            : getNode();

        return node;
    };
};
