import type {
    ListFlattenItemType,
    ListItemId,
    ListItemType,
    ListState,
    ListTreeItemType,
    ParsedState,
} from '../types';

import {getListItemId} from './getListItemId';
import {getGroupItemId, parseGroupItemId} from './groupItemId';
import {isTreeItemGuard} from './isTreeItemGuard';

interface TraverseItemProps<T> {
    item: ListFlattenItemType<T>;
    index: number;
}
interface TraverseTreeItemProps<T> {
    /**
     * For example T is entity type with id what represents db id
     * So now you can use it id as a list item id in internal state
     */
    getId?(item: T): ListItemId;
    item: ListTreeItemType<T>;
    index: number;
    parentId?: ListItemId;
    parentGroupedId?: string;
}

type ListParsedStateResult<T> = ParsedState<T> & {
    initialState: Pick<ListState, 'disabledById' | 'expandedById' | 'selectedById'>;
};

export function getListParsedState<T>(
    items: ListItemType<T>[],
    /**
     * For example T is entity type with id what represents db id
     * So now you can use it id as a list item id in internal state
     */
    getId?: (item: T) => ListItemId,
): ListParsedStateResult<T> {
    if (process.env.NODE_ENV !== 'production') {
        console.time('getListParsedState');
    }

    const result: ListParsedStateResult<T> = {
        itemsById: {},
        groupsState: {},
        itemsState: {},
        initialState: {
            disabledById: {},
            selectedById: {},
            expandedById: {},
        },
    };

    const traverseItem = ({item, index}: TraverseItemProps<T>) => {
        const id = getListItemId({groupedId: String(index), item, getId});

        result.itemsById[id] = item;

        if (!result.itemsState[id]) {
            result.itemsState[id] = {
                indentation: 0,
            };
        }

        if (item && typeof item === 'object') {
            if ('selected' in item && typeof item.selected === 'boolean') {
                result.initialState.selectedById[id] = item.selected;
            }

            if ('disabled' in item && typeof item.disabled === 'boolean') {
                result.initialState.disabledById[id] = item.disabled;
            }
        }
    };

    const traverseTreeItem = ({
        item,
        index,
        parentGroupedId,
        parentId,
    }: TraverseTreeItemProps<T>) => {
        const groupedId = getGroupItemId(index, parentGroupedId);
        const id = getListItemId({groupedId, item, getId});

        if (parentId) {
            result.groupsState[parentId].childrenIds.push(id);
        }

        result.itemsById[id] = item.data;

        if (!result.itemsState[id]) {
            result.itemsState[id] = {
                indentation: 0,
            };
        }

        if (typeof parentId !== 'undefined') {
            result.itemsState[id].parentId = parentId;
        }

        if (typeof item.selected !== 'undefined') {
            result.initialState.selectedById[id] = item.selected;
        }

        if (typeof item.disabled !== 'undefined') {
            result.initialState.disabledById[id] = item.disabled;
        }

        if (groupedId) {
            result.itemsState[id].indentation = parseGroupItemId(groupedId).length - 1;
        }

        if (item.children) {
            result.groupsState[id] = {
                childrenIds: [],
            };

            if (typeof item.expanded !== 'undefined') {
                result.initialState.expandedById[id] = item.expanded;
            }

            item.children.forEach((treeItem, index) => {
                traverseTreeItem({
                    item: treeItem,
                    index,
                    parentGroupedId: groupedId,
                    parentId: id,
                });
            });
        }
    };

    items.forEach((item, index) =>
        isTreeItemGuard(item) ? traverseTreeItem({item, index}) : traverseItem({item, index}),
    );

    if (process.env.NODE_ENV !== 'production') {
        console.timeEnd('getListParsedState');
    }

    return result;
}
