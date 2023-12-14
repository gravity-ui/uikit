import type {ListItemId, ListItemType, ParsedState} from '../types';

import {getListItemId, parseGroupItemId} from './getListItemId';

interface TraverseItemsProps<T> {
    /**
     * For example T is entity type with id what represents db id
     * So now you can use it id as a list item id in internal state
     */
    getId?(item: T): ListItemId;
    item: ListItemType<T>;
    index: number;
    parentId?: ListItemId;
    parentGroupedId?: string;
}

export function getListParsedState<T>(
    items: ListItemType<T>[],
    getId?: (item: T) => ListItemId,
): ParsedState<T> {
    if (process.env.NODE_ENV !== 'production') {
        console.time('getListParsedState');
    }
    const result: ParsedState<T> = {
        byId: {},
        groupsState: {},
        itemsState: {},
        lastItemId: '',
    };

    const traverseItems = ({item, index, parentGroupedId, parentId}: TraverseItemsProps<T>) => {
        const groupedId = getListItemId(index, parentGroupedId);
        const id = typeof getId === 'function' ? getId(item.data) : item.id || groupedId;

        result.byId[id] = item.data;

        if (!result.itemsState[id]) {
            result.itemsState[id] = {
                indentation: 0,
                selected: false,
                disabled: false,
            };
        }

        if (typeof parentId !== 'undefined') {
            result.itemsState[id].parentId = parentId;
        }

        if (typeof item.selected !== 'undefined') {
            result.itemsState[id].selected = item.selected;
        }

        if (typeof item.disabled !== 'undefined') {
            result.itemsState[id].disabled = item.disabled;
        }

        if (groupedId) {
            result.itemsState[id].indentation = parseGroupItemId(groupedId).length - 1;
        }

        result.lastItemId = id;

        if (item.children) {
            result.groupsState[id] = {
                expanded: item.expanded,
                childrenIds: [],
            };

            item.children.forEach((item, index) => {
                result.groupsState[id].childrenIds.push(getListItemId(index, groupedId));

                traverseItems({item, index, parentGroupedId: groupedId, parentId: id});
            });
        }
    };

    items.forEach((item, index) => traverseItems({item, index}));

    if (process.env.NODE_ENV !== 'production') {
        console.timeEnd('getListParsedState');
    }

    return result;
}
