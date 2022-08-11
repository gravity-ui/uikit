export function toItemList<T extends {hidden?: boolean}>(items: (T | T[])[], separator: T): T[] {
    const updatedItems: T[] = [];
    let addedGroup = false;

    for (const item of items) {
        if (Array.isArray(item)) {
            const visibleItems = item.filter(({hidden}) => !hidden);
            if (visibleItems.length === 0) {
                continue;
            }
            if (updatedItems.length !== 0) {
                updatedItems.push(separator);
            }
            updatedItems.push(...visibleItems);
            addedGroup = true;
        } else {
            if (item.hidden) {
                continue;
            }
            if (addedGroup) {
                updatedItems.push(separator);
            }
            updatedItems.push(item);
            addedGroup = false;
        }
    }

    return updatedItems;
}
