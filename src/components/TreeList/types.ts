import type React from 'react';

import type {QAProps} from '../types';
import type {
    ListContainerProps,
    ListItemCommonProps,
    ListItemId,
    ListItemListContextProps,
    ListItemSize,
    RenderItemProps,
    UseListResult,
} from '../useList';

export type TreeListRenderItem<T, P extends {} = {}> = (props: {
    id: ListItemId;
    data: T;
    // required item props to render
    props: RenderItemProps;
    // internal list context props
    context: ListItemListContextProps;
    list: UseListResult<T>;
    index: number;
    renderContainerProps?: P;
}) => React.JSX.Element;

export type TreeListContainerProps<T> = ListContainerProps<T> & {
    size: ListItemSize;
};

export type TreeListRenderContainer<T> = (props: TreeListContainerProps<T>) => React.JSX.Element;

export type TreeListMapItemDataToProps<T> = (item: T) => ListItemCommonProps;

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
    mapItemDataToProps: TreeListMapItemDataToProps<T>;
}
