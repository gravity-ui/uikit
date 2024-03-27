/* eslint-disable valid-jsdoc */
import type {QAProps} from '../../types';
import type {
    ListItemCommonProps,
    ListItemId,
    ListItemSize,
    ListParsedState,
    ListState,
    RenderItemContext,
    RenderItemProps,
} from '../types';

import {getListItemQa} from './getListItemQa';

type ItemRendererProps<T> = Partial<ListState> &
    QAProps &
    ListParsedState<T> & {
        size?: ListItemSize;
        /**
         * Affects the view of the selected items
         */
        multiple?: boolean;
        /**
         * @default true
         *
         * Group expanded initial state
         */
        defaultExpanded?: boolean;
        id: ListItemId;
        mapItemDataToProps(data: T): ListItemCommonProps;
        onItemClick?(id: ListItemId): void;
    };

/**
 * Map list state and parsed list state to item render props
 */
export const getItemRenderState = <T,>({
    qa,
    itemsById,
    disabledById,
    expandedById,
    groupsState,
    onItemClick,
    mapItemDataToProps,
    visibleFlattenIds,
    size = 'm',
    itemsState,
    selectedById,
    activeItemId,
    multiple = false,
    defaultExpanded = true,
    id,
}: ItemRendererProps<T>) => {
    const context: RenderItemContext = {
        itemState: itemsState[id],
        groupState: groupsState[id],
        isLastItem: id === visibleFlattenIds[visibleFlattenIds.length - 1],
    };

    let expanded; // `undefined` value means than tree list will look as nested list without groups
    let selected; // the absence of the value of the selected element affects its view. For example, an element without a value will not have a visual highlight on the hover

    // isGroup
    if (groupsState[id] && expandedById) {
        expanded = expandedById[id] ?? defaultExpanded;
    }

    if (selectedById) {
        selected = Boolean(selectedById[id]);
    }

    const props: RenderItemProps = {
        id,
        size,
        expanded,
        active: id === activeItemId,
        indentation: context.itemState.indentation,
        disabled: Boolean(disabledById?.[id]),
        selected,
        hasSelectionIcon: Boolean(multiple) && !context.groupState,
        onClick: onItemClick ? () => onItemClick(id) : undefined,
        ...mapItemDataToProps(itemsById[id]),
    };

    if (qa) {
        props.qa = getListItemQa(qa, id);
    }

    return {data: itemsById[id], props, context};
};
