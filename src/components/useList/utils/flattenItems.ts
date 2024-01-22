import type {ListItemId, ListItemType} from '../types';

import {getListItemId} from './getListItemId';
import {getGroupItemId} from './groupItemId';
import {isTreeItemGuard} from './isTreeItemGuard';

export function flattenItems<T>(
    items: ListItemType<T>[],
    expandedById: Record<ListItemId, boolean> = {},
    getId?: (item: T) => ListItemId,
): ListItemId[] {
    if (process.env.NODE_ENV !== 'production') {
        console.time('flattenItems');
    }

    const getNestedIds = (
        order: string[],
        item: ListItemType<T>,
        index: number,
        parentId?: string,
    ) => {
        const groupedId = getGroupItemId(index, parentId);
        const id = getListItemId({groupedId, item, getId});

        order.push(id);

        if (isTreeItemGuard(item) && item.children) {
            // don't include collapsed groups
            if (!(id in expandedById && !expandedById[id])) {
                order.push(
                    ...item.children.reduce<string[]>(
                        (acc, item, idx) => getNestedIds(acc, item, idx, id),
                        [],
                    ),
                );
            }
        }

        return order;
    };

    const result = items.reduce<string[]>((acc, item, index) => getNestedIds(acc, item, index), []);

    if (process.env.NODE_ENV !== 'production') {
        console.timeEnd('flattenItems');
    }
    return result;
}
