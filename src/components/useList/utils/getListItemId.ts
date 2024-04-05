import type {ListItemId, ListItemType} from '../types';

import {isTreeItemGuard} from './isTreeItemGuard';

interface GetListItemIdProps<T> {
    item: ListItemType<T>;
    groupedId: ListItemId;
    getItemId?(data: T): ListItemId;
}

export const getListItemId = <T>({item, groupedId, getItemId}: GetListItemIdProps<T>) => {
    let id = groupedId;

    if (typeof getItemId === 'function') {
        id = getItemId(isTreeItemGuard(item) ? item.data : item);
    } else if (item && typeof item === 'object' && 'id' in item && item.id) {
        id = item.id;
    }

    return id;
};
