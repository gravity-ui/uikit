import React from 'react';

import {ListContainerView, computeItemSize} from '../../../ListNext';
import {VirtualizedListContainer} from '../../../ListNext/__stories__/components/VirtualizedListContainer';
import type {RenderContainerProps} from '../../types';

// custom container renderer example
export const RenderVirtualizedContainer = <T,>({
    id,
    containerRef,
    flattenIdsOrder,
    renderItem,
    size,
}: RenderContainerProps<T>) => {
    return (
        <ListContainerView virtualized id={id} ref={containerRef}>
            <VirtualizedListContainer
                items={flattenIdsOrder}
                itemSize={(_index) => computeItemSize(size)}
            >
                {renderItem}
            </VirtualizedListContainer>
        </ListContainerView>
    );
};
