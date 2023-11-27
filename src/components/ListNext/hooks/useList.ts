import type {ListItemId, ListItemType} from '../types';

import {useFlattenListItems} from './useFlattenListItems';
import {useListParsedState} from './useListParsedState';
import {useListState} from './useListState';

interface UseListProps<T> {
    items: ListItemType<T>[];
    /**
     * Control expanded items state from external source
     */
    expanded?: Record<ListItemId, boolean>;
    getId?(item: T): ListItemId;
}

export const useList = <T>({items, expanded, getId}: UseListProps<T>) => {
    const {byId, groupsState, itemsState, lastItemId} = useListParsedState({
        items,
        getId,
    });

    const state = useListState();

    const flattenIdsOrder = useFlattenListItems({
        items,
        expanded: expanded || state.expanded,
        getId,
    });

    return [{flattenIdsOrder, byId, groupsState, itemsState, lastItemId}, state] as const;
};
