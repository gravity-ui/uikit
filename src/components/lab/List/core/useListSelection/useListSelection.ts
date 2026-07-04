import * as React from 'react';

import {useControlledState} from '../../../../../hooks/useControlledState';
import {warnOnce} from '../../../../utils/warn';
import type {ListState} from '../useListState';

import type {ListSelection, ListSelectionProps, ListSelectionTrigger} from './types';

const EMPTY_IDS: string[] = [];

/** Structural equality by order and members — avoids emitting/committing an unchanged selection. */
function sameIds(a: string[], b: string[]): boolean {
    if (a === b) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Headless selection for a data-driven list or tree, layered over `useListState`: tracks the
 * selected ids and exposes the selection gestures. Returns `undefined` when `selectionMode` is
 * omitted, so the list has no selection.
 *
 * A node is selectable only as an enabled `item` (not a `section` label); the gestures skip
 * non-selectable nodes, though a range still spans their positions. Selection is controlled when
 * `selectedIds` is passed, uncontrolled otherwise.
 */
export function useListSelection<T>(
    state: ListState<T>,
    props: ListSelectionProps,
): ListSelection | undefined {
    const {selectionMode, selectedIds, defaultSelectedIds, onSelectedUpdate} = props;

    if (process.env.NODE_ENV !== 'production') {
        if (
            selectionMode === undefined &&
            (selectedIds !== undefined || defaultSelectedIds !== undefined)
        ) {
            warnOnce(
                '[useListSelection] `selectedIds` / `defaultSelectedIds` are ignored without `selectionMode`; selection stays off.',
            );
        }
    }

    const [currentSelectedIds, setSelectedIds] = useControlledState<
        string[],
        string[],
        [{trigger: ListSelectionTrigger}]
    >(selectedIds, defaultSelectedIds ?? EMPTY_IDS, onSelectedUpdate);

    const selectedSet = React.useMemo(() => new Set(currentSelectedIds), [currentSelectedIds]);

    // Refs keep the gesture methods referentially stable while reading the latest state/selection.
    const stateRef = React.useRef(state);
    stateRef.current = state;
    // Placeholder mode when selection is off: the methods that read it are unreachable then, since
    // the hook returns `undefined` and there is no object to call them on.
    const modeRef = React.useRef(selectionMode ?? 'single');
    modeRef.current = selectionMode ?? 'single';
    const selectedIdsRef = React.useRef(currentSelectedIds);
    selectedIdsRef.current = currentSelectedIds;
    const setSelectedIdsRef = React.useRef(setSelectedIds);
    setSelectedIdsRef.current = setSelectedIds;

    // The node a range extends from — set by select/toggle, kept fixed while extending, cleared by
    // clear. Lives in a ref: a gesture concept that must not itself trigger a render.
    const anchorRef = React.useRef<string | undefined>(undefined);

    // A node is selectable only as an enabled `item` — `section` labels and disabled rows are
    // skipped (react-aria's `canSelectItem`).
    const canSelect = React.useCallback(
        (id: string) =>
            stateRef.current.getItemType(id) === 'item' && !stateRef.current.isDisabled(id),
        [],
    );

    const commit = React.useCallback((next: string[], trigger: ListSelectionTrigger) => {
        if (sameIds(next, selectedIdsRef.current)) {
            return;
        }
        setSelectedIdsRef.current(next, {trigger});
    }, []);

    const select = React.useCallback(
        (id: string, trigger: ListSelectionTrigger = 'pointer') => {
            if (!canSelect(id)) {
                return;
            }
            anchorRef.current = id;
            commit([id], trigger);
        },
        [canSelect, commit],
    );

    const toggle = React.useCallback(
        (id: string, trigger: ListSelectionTrigger = 'pointer') => {
            if (!canSelect(id)) {
                return;
            }
            anchorRef.current = id;
            const current = selectedIdsRef.current;
            const isSelected = current.includes(id);
            if (modeRef.current === 'single') {
                commit(isSelected ? EMPTY_IDS : [id], trigger);
            } else {
                commit(
                    isSelected
                        ? current.filter((selectedId) => selectedId !== id)
                        : [...current, id],
                    trigger,
                );
            }
        },
        [canSelect, commit],
    );

    const extendTo = React.useCallback(
        (id: string, trigger: ListSelectionTrigger = 'pointer') => {
            const currentState = stateRef.current;

            // No range in single select — extending just moves the selection to the target.
            if (modeRef.current === 'single') {
                if (!canSelect(id)) {
                    return;
                }
                anchorRef.current = id;
                commit([id], trigger);
                return;
            }

            const visibleIds = currentState.visibleIds;
            const targetIndex = visibleIds.indexOf(id);
            if (targetIndex === -1) {
                return;
            }

            // No usable anchor (never set, or scrolled out of view) — start a fresh range at the
            // target. Only if the target is itself selectable: otherwise there is nothing to
            // extend, and parking the anchor on a non-selectable node (or committing an empty range
            // that would wipe a pre-seeded selection) would be wrong.
            let anchorIndex =
                anchorRef.current === undefined ? -1 : visibleIds.indexOf(anchorRef.current);
            if (anchorIndex === -1) {
                if (!canSelect(id)) {
                    return;
                }
                anchorRef.current = id;
                anchorIndex = targetIndex;
            }

            const from = Math.min(anchorIndex, targetIndex);
            const to = Math.max(anchorIndex, targetIndex);
            const range: string[] = [];
            for (let i = from; i <= to; i++) {
                const visibleId = visibleIds[i];
                if (canSelect(visibleId)) {
                    range.push(visibleId);
                }
            }
            // Nothing selectable in the range (e.g. the anchor turned non-selectable after a data
            // change) — extend to nothing rather than wiping the current selection.
            if (range.length === 0) {
                return;
            }
            commit(range, trigger);
        },
        [canSelect, commit],
    );

    const selectAll = React.useCallback(
        (trigger: ListSelectionTrigger = 'pointer') => {
            if (modeRef.current === 'single') {
                return;
            }
            const next = stateRef.current.visibleIds.filter((id) => canSelect(id));
            commit(next, trigger);
        },
        [canSelect, commit],
    );

    const clear = React.useCallback(
        (trigger: ListSelectionTrigger = 'pointer') => {
            anchorRef.current = undefined;
            commit(EMPTY_IDS, trigger);
        },
        [commit],
    );

    return React.useMemo<ListSelection | undefined>(() => {
        if (selectionMode === undefined) {
            return undefined;
        }
        return {
            mode: selectionMode,
            selectedIds: currentSelectedIds,
            isSelected: (id) => selectedSet.has(id),
            select,
            toggle,
            extendTo,
            selectAll,
            clear,
        };
    }, [
        selectionMode,
        currentSelectedIds,
        selectedSet,
        select,
        toggle,
        extendTo,
        selectAll,
        clear,
    ]);
}
