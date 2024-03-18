/* eslint-disable valid-jsdoc */
import type {
    InitialListParsedState,
    ListItemId,
    ListItemType,
    ListParsedState,
    ListState,
} from '../types';

import {useFlattenListItems} from './useFlattenListItems';
import {useListParsedState} from './useListParsedState';

export interface UseListProps<T> extends Partial<ListState> {
    items: ListItemType<T>[];
    /**
     * Control expanded items state from external source
     */
    getId?(item: T): ListItemId;
}

export type UseListResult<T> = ListParsedState<T> & {initialState: InitialListParsedState};

/**
 * Take array of items as a argument and returns parsed representation of this data structure to work with
 */
export const useList = <T>({items, expandedById, getId}: UseListProps<T>): UseListResult<T> => {
    const {itemsById, groupsState, itemsState, initialState} = useListParsedState({
        items,
        getId,
    });

    const {visibleFlattenIds, idToFlattenIndex} = useFlattenListItems({
        items,
        /**
         * By default controlled from list items declaration state
         */
        expandedById: expandedById || initialState.expandedById,
        getId,
    });

    return {
        items,
        visibleFlattenIds,
        idToFlattenIndex,
        itemsById,
        groupsState,
        itemsState,
        initialState,
    };
};
