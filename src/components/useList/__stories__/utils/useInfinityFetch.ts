import {useCallback, useEffect, useState} from 'react';

import type {ListItemType} from '../../types';

import {createRandomizedData} from './makeData';

function fetchData<T>({
    itemsCount = 20,
    timeout = 1000,
    withChildren = false,
}: {
    itemsCount: number;
    timeout?: number;
    withChildren?: boolean;
}) {
    return new Promise<ListItemType<T>[]>((res) =>
        setTimeout(
            () => res(createRandomizedData({num: itemsCount, depth: withChildren ? undefined : 0})),
            timeout,
        ),
    );
}

export function useInfinityFetch<T>(itemsCount = 10, withChildren = false) {
    const [data, setData] = useState<ListItemType<T>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [canFetchMore, setCanFetchMore] = useState(true);

    const onFetchMore = useCallback(async () => {
        setIsLoading(true);
        setCanFetchMore(false);

        try {
            const newData = await fetchData<T>({itemsCount, withChildren});
            setData((x) => x.concat(newData));
        } finally {
            setIsLoading(false);
            setCanFetchMore(true);
        }
    }, [itemsCount, withChildren]);

    useEffect(() => {
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
