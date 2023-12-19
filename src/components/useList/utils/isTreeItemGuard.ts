import type {ListItemType, ListTreeItemType} from '../types';

export const isTreeItemGuard = <T>(item?: ListItemType<T>): item is ListTreeItemType<T> => {
    return item !== null && typeof item === 'object' && ('children' in item || 'data' in item);
};
