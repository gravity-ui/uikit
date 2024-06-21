/* eslint-disable valid-jsdoc */
import type {QAProps} from '../../types';
import type {
    ListItemCommonProps,
    ListItemId,
    ListItemListContextProps,
    ListItemSize,
    ListOnItemClick,
    RenderItemProps,
    UseListResult,
} from '../types';

import {getListItemQa} from './getListItemQa';

type ItemRendererProps<T> = QAProps & {
    size?: ListItemSize;
    /**
     * Affects the view of the selected items
     */
    multiple?: boolean;
    id: ListItemId;
    mapItemDataToProps(data: T): ListItemCommonProps;
    onItemClick?: ListOnItemClick;
    list: UseListResult<T>;
};

/**
 * Map list state and parsed list state to item render props
 */
export const getItemRenderState = <T,>({
    qa,
    list,
    onItemClick,
    mapItemDataToProps,
    size = 'm',
    multiple = false,
    id,
}: ItemRendererProps<T>) => {
    const context: ListItemListContextProps = {
        ...list.structure.itemsState[id],
        ...list.structure.groupsState[id],
        isLastItem:
            id === list.structure.visibleFlattenIds[list.structure.visibleFlattenIds.length - 1],
    };

    let expanded; // `undefined` value means than tree list will look as nested list without groups

    // isGroup
    if (list.state.expandedById && id in list.state.expandedById) {
        expanded = list.state.expandedById[id];
    }

    const props: RenderItemProps = {
        id,
        size,
        expanded,
        active: id === list.state.activeItemId,
        indentation: context.indentation,
        disabled: Boolean(list.state.disabledById?.[id]),
        selected: Boolean(list.state.selectedById[id]),
        hasSelectionIcon: Boolean(multiple) && !context.childrenIds, // hide multiple selection view at group nodes
        onClick: onItemClick ? (e: React.SyntheticEvent) => onItemClick({id}, e) : undefined,
        ...mapItemDataToProps(list.structure.itemsById[id]),
    };

    if (qa) {
        props.qa = getListItemQa(qa, id);
    }

    return {data: list.structure.itemsById[id], props, context};
};
