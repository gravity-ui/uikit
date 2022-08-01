import * as React from 'react';
import {DropdownMenu} from '../DropdownMenu';
import {Link} from '../Link';
import {block} from '../utils/cn';
import {BreadcrumbsProps} from './Breadcrumbs';
import i18n from './i18n';

interface Props extends Pick<BreadcrumbsProps, 'popupPlacement' | 'popupStyle' | 'items'> {}

const b = block('breadcrumbs');

function Switcher() {
    return (
        <Link view="secondary" title={i18n('label_more')} className={b('item', {more: true})}>
            ...
        </Link>
    );
}

export function BreadcrumbsMore({popupStyle, popupPlacement, items}: Props) {
    return (
        <DropdownMenu
            items={items}
            popupClassName={b('popup', {
                staircase: popupStyle === 'staircase',
            })}
            popupPlacement={popupPlacement}
            switcher={<Switcher />}
        />
    );
}

BreadcrumbsMore.displayName = 'Breadcrumbs.More';
