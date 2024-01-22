import React from 'react';

import debounce from 'lodash/debounce';

import type {ListItemType} from '../types';
import {defaultFilterItems} from '../utils/defaultFilterItems';

function defaultFilterFn<T>(value: string | undefined, item: T): boolean {
    return item && typeof item === 'object' && 'title' in item && typeof item.title === 'string'
        ? item.title.toLowerCase().includes((value || '').toLowerCase())
        : true;
}

interface UseListFilterProps<T> {
    items: ListItemType<T>[];
    /**
     * Override default filtration logic
     */
    filterItems?(value: string, items: ListItemType<T>[]): ListItemType<T>[];
    /**
     * Override only logic with item affiliation
     */
    filterItem?(value: string, item: T): boolean;
    debounceTimeout?: number;
    initialFilterValue?: string;
}

/**
 * Ready-to-use logic for filtering tree-like data structures
 * ```tsx
 * const {item: filteredItems,...listFiltration} = useListFIlter({items});
 * const list = useList({items: filteredItems});
 *
 * <TextInput {...listFiltration} />
 * ```
 * @returns -
 */
export function useListFilter<T>({
    items: externalItems,
    initialFilterValue = '',
    filterItem,
    filterItems,
    debounceTimeout = 300,
}: UseListFilterProps<T>) {
    const filterRef = React.useRef<HTMLInputElement>(null);
    const [filter, setFilter] = React.useState(initialFilterValue);
    const [prevItems, setPrevItems] = React.useState(externalItems);
    const [items, setItems] = React.useState(externalItems);

    const filterItemsFn = React.useCallback(
        (nextFilterValue: string, items: ListItemType<T>[]) => {
            if (filterItems) {
                return () => filterItems(nextFilterValue, items);
            }

            if (nextFilterValue) {
                const filterItemFn = filterItem || defaultFilterFn;

                return () =>
                    defaultFilterItems(items, (item) => filterItemFn(nextFilterValue, item));
            }

            return () => items;
        },
        [filterItem, filterItems],
    );

    // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
    if (externalItems !== prevItems) {
        setItems(filterItemsFn(filter, externalItems));
        setPrevItems(externalItems);
    }

    const debouncedFn = React.useCallback(
        debounce((value) => setItems(filterItemsFn(value, externalItems)), debounceTimeout),
        [setItems, filterItemsFn, debounceTimeout],
    );

    const {onFilterUpdate, reset} = React.useMemo(() => {
        return {
            reset: () => {
                setFilter(initialFilterValue);
                debouncedFn(initialFilterValue);
            },
            onFilterUpdate: (nextFilterValue: string) => {
                setFilter(nextFilterValue);
                debouncedFn(nextFilterValue);
            },
        };
    }, [debouncedFn, initialFilterValue]);

    return {
        filterRef,
        filter,
        reset,
        items,
        onFilterUpdate,
    };
}
