import type * as React from 'react';

import type {QAProps} from '../types';
import type {
    ListContainerProps,
    ListItemId,
    ListItemListContextProps,
    ListItemSize,
    ListItemViewCommonProps,
    ListItemViewContentType,
    UseListResult,
} from '../useList';

export type TreeListRenderItem<T, P extends {} = {}> = (props: {
    id: ListItemId;
    data: T;
    // required item props to render
    props: ListItemViewCommonProps;
    // internal list context props
    context: ListItemListContextProps;
    list: UseListResult<T>;
    index: number;
    renderContainerProps?: P;
}) => React.JSX.Element;

export type TreeListContainerProps<T, P extends {} = {}> = ListContainerProps<T, P> & {
    size: ListItemSize;
};

export type TreeListRenderContainer<T> = (props: TreeListContainerProps<T>) => React.JSX.Element;

export type TreeListMapItemDataToContentProps<T> = (item: T) => ListItemViewContentType;

export type TreeListOnItemClickPayload<T> = {id: ListItemId; list: UseListResult<T>};

export type TreeListOnItemClick<T> = (
    payload: TreeListOnItemClickPayload<T>,
    e?: React.SyntheticEvent,
) => void;

export interface TreeListProps<T, P extends {} = {}> extends QAProps {
    /**
     * Control outside list container dom element. For example for keyboard
     */
    containerRef?: React.RefObject<HTMLDivElement>;
    list: UseListResult<T>;
    id?: string | undefined;
    className?: string;
    multiple?: boolean;
    size?: ListItemSize;
    /**
     * Override list item content by you custom node.
     */
    renderItem?: TreeListRenderItem<T, P>;
    renderContainer?: TreeListRenderContainer<T>;
    /**
     * `null` - disable default click handler
     */
    onItemClick?: null | TreeListOnItemClick<T>;
    /**
     * List item `data` to ListItemView `content` props
     */
    mapItemDataToContentProps: TreeListMapItemDataToContentProps<T>;
}
