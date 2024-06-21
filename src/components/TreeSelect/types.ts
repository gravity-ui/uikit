import type React from 'react';

import type {PopperPlacement} from '../../hooks/private';
import type {UseOpenProps} from '../../hooks/useSelect/types';
import type {SelectPopupProps} from '../Select/components/SelectPopup/types';
import type {
    TreeListContainerProps,
    TreeListProps,
    TreeListRenderContainer,
    TreeListRenderItem,
} from '../TreeList/types';
import type {ListItemId, ListItemSize, UseListResult} from '../useList';
import type {UseListParsedStateProps} from '../useList/hooks/useListParsedState';

export type TreeSelectRenderControlProps<T> = {
    list: UseListResult<T>;
    open: boolean;
    toggleOpen(): void;
    clearValue(): void;
    ref: React.Ref<HTMLButtonElement>;
    size: ListItemSize;
    value: ListItemId[];
    id: string;
    activeItemId?: ListItemId;
    title?: string;
    hasClear?: boolean;
};

export type TreeSelectRenderItem<T, P extends {} = {}> = TreeListRenderItem<T, P>;
export type TreeSelectRenderContainerProps<T> = TreeListContainerProps<T>;
export type TreeSelectRenderContainer<T> = TreeListRenderContainer<T>;

interface TreeSelectBehavioralProps<T> extends UseListParsedStateProps<T> {
    withExpandedState?: boolean;
    multiple?: boolean;
}

export interface TreeSelectProps<T, P extends {} = {}>
    extends Omit<TreeListProps<T, P>, 'list' | 'renderContainer' | 'multiple'>,
        UseOpenProps,
        TreeSelectBehavioralProps<T> {
    /**
     * Control's title attribute value
     */
    title?: string;
    value?: ListItemId[];
    defaultValue?: ListItemId[] | undefined;
    popupClassName?: string;
    popupWidth?: SelectPopupProps['width'];
    placement?: PopperPlacement;
    width?: 'auto' | 'max' | number;
    containerClassName?: string;
    popupDisablePortal?: boolean;
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
    onUpdate?(value: ListItemId[]): void;
    /**
     * Ability to override custom toggler button
     */
    renderControl?(props: TreeSelectRenderControlProps<T>): React.JSX.Element;
    renderContainer?: TreeSelectRenderContainer<T>;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
}
