import * as React from 'react';

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
     * Override only logic with item filtration
     */
    filterItem?(value: string, item: T): boolean;
    onFilterChange?(value: string): void;
    debounceTimeout?: number;
    initialFilterValue?: string;
}

/**
 * Ready-to-use logic for filtering tree-like data structures
 *
 * ```tsx
 * const {item: filteredItems,...listFiltration} = useListFIlter({items});
 * const list = useList({items: filteredItems});
 *
 * <TextInput {...listFiltration} />
 * ```
 */
export function useListFilter<T>({
    items: externalItems,
    initialFilterValue = '',
    filterItem,
    onFilterChange,
    filterItems,
    debounceTimeout = 300,
}: UseListFilterProps<T>) {
    const filterRef = React.useRef<HTMLInputElement>(null);
    const [filter, setFilter] = React.useState(initialFilterValue);
    const [prevItems, setPrevItems] = React.useState(externalItems);
    const [filteredItems, setFilteredItems] = React.useState(externalItems);

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

    if (externalItems !== prevItems) {
        setFilteredItems(filterItemsFn(filter, externalItems));
        setPrevItems(externalItems);
    }

    const debouncedFn = React.useCallback(
        debounce((value) => setFilteredItems(filterItemsFn(value, externalItems)), debounceTimeout),
        [setFilteredItems, filterItemsFn, externalItems, debounceTimeout],
    );

    const {onFilterUpdate, reset} = React.useMemo(() => {
        return {
            reset: () => {
                setFilter(initialFilterValue);
                onFilterChange?.(initialFilterValue);
                debouncedFn(initialFilterValue);
            },
            onFilterUpdate: (nextFilterValue: string) => {
                setFilter(nextFilterValue);
                onFilterChange?.(nextFilterValue);
                debouncedFn(nextFilterValue);
            },
        };
    }, [debouncedFn, initialFilterValue, onFilterChange]);

    return {
        filterRef,
        filter,
        reset,
        items: filteredItems,
        onFilterUpdate,
    };
}
