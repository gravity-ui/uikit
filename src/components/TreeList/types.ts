import type React from 'react';

import type {QAProps} from '../types';
import type {
    ListItemCommonProps,
    ListItemId,
    ListItemListContextProps,
    ListItemSize,
    RenderItemProps,
    UseList,
} from '../useList';

export type TreeListRenderItem<T, P extends {} = {}> = (props: {
    data: T;
    // required item props to render
    props: RenderItemProps;
    // internal list context props
    context: ListItemListContextProps;
    list: UseList<T>;
    index: number;
    renderContainerProps?: P;
}) => React.JSX.Element;

export type TreeListRenderContainerProps<T> = QAProps & {
    id: string;
    list: UseList<T>;
    /**
     * May be needed for items size if it's virtualized container for example
     */
    size: ListItemSize;
    containerRef?: React.RefObject<HTMLDivElement>;
    className?: string;
    renderItem(
        id: ListItemId,
        index: number,
        /**
         * Ability to transfer props from an overridden container render
         */
        renderContainerProps?: Object,
    ): React.JSX.Element;
};

export type TreeListRenderContainer<T> = (
    props: TreeListRenderContainerProps<T>,
) => React.JSX.Element;

export type TreeListMapItemDataToProps<T> = (item: T) => ListItemCommonProps;

export type TreeListOnItemClickPayload<T> = {id: ListItemId; list: UseList<T>};

type TreeListOnItemClick<T> = (payload: TreeListOnItemClickPayload<T>) => void;

export interface TreeListProps<T, P extends {} = {}> extends QAProps {
    /**
     * Control outside list container dom element. For example for keyboard
     */
    containerRef?: React.RefObject<HTMLDivElement>;
    list: UseList<T>;
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
     * `null` value - if for some reason you don't need default click item behavior
     */
    onItemClick?: null | TreeListOnItemClick<T>;
    /**
     * Don't override default click behavior and add additional logic.
     * Work's if `onItemClick` not `null`
     */
    withItemClick?: TreeListOnItemClick<T>;
    mapItemDataToProps: TreeListMapItemDataToProps<T>;
}
