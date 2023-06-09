import React from 'react';

import {ChevronLeft, ChevronRight, ChevronsLeft} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import i18n from '../../i18n';
import type {ButtonItem, PaginationProps, PaginationSize} from '../../types';

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
    const {disabled} = item;

    switch (item.action) {
        case 'first':
            button = (
                <Button
                    size={size}
                    view="outlined"
                    className={className}
                    onClick={() => onUpdate(1, pageSize)}
                    title={compact ? i18n('button_first') : undefined}
                    disabled={disabled}
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
                    disabled={disabled}
                >
                    <Icon data={ChevronLeft} size="16" />
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
                    disabled={disabled}
                >
                    <Icon data={ChevronRight} size="16" />
                    {compact ? undefined : i18n('button_next')}
                </Button>
            );
            break;
    }

    return button;
};
