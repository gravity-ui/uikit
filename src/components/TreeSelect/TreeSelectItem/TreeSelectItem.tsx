import React from 'react';

import {ListItemView, ListItemViewProps} from '../../useList';
import {block} from '../../utils/cn';

import './TreeSelectItem.scss';

const b = block('tree-select-item');

export interface TreeSelectItemProps extends Omit<ListItemViewProps, 'as'> {
    as?: 'div' | 'li';
    itemClassName?: string;
}

export const TreeSelectItem = React.forwardRef(function TreeSelectItem(
    {as = 'div', className, itemClassName, ...props}: TreeSelectItemProps,
    ref?: any,
) {
    const Tag: React.ElementType = as;

    return (
        <Tag ref={ref} className={b(null, className)}>
            <ListItemView as={as} {...props} className={itemClassName} />
        </Tag>
    );
});
