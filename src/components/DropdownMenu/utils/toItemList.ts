export function toItemList<
    Item extends {hidden?: boolean; items?: (Item | Item[])[]},
    ListItem extends {items?: ListItem[]; path: number[]},
>(items: (Item | Item[])[], separator: ListItem, path: number[] = [], startIndex = 0): ListItem[] {
    const updatedItems: ListItem[] = [];
    let addedGroup = false;
    let index = startIndex;

    for (const item of items) {
        if (Array.isArray(item)) {
            const groupItems = toItemList(item, separator, path, index);

            if (updatedItems.length !== 0 && groupItems.length !== 0) {
                updatedItems.push(separator);
            }

            updatedItems.push(...groupItems);
            index += groupItems.length;
            addedGroup = true;
        } else {
            if (item.hidden) {
                continue;
            }

            if (addedGroup) {
                updatedItems.push(separator);
            }

            const updatedItem = {
                ...item,
                path: [...path, index++],
            } as unknown as ListItem;

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
