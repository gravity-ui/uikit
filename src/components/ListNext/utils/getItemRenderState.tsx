import type {
    ItemsParsedState,
    ListGroupState,
    ListItemId,
    ListSizeTypes,
    ListState,
    RenderItemContext,
    RenderItemState,
} from '../types';

type ItemRendererProps<T> = ListState & {
    size?: ListSizeTypes;
    byId: Record<ListItemId, T>;
    itemsState: ItemsParsedState;
    groupsState: ListGroupState;
    lastItemId: ListItemId;
    onItemClick?(id: ListItemId): void;
    id: ListItemId;
};

/**
 * Map list state and parsed list state to item render props
 */
export const getItemRenderState = <T,>(
    {
        byId,
        disabledById,
        expandedById,
        groupsState,
        onItemClick,
        size = 'm',
        itemsState,
        lastItemId,
        selectedById,
        activeItemId,
        id,
    }: ItemRendererProps<T>,
    {defaultExpanded = true}: {defaultExpanded?: boolean} = {},
) => {
    const context: RenderItemContext = {
        itemState: itemsState[id],
        groupState: groupsState[id],
        isLastItem: id === lastItemId,
    };

    let expanded;

    // isGroup
    if (groupsState[id]) {
        expanded = expandedById[id] ?? defaultExpanded;
    }

    const state: RenderItemState = {
        id,
        size,
        expanded,
        active: id === activeItemId,
        indentation: context.itemState.indentation,
        disabled: disabledById[id],
        selected: selectedById[id],
        onClick: onItemClick ? () => onItemClick(id) : undefined,
    };

    return [byId[id], state, context] as const;
};
