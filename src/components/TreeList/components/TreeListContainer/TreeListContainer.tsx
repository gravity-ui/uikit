import React from 'react';

import {ListContainerView} from '../../../useList';
import {ListItemRecursiveRenderer} from '../../../useList/components/ListRecursiveRenderer/ListRecursiveRenderer';
import type {TreeListRenderContainerProps} from '../../types';

export const TreeListContainer = <T,>({
    qa,
    items,
    id,
    containerRef,
    expandedById,
    renderItem,
    className,
    idToFlattenIndex,
}: TreeListRenderContainerProps<T> & {className?: string}) => {
    return (
        <ListContainerView ref={containerRef} className={className} id={id} qa={qa}>
            {items.map((itemSchema, index) => (
                <ListItemRecursiveRenderer
                    key={index}
                    idToFlattenIndex={idToFlattenIndex}
                    itemSchema={itemSchema}
                    index={index}
                    expandedById={expandedById}
                >
                    {renderItem}
                </ListItemRecursiveRenderer>
            ))}
        </ListContainerView>
    );
};
