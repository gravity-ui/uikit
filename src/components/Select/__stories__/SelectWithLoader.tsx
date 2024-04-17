import React from 'react';

import {cn} from '../../utils/cn';
import {Select} from '../Select';
import type {SelectProps} from '../types';

import './SelectWithLoader.scss';

const b = cn('select-with-loader');

const makeOptions = (index = 0) => [
    {value: `one-${index}`, content: `one-${index}`},
    {value: `two-${index}`, content: `two-${index}`},
    {value: `three-${index}`, content: `three-${index}`},
    {value: `four-${index}`, content: `four-${index}`},
    {value: `five-${index}`, content: `five-${index}`},
    {value: `six-${index}`, content: `six-${index}`},
    {value: `seven-${index}`, content: `seven-${index}`},
    {value: `eight-${index}`, content: `eight-${index}`},
];

let index = 0;

function fetchData({timeout = 1000}: {timeout?: number} = {}) {
    return new Promise<{content: string; value: string}[]>((res) =>
        setTimeout(() => res(makeOptions(index++)), timeout),
    );
}

export function useInfinityFetch() {
    const [data, setData] = React.useState(makeOptions(index++));
    const [isLoading, setIsLoading] = React.useState(false);
    const [canFetchMore, setCanFetchMore] = React.useState(true);

    const onFetchMore = React.useCallback(async () => {
        setIsLoading(true);
        setCanFetchMore(false);

        try {
            const newData = await fetchData();
            setData((x) => [...x, ...newData]);
        } finally {
            setIsLoading(false);
            setCanFetchMore(true);
        }
    }, []);

    React.useEffect(() => {
        onFetchMore();

        // Just fetch on first render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        data,
        onFetchMore,
        canFetchMore,
        isLoading,
    };
}

export const SelectWithLoader = (args: SelectProps<string>) => {
    const {canFetchMore, data, onFetchMore} = useInfinityFetch();

    return (
        <div className={b()}>
            <Select
                {...args}
                loading
                popupWidth={300}
                options={data}
                onLoadMore={canFetchMore ? onFetchMore : undefined}
                virtualizationThreshold={10}
            />
        </div>
    );
};
