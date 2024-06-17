import React from 'react';

import {ListContainerView} from '../../../useList';
import {ListItemRecursiveRenderer} from '../../../useList/components/ListRecursiveRenderer/ListRecursiveRenderer';
import type {TreeListRenderContainerProps} from '../../types';

export const TreeListContainer = <T,>({
    qa,
    id,
    containerRef,
    renderItem,
    className,
    list,
}: TreeListRenderContainerProps<T>) => {
    return (
        <ListContainerView ref={containerRef} className={className} id={id} qa={qa}>
            {list.structure.itemsSchema.map((itemSchema, index) => (
                <ListItemRecursiveRenderer key={index} itemSchema={itemSchema}>
                    {renderItem}
                </ListItemRecursiveRenderer>
            ))}
        </ListContainerView>
    );
};
