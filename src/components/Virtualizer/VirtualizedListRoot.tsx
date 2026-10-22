'use client';

import * as React from 'react';

import type {ListVirtualizedRootProps} from '../List/VirtualizationContext';

import {Virtualizer} from './Virtualizer';
import type {VirtualizerApi} from './Virtualizer';

const subscribeToNothing = () => () => {};

/** False on the server and while the page hydrates: the window needs a viewport */
function useViewportAvailable() {
    return React.useSyncExternalStore(
        subscribeToNothing,
        () => true,
        () => false,
    );
}

/**
 * The root renderer of the list under virtualization, a chunk of its own: tanstack is pulled in here
 * only. The list root and the scroll container are one element; a row is wrapped in a positioned
 * role="presentation" div and measured through it
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
