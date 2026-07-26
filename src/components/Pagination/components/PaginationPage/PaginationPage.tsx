'use client';

import {Button} from '../../../Button';
import {block} from '../../../utils/cn';
import {getPaginationPageQa} from '../../constants';
import type {PageItem, PaginationProps, PaginationSize} from '../../types';
import {buildComponentProps} from '../../utils';

import './PaginationPage.scss';

const b = block('pagination-page');

type Props = {
    item: PageItem;
    size: PaginationSize;
    pageSize: PaginationProps['pageSize'];
    onUpdate: PaginationProps['onUpdate'];
    className?: string;
    pageComponent?: PaginationProps['pageComponent'];
    getPageProps?: PaginationProps['getPageProps'];
};

export const PaginationPage = ({
    item,
    size,
    pageSize,
    className,
    onUpdate,
    pageComponent,
    getPageProps,
}: Props) => {
    const qa = getPaginationPageQa(item.page);
    if (item.simple) {
        return (
            <div data-qa={qa} className={b('simple', {size}, className)}>
                {item.page}
            </div>
        );
    }

    const view = item.current ? 'normal' : 'flat';
    const componentProps = buildComponentProps({
        component: pageComponent,
        item,
        getPageProps,
        page: item.page,
        pageSize,
        onUpdate,
    });

    return (
        <Button
            {...componentProps}
            size={size}
            key={view}
            view={view}
            selected={item.current}
            className={className}
            qa={qa}
        >
            {item.page}
        </Button>
    );
};
