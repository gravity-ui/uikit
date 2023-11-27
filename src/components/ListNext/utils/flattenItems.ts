import type {ListItemId, ListItemType} from '../types';

import {getListItemId} from './getListItemId';

export function flattenItems<T>(
    items: ListItemType<T>[],
    groupsExpandedState: Record<ListItemId, boolean> = {},
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
        const groupedId = getListItemId(index, parentId);
        const id = typeof getId === 'function' ? getId(item.data) : item.id || groupedId;

        order.push(id);

        if (item.children) {
            // don't include collapsed groups
            if (!(id in groupsExpandedState && !groupsExpandedState[id])) {
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
