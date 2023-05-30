import * as React from 'react';

import {Link} from '../Link';
import {block} from '../utils/cn';

import type {BreadcrumbsProps, BreadcrumbsItem as IBreadcrumbsItem} from './Breadcrumbs';

interface Props<T extends IBreadcrumbsItem = IBreadcrumbsItem> {
    data: T;
    isCurrent: boolean;
    isPrevCurrent: boolean;
    renderItem?:
        | BreadcrumbsProps<T>['renderItemContent']
        | BreadcrumbsProps<T>['renderRootContent'];
}

const b = block('breadcrumbs');

function Item<T extends IBreadcrumbsItem = IBreadcrumbsItem>({
    data,
    isCurrent,
    isPrevCurrent,
    renderItem,
}: Props<T>) {
    const {text, href, action} = data;

    if (isPrevCurrent || !isCurrent) {
        return (
            <Link
                key={text}
                view="secondary"
                href={href}
                title={text}
                onClick={action}
                className={b('item', {'prev-current': isPrevCurrent})}
            >
                {renderItem ? renderItem(data, isCurrent, isPrevCurrent) : text}
            </Link>
        );
    }

    return (
        <div title={text} className={b('item', {current: true})}>
            {renderItem ? renderItem(data, isCurrent, isPrevCurrent) : text}
        </div>
    );
}

export const BreadcrumbsItem = React.memo(Item) as typeof Item & {displayName: string};

BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
