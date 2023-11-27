import type {ListItemType} from '../types';

export function defaultFilterItems<T>(
    items: ListItemType<T>[],
    filterFn: (data: T) => boolean,
): ListItemType<T>[] {
    if (process.env.NODE_ENV !== 'production') {
        console.time('defaultFilterItems');
    }

    const getChildren = (result: ListItemType<T>[], item: ListItemType<T>) => {
        if (item.children) {
            const children = item.children.reduce(getChildren, []);

            if (children.length) {
                result.push({data: item.data, children});
            } else if (filterFn(item.data)) {
                result.push({data: item.data, children: []});
            }
        } else if (filterFn(item.data)) {
            result.push({data: item.data});
        }

        return result;
    };

    const res = items.reduce<ListItemType<T>[]>(getChildren, []);

    if (process.env.NODE_ENV !== 'production') {
        console.timeEnd('defaultFilterItems');
    }
    return res;
}
