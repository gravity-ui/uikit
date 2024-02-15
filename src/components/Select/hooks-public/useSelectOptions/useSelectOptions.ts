import React from 'react';

import get from 'lodash/get';

import type {SelectProps} from '../../types';
import {FLATTEN_KEY, getFilteredFlattenOptions, getFlattenOptions} from '../../utils';
import type {FlattenOption} from '../../utils';

export interface UseSelectOptionsProps<T = any> {
    options: NonNullable<SelectProps<T>['options']> | FlattenOption[];
    filter?: string;
    filterable?: boolean;
    filterOption?: SelectProps['filterOption'];
}

function isFlattenOptions(options: UseSelectOptionsProps['options']): options is FlattenOption[] {
    return options.some((option) => get(option, ['data', FLATTEN_KEY]));
}

export function useSelectOptions<T extends any>(props: UseSelectOptionsProps<T>) {
    const {filter = '', filterable, filterOption} = props;
    const options = React.useMemo(() => {
        return isFlattenOptions(props.options) ? props.options : getFlattenOptions(props.options);
    }, [props.options]);
    const filteredOptions = React.useMemo(() => {
        return filterable ? getFilteredFlattenOptions({options, filter, filterOption}) : options;
    }, [filter, filterable, filterOption, options]);

    return {options, filteredOptions};
}
