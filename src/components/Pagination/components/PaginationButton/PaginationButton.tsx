'use client';

import type * as React from 'react';

import {ChevronLeft, ChevronRight, ChevronsLeft} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import type {ButtonView} from '../../../Button';
import {Icon} from '../../../Icon';
import {PaginationQa} from '../../constants';
import i18n from '../../i18n';
import type {ActionName, ButtonItem, PaginationProps, PaginationSize} from '../../types';
import {buildComponentProps, shouldUpdateOnPaginationItemClick} from '../../utils';

type Props = {
    item: ButtonItem;
    size: PaginationSize;
    page: NonNullable<PaginationProps['page']>;
    pageSize: NonNullable<PaginationProps['pageSize']>;
    onUpdate: NonNullable<PaginationProps['onUpdate']>;
    compact: NonNullable<PaginationProps['compact']>;
    className?: string;
    view: ButtonView;
    navigationComponent?: PaginationProps['navigationComponent'];
    getItemProps?: PaginationProps['getItemProps'];
};

export const PaginationButton = ({
    item,
    size,
    className,
    page,
    pageSize,
    onUpdate,
    compact,
    view,
    navigationComponent,
    getItemProps,
}: Props) => {
    let button: React.ReactNode = null;
    const {disabled} = item;
    const {t} = i18n.useTranslation();
    const nextPage = getPageNumber(page, item.action);
    const componentProps = buildComponentProps({
        component: navigationComponent,
        item,
        getItemProps,
        page: nextPage,
    });
    const onClick = disabled
        ? undefined
        : (event: React.MouseEvent<HTMLElement>) => {
              if (shouldUpdateOnPaginationItemClick(event, Boolean(navigationComponent))) {
                  onUpdate(nextPage, pageSize);
              }
          };

    switch (item.action) {
        case 'first':
            button = (
                <Button
                    {...componentProps}
                    size={size}
                    view={view}
                    className={className}
                    onClick={onClick}
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
                    {...componentProps}
                    size={size}
                    view={view}
                    className={className}
                    onClick={onClick}
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
                    {...componentProps}
                    size={size}
                    view={view}
                    className={className}
                    onClick={onClick}
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

function getPageNumber(page: number, action: ActionName) {
    switch (action) {
        case 'next':
            return page + 1;
        case 'previous':
            return page - 1;
        default:
            return 1;
    }
}
