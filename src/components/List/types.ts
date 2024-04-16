import type React from 'react';

import type {DraggableProvided} from 'react-beautiful-dnd';

import type {TextInputSize} from '../controls';
import type {QAProps} from '../types';
import type {ListItemSize} from '../useList';

export type ListSortHandleAlign = 'left' | 'right';

export type ListSortParams = {oldIndex: number; newIndex: number};

export type ListItemData<T> = T & {disabled?: boolean};

export type ListProps<T = unknown> = QAProps & {
    items: ListItemData<T>[];
    className?: string;
    /**
     * Affects only items selected view
     */
    multiple?: boolean;
    itemClassName?: string;
    itemsClassName?: string;
    filterClassName?: string;
    emptyPlaceholder?: React.ReactNode;
    filterPlaceholder?: string;
    filter?: string;
    activeItemIndex?: number;
    selectedItemIndex?: number | number[];
    itemHeight?: number | ((item: ListItemData<T>, itemIndex: number) => number);
    itemsHeight?: number | ((items: T[]) => number);
    virtualized?: boolean;
    filterable?: boolean;
    sortable?: boolean;
    deactivateOnLeave?: boolean;
    sortHandleAlign?: ListSortHandleAlign;
    size?: TextInputSize;
    renderItem?: (
        item: ListItemData<T>,
        isItemActive: boolean,
        itemIndex: number,
    ) => React.ReactNode;
    filterItem?: (filter: string) => (item: ListItemData<T>) => boolean;
    onItemClick?: (item: ListItemData<T>, index: number, fromKeyboard?: boolean) => void;
    onFilterUpdate?: (filter: string) => void;
    onFilterEnd?: ({items}: {items: ListItemData<T>[]}) => void;
    onSortEnd?: (params: ListSortParams) => void;
    autoFocus?: boolean;
    role?: React.AriaRole;
    loading?: boolean;
    onLoadMore?: () => void;
    onChangeActive?: (index?: number) => void;
    id?: string;
};

export type ListItemProps<T> = {
    item: ListItemData<T>;
    itemIndex: number;
    active: boolean;
    selected: boolean;
    itemClassName?: string;
    /**
     * switch selection view from background to selected icon
     */
    hasSelectionIcon?: boolean;
    sortable?: boolean;
    sortHandleAlign?: ListSortHandleAlign;
    style?: React.CSSProperties;
    onActivate: (index?: number) => void;
    renderItem?: ListProps<T>['renderItem'];
    onClick?: ListProps<T>['onItemClick'];
    role?: React.AriaRole;
    listId?: string;
    provided?: DraggableProvided;
    isDragging?: boolean;
    size?: ListItemSize;
};
