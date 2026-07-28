import {warnOnce} from '../../utils/warn';

function defaultGetId(item: unknown): string | undefined {
    if (typeof item === 'string') {
        return item;
    }
    return (item as {id?: string} | null | undefined)?.id;
}

/**
 * The reorder utility of the dnd layer: a pure function over the data — it
 * moves the item `fromId` to the `position` edge of the item `toId`. It works
 * over the top level of `items` (a flat list; moving between sections and
 * trees is out of scope and will come with `moveTreeNode`/TreeList).
 *
 * A no-op (the item was not found, `fromId === toId`, the position does not
 * change) returns the ORIGINAL array by reference, so `setItems(moveItem(...))`
 * does not cause an extra render in that case. The flip side is that the
 * result must not be mutated in place (it may BE the input array); treat it as
 * immutable, exactly like the state itself.
 *
 * With duplicate ids the FIRST match is moved (the list core warns about
 * duplicates in dev; the utility does not check for them so as not to scan the
 * array a second time).
 */
export function moveItem<T>(
    items: readonly T[],
    fromId: string,
    toId: string,
    position: 'before' | 'after',
    getId?: (item: T) => string,
): T[] {
    const resolveId = (item: T) => (getId ? getId(item) : defaultGetId(item));

    const fromIndex = items.findIndex((item) => resolveId(item) === fromId);
    const toIndex = items.findIndex((item) => resolveId(item) === toId);
    if (fromIndex === -1 || toIndex === -1) {
        warnOnce(
            '[List] moveItem: `fromId` or `toId` was not found among the top-level items — the list is returned unchanged.',
        );
        return items as T[];
    }
    if (fromIndex === toIndex) {
        return items as T[];
    }

    // The index of the target in the array without the moved item
    const targetIndex = toIndex - (fromIndex < toIndex ? 1 : 0);
    const insertIndex = targetIndex + (position === 'after' ? 1 : 0);
    if (insertIndex === fromIndex) {
        return items as T[];
    }

    const result = items.filter((_, index) => index !== fromIndex);
    result.splice(insertIndex, 0, items[fromIndex]);
    return result;
}
