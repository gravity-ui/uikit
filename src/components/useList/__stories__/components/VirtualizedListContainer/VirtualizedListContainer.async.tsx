import * as React from 'react';

import {Loader} from '../../../../Loader';
import {Flex} from '../../../../layout';

import type {ListContainerRenderProps} from './types';

const VirtualizedListContainerOrigin = React.lazy(() =>
    import('./VirtualizedListContainer').then(({VirtualizedListContainer}) => ({
        default: VirtualizedListContainer,
    })),
);

export const VirtualizedListContainer = <T,>(props: ListContainerRenderProps<T>) => {
    return (
        <React.Suspense
            fallback={
                <Flex direction="column" centerContent grow>
                    <Loader size="l" />
                </Flex>
            }
        >
            <VirtualizedListContainerOrigin {...props} />
        </React.Suspense>
    );
};
