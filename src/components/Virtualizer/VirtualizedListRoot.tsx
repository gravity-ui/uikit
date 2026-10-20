'use client';

import * as React from 'react';

import type {ListVirtualizedRootProps} from '../List/VirtualizationContext';

import {Virtualizer} from './Virtualizer';
import type {VirtualizerApi} from './Virtualizer';

const subscribeToNothing = () => () => {};

/**
 * False on the server and while the page hydrates, true after that and in a render on the client
 * alone: the window needs a viewport to be measured against
 */
function useViewportAvailable() {
    return React.useSyncExternalStore(
        subscribeToNothing,
        () => true,
        () => false,
    );
}

/**
 * The root renderer of the list under virtualization: tanstack is pulled in here only, and
 * ListVirtualizer loads this module as a chunk of its own. The list root and the scroll container
 * are one element; a row is wrapped in a positioned role="presentation" div and measured through
 * it. On the server the first rows are rendered instead of an empty window, and the hydration
 * matches them before the window takes over
 */
export function VirtualizedListRoot({
    containerProps,
    fallback,
    getItemSize,
    measure,
    overscan,
    persistedIndexes: persistedRowIndexes,
    renderRow,
    rowIds,
    setScrollToIndex,
}: ListVirtualizedRootProps) {
    const {ref, ...restContainerProps} = containerProps;
    const viewportAvailable = useViewportAvailable();

    const apiRef = React.useCallback(
        (api: VirtualizerApi | null) => {
            setScrollToIndex(api ? (index) => api.scrollToIndex(index) : null);
        },
        [setScrollToIndex],
    );

    const persistedIndexes = React.useMemo(
        () => persistedRowIndexes.map((index) => [index]),
        [persistedRowIndexes],
    );

    if (!viewportAvailable) {
        return <React.Fragment>{fallback}</React.Fragment>;
    }

    return (
        <Virtualizer
            {...restContainerProps}
            apiRef={apiRef}
            containerRef={ref}
            count={rowIds.length}
            getItemKey={(index) => rowIds[index]}
            getItemSize={getItemSize}
            overscan={overscan}
            measure={measure}
            persistedIndexes={persistedIndexes}
            renderRow={({index}) => renderRow(rowIds[index])}
        />
    );
}
