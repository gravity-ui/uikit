import * as React from 'react';
import {DropdownMenu} from '../DropdownMenu';
import {Link} from '../Link';
import {block} from '../utils/cn';
import {BreadcrumbsProps} from './Breadcrumbs';
import {BreadcrumbsSeparator} from './BreadcrumbsSeparator';

interface Props
    extends Pick<
        BreadcrumbsProps,
        'popupPlacement' | 'popupStyle' | 'items' | 'renderItemDivider'
    > {}

const b = block('breadcrumbs');

const switcher = (
    <Link view="secondary" title="Show more" className={b('item', {more: true})}>
        ...
    </Link>
);

export function BreadcrumbsMore({popupStyle, popupPlacement, items, renderItemDivider}: Props) {
    if (items.length === 0) {
        return null;
    }

    return (
        <React.Fragment>
            <BreadcrumbsSeparator renderItemDivider={renderItemDivider} />
            <DropdownMenu
                items={items}
                popupClassName={b('popup', {
                    staircase: popupStyle === 'staircase',
                })}
                popupPlacement={popupPlacement}
                switcher={switcher}
            />
        </React.Fragment>
    );
}

BreadcrumbsMore.displayName = 'Breadcrumbs.More';
