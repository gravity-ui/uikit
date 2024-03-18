import type React from 'react';

import type {QAProps} from '../types';
import type {
    KnownItemStructure,
    ListItemId,
    ListItemSize,
    ListItemType,
    ListParsedState,
    ListState,
    RenderItemContext,
    RenderItemProps,
} from '../useList';

export type TreeListRenderItem<T, P extends {} = {}> = (props: {
    data: T;
    // required item props to render
    props: RenderItemProps;
    // internal list context props
    itemState: RenderItemContext;
    index: number;
    renderContext?: P;
}) => React.JSX.Element;

interface ItemClickContext<T> {
    id: ListItemId;
    /**
     * Defined only if item is group
     */
    groupState?: ListParsedState<T>['groupsState'][number];
    itemState: ListParsedState<T>['itemsState'][number];
    isLastItem: boolean;
    disabled: boolean;
    data: T;
}

export type TreeListOnItemClick<T, R = {}> = (ctx: ItemClickContext<T> & R) => void;

export type TreeListRenderContainerProps<T> = ListParsedState<T> &
    Partial<ListState> & {
        id: string;
        size: ListItemSize;
        renderItem(
            id: ListItemId,
            index: number,
            /**
             * Ability to transfer props from an overridden container render
             */
            renderContextProps?: Object,
        ): React.JSX.Element;
        containerRef?: React.RefObject<HTMLDivElement>;
        className?: string;
    };

export type TreeListRenderContainer<T> = (
    props: TreeListRenderContainerProps<T>,
) => React.JSX.Element;

export type TreeListMapItemDataToProps<T> = (item: T) => KnownItemStructure;

export interface TreeListProps<T> extends QAProps, Partial<ListState> {
    /**
     * Control outside list container dom element. For example for keyboard
     */
    containerRef?: React.RefObject<HTMLDivElement>;
    id?: string | undefined;
    className?: string;
    items: ListItemType<T>[];
    multiple?: boolean;
    size?: ListItemSize;
    /**
     * Define custom id depended on item data value to use in controlled state component variant
     */
    getId?(item: T): ListItemId;
    /**
     * Override list item content by you custom node.
     */
    renderItem?: TreeListRenderItem<T>;
    renderContainer?: TreeListRenderContainer<T>;
    /**
     * If you want to disable default behavior pass `disabled` as a value;
     */
    onItemClick?: TreeListOnItemClick<T>;
    mapItemDataToProps: TreeListMapItemDataToProps<T>;
    /**
     * Required for keyboard correct work
     */
    setActiveItemId?(listItemId: ListItemId): void;
}
