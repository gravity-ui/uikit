import React from 'react';

import debounce from 'lodash/debounce';

import {TextInput, TextInputProps} from '../../../controls';
import type {ListItemType} from '../../types';
import {defaultFilterItems} from '../../utils/defaultFilterItems';
import {useListContext} from '../ListContext/ListContext';

interface ListFilterProps<T>
    extends Omit<TextInputProps, 'ref' | 'onUpdate' | 'onChange' | 'value'> {
    /**
     * Override default filtration logic
     */
    filterItems?(value: string, items: ListItemType<T>[]): ListItemType<T>[];
    /**
     * Override only logic with item affiliation
     */
    filterItem?(value: string, item: T): boolean;
    debounceTimeout?: number;
}

const DEFAULT_DEBOUNCE_TIMEOUT = 300;

function defaultFilterFn<T>(value: string, item: T): boolean {
    return item && typeof item === 'object' && 'title' in item && typeof item.title === 'string'
        ? item.title.includes(value)
        : true;
}
export function ListFilter<T>({
    filterItem,
    filterItems,
    debounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT,
    ...props
}: ListFilterProps<T>) {
    const {refFilter, filter, onFilterChange, formatInternalItems, size} = useListContext<T>();

    const handleUpdate = React.useMemo(() => {
        const runFiltration = (nextFilterValue: string) => {
            if (filterItems) {
                return (items: ListItemType<T>[]) => filterItems(nextFilterValue, items);
            }

            if (nextFilterValue) {
                return (items: ListItemType<T>[]) =>
                    defaultFilterItems(items, (item) =>
                        (filterItem || defaultFilterFn)(nextFilterValue, item),
                    );
            }

            // reset initial data
            return (items: ListItemType<T>[]) => items;
        };

        return debounce((value) => formatInternalItems(runFiltration(value)), debounceTimeout);
    }, [filterItem, filterItems, formatInternalItems, debounceTimeout]);

    React.useEffect(() => {
        handleUpdate(filter);
    }, [filter, handleUpdate]);

    return (
        <TextInput
            {...props}
            size={size}
            value={filter}
            ref={refFilter}
            onUpdate={onFilterChange}
        />
    );
}
