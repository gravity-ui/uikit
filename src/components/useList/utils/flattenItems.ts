import type {ListItemId, ListItemType, ParsedFlattenState} from '../types';

import {getListItemId} from './getListItemId';
import {getGroupItemId} from './groupItemId';
import {isTreeItemGuard} from './isTreeItemGuard';

interface FlattenItemsProps<T> {
    items: ListItemType<T>[];
    expandedById?: Record<ListItemId, boolean>;
    getItemId?: (item: T) => ListItemId;
}

export function flattenItems<T>({
    items,
    getItemId,
    expandedById = {},
}: FlattenItemsProps<T>): ParsedFlattenState {
    const rootIds: ListItemId[] = [];

    const getNestedIds = (
        order: string[],
        item: ListItemType<T>,
        index: number,
        parentId?: string,
    ) => {
        const groupedId = getGroupItemId(index, parentId);
        const id = getListItemId({groupedId, item, getItemId});

        // only top level array
        if (!parentId) {
            rootIds.push(id);
        }

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

    return {
        rootIds,
        visibleFlattenIds,
        idToFlattenIndex,
    };
}
