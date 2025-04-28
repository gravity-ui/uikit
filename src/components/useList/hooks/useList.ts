import * as React from 'react';

import type {InitialListParsedState, ListState, UseListResult} from '../types';

import {useFlattenListItems} from './useFlattenListItems';
import {useListParsedState} from './useListParsedState';
import type {UseListParsedStateProps} from './useListParsedState';
import {useListState} from './useListState';
import type {UseListStateProps} from './useListState';

interface UseListProps<T>
    extends UseListParsedStateProps<T>,
        Omit<UseListStateProps, 'initialState'> {
    initialState?: Partial<InitialListParsedState>;
    controlledState?: Partial<ListState>;
}

/**
 * Take array of items as a argument with params described what type of list initial data represents.
 */
export const useList = <T>({
    items,
    getItemId,
    defaultExpandedState = 'expanded',
    withExpandedState = true,
    initialState: initialValues,
    controlledState,
}: UseListProps<T>): UseListResult<T> => {
    const {itemsById, groupsState, itemsState, initialState} = useListParsedState({
        items,
        getItemId,
        defaultExpandedState,
    });

    const initValues: InitialListParsedState = React.useMemo(() => {
        return {
            expandedById: {...initialState.expandedById, ...initialValues?.expandedById},
            selectedById: {...initialState.selectedById, ...initialValues?.selectedById},
            disabledById: {...initialState.disabledById, ...initialValues?.disabledById},
            activeItemId: initialValues?.activeItemId,
        };
    }, [
        initialState.disabledById,
        initialState.expandedById,
        initialState.selectedById,
        initialValues?.activeItemId,
        initialValues?.disabledById,
        initialValues?.expandedById,
        initialValues?.selectedById,
    ]);

    const innerState = useListState({
        initialState: initValues,
        withExpandedState,
    });

    const realState = React.useMemo(() => {
        if (controlledState) {
            return {
                ...innerState,
                ...controlledState,
            };
        }

        return innerState;
    }, [controlledState, innerState]);

    const {visibleFlattenIds, idToFlattenIndex, rootIds} = useFlattenListItems({
        items,
        /**
         * By default controlled from list items declaration state
         */
        expandedById: realState.expandedById,
        getItemId,
    });

    return {
        state: realState,
        structure: {
            rootIds,
            items,
            visibleFlattenIds,
            idToFlattenIndex,
            itemsById,
            groupsState,
            itemsState,
        },
    };
};
