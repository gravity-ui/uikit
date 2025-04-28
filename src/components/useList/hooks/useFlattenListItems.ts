import * as React from 'react';

import type {ListItemId, ListItemType} from '../types';
import {flattenItems} from '../utils/flattenItems';

interface UseFlattenListItemsProps<T> {
    items: ListItemType<T>[];
    expandedById?: Record<ListItemId, boolean>;
    getItemId?(item: T): ListItemId;
}

/**
 * Pick ids from items and flatten children.
 * Returns flatten ids list tree structure representation.
 * Not included items if they in `expandedById` map
 */
export function useFlattenListItems<T>({
    items,
    expandedById,
    getItemId,
}: UseFlattenListItemsProps<T>) {
    const order = React.useMemo(() => {
        return flattenItems({items, expandedById, getItemId});
    }, [items, expandedById, getItemId]);

    return order;
}
