import type {ListItemType, ParsedState} from '../types';

import {getGroupedId, parseGroupedId} from './groupedIdUtils';

export function parseDataWithChildren<T>(items: ListItemType<T>[]): ParsedState<T> {
    console.time('parseDataWithChildren');
    const result = {
        byId: {},
        groupsState: {},
        itemsState: {},
    } as ParsedState<T>;

    const traverseItems = (item: ListItemType<T>, index: number, parentId?: string) => {
        const groupedId = getGroupedId(index, parentId);
        const id = item.id || groupedId;

        result.byId[id] = item.data;

        if (!result.itemsState[id]) {
            result.itemsState[id] = {indentation: 0};
        }

        if (parentId) {
            result.itemsState[id].indentation = parseGroupedId(parentId).length;
        }

        if (item.children) {
            result.groupsState[id] = {
                childrenCount: item.children.length,
            };

            item.children.forEach((item, index) => traverseItems(item, index, groupedId));
        }
    };

    items.forEach((item, index) => traverseItems(item, index));
    console.timeEnd('parseDataWithChildren');
    return result;
}
