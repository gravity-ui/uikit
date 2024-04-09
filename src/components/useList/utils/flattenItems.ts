import type {ListItemId, ListItemType, ParsedFlattenState} from '../types';

import {getListItemId} from './getListItemId';
import {getGroupItemId} from './groupItemId';
import {isTreeItemGuard} from './isTreeItemGuard';

export function flattenItems<T>(
    items: ListItemType<T>[],
    expandedById: Record<ListItemId, boolean> = {},
    getItemId?: (item: T) => ListItemId,
): ParsedFlattenState {
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
        const id = getListItemId({groupedId, item, getItemId});

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

    const visibleFlattenIds = items.reduce<string[]>(
        (acc, item, index) => getNestedIds(acc, item, index),
        [],
    );

    const idToFlattenIndex: Record<ListItemId, number> = {};

    for (const [item, index] of visibleFlattenIds.entries()) {
        idToFlattenIndex[index] = item;
    }

    if (process.env.NODE_ENV !== 'production') {
        console.timeEnd('flattenItems');
    }
    return {
        visibleFlattenIds,
        idToFlattenIndex,
    };
}
