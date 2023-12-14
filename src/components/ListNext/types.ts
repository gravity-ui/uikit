export type ListItemId = string;

export type ListSizeTypes = 's' | 'm' | 'l' | 'xl';

export interface ListItemType<T> {
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
    data: T;
    children?: ListItemType<T>[];
}

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
    selected: boolean;
    disabled: boolean;
};
export type ItemsParsedState = Record<ListItemId, ItemParsedState>;

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

export type KnownItemStructure = {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
};

export type GetItemContent<T> = (
    item: T,
    context: {id: ListItemId; isGroup: boolean; isLastItem: boolean},
) => KnownItemStructure;
