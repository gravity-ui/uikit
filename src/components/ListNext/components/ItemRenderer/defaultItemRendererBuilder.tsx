import React from 'react';

import type {TreeSelectProps} from 'src/unstable';

import type {GetItemContent, RenderItem, RenderItemContext} from '../../types';
import {ListGroupItemView} from '../ListGroupItemView/ListGroupItemView';
import {ListItemView} from '../ListItemView/ListItemView';

interface BuilderProps<T> extends Pick<TreeSelectProps<T>, 'groupsBehavior' | 'groupAction'> {
    itemWrapper?(node: React.JSX.Element, context: RenderItemContext): React.JSX.Element;
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

        let node: React.ReactNode = groupState ? (
            <ListGroupItemView
                {...itemState}
                {...state}
                defaultExpandIcon={groupsBehavior === 'expandable'}
                childrenCount={groupAction === 'items-count' ? groupState.childrenCount : undefined}
                selectable={groupsBehavior === 'selectable'}
                activeOnHover={groupsBehavior === 'selectable'}
                {...itemContent}
                role="treeitem"
            />
        ) : (
            <ListItemView {...itemState} {...state} {...itemContent} role="treeitem" />
        );

        if (itemWrapper) {
            node = itemWrapper(node, {isLastItem, itemState, groupState});
        }

        return node;
    };
};
