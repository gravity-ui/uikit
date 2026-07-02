'use client';

import {Button} from '../../../Button';
import {block} from '../../../utils/cn';
import {getPaginationPageQa} from '../../constants';
import type {PageItem, PaginationProps, PaginationSize} from '../../types';
import {buildComponentProps, shouldUpdateOnPaginationItemClick} from '../../utils';

import './PaginationPage.scss';

const b = block('pagination-page');

type Props = {
    item: PageItem;
    size: PaginationSize;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    className?: string;
    navigationComponent?: PaginationProps['navigationComponent'];
    getItemProps?: PaginationProps['getItemProps'];
};

export const PaginationPage = ({
    item,
    size,
    pageSize,
    className,
    onUpdate,
    navigationComponent,
    getItemProps,
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
        component: navigationComponent,
        item,
        getItemProps,
        page: item.page,
    });

    return (
        <Button
            {...componentProps}
            size={size}
            key={view}
            view={view}
            selected={item.current}
            className={className}
            onClick={(event) => {
                if (shouldUpdateOnPaginationItemClick(event, Boolean(navigationComponent))) {
                    onUpdate(item.page, pageSize);
                }
            }}
            qa={qa}
            aria-current={navigationComponent && item.current ? 'page' : undefined}
        >
            {item.page}
        </Button>
    );
};
