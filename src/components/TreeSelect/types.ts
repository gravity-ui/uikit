import type React from 'react';

import type {PopperPlacement} from '../../hooks/private';
import type {SelectPopupProps} from '../Select/components/SelectPopup/types';
import type {
    TreeListRenderContainer,
    TreeListRenderContainerProps,
    TreeListRenderContent,
} from '../TreeList/types';
import type {QAProps} from '../types';
import type {
    KnownItemStructure,
    ListItemId,
    ListItemSize,
    ListItemType,
    ListState,
    OverrideItemContext,
    RenderItemContext,
    RenderItemState,
} from '../useList';

export type TreeSelectRenderControlProps = {
    open: boolean;
    toggleOpen(): void;
    clearValue(): void;
    ref: React.Ref<HTMLButtonElement>;
    size: ListItemSize;
    value: ListItemId[];
    id: string;
    activeItemId?: ListItemId;
};

export type TreeSelectRenderItem<T, P extends {} = {}> = (props: {
    data: T;
    // required item props to render
    props: RenderItemState;
    // internal list context props
    itemState: RenderItemContext;
    index: number;
    renderContext?: P;
}) => React.JSX.Element;

export type TreeSelectRenderContainerProps<T> = TreeListRenderContainerProps<T>;
export type TreeSelectRenderContainer<T> = TreeListRenderContainer<T>;

interface TreeSelectBaseProps<T> extends QAProps, Partial<Omit<ListState, 'selectedById'>> {
    value?: ListItemId[];
    defaultOpen?: boolean;
    defaultValue?: ListItemId[];
    open?: boolean;
    id?: string | undefined;
    popupClassName?: string;
    popupWidth?: SelectPopupProps['width'];
    placement?: PopperPlacement;
    width?: 'auto' | 'max' | number;
    className?: string;
    containerRef?: React.RefObject<HTMLDivElement>;
    containerClassName?: string;
    popupDisablePortal?: boolean;
    multiple?: boolean;
    /**
     * The ability to set the default behavior for group elements
     *
     * - `expandable`. Click on group item will be produce internal `expanded` state toggle
     * - `selectable`. Click on group item will be produce internal `selected` state toggle
     *
     * @default - 'expandable
     */
    groupsBehavior?: 'expandable' | 'selectable';
    /**
     * List popup has fixes size - 6px. This prop is used to control only list item size view.
     * To override popup border radius use `popupClassName` class
     */
    size: ListItemSize;
    /**
     * Use slots if you don't need access to internal TreeListState.
     * In other situations use `renderContainer` method
     */
    slotBeforeListBody?: React.ReactNode;
    /**
     * Use slots if you don't need access to internal TreeListState.
     * In other situations use `renderContainer` method
     */
    slotAfterListBody?: React.ReactNode;
    /**
     * Define custom id depended on item data value to use in controlled state component variant
     */
    getId?(item: T): ListItemId;
    /**
     * Ability to override custom toggler btn
     */
    renderControl?(props: TreeSelectRenderControlProps): React.JSX.Element;
    /**
     * Override list item content by you custom node.
     */
    renderItem?: TreeSelectRenderItem<T>;
    onClose?(): void;
    onUpdate?(value: ListItemId[], selectedItems: T[]): void;
    onOpenChange?(open: boolean): void;
    renderContainer?: TreeSelectRenderContainer<T>;
    onItemClick?: (ctx: OverrideItemContext<T>) => void;
    items: ListItemType<T>[];
}

type TreeSelectKnownProps<T> = TreeSelectBaseProps<T>;
type TreeSelectUnknownProps<T> = TreeSelectBaseProps<T> & {
    getItemContent: TreeListRenderContent<T>;
};

export type TreeSelectProps<T> = T extends KnownItemStructure | string
    ? TreeSelectKnownProps<T>
    : TreeSelectUnknownProps<T>;

export type TreeSelectPublicProps<T> = TreeSelectBaseProps<T> & {
    getItemContent?: TreeListRenderContent<T>;
};
