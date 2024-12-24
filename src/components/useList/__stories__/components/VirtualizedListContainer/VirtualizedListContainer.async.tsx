import {Suspense, lazy} from 'react';

import {Loader} from '../../../../Loader';
import {Flex} from '../../../../layout';

import type {ListContainerRenderProps} from './types';

const VirtualizedListContainerOrigin = lazy(() =>
    import('./VirtualizedListContainer').then(({VirtualizedListContainer}) => ({
        default: VirtualizedListContainer,
    })),
);

export const VirtualizedListContainer = <T,>(props: ListContainerRenderProps<T>) => {
    return (
        <Suspense
            fallback={
                <Flex direction="column" centerContent grow>
                    <Loader size="l" />
                </Flex>
            }
        >
            <VirtualizedListContainerOrigin {...props} />
        </Suspense>
    );
};
