import React from 'react';

import {block} from '../../../utils/cn';
import type {ListItemId, ListItemType, ListState} from '../../types';
import {getListItemId} from '../../utils/getListItemId';
import {getGroupItemId} from '../../utils/groupItemId';
import {isTreeItemGuard} from '../../utils/isTreeItemGuard';

import './ListRecursiveRenderer.scss';

const b = block('list-recursive-renderer');

export interface ListRecursiveRendererProps<T> extends Partial<Pick<ListState, 'expandedById'>> {
    itemSchema: ListItemType<T>;
    children(id: ListItemId, index: number): React.JSX.Element;
    index: number;
    parentId?: string;
    className?: string;
    getId?(item: T): ListItemId;
    style?: React.CSSProperties;
    idToFlattenIndex: Record<ListItemId, number>;
}

// Saves the nested html structure for tree data structure
export function ListItemRecursiveRenderer<T>({
    itemSchema,
    index,
    parentId,
    ...props
}: ListRecursiveRendererProps<T>) {
    const groupedId = getGroupItemId(index, parentId);
    const id = getListItemId({item: itemSchema, groupedId, getId: props.getId});

    const node = props.children(id, props.idToFlattenIndex[id]);

    if (isTreeItemGuard(itemSchema) && itemSchema.children) {
        const isExpanded =
            props.expandedById && id in props.expandedById ? props.expandedById[id] : true;

        return (
            <ul style={props.style} className={b(null, props.className)} role="group">
                {node}
                {isExpanded &&
                    itemSchema.children.map((item, index) => (
                        <ListItemRecursiveRenderer
                            itemSchema={item}
                            key={index}
                            index={index}
                            parentId={groupedId}
                            {...props}
                        />
                    ))}
            </ul>
        );
    }

    return node;
}
