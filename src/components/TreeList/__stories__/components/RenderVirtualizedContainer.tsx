import React from 'react';

import {ListContainerView, computeItemSize} from '../../../useList';
import {VirtualizedListContainer} from '../../../useList/__stories__/components/VirtualizedListContainer';
import type {TreeListRenderContainerProps} from '../../types';

// custom container renderer example
export const RenderVirtualizedContainer = <T,>({
    id,
    containerRef,
    visibleFlattenIds,
    renderItem,
    size,
    className,
}: TreeListRenderContainerProps<T>) => {
    return (
        <ListContainerView
            fixedHeight
            id={id}
            ref={containerRef}
            className={className}
            extraProps={{style: {padding: 0}}}
        >
            <VirtualizedListContainer
                items={visibleFlattenIds}
                itemSize={(_index) => computeItemSize(size)}
            >
                {renderItem}
            </VirtualizedListContainer>
        </ListContainerView>
    );
};
