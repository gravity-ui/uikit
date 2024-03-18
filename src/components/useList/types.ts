export type ListItemId = string;

export type ListItemSize = 's' | 'm' | 'l' | 'xl';
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

export type ListFlattenItemType<T> = T extends {} ? T & ListItemInitialProps : T;

export interface ListTreeItemType<T> extends ListItemInitialProps {
    data: T;
    children?: ListTreeItemType<T>[];
}

export type ListItemType<T> = ListTreeItemType<T> | ListFlattenItemType<T>;

export type GroupParsedState = {
    childrenIds: ListItemId[];
};

export type ItemState = {
    parentId?: ListItemId;
    indentation: number;
};

export type KnownItemStructure = {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
};

export type RenderItemContext = {
    /**
     * optional, because ids may be skipped in the flatten order list,
     * depending on the expanded state
     */
    visibleFlattenIndex?: number;
    itemState: ItemState;
    /**
     * Exists if item is group
     */
    groupState?: GroupParsedState;
    isLastItem: boolean;
};

export type RenderItemProps = {
    size: ListItemSize;
    id: ListItemId;
    onClick?(): void;
    selected: boolean;
    disabled: boolean;
    expanded?: boolean;
    active: boolean;
    indentation: number;
    hasSelectionIcon?: boolean;
} & KnownItemStructure;

export type ParsedState<T> = {
    /**
     * Stored internal meta info about item
     * Note: Groups are also items
     */
    itemsState: Record<ListItemId, ItemState>;
    /**
     * Normalized original data
     */
    itemsById: Record<ListItemId, T>;
    /**
     * Stored info about group items:
     */
    groupsState: Record<ListItemId, GroupParsedState>;
};

export type ListState = {
    disabledById: Record<ListItemId, boolean>;
    selectedById: Record<ListItemId, boolean>;
    expandedById: Record<ListItemId, boolean>;
    activeItemId?: ListItemId;
};

export type InitialListParsedState = Pick<
    ListState,
    'disabledById' | 'expandedById' | 'selectedById'
>;

export type ParsedFlattenState = {
    visibleFlattenIds: ListItemId[];
    idToFlattenIndex: Record<ListItemId, number>;
};

export type ListParsedState<T> = ParsedState<T> &
    ParsedFlattenState & {
        items: ListItemType<T>[];
    };
