import React from 'react';

import flatMap from 'lodash/flatMap';

import {useInfinityFetch} from '../../../utils/Select/useSelectInfinityFetch/useInfinityFetch';
import {useSelectLoading} from '../../../utils/Select/useSelectLoading/useSelectLoading';
import {SelectBasic} from '../../Select';
import type {SelectAsyncProps} from '../../types';

export const SelectAsync = React.forwardRef<HTMLButtonElement, SelectAsyncProps>(
    function SelectAsync<Option = any, Pagination = any>(
        props: SelectAsyncProps<Option, Pagination>,
        ref: React.Ref<HTMLButtonElement>,
    ) {
        const {options: fetcher} = props;

        const {responses, onFetchInfinity, isLoadingInitial} = useInfinityFetch({
            fetcher,
        });

        const mappedOptions = React.useMemo(
            () => flatMap(responses, ({response}) => response),
            [responses],
        );

        const asyncProps = useSelectLoading({
            options: mappedOptions,
            renderOption: props.renderOption,
            onFetch: onFetchInfinity,
            loading: isLoadingInitial,
        });
        return <SelectBasic {...props} {...asyncProps} ref={ref} />;
    },
);
