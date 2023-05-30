import * as React from 'react';

import {block} from '../utils/cn';

import {BreadcrumbsProps} from './Breadcrumbs';

type Props = Pick<BreadcrumbsProps, 'renderItemDivider'>;

const b = block('breadcrumbs');

export function BreadcrumbsSeparator({renderItemDivider}: Props) {
    return (
        <div aria-hidden={true} className={b('divider')}>
            {renderItemDivider ? renderItemDivider() : '/'}
        </div>
    );
}

BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
