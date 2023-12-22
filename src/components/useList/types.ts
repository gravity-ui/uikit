export type ListItemId = string;

export type ListSizeTypes = 's' | 'm' | 'l' | 'xl';
interface ListItemInitialProps {
    /**
     * If you need to control the state from the outside,
     * you can set a unique id for each element
     */
    id?: string;
    /**
     * Initial disabled item state
     */
    disabled?: boolean;
    /**
     * Initial selected item state
     */
    selected?: boolean;
    /**
     * Default expanded state if group
     */
    expanded?: boolean;
}

export type ListFlattenItemType<T> = T & ListItemInitialProps;

export interface ListTreeItemType<T> extends ListItemInitialProps {
    data: T;
    children?: ListTreeItemType<T>[];
}

export type ListItemType<T> = ListTreeItemType<T> | ListFlattenItemType<T>;

export type GroupParsedState = {
    childrenIds: ListItemId[];
    // initial group item state
    expanded?: boolean;
};

export type ListGroupState = Record<ListItemId, GroupParsedState>;

export type ItemParsedState = {
    parentId?: ListItemId;
    indentation: number;
    // initial item state
    selected?: boolean;
    disabled?: boolean;
};
export type ItemsParsedState = Record<ListItemId, ItemParsedState>;

export type KnownItemStructure = {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
};

export interface OverrideItemContext {
    id: ListItemId;
    isGroup: boolean;
    disabled: boolean;
    isLastItem: boolean;
}

export type RenderItemContext = {
    itemState: ItemParsedState;
    /**
     * Exists if item is group
     */
    groupState?: GroupParsedState;
    isLastItem: boolean;
};

export type RenderItemState = {
    size: ListSizeTypes;
    id: ListItemId;
    onClick?(): void;
    selected: boolean;
    disabled: boolean;
    expanded?: boolean;
    active: boolean;
    indentation: number;
    selectable?: boolean;
};

export type ParsedState<T> = {
    /**
     * Stored internal meta info about item
     * Note: Groups are also items
     */
    itemsState: ItemsParsedState;
    /**
     * Normalized original data
     */
    byId: Record<ListItemId, T>;
    /**
     * Stored info about group items:
     */
    groupsState: ListGroupState;
    lastItemId: ListItemId;
};

export type ListState = {
    disabledById: Record<ListItemId, boolean>;
    selectedById: Record<ListItemId, boolean>;
    expandedById: Record<ListItemId, boolean>;
    activeItemId?: ListItemId;
};

export type ListParsedState<T> = ParsedState<T> & {
    items: ListItemType<T>[];
    flattenIdsOrder: ListItemId[];
};
