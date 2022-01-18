import type {ReactNode} from 'react';
import type {TextInputSize} from '../TextInput';

export type ListSortHandleAlign = 'left' | 'right';

export type ListSortParams = {oldIndex: number; newIndex: number};

export type ListItemData<T> = T & {disabled?: boolean};

export type ListProps<T = unknown> = {
    items: ListItemData<T>[];
    className?: string;
    itemClassName?: string;
    itemsClassName?: string;
    filterClassName?: string;
    emptyPlaceholder?: string;
    filterPlaceholder?: string;
    filter?: string;
    activeItemIndex?: number;
    selectedItemIndex?: number;
    itemHeight?: number | ((item: ListItemData<T>) => number);
    itemsHeight?: number | ((items: T[]) => number);
    virtualized?: boolean;
    filterable?: boolean;
    sortable?: boolean;
    deactivateOnLeave?: boolean;
    sortHandleAlign?: ListSortHandleAlign;
    size?: TextInputSize;
    renderItem?: (item: ListItemData<T>, isItemActive: boolean, itemIndex: number) => ReactNode;
    filterItem?: (filter: string) => (item: ListItemData<T>) => boolean;
    onItemClick?: (item: ListItemData<T>, index: number, fromKeyboard?: boolean) => void;
    onFilterUpdate?: (filter: string) => void;
    onFilterEnd?: ({items}: {items: ListItemData<T>[]}) => void;
    onSortEnd?: (params: ListSortParams) => void;
};
