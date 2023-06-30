import type {TextInputSize} from '../controls';
import type {QAProps} from '../types';

export type ListSortHandleAlign = 'left' | 'right';

export type ListSortParams = {oldIndex: number; newIndex: number};

export type ListItemData<T> = T & {disabled?: boolean};

export type ListProps<T = unknown> = QAProps & {
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
    onActivate: (index?: number) => void;
    renderItem?: ListProps<T>['renderItem'];
    onClick?: ListProps<T>['onItemClick'];
};
