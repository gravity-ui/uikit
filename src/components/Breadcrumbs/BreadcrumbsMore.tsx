'use client';

import React from 'react';

import {DropdownMenu} from '../DropdownMenu';
import {block} from '../utils/cn';

import type {BreadcrumbsProps} from './Breadcrumbs';
import {BreadcrumbsButton} from './BreadcrumbsButton';
import {BreadcrumbsQa} from './constants';
import i18n from './i18n';

interface Props extends Pick<BreadcrumbsProps, 'popupPlacement' | 'popupStyle' | 'items'> {}

const b = block('breadcrumbs');

export function BreadcrumbsMore({popupStyle, popupPlacement, items}: Props) {
    return (
        <DropdownMenu
            items={items}
            popupProps={{
                className: b('popup', {
                    staircase: popupStyle === 'staircase',
                }),
                placement: popupPlacement,
                qa: BreadcrumbsQa.MORE_ITEMS_MENU,
            }}
            renderSwitcher={({onClick}) => (
                <BreadcrumbsButton
                    title={i18n('label_more')}
                    onClick={onClick}
                    qa={BreadcrumbsQa.MORE_ITEMS_TRIGGER}
                >
                    ...
                </BreadcrumbsButton>
            )}
        />
    );
}

BreadcrumbsMore.displayName = 'Breadcrumbs.More';
