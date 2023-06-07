import React from 'react';

import type {Fetcher, PaginationResponse} from './types';

export const useInfinityFetch = <Response, Pagination>({
    fetcher,
}: {
    fetcher: Fetcher<Response, Pagination>;
}) => {
    const mounted = React.useRef(false);
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
            if (!mounted.current) {
                return;
            }

            setIsLoadingInitial(false);
            setResps([resp]);
        });
    }, [fetcher]);

    const onFetchInfinity = React.useCallback(() => {
        if (!pagination) {
            return Promise.resolve();
        }

        setIsLoadingInfinity(true);

        return fetcher(pagination).then((resp) => {
            if (!mounted.current) {
                return;
            }

            setIsLoadingInfinity(false);
            setResps([...resps, resp]);
        });
    }, [fetcher, resps, pagination]);

    React.useEffect(() => {
        mounted.current = true;
        onFetchInitial();

        return () => {
            mounted.current = false;
        };
    }, [onFetchInitial]);

    return {
        responses: resps,
        onFetchInitial,
        onFetchInfinity: pagination ? onFetchInfinity : undefined,
        isLoadingInitial,
        isLoadingInfinity,
    };
};
