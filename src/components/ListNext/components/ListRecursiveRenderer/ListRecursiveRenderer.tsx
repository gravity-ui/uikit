import React from 'react';

import {block} from '../../../utils/cn';
import type {ListItemId, ListItemType} from '../../types';
import {getListItemId} from '../../utils/getListItemId';

import './ListRecursiveRenderer.scss';

const b = block('list-recursive-renderer');

export interface ListRecursiveRendererProps<T> {
    itemSchema: ListItemType<T>;
    expanded?: Record<ListItemId, boolean>;
    children(id: ListItemId): React.JSX.Element;
    index: number;
    parentId?: string;
    className?: string;
    getId?(item: T): ListItemId;
    style?: React.CSSProperties;
}

export function ListItemRecursiveRenderer<T>({
    itemSchema,
    index,
    parentId,
    ...props
}: ListRecursiveRendererProps<T>) {
    const groupedId = getListItemId(index, parentId);
    const id =
        typeof props.getId === 'function'
            ? props.getId(itemSchema.data)
            : itemSchema.id || groupedId;

    const node = props.children(id);

    if (itemSchema.children) {
        const isExpanded = props.expanded && id in props.expanded ? props.expanded[id] : true;

        return (
            <ul style={props.style} className={b(null, typeof props.className)} role="group">
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
