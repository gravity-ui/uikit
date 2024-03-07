/* eslint-disable valid-jsdoc */
import type {
    ListItemId,
    ListItemSize,
    ListParsedState,
    ListState,
    RenderItemContext,
    RenderItemState,
} from '../types';

type ItemRendererProps<T> = Partial<ListState> &
    ListParsedState<T> & {
        size?: ListItemSize;
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
        idToFlattenIndex,
    }: ItemRendererProps<T>,
    {defaultExpanded = true}: {defaultExpanded?: boolean} = {},
) => {
    const context: RenderItemContext = {
        visibleFlattenIndex: idToFlattenIndex[id],
        itemState: itemsState[id],
        groupState: groupsState[id],
        isLastItem: id === visibleFlattenIds[visibleFlattenIds.length - 1],
    };

    let expanded; // `undefined` value means than tree list will look as nested list without groups

    // isGroup
    if (groupsState[id] && expandedById) {
        expanded = expandedById[id] ?? defaultExpanded;
    }

    const stateProps: RenderItemState = {
        id,
        size,
        expanded,
        active: id === activeItemId,
        indentation: context.itemState.indentation,
        disabled: Boolean(disabledById?.[id]),
        selected: Boolean(selectedById?.[id]),
        onClick: onItemClick ? () => onItemClick(id) : undefined,
    };

    return {data: itemsById[id], props: stateProps, context};
};
