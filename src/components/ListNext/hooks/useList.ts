/* eslint-disable valid-jsdoc */
import type {ListItemId, ListItemType, ListParsedState} from '../types';

import {useFlattenListItems} from './useFlattenListItems';
import {useListParsedState} from './useListParsedState';

interface UseListProps<T> {
    items: ListItemType<T>[];
    /**
     * Control expanded items state from external source
     */
    expandedById?: Record<ListItemId, boolean>;
    getId?(item: T): ListItemId;
}

/**
 * Take array of items as a argument and returns parsed representation of this data structure to work with
 */
export const useList = <T>({items, expandedById, getId}: UseListProps<T>): ListParsedState<T> => {
    const {byId, groupsState, itemsState, lastItemId} = useListParsedState({
        items,
        getId,
    });

    const flattenIdsOrder = useFlattenListItems({
        items,
        expandedById,
        getId,
    });

    return {items, flattenIdsOrder, byId, groupsState, itemsState, lastItemId};
};
