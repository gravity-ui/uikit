import React from 'react';

import get from 'lodash/get';

import type {SelectProps} from '../../types';
import {FLATTEN_KEY, getFilteredFlattenOptions, getFlattenOptions} from '../../utils';
import type {FlattenOption} from '../../utils';

export type SelectOptions<T = any> = NonNullable<SelectProps<T>['options']>;

type FlattenOptions = FlattenOption[] & {
    [FLATTEN_KEY]: {
        filteredOptions: FlattenOption[];
    };
};

export interface UseSelectOptionsProps<T = any> {
    options: SelectOptions<T>;
    filter?: string;
    filterable?: boolean;
    filterOption?: SelectProps['filterOption'];
}

function isFlattenOptions(options: UseSelectOptionsProps['options']): options is FlattenOptions {
    return get(options, [FLATTEN_KEY]);
}

export function getSelectFilteredOptions<T>(options: SelectOptions<T>): SelectOptions<T> {
    if (!isFlattenOptions(options)) {
        throw Error('You should use smth');
    }

    return get(options, [FLATTEN_KEY, 'filteredOptions']);
}

export function useSelectOptions<T extends any>(props: UseSelectOptionsProps<T>): SelectOptions<T> {
    const {filter = '', filterable, filterOption} = props;
    const options = React.useMemo(() => {
        return isFlattenOptions(props.options)
            ? props.options
            : (getFlattenOptions(props.options) as FlattenOptions);
    }, [props.options]);
    const filteredOptions = React.useMemo(() => {
        return filterable ? getFilteredFlattenOptions({options, filter, filterOption}) : options;
    }, [filter, filterable, filterOption, options]);
    options[FLATTEN_KEY]['filteredOptions'] = filteredOptions;

    return options;
}
