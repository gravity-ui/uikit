import type {ListItemId, ListItemType} from '../types';

import {getGroupedId} from './groupedIdUtils';

export function flattenItems<T>(
    items: ListItemType<T>[],
    groupsExpandedState: Record<ListItemId, boolean> = {},
): ListItemId[] {
    console.time('flattenItems');

    const getNestedIds = (
        order: string[],
        item: ListItemType<T>,
        index: number,
        parentId?: string,
    ) => {
        const groupedId = getGroupedId(index, parentId);
        const id = item.id || groupedId;

        order.push(id);

        if (item.children) {
            // remove from order collapsed groups
            if (!(id in groupsExpandedState && !groupsExpandedState[id])) {
                order.push(
                    ...item.children.reduce<string[]>(
                        (acc, item, idx) => getNestedIds(acc, item, idx, groupedId),
                        [],
                    ),
                );
            }
        }

        return order;
    };

    const result = items.reduce<string[]>((acc, item, index) => getNestedIds(acc, item, index), []);
    console.timeEnd('flattenItems');
    return result;
}
