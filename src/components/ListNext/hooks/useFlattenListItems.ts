/* eslint-disable valid-jsdoc */
import React from 'react';

import type {ListItemId, ListItemType} from '../types';
import {flattenItems} from '../utils/flattenItems';

interface UseFlattenListItemsProps<T> {
    items: ListItemType<T>[];
    expanded?: Record<ListItemId, boolean>;
    getId?(item: T): ListItemId;
}

/**
 * Pick ids from items and flatten children.
 * Returns flatten ids list tree structure representation.
 * Not included items if they in `expanded` map
 */
export function useFlattenListItems<T>({items, expanded, getId}: UseFlattenListItemsProps<T>) {
    const order = React.useMemo(() => {
        return flattenItems(items, expanded, getId);
    }, [items, expanded, getId]);

    return order;
}
