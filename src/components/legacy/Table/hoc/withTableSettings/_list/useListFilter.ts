import * as React from 'react';

import debounce from 'lodash/debounce';

interface UseListFilterProps<T> {
    items: T[];
    filterItem(value: string, item: T): boolean;
}

/**
 * The filter value and the items that match it. The items are filtered a tick later than the value
 * changes
 */
export function useListFilter<T>({items: externalItems, filterItem}: UseListFilterProps<T>) {
    const [filter, setFilter] = React.useState('');
    const [prevItems, setPrevItems] = React.useState(externalItems);
    const [filteredItems, setFilteredItems] = React.useState(externalItems);

    const filterItemsFn = React.useCallback(
        (nextFilterValue: string, items: T[]) => {
            if (nextFilterValue) {
                return () => items.filter((item) => filterItem(nextFilterValue, item));
            }

            return () => items;
        },
        [filterItem],
    );

    if (externalItems !== prevItems) {
        setFilteredItems(filterItemsFn(filter, externalItems));
        setPrevItems(externalItems);
    }

    const debouncedFn = React.useCallback(
        debounce((value) => setFilteredItems(filterItemsFn(value, externalItems)), 0),
        [setFilteredItems, filterItemsFn, externalItems],
    );

    const {onFilterUpdate, reset} = React.useMemo(() => {
        return {
            reset: () => {
                setFilter('');
                debouncedFn('');
            },
            onFilterUpdate: (nextFilterValue: string) => {
                setFilter(nextFilterValue);
                debouncedFn(nextFilterValue);
            },
        };
    }, [debouncedFn]);

    return {
        filter,
        reset,
        items: filteredItems,
        onFilterUpdate,
    };
}
