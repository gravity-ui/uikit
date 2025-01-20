'use client';

import {ChevronLeft, ChevronRight, ChevronsLeft} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {Icon} from '../../../Icon';
import {PaginationQa} from '../../constants';
import i18n from '../../i18n';
import type {ButtonItem, PaginationProps, PaginationSize} from '../../types';

type Props = {
    item: ButtonItem;
    size: PaginationSize;
    page: NonNullable<PaginationProps['page']>;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    compact: NonNullable<PaginationProps['compact']>;
    className?: string;
} & Pick<PaginationProps, 'onUpdate' | 'itemWrapper'>;

export const PaginationButton = ({
    item,
    size,
    className,
    page,
    pageSize,
    onUpdate,
    compact,
    itemWrapper,
}: Props) => {
    let currentPage: number;
    const buttonProps: ButtonProps = {size, className, view: 'outlined', disabled: item.disabled};

    switch (item.action) {
        case 'first':
            currentPage = 1;
            buttonProps.title = compact ? i18n('button_first') : undefined;
            buttonProps.qa = PaginationQa.PaginationButtonFirst;
            buttonProps.children = [
                <Icon data={ChevronsLeft} size="16" key={item.action} />,
                compact ? undefined : i18n('button_first'),
            ];
            break;
        case 'previous':
            currentPage = page - 1;
            buttonProps.title = compact ? i18n('button_previous') : undefined;
            buttonProps.qa = PaginationQa.PaginationButtonPrevious;
            buttonProps.children = [
                <Icon data={ChevronLeft} size="16" key={item.action} />,
                compact ? undefined : i18n('button_previous'),
            ];
            break;
        case 'next':
            currentPage = page + 1;
            buttonProps.title = compact ? i18n('button_next') : undefined;
            buttonProps.qa = PaginationQa.PaginationButtonNext;
            buttonProps.children = [
                <Icon data={ChevronRight} size="16" key={item.action} />,
                compact ? undefined : i18n('button_next'),
            ];
            break;
    }
    buttonProps.onClick = () => onUpdate?.(currentPage, pageSize);

    if (itemWrapper) {
        return itemWrapper({
            page: currentPage,
            pageSize,
            item: <Button {...buttonProps} />,
        });
    } else {
        return <Button {...buttonProps} />;
    }
};
