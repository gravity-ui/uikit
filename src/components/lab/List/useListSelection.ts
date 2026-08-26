import * as React from 'react';

import {useControlledState} from '../../../hooks';
import {warnOnce} from '../../utils/warn';

import type {ListSelectionProps} from './types';
import {isNavigable} from './utils';
import type {ListRow} from './utils';

const EMPTY_SELECTION: readonly string[] = [];

export interface ListSelection<T> {
    selectedSet: ReadonlySet<string>;
    /** The plain gesture: toggles the row and re-anchors the range; a no-op outside the layer */
    toggleSelection(row: ListRow<T>): void;
    /** The Shift gesture: replaces [anchor..previous target] with [anchor..row]; plain in single */
    extendSelection(row: ListRow<T>): void;
    /** Ctrl/Cmd+A: select all non-disabled options; multiple only */
    selectAllOptions(): void;
}

interface ListSelectionData<T> {
    rows: readonly ListRow<T>[];
    rowById: ReadonlyMap<string, ListRow<T>>;
}

/** Options in [fromId..toId] in data order; empty when either end is missing */
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

/** The selection layer: state, gestures, range anchor; inert until selectionMode is passed */
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

    // anchorId: target of the last non-Shift op; rangeEndId: target of the last Shift op
    // (replaced by the next one)
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
        warnOnce(
            '[List] `selectionMode="single"` expects at most one selected id, but `selectedIds` contains several.',
        );
    }

    const toggleSelection = (row: ListRow<T>) => {
        if (!selectionMode || row.kind !== 'item' || row.disabled) {
            return;
        }
        anchorRef.current = {anchorId: row.id, rangeEndId: row.id};
        if (selectionMode === 'single') {
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
            toggleSelection(row);
            return;
        }
        const stored = anchorRef.current;
        const anchorRow = stored.anchorId === null ? undefined : data.rowById.get(stored.anchorId);
        const anchorAlive = anchorRow !== undefined && anchorRow.kind === 'item';
        const anchorId = anchorAlive ? anchorRow.id : row.id;
        const oldRangeIds =
            anchorAlive && stored.rangeEndId !== null
                ? getRangeRows(data, anchorId, stored.rangeEndId).map((rangeRow) => rangeRow.id)
                : [];
        const removeSet = new Set(oldRangeIds);
        const kept = selectedIds.filter((id) => !removeSet.has(id));
        const keptSet = new Set(kept);
        const added = getRangeRows(data, anchorId, row.id)
            .filter((rangeRow) => !rangeRow.disabled && !keptSet.has(rangeRow.id))
            .map((rangeRow) => rangeRow.id);
        const next = [...kept, ...added];
        anchorRef.current = {anchorId, rangeEndId: row.id};
        // useControlledState compares by reference
        if (!sameIds(next, selectedIds)) {
            setSelectedIds(next);
        }
    };

    const selectAllOptions = () => {
        if (selectionMode !== 'multiple') {
            return;
        }
        const next = data.rows.filter(isNavigable).map((row) => row.id);
        if (!sameIds(next, selectedIds)) {
            setSelectedIds(next);
        }
    };

    return {selectedSet, toggleSelection, extendSelection, selectAllOptions};
}
