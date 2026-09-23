import type * as React from 'react';

import type {ListItemViewCommonProps} from '../ListItemView/ListItemView';
import type {ListItemId, ListItemViewContentType, ListOnItemClick, UseListResult} from '../types';

export type TreeListRenderItem<T, P extends {} = {}> = (props: {
    data: T;
    // required item props to render
    props: ListItemViewCommonProps;
    index: number;
    renderContainerProps?: P;
}) => React.JSX.Element;

export type TreeListContainerProps<T, P extends {} = {}> = {
    id: string;
    className: string;
    list: UseListResult<T>;
    containerRef: React.RefObject<HTMLDivElement | null>;
    renderItem(
        id: ListItemId,
        index: number,
        /**
         * Ability to transfer props from an overridden container render
         */
        renderContainerProps?: P,
    ): React.JSX.Element;
};

export type TreeListRenderContainer<T> = (props: TreeListContainerProps<T>) => React.JSX.Element;

export interface TreeListProps<T, P extends {} = {}> {
    /**
     * Control outside list container dom element. For example for keyboard
     */
    containerRef: React.RefObject<HTMLDivElement | null>;
    list: UseListResult<T>;
    id: string;
    className: string;
    renderItem: TreeListRenderItem<T, P>;
    renderContainer: TreeListRenderContainer<T>;
    onItemClick: ListOnItemClick;
    /**
     * List item `data` to ListItemView `content` props
     */
    mapItemDataToContentProps(item: T): ListItemViewContentType;
}
