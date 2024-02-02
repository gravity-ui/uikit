import React from 'react';

import {ListItemView} from '../../useList';
import type {ListItemViewProps} from '../../useList';
import {block} from '../../utils/cn';

import './TreeSelectItem.scss';

const b = block('tree-select-item');

export interface TreeSelectItemProps extends Omit<ListItemViewProps, 'as'> {
    as?: 'div' | 'li';
    wrapperClassName?: string;
}

export const TreeSelectItem = React.forwardRef(function TreeSelectItem(
    {as = 'div', className, wrapperClassName, ...props}: TreeSelectItemProps,
    ref?: any,
) {
    const Tag: React.ElementType = as;

    return (
        <Tag ref={ref} className={b(null, wrapperClassName)}>
            <ListItemView as={as} {...props} className={className} />
        </Tag>
    );
});
