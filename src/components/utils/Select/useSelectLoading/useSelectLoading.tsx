import React from 'react';

import type {
    SelectBasicProps,
    SelectOption,
    SelectRenderOption,
    SelectRenderOptionViewParams,
} from '../../../Select/types';
import {useMountedState} from '../../useMountedState';

import {SelectLoadingIndicator} from './SelectLoadingIndicator';

const LOADER = 'LOADER';
const LOADER_PERSISTENT = 'LOADER_PERSISTENT';
const loaderOption = {value: LOADER, content: LOADER, disabled: true};
const loaderPersistentOption = {
    value: LOADER_PERSISTENT,
    content: LOADER_PERSISTENT,
    disabled: true,
};

export type UseSelectLoading = {
    onFetch?: () => void | Promise<unknown>;
    loading?: boolean;
} & Pick<SelectBasicProps, 'options' | 'renderOption' | 'filterOption'>;

export const useSelectLoading = ({
    options = [],
    renderOption,
    onFetch,
    loading,
    filterOption,
}: UseSelectLoading) => {
    const isMounted = useMountedState();
    const [isFetching, setIsFetching] = React.useState(false);
    const localOptions = React.useMemo(
        () => (onFetch ? [...options, loaderOption] : options),
        [options, onFetch],
    );

    const handleFetch = React.useCallback(() => {
        if (isFetching) return;

        const promise = onFetch?.();
        if (promise) {
            setIsFetching(true);
            promise.finally(() => {
                if (!isMounted()) {
                    return;
                }

                setIsFetching(false);
            });
        }
    }, [onFetch, isFetching, isMounted]);

    const handleRenderOption: SelectRenderOption<any> = React.useCallback(
        (option: SelectOption, viewParams: SelectRenderOptionViewParams) => {
            switch (option.content) {
                case LOADER:
                    return <SelectLoadingIndicator onRendered={handleFetch} />;
                case LOADER_PERSISTENT:
                    return <SelectLoadingIndicator />;
                default:
                    return (
                        renderOption?.(option, viewParams) || (option.content as React.ReactElement)
                    );
            }
        },
        [handleFetch, renderOption],
    );

    const handleFilterOption = React.useMemo(
        () => (loading ? () => true : filterOption),
        [loading, filterOption],
    );

    return {
        options: loading ? [loaderPersistentOption] : localOptions,
        renderOption: handleRenderOption,
        filterOption: handleFilterOption,
    };
};
