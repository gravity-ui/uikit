import type React from 'react';

import type {PopperPlacement} from '../../hooks/private';
import type {SelectPopupProps} from '../Select/components/SelectPopup/types';
import type {
    TreeListOnItemClick,
    TreeListProps,
    TreeListRenderContainer,
    TreeListRenderContainerProps,
    TreeListRenderItem,
} from '../TreeList/types';
import type {ListItemId, ListItemSize} from '../useList';

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

export type TreeSelectRenderItem<T, P extends {} = {}> = TreeListRenderItem<T, P>;
export type TreeSelectRenderContainerProps<T> = TreeListRenderContainerProps<T>;
export type TreeSelectRenderContainer<T> = TreeListRenderContainer<T>;
export type TreeSelectDefaultOnClickCb = (args?: {defaultSelectionLogic?: false}) => void;
export type TreeSelectOnItemClick<T> = TreeListOnItemClick<T, TreeSelectDefaultOnClickCb>;

export interface TreeSelectProps<T, P extends {} = {}>
    extends Omit<TreeListProps<T>, 'onItemClick' | 'selectedById' | 'renderItem'> {
    value?: ListItemId[];
    defaultOpen?: boolean;
    defaultValue?: ListItemId[];
    open?: boolean;
    popupClassName?: string;
    popupWidth?: SelectPopupProps['width'];
    placement?: PopperPlacement;
    width?: 'auto' | 'max' | number;
    containerClassName?: string;
    popupDisablePortal?: boolean;
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
    /**
     * You can user default onItemClick handles as second argument here
     * ```tsx
     * onItemClick={(ctx, cb) => {
     *  // do something with item click context here
     *
     *  cb(); // call default on item click handler
     * }}
     * ```
     */
    onItemClick?: TreeSelectOnItemClick<T>;
    /**
     * Control's title attribute value
     */
    title?: string;
}
