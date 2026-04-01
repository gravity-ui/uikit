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
    const visibleFlattenIds: ListItemId[] = [];

    const visit = (item: ListItemType<T>, index: number, parentId?: string) => {
        const groupedId = getGroupItemId(index, parentId);
        const id = getListItemId({groupedId, item, getItemId});

        // only top level array
        if (!parentId) {
            rootIds.push(id);
        }

        visibleFlattenIds.push(id);

        if (isTreeItemGuard(item) && item.children) {
            // don't include collapsed groups
            const isCollapsed = id in expandedById && !expandedById[id];
            if (!isCollapsed) {
                for (let i = 0; i < item.children.length; i++) {
                    visit(item.children[i], i, id);
                }
            }
        }
    };

    for (let i = 0; i < items.length; i++) {
        visit(items[i], i);
    }

    const idToFlattenIndex: Record<ListItemId, number> = {};

    for (let i = 0; i < visibleFlattenIds.length; i++) {
        idToFlattenIndex[visibleFlattenIds[i]] = i;
    }

    return {
        rootIds,
        visibleFlattenIds,
        idToFlattenIndex,
    };
}
