import * as React from 'react';

import {useControlledState} from '../../../../../hooks/useControlledState';
import type {ListItemGetters} from '../types';

import type {ListStateIndex} from './listStateIndex';
import {computeVisibleIds, reconcileListStateIndex} from './listStateIndex';
import type {ListState, UseListStateProps} from './types';

const EMPTY_IDS: string[] = [];

/**
 * Headless state for a data-driven list or tree: normalizes `items` into a flat index and derives
 * the ordered ids of the currently visible nodes from the expansion state.
 *
 * Structural getters must be pure functions of the item — pass a new `items` reference to apply
 * data changes. Expansion is controlled when `expandedIds` is passed, uncontrolled otherwise.
 */
export function useListState<T>(props: UseListStateProps<T>): ListState<T> {
    const {items, expandedIds, defaultExpandedIds, onExpandedUpdate, ...getters} = props;

    // Getters are read through a ref so the index reconciles on the `items` reference only.
    const gettersRef = React.useRef<ListItemGetters<T>>(getters);
    gettersRef.current = getters;

    // The previous index is passed back as a reuse hint; reconciliation is pure and never mutates it.
    const indexRef = React.useRef<ListStateIndex<T> | null>(null);
    const index = React.useMemo(() => {
        indexRef.current = reconcileListStateIndex(items, gettersRef.current, indexRef.current);
        return indexRef.current;
    }, [items]);

    const [currentExpandedIds, setExpandedIds] = useControlledState(
        expandedIds,
        defaultExpandedIds ?? EMPTY_IDS,
        onExpandedUpdate,
    );

    const expandedSet = React.useMemo(() => new Set(currentExpandedIds), [currentExpandedIds]);

    // Refs keep `setExpanded` referentially stable while reading the latest expansion and setter.
    const expandedIdsRef = React.useRef(currentExpandedIds);
    expandedIdsRef.current = currentExpandedIds;
    const expandedSetRef = React.useRef(expandedSet);
    expandedSetRef.current = expandedSet;
    const setExpandedIdsRef = React.useRef(setExpandedIds);
    setExpandedIdsRef.current = setExpandedIds;

    const setExpanded = React.useCallback((id: string, expanded: boolean) => {
        if (expandedSetRef.current.has(id) === expanded) {
            return;
        }
        const next = expanded
            ? [...expandedIdsRef.current, id]
            : expandedIdsRef.current.filter((expandedId) => expandedId !== id);
        setExpandedIdsRef.current(next);
    }, []);

    const visibleIds = React.useMemo(
        () => computeVisibleIds(index, expandedSet),
        [index, expandedSet],
    );

    // Depend on `index` alone so these accessors stay stable across expansion changes.
    const accessors = React.useMemo(
        () => ({
            getItemById: (id: string) => index.nodeById.get(id)?.item,
            getLevel: (id: string) => index.nodeById.get(id)?.level ?? 0,
            getParentId: (id: string) => index.nodeById.get(id)?.parentId,
            getChildrenIds: (id: string) => index.nodeById.get(id)?.childrenIds,
            getChildrenState: (id: string) => index.nodeById.get(id)?.childrenState,
            isDisabled: (id: string) => index.nodeById.get(id)?.disabled ?? false,
        }),
        [index],
    );

    return React.useMemo<ListState<T>>(
        () => ({
            ...accessors,
            visibleIds,
            isExpanded: (id) => expandedSet.has(id),
            setExpanded,
        }),
        [accessors, visibleIds, expandedSet, setExpanded],
    );
}
