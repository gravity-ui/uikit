import type React from 'react';

import type {PopperPlacement} from '../../hooks/private';
import type {SelectPopupProps} from '../Select/components/SelectPopup/types';
import type {
    TreeListMapItemDataToProps,
    TreeListOnItemClick,
    TreeListRenderContainer,
    TreeListRenderContainerProps,
} from '../TreeList/types';
import type {QAProps} from '../types';
import type {
    ListItemId,
    ListItemSize,
    ListItemType,
    ListState,
    RenderItemContext,
    RenderItemProps,
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
    title?: string;
};

export type TreeSelectRenderItem<T, P extends {} = {}> = (props: {
    data: T;
    // required item props to render
    props: RenderItemProps;
    // internal list context props
    context: RenderItemContext;
    index: number;
    renderContainerProps?: P;
}) => React.JSX.Element;

export type TreeSelectRenderContainerProps<T> = TreeListRenderContainerProps<T>;
export type TreeSelectRenderContainer<T> = TreeListRenderContainer<T>;

export interface TreeSelectProps<T, P extends {} = {}>
    extends QAProps,
        Partial<Omit<ListState, 'selectedById'>> {
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
    defaultGroupsExpanded?: boolean;
    /**
     * Use slots if you don't need access to internal TreeListState.
     * In other situations use `renderContainer` method
     */
    slotAfterListBody?: React.ReactNode;
    items: ListItemType<T>[];
    /**
     * Define custom id depended on item data value to use in controlled state component variant
     */
    getItemId?(item: T): ListItemId;
    /**
     * Ability to override custom toggler btn
     */
    renderControl?(props: TreeSelectRenderControlProps): React.JSX.Element;
    /**
     * Override list item content by you custom node.
     */
    renderItem?: TreeSelectRenderItem<T, P>;
    onClose?(): void;
    onUpdate?(value: ListItemId[], selectedItems: T[]): void;
    onOpenChange?(open: boolean): void;
    renderContainer?: TreeSelectRenderContainer<T>;
    onItemClick?: TreeListOnItemClick<T, () => void>;
    /**
     * Map item data to view props
     */
    mapItemDataToProps: TreeListMapItemDataToProps<T>;
    setActiveItemId?(listItemId?: ListItemId): void;
    /**
     * Control's title attribute value
     */
    title?: string;
}
