import * as React from 'react';

export interface Loadable {
    /** Whether the items are currently loading. */
    loading?: boolean;
    /** Handler that is called when more items should be loaded, e.g. while scrolling near the bottom. */
    onLoadMore?: () => void;
}

export interface LoadMoreOptions extends Loadable {
    /**
     * The amount of offset from bottom that should trigger load more.
     * The value is multiplied to the size of the visible area.
     *
     * @default 1
     */
    scrollOffset?: number;
}

export function useLoadMore(
    scrollContainerRef: React.RefObject<HTMLElement | null>,
    options: LoadMoreOptions,
) {
    const {onLoadMore, loading, scrollOffset = 1} = options;

    const isLoadingRef = React.useRef(loading);
    React.useEffect(() => {
        const element = scrollContainerRef.current;
        if (!element || typeof onLoadMore !== 'function') {
            return undefined;
        }

        const onScroll = () => {
            if (isLoadingRef.current) {
                return;
            }

            const shouldLoadMore =
                element.scrollHeight - element.scrollTop - element.clientHeight <
                element.clientHeight * scrollOffset;
            if (shouldLoadMore) {
                isLoadingRef.current = true;
                onLoadMore();
            }
        };
        element.addEventListener('scroll', onScroll);
        return () => {
            element.removeEventListener('scroll', onScroll);
        };
    }, [scrollContainerRef, onLoadMore, scrollOffset]);

    const prevLoadingPropRef = React.useRef(loading);
    React.useLayoutEffect(() => {
        if (loading !== prevLoadingPropRef.current) {
            isLoadingRef.current = loading;
            prevLoadingPropRef.current = loading;
        }

        const element = scrollContainerRef.current;
        if (!element || typeof onLoadMore !== 'function') {
            return;
        }

        const shouldLoadMore =
            !isLoadingRef.current && element.scrollHeight === element.clientHeight;
        if (shouldLoadMore) {
            isLoadingRef.current = true;
            onLoadMore();
        }
    }, [loading, onLoadMore, scrollContainerRef]);
}
