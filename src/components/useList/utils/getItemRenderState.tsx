/* eslint-disable valid-jsdoc */
import type {
    ListItemId,
    ListParsedState,
    ListSizeTypes,
    ListState,
    RenderItemContext,
    RenderItemState,
} from '../types';

type ItemRendererProps<T> = ListState &
    ListParsedState<T> & {
        size?: ListSizeTypes;
        id: ListItemId;
        onItemClick?(id: ListItemId): void;
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
        flattenIdsOrder,
        size = 'm',
        itemsState,
        selectedById,
        activeItemId,
        id,
    }: ItemRendererProps<T>,
    {defaultExpanded = true}: {defaultExpanded?: boolean} = {},
) => {
    const listContext: RenderItemContext = {
        itemState: itemsState[id],
        groupState: groupsState[id],
        isLastItem: id === flattenIdsOrder[flattenIdsOrder.length - 1],
    };

    let expanded;

    // isGroup
    if (groupsState[id]) {
        expanded = expandedById[id] ?? defaultExpanded;
    }

    const stateProps: RenderItemState = {
        id,
        size,
        expanded,
        active: id === activeItemId,
        indentation: listContext.itemState.indentation,
        disabled: disabledById[id],
        selected: selectedById[id],
        onClick: onItemClick ? () => onItemClick(id) : undefined,
    };

    return [byId[id], stateProps, listContext] as const;
};
