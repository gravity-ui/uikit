import React from 'react';

import debounce from 'lodash/debounce';

import type {ListItemType} from '../types';
import {defaultFilterItems} from '../utils/defaultFilterItems';

function defaultFilterFn<T>(value: string, item: T): boolean {
    return item && typeof item === 'object' && 'title' in item && typeof item.title === 'string'
        ? item.title.includes(value)
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
 * const [listParsedState, listState] = useList({items: filteredItems});
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

    if (externalItems !== prevItems) {
        setItems(filterItemsFn(filter, externalItems));
        setPrevItems(externalItems);
    }

    const reset = React.useCallback(() => {
        setFilter(initialFilterValue);
        setItems(externalItems);
    }, [externalItems, initialFilterValue]);

    const onChange = React.useMemo(() => {
        const debouncedFn = debounce(
            (value) => setItems(filterItemsFn(value, externalItems)),
            debounceTimeout,
        );

        return (nextFilterValue: string) => {
            setFilter(nextFilterValue);
            debouncedFn(nextFilterValue);
        };
    }, [debounceTimeout, externalItems, filterItemsFn]);

    return {
        filterRef,
        filter,
        reset,
        items,
        onChange,
    };
}
