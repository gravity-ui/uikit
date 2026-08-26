import {warnOnce} from '../../utils/warn';

// Same id reading as flattenItems; numeric ids are stringified
function defaultGetId(item: unknown): string | undefined {
    if (typeof item === 'string') {
        return item;
    }
    const id = (item as {id?: unknown} | null | undefined)?.id;
    return id === undefined || id === null ? undefined : String(id);
}

/**
 * Moves `fromId` to the `position` edge of `toId` over the top level of `items`.
 * A no-op returns the same array by reference (do not mutate the result).
 * With duplicate ids the first match moves.
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
