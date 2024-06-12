'use client';

import React from 'react';

import {DropdownMenu} from '../DropdownMenu';
import {block} from '../utils/cn';

import type {BreadcrumbsProps} from './Breadcrumbs';
import {BreadcrumbsButton} from './BreadcrumbsButton';
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
            }}
            renderSwitcher={({onClick}) => (
                <BreadcrumbsButton title={i18n('label_more')} onClick={onClick}>
                    ...
                </BreadcrumbsButton>
            )}
        />
    );
}

BreadcrumbsMore.displayName = 'Breadcrumbs.More';
