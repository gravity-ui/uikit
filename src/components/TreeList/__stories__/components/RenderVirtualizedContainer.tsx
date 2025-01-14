import {ListContainerView, computeItemSize} from '../../../useList';
import {VirtualizedListContainer} from '../../../useList/__stories__/components/VirtualizedListContainer';
import type {TreeListContainerProps} from '../../types';

// custom container renderer example
export const RenderVirtualizedContainer = <T,>({
    id,
    qa,
    containerRef,
    list,
    renderItem,
    size,
    className,
}: TreeListContainerProps<T>) => {
    return (
        <ListContainerView
            qa={qa}
            fixedHeight
            id={id}
            ref={containerRef}
            className={className}
            extraProps={{style: {padding: 0}}}
        >
            <VirtualizedListContainer
                items={list.structure.visibleFlattenIds}
                itemSize={(_index) => computeItemSize(size)}
            >
                {renderItem}
            </VirtualizedListContainer>
        </ListContainerView>
    );
};
