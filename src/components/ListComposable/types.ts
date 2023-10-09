import type {QAProps} from '../types';

export type ListItemId = string;
/**
 * Default fallback id type.
 * The core idea is to store original index and and nested children index
 */
export type GroupedId = string;

export interface ListItemType<T = unknown> {
    /**
     * Required if you want to control list state from internal place.
     * For example to control expanded groups state
     */
    id?: string;
    data: T;
    children?: ListItemType<T>[];
}
export type GroupParsedState = {
    childrenCount: number;
};

export type ItemParsedState = {
    indentation: number;
};
export type ParsedState<T = unknown> = {
    /**
     * stored internal meta info about item
     * Note: Groups are also items
     */
    itemsState: Record<ListItemId, ItemParsedState>;
    /**
     * Normalized original data
     */
    byId: Record<ListItemId, T>;
    /**
     * Re
     */
    groupsState: Record<ListItemId, GroupParsedState>;
};

export type ListSizeTypes = 's' | 'm' | 'l' | 'xl';

export interface ListItemBaseData {
    title: string;
    subtitle?: string;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
}

export interface ListItemRendererProps<T> {
    id: number;
    item: T;
}

export interface ListContainerRenderProps<T> {
    items: T[];
    getItemSize(index: number): number;
    className?: string;
    children(props: ListItemRendererProps<T>): React.ReactNode;
}

export type OnListItemClick<T> = (
    item: ListItemType<T>['data'],
    itemId: ListItemId,
    fromKeyboard?: boolean,
) => void;

export type SetActiveItem = (id: ListItemId | null) => void;

export type ExpandedState = Record<ListItemId, boolean>;

export type SetGroupState = (value: (currentState: ExpandedState) => ExpandedState) => void;

export interface RenderListItemViewProps extends QAProps {
    /**
     * @default `m`
     */
    size: ListSizeTypes;
    isGroup: boolean;
    selected: boolean;
    active: boolean;
    disabled: boolean;
    /**
     * By default hovered elements has active styles. You can switch off this behavior
     */
    activeOnHover: boolean;
    indentation: number;
    onClick?(): void;
    title: string | React.ReactNode;
    subtitle?: string;
    leftSlot: React.ReactNode;
    rightSlot: React.ReactNode;
}

export type ListContextType<T> = ParsedState<T> & {
    activeItem: ListItemId | null;
    size: ListSizeTypes;
    order: ListItemId[];
    handleKeyDown(e: React.KeyboardEvent<HTMLUListElement | HTMLDivElement>): void;
    containerRef: React.RefObject<HTMLDivElement>;
    listRef: React.RefObject<HTMLUListElement>;
    refFilter: React.RefObject<HTMLInputElement>;
    expandedState: ExpandedState;
    setActiveItem: SetActiveItem;
    setSelected(fn: (selected: Record<ListItemId, boolean>) => Record<ListItemId, boolean>): void;
    onItemClick?(id: ListItemId, fromKeyboard?: boolean): void;
    onGroupItemClick(id: ListItemId, fromKeyboard?: boolean): void;
    setGroupState: SetGroupState;
    itemHandlers(id: ListItemId): {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };
    selected: Record<ListItemId, boolean>;
    formatInternalItems(formatFn?: (originalItems: ListItemType<T>[]) => ListItemType<T>[]): void;
    filter: string;
    onFilterChange(value: string): void;
    disabled: Record<ListItemId, boolean>;
    setDisabled(fn: (state: Record<ListItemId, boolean>) => Record<ListItemId, boolean>): void;
};

export interface ListProviderProps<T> {
    items: ListItemType<T>[];
    size?: ListSizeTypes;
    children: React.ReactNode;
    onItemClick?: OnListItemClick<T>;
    onGroupItemClick?: OnListItemClick<T>;
    expandedState?: Record<string, boolean>;
    initialActiveItemId?: string;
    /**
     * Ability to control items selections from outside
     */
    selected?: Record<ListItemId, boolean>;
    /**
     * Needs than you try to use `selected` list state
     */
    selectable?: 'single' | 'multiple';
    /**
     * Ability to control filter input value from outside
     */
    filter?: string;
    /**
     * Ability to control disabled items state from outside
     */
    disabled?: Record<ListItemId, boolean>;
}
