import type * as React from 'react';

import type {DraggableProvided} from '@hello-pangea/dnd';

import type {TextInputSize} from '../controls';
import type {QAProps} from '../types';

export type ListSortHandleAlign = 'left' | 'right';

export type ListSortParams = {oldIndex: number; newIndex: number};

export type ListItemData<T> = T & {disabled?: boolean};

type ItemClickHandler<T> = (
    item: ListItemData<T>,
    index: number,
    fromKeyboard?: boolean,
    event?: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
) => void;

export type ListProps<T = unknown> = QAProps & {
    items: ListItemData<T>[];
    className?: string;
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
    onItemClick?: ItemClickHandler<T>;
    onFilterUpdate?: (filter: string) => void;
    onFilterEnd?: ({items}: {items: ListItemData<T>[]}) => void;
    onSortEnd?: (params: ListSortParams) => void;
    autoFocus?: boolean;
    role?: React.AriaRole;
    loading?: boolean;
    onLoadMore?: () => void;
    onChangeActive?: (index?: number) => void;
    id?: string;
    onScrollToItem?: (node: HTMLElement) => boolean;
};

export type ListItemProps<T> = {
    item: ListItemData<T>;
    itemIndex: number;
    active: boolean;
    selected: boolean;
    itemClassName?: string;
    sortable?: boolean;
    sortHandleAlign?: ListSortHandleAlign;
    style?: React.CSSProperties;
    height?: number;
    onActivate: (index?: number) => void;
    renderItem?: ListProps<T>['renderItem'];
    onClick?: ListProps<T>['onItemClick'];
    role?: React.AriaRole;
    listId?: string;
    provided?: DraggableProvided;
    isDragging?: boolean;
};
