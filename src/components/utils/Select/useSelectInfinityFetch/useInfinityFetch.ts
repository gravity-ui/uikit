import React from 'react';

import {useMountedState} from '../../useMountedState';

import type {Fetcher, PaginationResponse} from './types';

export const useInfinityFetch = <Response, Pagination>({
    fetcher,
}: {
    fetcher: Fetcher<Response, Pagination>;
}) => {
    const isMounted = useMountedState();
    const [isLoadingInitial, setIsLoadingInitial] = React.useState(false);
    const [isLoadingInfinity, setIsLoadingInfinity] = React.useState(false);
    const [resps, setResps] = React.useState<PaginationResponse<Response, Pagination>[]>([]);

    const pagination = React.useMemo(
        () => resps[resps.length - 1] && resps[resps.length - 1].pagination,
        [resps],
    );

    const onFetchInitial = React.useCallback(() => {
        setIsLoadingInitial(true);

        return fetcher().then((resp) => {
            if (!isMounted()) {
                return;
            }

            setIsLoadingInitial(false);
            setResps([resp]);
        });
    }, [fetcher, isMounted]);

    const onFetchInfinity = React.useCallback(() => {
        if (!pagination) {
            return Promise.resolve();
        }

        setIsLoadingInfinity(true);

        return fetcher(pagination).then((resp) => {
            if (!isMounted()) {
                return;
            }

            setIsLoadingInfinity(false);
            setResps([...resps, resp]);
        });
    }, [fetcher, resps, pagination, isMounted]);

    React.useEffect(() => {
        onFetchInitial();
    }, [onFetchInitial]);

    return {
        responses: resps,
        onFetchInitial,
        onFetchInfinity: pagination ? onFetchInfinity : undefined,
        isLoadingInitial,
        isLoadingInfinity,
    };
};
