'use client';

import {Button} from '../../../Button';
import {block} from '../../../utils/cn';
import {getPaginationPageQa} from '../../constants';
import type {PageItem, PaginationProps, PaginationSize} from '../../types';

import './PaginationPage.scss';

const b = block('pagination-page');

type Props = {
    item: PageItem;
    size: PaginationSize;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    className?: string;
};

export const PaginationPage = ({item, size, pageSize, className, onUpdate}: Props) => {
    const qa = getPaginationPageQa(item.page);
    if (item.simple) {
        return (
            <div data-qa={qa} className={b('simple', {size}, className)}>
                {item.page}
            </div>
        );
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
            qa={qa}
        >
            {item.page}
        </Button>
    );
};
