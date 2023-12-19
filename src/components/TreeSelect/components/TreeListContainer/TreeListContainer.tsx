import React from 'react';

import type {RenderContainerProps} from 'src/components/TreeSelect/types';

import {ListContainerView} from '../../../useList';
import {ListItemRecursiveRenderer} from '../../../useList/components/ListRecursiveRenderer/ListRecursiveRenderer';

export const TreeListContainer = <T,>({
    items,
    id,
    containerRef,
    expandedById,
    renderItem,
    className,
}: RenderContainerProps<T> & {className?: string}) => {
    return (
        <ListContainerView ref={containerRef} className={className} id={id}>
            {items.map((itemSchema, index) => (
                <ListItemRecursiveRenderer
                    key={index}
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
