import React from 'react';
import {Button} from '../../../Button';
import {PageItem, PaginationSize, PaginationProps} from '../../types';
import {blockNew} from '../../../utils/cn';

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

    return (
        <Button
            size={size}
            view={item.current ? 'normal' : 'flat'}
            selected={item.current}
            className={className}
            onClick={() => onUpdate(item.page, pageSize)}
        >
            {item.page}
        </Button>
    );
};
