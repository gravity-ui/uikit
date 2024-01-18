/* eslint-disable valid-jsdoc */
import type {
    ListItemId,
    ListItemSizeType,
    ListParsedState,
    ListState,
    RenderItemContext,
    RenderItemState,
} from '../types';

type ItemRendererProps<T> = ListState &
    ListParsedState<T> & {
        size?: ListItemSizeType;
        id: ListItemId;
        onItemClick?(id: ListItemId): void;
    };

/**
 * Map list state and parsed list state to item render props
 */
export const getItemRenderState = <T,>(
    {
        itemsById,
        disabledById,
        expandedById,
        groupsState,
        onItemClick,
        visibleFlattenIds,
        size = 'm',
        itemsState,
        selectedById,
        activeItemId,
        id,
    }: ItemRendererProps<T>,
    {defaultExpanded = true}: {defaultExpanded?: boolean} = {},
) => {
    const context: RenderItemContext = {
        itemState: itemsState[id],
        groupState: groupsState[id],
        isLastItem: id === visibleFlattenIds[visibleFlattenIds.length - 1],
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
        indentation: context.itemState.indentation,
        disabled: disabledById[id],
        selected: selectedById[id],
        onClick: onItemClick ? () => onItemClick(id) : undefined,
    };

    return {data: itemsById[id], props: stateProps, context};
};
