export function moveForward<T>(
    items: T[],
    activeItemIndex: number,
    steps = 1,
    skip?: (item: T) => boolean,
): number {
    const newActiveItemIndex = (activeItemIndex + steps) % items.length;

    if (skip && skip(items[newActiveItemIndex])) {
        return moveForward(items, newActiveItemIndex, 1, skip);
    }

    return newActiveItemIndex;
}
