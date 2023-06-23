import React from 'react';

import {Button} from '../../../Button';
import {blockNew} from '../../../utils/cn';
import type {PageItem, PaginationProps, PaginationSize} from '../../types';

import './PaginationPage.scss';

const b = blockNew('pagination-page');

type Props = {
    item: PageItem;
    size: PaginationSize;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    className?: string;
};

export const PaginationPage = ({item, size, pageSize, className, onUpdate}: Props) => {
    if (item.simple) {
        return <div className={b('simple', {size}, className)}>{item.page}</div>;
    }

    const view = item.current ? 'normal' : 'flat';

    return (
        <Button
            size={size}
            key={view}
            view={view}
            selected={item.current}
            className={className}
            onClick={() => onUpdate(item.page, pageSize)}
        >
            {item.page}
        </Button>
    );
};
