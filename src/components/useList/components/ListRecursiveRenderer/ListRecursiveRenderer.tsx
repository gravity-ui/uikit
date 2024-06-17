import React from 'react';

import {block} from '../../../utils/cn';
import type {ItemSchema, ListItemId} from '../../types';

import './ListRecursiveRenderer.scss';

const b = block('list-recursive-renderer');

export interface ListRecursiveRendererProps {
    itemSchema: ItemSchema;
    className?: string;
    style?: React.CSSProperties;
    children(id: ListItemId, index: number): React.JSX.Element;
}

// Saves the nested html structure for tree data structure
export function ListItemRecursiveRenderer({itemSchema, ...props}: ListRecursiveRendererProps) {
    const id = itemSchema.id;

    const node = props.children(id, itemSchema.index);

    if (itemSchema.children) {
        return (
            <ul style={props.style} className={b(null, props.className)} role="group">
                {node}
                {itemSchema.children.map((item, index) => (
                    <ListItemRecursiveRenderer itemSchema={item} key={index} {...props} />
                ))}
            </ul>
        );
    }

    return node;
}
