import React from 'react';

import './CustomLoader.scss';
import {Loader} from 'src/components/Loader/Loader';
import {
    SelectOption,
    SelectProps,
    SelectRenderOption,
    SelectRenderOptionViewParams,
} from 'src/components/Select/types';

const LOADER = 'LOADER';
const LOADER_PERSISTENT = 'LOADER_PERSISTENT';
const loaderOption = {value: LOADER, content: LOADER, disabled: true};
const loaderPersistentOption = {
    value: LOADER_PERSISTENT,
    content: LOADER_PERSISTENT,
    disabled: true,
};

const CustomLoader = (props: {onRendered?: () => void}) => {
    React.useEffect(() => {
        props.onRendered?.();
    }, []);
    return (
        <div className="custom-loader-container">
            <Loader />
        </div>
    );
};

export type UseSelectLoading = {
    onFetch?: () => void | Promise<unknown>;
    loading?: boolean;
} & Pick<SelectProps, 'options' | 'renderOption' | 'filterOption'>;

export const useSelectLoading = ({
    options = [],
    renderOption,
    onFetch,
    loading,
    filterOption,
}: UseSelectLoading) => {
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
            promise.finally(() => setIsFetching(false));
        }
    }, [onFetch, isFetching]);

    const handleRenderOption: SelectRenderOption<any> = React.useCallback(
        (option: SelectOption, viewParams: SelectRenderOptionViewParams) => {
            switch (option.content) {
                case LOADER:
                    return <CustomLoader onRendered={handleFetch} />;
                case LOADER_PERSISTENT:
                    return <CustomLoader />;
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
