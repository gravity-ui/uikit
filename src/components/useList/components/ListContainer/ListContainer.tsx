import type * as React from 'react';

import type {ListItemId, UseListResult} from '../../types';
import {ListContainerView} from '../ListContainerView';
import type {ListContainerViewProps} from '../ListContainerView/ListContainerView';
import {ListItemRecursiveRenderer} from '../ListRecursiveRenderer/ListRecursiveRenderer';

export type ListContainerProps<T, P extends {} = {}> = Omit<ListContainerViewProps, 'children'> & {
    list: UseListResult<T>;
    containerRef?: React.RefObject<HTMLDivElement>;
    renderItem(
        id: ListItemId,
        index: number,
        /**
         * Ability to transfer props from an overridden container render
         */
        renderContainerProps?: P,
    ): React.JSX.Element;
};

export function ListContainer<T, P extends {} = {}>({
    containerRef,
    renderItem,
    list,
    ...props
}: ListContainerProps<T, P>) {
    return (
        <ListContainerView ref={containerRef} {...props}>
            {list.structure.items.map((item, index) => (
                <ListItemRecursiveRenderer
                    key={index}
                    itemSchema={item}
                    id={list.structure.rootIds[index]}
                    list={list}
                >
                    {renderItem}
                </ListItemRecursiveRenderer>
            ))}
        </ListContainerView>
    );
}
