import type * as React from 'react';

import {block} from '../../../utils/cn';
import type {ListItemId, ListItemType, UseListResult} from '../../types';
import {isTreeItemGuard} from '../../utils/isTreeItemGuard';

import './ListRecursiveRenderer.scss';

const b = block('list-recursive-renderer');

export interface ListItemRecursiveRendererProps<T> {
    id: ListItemId;
    list: UseListResult<T>;
    itemSchema: ListItemType<T>;
    children(id: ListItemId, index: number): React.JSX.Element;
    className?: string;
    style?: React.CSSProperties;
}

// Saves the nested html structure for tree data structure
export function ListItemRecursiveRenderer<T>({
    id,
    itemSchema,
    list,
    ...props
}: ListItemRecursiveRendererProps<T>) {
    const node = props.children(id, list.structure.idToFlattenIndex[id]);

    if (isTreeItemGuard(itemSchema) && itemSchema.children) {
        const isExpanded =
            list.state.expandedById && id in list.state.expandedById
                ? list.state.expandedById[id]
                : true;

        return (
            <ul style={props.style} className={b(null, props.className)} role="group">
                {node}
                {isExpanded &&
                    Boolean(list.structure.groupsState[id]?.childrenIds) &&
                    itemSchema.children.map((item, index) => (
                        <ListItemRecursiveRenderer
                            list={list}
                            id={list.structure.groupsState[id].childrenIds[index]}
                            itemSchema={item}
                            key={index}
                            {...props}
                        />
                    ))}
            </ul>
        );
    }

    return node;
}
