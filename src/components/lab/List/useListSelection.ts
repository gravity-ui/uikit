import * as React from 'react';

import {useControlledState} from '../../../hooks';
import {warnOnce} from '../../utils/warn';

import type {ListSelectionProps} from './types';
import type {ListRow} from './utils';

const EMPTY_SELECTION: readonly string[] = [];

export interface ListSelection<T> {
    /** The selected ids: an array on the outside (serializable), a Set inside */
    selectedSet: ReadonlySet<string>;
    /**
     * The selection gesture of a row; outside the layer, on sections and on
     *  disabled rows it is a no-op. It re-anchors the range: the anchor is the
     *  target of the last non-Shift selection operation
     */
    toggleSelection(row: ListRow<T>): void;
    /**
     * The Shift gesture (the SelectionManager model of react-aria): it
     *  replaces the "range part" of the selection — [anchor..target of the
     *  previous Shift gesture] — with the range [anchor..target] computed over
     *  the data. In single mode it behaves like a plain gesture (Shift is
     *  ignored), outside the layer it is a no-op
     */
    extendSelection(row: ListRow<T>): void;
    /** Ctrl/Cmd+A: select all non-disabled options; multiple only */
    selectAllOptions(): void;
}

interface ListSelectionData<T> {
    rows: readonly ListRow<T>[];
    rowById: ReadonlyMap<string, ListRow<T>>;
}

/**
 * The option rows in the range [fromId..toId] inclusive, in the order of rows
 *  — top-down regardless of the direction of the gesture (react-aria:
 *  getKeyRange always iterates from the smaller index). The range is computed
 *  OVER THE DATA, not over the DOM: under virtualization the rows outside the
 *  window are included as well. Empty when either end is not found in the data
 *  (react-aria: getKeyRange for a missing key is empty)
 */
function getRangeRows<T>(
    {rows, rowById}: ListSelectionData<T>,
    fromId: string,
    toId: string,
): ListRow<T>[] {
    const from = rowById.get(fromId);
    const to = rowById.get(toId);
    if (!from || !to) {
        return [];
    }
    const start = Math.min(from.index, to.index);
    const end = Math.max(from.index, to.index);
    return rows.slice(start, end + 1).filter((row) => row.kind === 'item');
}

function sameIds(a: readonly string[], b: readonly string[]): boolean {
    return a.length === b.length && a.every((id, index) => id === b[index]);
}

/**
 * The selection layer: the state (controlled/uncontrolled), the gestures and
 *  the range anchor. Until selectionMode is passed the state exists but turns
 *  into nothing — neither into aria, nor into ctx.state, nor into gestures:
 *  that is done by the core, and it is gated on selectionMode
 */
export function useListSelection<T>(
    props: ListSelectionProps,
    data: ListSelectionData<T>,
): ListSelection<T> {
    const {selectionMode} = props;

    const [selectedIds, setSelectedIds] = useControlledState<readonly string[], string[]>(
        props.selectedIds,
        props.defaultSelectedIds ?? EMPTY_SELECTION,
        props.onSelectedUpdate,
    );
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);

    // The range anchor (the SelectionManager model of react-aria): anchorId is
    // the target of the last non-Shift selection operation, rangeEndId is the
    // target of the last Shift gesture (the boundary of the "range part" that
    // the next Shift gesture will replace). A ref rather than state: the
    // anchor does not affect the render and is read at the moment of a gesture
    // only
    const anchorRef = React.useRef<{anchorId: string | null; rangeEndId: string | null}>({
        anchorId: null,
        rangeEndId: null,
    });

    if (
        !selectionMode &&
        (props.selectedIds !== undefined ||
            props.defaultSelectedIds !== undefined ||
            props.onSelectedUpdate !== undefined)
    ) {
        warnOnce(
            '[List] `selectedIds`, `defaultSelectedIds` and `onSelectedUpdate` have no effect without `selectionMode`.',
        );
    }
    if (selectionMode === 'single' && selectedIds.length > 1) {
        // Several aria-selected="true" in a listbox without
        // aria-multiselectable is invalid ARIA
        warnOnce(
            '[List] `selectionMode="single"` expects at most one selected id, but `selectedIds` contains several.',
        );
    }

    const toggleSelection = (row: ListRow<T>) => {
        if (!selectionMode || row.kind !== 'item' || row.disabled) {
            return;
        }
        // A plain gesture re-anchors, deselection included: the anchor is the
        // target of the last non-Shift selection operation. A deviation from
        // react-aria: their toggleSelection leaves the anchor in place on
        // deselection, but with a TODO in the source — the choice is not a
        // deliberate one
        anchorRef.current = {anchorId: row.id, rangeEndId: row.id};
        if (selectionMode === 'single') {
            // Repeating the gesture on the selected row neither deselects it
            // (radio semantics) nor fires the callback
            if (selectedIds.length === 1 && selectedIds[0] === row.id) {
                return;
            }
            setSelectedIds([row.id]);
            return;
        }
        const next = selectedIds.filter((id) => id !== row.id);
        if (next.length === selectedIds.length) {
            next.push(row.id);
        }
        setSelectedIds(next);
    };

    const extendSelection = (row: ListRow<T>) => {
        if (!selectionMode || row.kind !== 'item' || row.disabled) {
            return;
        }
        if (selectionMode === 'single') {
            // Single ignores Shift: the gesture behaves like a plain one
            // (react-aria: extendSelection in single is replaceSelection)
            toggleSelection(row);
            return;
        }
        const stored = anchorRef.current;
        const anchorRow = stored.anchorId === null ? undefined : data.rowById.get(stored.anchorId);
        const anchorAlive = anchorRow !== undefined && anchorRow.kind === 'item';
        // The anchor is gone (items changed, filtering) or there has not been
        // one yet — then the target of the gesture is the anchor: a range of a
        // single row. A deviation from react-aria: they keep the stale anchor,
        // and the gesture silently does not change the selection at all
        const anchorId = anchorAlive ? anchorRow.id : row.id;
        // The old "range part" is subtracted whole, over the data — including
        // controlled-selected disabled rows inside it (react-aria removes the
        // old range without a canSelectItem check); what is selected outside
        // the range is left alone. If the boundary of the previous gesture is
        // gone there is nothing to subtract
        const oldRangeIds =
            anchorAlive && stored.rangeEndId !== null
                ? getRangeRows(data, anchorId, stored.rangeEndId).map((rangeRow) => rangeRow.id)
                : [];
        const removeSet = new Set(oldRangeIds);
        const kept = selectedIds.filter((id) => !removeSet.has(id));
        const keptSet = new Set(kept);
        // The new batch goes to the end, in data order regardless of the
        // direction of the gesture; disabled rows are not selected by gestures;
        // what was already selected outside the old range keeps its place (the
        // Set semantics of react-aria)
        const added = getRangeRows(data, anchorId, row.id)
            .filter((rangeRow) => !rangeRow.disabled && !keptSet.has(rangeRow.id))
            .map((rangeRow) => rangeRow.id);
        const next = [...kept, ...added];
        anchorRef.current = {anchorId, rangeEndId: row.id};
        // A gesture that did not change the selection does not fire the
        // callback: useControlledState compares arrays by reference and would
        // fire on every repetition of the gesture
        if (!sameIds(next, selectedIds)) {
            setSelectedIds(next);
        }
    };

    const selectAllOptions = () => {
        if (selectionMode !== 'multiple') {
            return;
        }
        // All non-disabled options in data order — a materialized counterpart
        // of the 'all' sentinel of react-aria (on the outside we expose an
        // array of ids). The anchor does not move: the next Shift gesture
        // continues from the previous anchor
        const next = data.rows
            .filter((row) => row.kind === 'item' && !row.disabled)
            .map((row) => row.id);
        if (!sameIds(next, selectedIds)) {
            setSelectedIds(next);
        }
    };

    return {selectedSet, toggleSelection, extendSelection, selectAllOptions};
}
