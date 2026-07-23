import * as React from 'react';

import {useControlledState} from '../../../hooks';
import {warnOnce} from '../../utils/warn';

import type {ListSelectionProps} from './types';
import type {ListRow} from './utils';

const EMPTY_SELECTION: readonly string[] = [];

export interface ListSelection<T> {
    /** Выделенные id: наружу массив (сериализуемо), внутри Set */
    selectedSet: ReadonlySet<string>;
    /** Жест выделения строки; вне слоя, на секциях и disabled-строках — no-op */
    toggleSelection(row: ListRow<T>): void;
}

/**
 * Слой выделения (§6): состояние (controlled/uncontrolled) и жест.
 *  Пока selectionMode не передан, состояние существует, но ни во что не
 *  превращается — ни в aria, ни в ctx.state, ни в жесты: этим занимается
 *  ядро, гейтуя на selectionMode
 */
export function useListSelection<T>(props: ListSelectionProps): ListSelection<T> {
    const {selectionMode} = props;

    const [selectedIds, setSelectedIds] = useControlledState<readonly string[], string[]>(
        props.selectedIds,
        props.defaultSelectedIds ?? EMPTY_SELECTION,
        props.onSelectedUpdate,
    );
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);

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
        // Несколько aria-selected="true" в listbox без aria-multiselectable —
        // невалидная ARIA
        warnOnce(
            '[List] `selectionMode="single"` expects at most one selected id, but `selectedIds` contains several.',
        );
    }

    const toggleSelection = (row: ListRow<T>) => {
        if (!selectionMode || row.kind !== 'item' || row.disabled) {
            return;
        }
        if (selectionMode === 'single') {
            // Повторный жест по выбранной строке не снимает выделение
            // (радио-семантика) и не дёргает колбэк
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

    return {selectedSet, toggleSelection};
}
