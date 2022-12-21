export function moveBack<T>(
    items: T[],
    activeItemIndex: number,
    steps = 1,
    skip?: (item: T) => boolean,
): number {
    const newActiveItemIndex =
        (items.length + activeItemIndex - (steps % items.length)) % items.length;

    if (skip && skip(items[newActiveItemIndex])) {
        return moveBack(items, newActiveItemIndex, 1, skip);
    }

    return newActiveItemIndex;
}
