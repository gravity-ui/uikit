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
    RenderItemState,
} from '../useList';

export type TreeListRenderItem<T, P extends {} = {}> = (props: {
    data: T;
    // required item props to render
    props: RenderItemState;
    // internal list context props
    itemState: RenderItemContext;
    index: number;
    renderContext?: P;
}) => React.JSX.Element;

interface ItemClickContext {
    id: ListItemId;
    isGroup: boolean;
    isLastItem: boolean;
    disabled: boolean;
}

export type TreeListOnItemClick<T> = (data: T, ctx: ItemClickContext) => void;

export type TreeListRenderContainerProps<T> = ListParsedState<T> &
    Partial<ListState> & {
        id: string;
        size: ListItemSize;
        renderItem(id: ListItemId, index: number, renderContextProps?: Object): React.JSX.Element;
        containerRef?: React.RefObject<HTMLDivElement>;
        className?: string;
    };

export type TreeListRenderContainer<T> = (
    props: TreeListRenderContainerProps<T>,
) => React.JSX.Element;

export type TreeListRenderContent<T> = (item: T) => KnownItemStructure;

interface TreeListBaseProps<T> extends QAProps, Partial<ListState> {
    /**
     * Required for keyboard correct work
     */
    setActiveItemId?(listItemId: ListItemId): void;
    /**
     * Control outside list container dom element. For example for keyboard
     */
    containerRef?: React.RefObject<HTMLDivElement>;
    id?: string | undefined;
    className?: string;
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
     * If you wont to disable default behavior pass `disabled` as a value;
     */
    onItemClick?: TreeListOnItemClick<T>;
    items: ListItemType<T>[];
    multiple?: boolean;
}

type TreeListKnownProps<T> = TreeListBaseProps<T>;
type TreeListUnknownProps<T> = TreeListBaseProps<T> & {
    getItemContent: TreeListRenderContent<T>;
};

export type TreeListProps<T> = T extends KnownItemStructure | string
    ? TreeListKnownProps<T>
    : TreeListUnknownProps<T>;

/**
 * Needed if TreeList component will be used in composition with `T` generic data type
 */
export type TreeListPublicProps<T> = TreeListBaseProps<T> & {
    getItemContent?: TreeListRenderContent<T>;
};
