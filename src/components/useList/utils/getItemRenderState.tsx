import type {QAProps} from '../../types';
import type {ListItemViewCommonProps} from '../components/ListItemView';
import type {
    ListItemId,
    ListItemListContextProps,
    ListItemSize,
    ListItemViewContentType,
    ListOnItemClick,
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
    mapItemDataToContentProps(data: T): ListItemViewContentType;
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
    mapItemDataToContentProps,
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

    const props: ListItemViewCommonProps = {
        id,
        size,
        selected: Boolean(list.state.selectedById[id]),
        disabled: Boolean(list.state.disabledById?.[id]),
        active: id === list.state.activeItemId,
        onClick: onItemClick ? (e: React.SyntheticEvent) => onItemClick({id}, e) : undefined,
        selectionViewType: Boolean(multiple) && !context.childrenIds ? 'multiple' : 'single', // no multiple selection at group nodes
        content: {
            expanded: list.state.expandedById?.[id],
            indentation: context.indentation,
            isGroup: list.state.expandedById && id in list.state.expandedById,
            ...mapItemDataToContentProps(list.structure.itemsById[id]),
        },
    };

    if (qa) {
        props.qa = getListItemQa(qa, id);
    }

    return {data: list.structure.itemsById[id], props, context};
};
