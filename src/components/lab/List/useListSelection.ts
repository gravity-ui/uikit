import * as React from 'react';

import {useControlledState} from '../../../hooks';
import {warnOnce} from '../../utils/warn';

import type {ListSelectionProps} from './types';
import type {ListRow} from './utils';

const EMPTY_SELECTION: readonly string[] = [];

export interface ListSelection<T> {
    /** Выделенные id: наружу массив (сериализуемо), внутри Set */
    selectedSet: ReadonlySet<string>;
    /**
     * Жест выделения строки; вне слоя, на секциях и disabled-строках — no-op.
     *  Пере-якоряет диапазон: якорь = цель последней не-Shift операции
     *  выделения (фаза 7)
     */
    toggleSelection(row: ListRow<T>): void;
    /**
     * Shift-жест (фаза 7, модель SelectionManager react-aria): заменяет
     *  «диапазонную часть» выделения — [якорь..цель предыдущего Shift-жеста] —
     *  диапазоном [якорь..цель] по данным. В single ведёт себя как обычный
     *  жест (Shift игнорируется), вне слоя — no-op
     */
    extendSelection(row: ListRow<T>): void;
    /** Ctrl/Cmd+A (фаза 7): выделить все не-disabled опции; только multiple */
    selectAllOptions(): void;
}

interface ListSelectionData<T> {
    rows: readonly ListRow<T>[];
    rowById: ReadonlyMap<string, ListRow<T>>;
}

/**
 * Опции данных в диапазоне [fromId..toId] включительно, в порядке rows —
 *  top-down независимо от направления жеста (react-aria: getKeyRange всегда
 *  итерирует от меньшего индекса). Диапазон считается ПО ДАННЫМ, не по DOM:
 *  под виртуализацией строки за окном тоже попадают. Пусто, если какой-то из
 *  концов в данных не найден (react-aria: getKeyRange по отсутствующему
 *  ключу пуст)
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
 * Слой выделения (§6): состояние (controlled/uncontrolled), жесты и якорь
 *  диапазона (фаза 7). Пока selectionMode не передан, состояние существует,
 *  но ни во что не превращается — ни в aria, ни в ctx.state, ни в жесты:
 *  этим занимается ядро, гейтуя на selectionMode
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

    // Якорь диапазона (фаза 7, модель SelectionManager react-aria): anchorId —
    // цель последней не-Shift операции выделения, rangeEndId — цель последнего
    // Shift-жеста (граница «диапазонной части», которую следующий Shift-жест
    // заменит). Ref, а не state: якорь не влияет на рендер и читается только
    // в момент жеста
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
        // Обычный жест пере-якоряет — и при снятии выделения тоже: «якорь =
        // цель последней не-Shift операции выделения» (спека фазы 7).
        // Отступление от react-aria: их toggleSelection при снятии якорь не
        // двигает, но с TODO в исходнике — выбор не осознанный
        anchorRef.current = {anchorId: row.id, rangeEndId: row.id};
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

    const extendSelection = (row: ListRow<T>) => {
        if (!selectionMode || row.kind !== 'item' || row.disabled) {
            return;
        }
        if (selectionMode === 'single') {
            // single Shift игнорирует: жест ведёт себя как обычный
            // (react-aria: extendSelection в single — replaceSelection)
            toggleSelection(row);
            return;
        }
        const stored = anchorRef.current;
        const anchorRow = stored.anchorId === null ? undefined : data.rowById.get(stored.anchorId);
        const anchorAlive = anchorRow !== undefined && anchorRow.kind === 'item';
        // Якорь исчез (смена items/фильтрация) или его ещё не было — цель
        // жеста и есть якорь: диапазон из одной строки. Отступление от
        // react-aria: они хранят стухший якорь, и жест молча не меняет
        // выделение вовсе
        const anchorId = anchorAlive ? anchorRow.id : row.id;
        // Старая «диапазонная часть» вычитается целиком по данным — включая
        // controlled-выбранные disabled внутри неё (react-aria удаляет старый
        // диапазон без проверки canSelectItem); выделенное вне диапазона не
        // трогается. Исчезнувшая граница прошлого жеста → вычитать нечего
        const oldRangeIds =
            anchorAlive && stored.rangeEndId !== null
                ? getRangeRows(data, anchorId, stored.rangeEndId).map((rangeRow) => rangeRow.id)
                : [];
        const removeSet = new Set(oldRangeIds);
        const kept = selectedIds.filter((id) => !removeSet.has(id));
        const keptSet = new Set(kept);
        // Новая пачка — в конец, в порядке данных независимо от направления
        // жеста; disabled жестами не выбираются (фаза 2); уже выбранное вне
        // старого диапазона остаётся на своих местах (Set-семантика react-aria)
        const added = getRangeRows(data, anchorId, row.id)
            .filter((rangeRow) => !rangeRow.disabled && !keptSet.has(rangeRow.id))
            .map((rangeRow) => rangeRow.id);
        const next = [...kept, ...added];
        anchorRef.current = {anchorId, rangeEndId: row.id};
        // Жест, не изменивший выделение, не дёргает колбэк (прецедент фазы 2:
        // useControlledState сравнивает массивы по ссылке и выстрелил бы
        // на каждый повтор жеста)
        if (!sameIds(next, selectedIds)) {
            setSelectedIds(next);
        }
    };

    const selectAllOptions = () => {
        if (selectionMode !== 'multiple') {
            return;
        }
        // Все не-disabled опции в порядке данных — материализованный аналог
        // сентинела 'all' react-aria (наружу у нас массив id, §6). Якорь не
        // двигается: следующий Shift-жест продолжит от прежнего якоря
        const next = data.rows
            .filter((row) => row.kind === 'item' && !row.disabled)
            .map((row) => row.id);
        if (!sameIds(next, selectedIds)) {
            setSelectedIds(next);
        }
    };

    return {selectedSet, toggleSelection, extendSelection, selectAllOptions};
}
