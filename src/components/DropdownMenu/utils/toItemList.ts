export function toItemList<
    Item extends {hidden?: boolean; items?: (Item | Item[])[]},
    ListItem extends {items?: ListItem[]; path: number[]},
>(items: (Item | Item[])[], separator: ListItem, path: number[] = []): ListItem[] {
    const updatedItems: ListItem[] = [];
    let addedGroup = false;
    let index = -1;

    for (const item of items) {
        if (Array.isArray(item)) {
            const groupItemsList = toItemList(item, separator, [...path, index]);
            if (groupItemsList.length === 0) {
                continue;
            }
            if (updatedItems.length !== 0) {
                updatedItems.push(separator);
            }
            for (const groupItem of groupItemsList) {
                groupItem.path[path.length] = ++index;
            }
            updatedItems.push(...groupItemsList);
            addedGroup = true;
        } else {
            if (item.hidden) {
                continue;
            }
            if (addedGroup) {
                updatedItems.push(separator);
            }

            const updatedItem = {...item} as unknown as ListItem;
            updatedItem.path = [...path, ++index];
            if (item.items) {
                updatedItem.items = toItemList<Item, ListItem>(
                    item.items,
                    separator,
                    updatedItem.path,
                );
            }
            updatedItems.push(updatedItem);
            addedGroup = false;
        }
    }

    return updatedItems;
}
