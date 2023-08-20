import React from 'react';

import {DropdownMenu} from '../DropdownMenu';
import {Text} from '../Text';
import {block} from '../utils/cn';

import type {BreadcrumbsProps} from './Breadcrumbs';
import i18n from './i18n';

interface Props extends Pick<BreadcrumbsProps, 'popupPlacement' | 'popupStyle' | 'items'> {}

const b = block('breadcrumbs');

function Switcher() {
    return (
        <Text color="secondary" title={i18n('label_more')} className={b('item', {more: true})}>
            ...
        </Text>
    );
}

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
            switcher={<Switcher />}
        />
    );
}

BreadcrumbsMore.displayName = 'Breadcrumbs.More';
