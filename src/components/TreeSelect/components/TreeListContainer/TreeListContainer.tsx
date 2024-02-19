import React from 'react';

import {ListContainerView} from '../../../useList';
import {ListItemRecursiveRenderer} from '../../../useList/components/ListRecursiveRenderer/ListRecursiveRenderer';
import type {TreeSelectRenderContainerProps} from '../../types';

export const TreeListContainer = <T,>({
    items,
    id,
    containerRef,
    expandedById,
    renderItem,
    className,
    idToFlattenIndex,
}: TreeSelectRenderContainerProps<T> & {className?: string}) => {
    return (
        <ListContainerView ref={containerRef} className={className} id={id}>
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
