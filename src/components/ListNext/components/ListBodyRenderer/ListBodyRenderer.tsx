import React from 'react';

import type {ListItemId, ListItemType} from '../../types';
import {ListItemRecursiveRenderer} from '../ListRecursiveRenderer/ListRecursiveRenderer';
import {VirtualizedListContainer} from '../VirtualizedListContainer/VirtualizedListContainer.async';

interface ListBodyRendererProps<T> {
    expanded: Record<ListItemId, boolean>;
    itemSize(index: number): number;
    virtualized?: boolean;
    items: ListItemType<T>[];
    flattenIdsOrder: ListItemId[];
    children(id: ListItemId): React.JSX.Element;
}

export const ListBodyRenderer = <T,>({
    virtualized,
    items,
    flattenIdsOrder,
    itemSize,
    expanded,
    children,
}: ListBodyRendererProps<T>) => {
    if (virtualized) {
        return (
            <VirtualizedListContainer items={flattenIdsOrder} itemSize={itemSize}>
                {children}
            </VirtualizedListContainer>
        );
    }

    return (
        <React.Fragment>
            {items.map((itemSchema, index) => (
                <ListItemRecursiveRenderer
                    itemSchema={itemSchema}
                    key={index}
                    index={index}
                    expanded={expanded}
                >
                    {children}
                </ListItemRecursiveRenderer>
            ))}
        </React.Fragment>
    );
};
