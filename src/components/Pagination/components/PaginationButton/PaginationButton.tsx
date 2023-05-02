import React from 'react';
import {ChevronsLeft, ChevronLeft, ChevronRight} from '@gravity-ui/icons';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {ButtonItem, PaginationSize, PaginationProps} from '../../types';
import i18n from '../../i18n';

type Props = {
    item: ButtonItem;
    size: PaginationSize;
    page: NonNullable<PaginationProps['page']>;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    compact: NonNullable<PaginationProps['compact']>;
    className?: string;
};

export const PaginationButton = ({
    item,
    size,
    className,
    page,
    pageSize,
    onUpdate,
    compact,
}: Props) => {
    let button: React.ReactNode = null;

    switch (item.action) {
        case 'first':
            button = (
                <Button
                    size={size}
                    view="outlined"
                    className={className}
                    onClick={() => onUpdate(1, pageSize)}
                    title={compact ? i18n('button_first') : undefined}
                >
                    <Icon data={ChevronsLeft} size="16" />
                    {compact ? undefined : i18n('button_first')}
                </Button>
            );
            break;
        case 'previous':
            button = (
                <Button
                    size={size}
                    view="outlined"
                    className={className}
                    onClick={() => onUpdate(page - 1, pageSize)}
                    title={compact ? i18n('button_previous') : undefined}
                >
                    <Icon data={ChevronLeft} size="14" />
                    {compact ? undefined : i18n('button_previous')}
                </Button>
            );
            break;
        case 'next':
            button = (
                <Button
                    size={size}
                    view="outlined"
                    className={className}
                    onClick={() => onUpdate(page + 1, pageSize)}
                    title={compact ? i18n('button_next') : undefined}
                >
                    <Icon data={ChevronRight} size="14" />
                    {compact ? undefined : i18n('button_next')}
                </Button>
            );
            break;
    }

    return button;
};
