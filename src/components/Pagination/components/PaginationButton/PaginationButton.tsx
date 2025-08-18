'use client';

import type * as React from 'react';

import {ChevronLeft, ChevronRight, ChevronsLeft} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {PaginationQa} from '../../constants';
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
    const {t} = i18n.useTranslation();

    switch (item.action) {
        case 'first':
            button = (
                <Button
                    size={size}
                    view="outlined"
                    className={className}
                    onClick={() => onUpdate(1, pageSize)}
                    title={compact ? t('button_first') : undefined}
                    disabled={disabled}
                    qa={PaginationQa.PaginationButtonFirst}
                >
                    <Icon data={ChevronsLeft} size="16" />
                    {compact ? undefined : t('button_first')}
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
                    title={compact ? t('button_previous') : undefined}
                    disabled={disabled}
                    qa={PaginationQa.PaginationButtonPrevious}
                >
                    <Icon data={ChevronLeft} size="16" />
                    {compact ? undefined : t('button_previous')}
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
                    title={compact ? t('button_next') : undefined}
                    disabled={disabled}
                    qa={PaginationQa.PaginationButtonNext}
                >
                    <Icon data={ChevronRight} size="16" />
                    {compact ? undefined : t('button_next')}
                </Button>
            );
            break;
    }

    return button;
};
