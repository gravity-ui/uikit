import type {ListItemId, ListItemType} from '../types';

import {isTreeItemGuard} from './isTreeItemGuard';

interface GetListItemIdProps<T> {
    item: ListItemType<T>;
    groupedId: ListItemId;
    getId?(data: T): ListItemId;
}

export const getListItemId = <T>({item, groupedId, getId}: GetListItemIdProps<T>) => {
    let id = groupedId;

    if (typeof getId === 'function') {
        id = getId(isTreeItemGuard(item) ? item.data : item);
    } else if (item.id) {
        id = item.id;
    }

    return id;
};
