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
    const {filterRef, filter, setFilter, formatInternalItems, size} = useListContext<T>();

    const handleUpdate = React.useMemo(() => {
        const runFiltration = (nextFilterValue: string) => {
            if (filterItems) {
                return (initialItems: ListItemType<T>[]) =>
                    filterItems(nextFilterValue, initialItems);
            }

            if (nextFilterValue) {
                return (initialItems: ListItemType<T>[]) =>
                    defaultFilterItems(initialItems, (item) =>
                        (filterItem || defaultFilterFn)(nextFilterValue, item),
                    );
            }

            // reset initial data
            return (initialItems: ListItemType<T>[]) => initialItems;
        };

        return debounce((value) => formatInternalItems(runFiltration(value)), debounceTimeout);
    }, [filterItem, filterItems, formatInternalItems, debounceTimeout]);

    React.useEffect(() => {
        handleUpdate(filter);
    }, [filter, handleUpdate]);

    return <TextInput {...props} size={size} value={filter} ref={filterRef} onUpdate={setFilter} />;
}
