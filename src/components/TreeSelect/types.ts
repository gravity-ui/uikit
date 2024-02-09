import type React from 'react';

import type {QAProps} from '../types';
import type {
    KnownItemStructure,
    ListItemId,
    ListItemSize,
    ListItemType,
    ListParsedState,
    ListState,
    OverrideItemContext,
    RenderItemContext,
    RenderItemState,
} from '../useList';

export type RenderControlProps = {
    open: boolean;
    toggleOpen(): void;
    clearValue(): void;
    ref: React.Ref<HTMLButtonElement>;
    size: ListItemSize;
    value: ListItemId[];
    id: string;
    activeItemId?: ListItemId;
};

export type RenderItem<T> = (
    item: T,
    // required item props to render
    state: RenderItemState,
    // internal list context props
    context: RenderItemContext,
    index: number,
    renderContextProps?: Object,
) => React.JSX.Element;

export type RenderContainerProps<T> = ListParsedState<T> &
    ListState & {
        id: string;
        size: ListItemSize;
        renderItem(id: ListItemId, index: number, renderContextProps?: Object): React.JSX.Element;
        containerRef: React.RefObject<HTMLDivElement>;
        className?: string;
    };

export type RenderTreeListContainer<T> = (props: RenderContainerProps<T>) => React.JSX.Element;

interface TreeSelectBaseProps<T> extends QAProps, Partial<Omit<ListState, 'selectedById'>> {
    value?: ListItemId[];
    defaultOpen?: boolean;
    defaultValue?: ListItemId[];
    open?: boolean;
    id?: string | undefined;
    popupClassName?: string;
    popupWidth?: number;
    width?: 'auto' | 'max' | number;
    className?: string;
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
    renderControl?(props: RenderControlProps): React.JSX.Element;
    /**
     * Override list item content by you custom node.
     */
    renderItem?: RenderItem<T>;
    onClose?(): void;
    onUpdate?(value: ListItemId[], selectedItems: T[]): void;
    onOpenChange?(open: boolean): void;
    renderContainer?: RenderTreeListContainer<T>;
    /**
     * If you wont to disable default behavior pass `disabled` as a value;
     */
    onItemClick?:
        | 'disabled'
        | ((data: T, content: OverrideItemContext, defaultClickCallback: () => void) => void);
}

type TreeSelectKnownProps<T> = TreeSelectBaseProps<T> & {
    items: ListItemType<T>[];
};
type TreeSelectUnknownProps<T> = TreeSelectBaseProps<T> & {
    items: ListItemType<T>[];
    renderControlContent(item: T): KnownItemStructure;
};

export type TreeSelectProps<T> = T extends KnownItemStructure | string
    ? TreeSelectKnownProps<T>
    : TreeSelectUnknownProps<T>;
