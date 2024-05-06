import type {ListItemType, ListTreeItemType} from '../types';

import {isTreeItemGuard} from './isTreeItemGuard';

export function defaultFilterItems<T>(
    items: ListItemType<T>[],
    filterFn: (data: T) => boolean,
): ListItemType<T>[] {
    const getChildren = (result: ListItemType<T>[], item: ListItemType<T>) => {
        if (isTreeItemGuard(item) && item.children) {
            const children = item.children.reduce(getChildren, []);

            if (children.length) {
                result.push({...item, data: item.data, children} as ListTreeItemType<T>);
            } else if (filterFn(item.data)) {
                result.push({...item, data: item.data, children: []});
            }
        } else if (isTreeItemGuard(item) && filterFn(item.data)) {
            const {children: _children, ...newItem} = item;
            result.push(newItem);
        } else if (!isTreeItemGuard(item) && filterFn(item)) {
            result.push(item);
        }

        return result;
    };

    const res = items.reduce<ListItemType<T>[]>(getChildren, []);

    return res;
}
