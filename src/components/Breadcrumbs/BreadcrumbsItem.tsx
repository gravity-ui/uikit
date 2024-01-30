import React from 'react';

import {Link} from '../Link';
import {block} from '../utils/cn';

import type {BreadcrumbsProps, BreadcrumbsItem as IBreadcrumbsItem} from './Breadcrumbs';
import {BreadcrumbsButton} from './BreadcrumbsButton';

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
    const itemTitle = data.title || data.text;

    const item = renderItem ? renderItem(data, isCurrent, isPrevCurrent) : data.text;

    if (isPrevCurrent || !isCurrent) {
        if (data.href !== undefined) {
            return (
                <Link
                    key={data.text}
                    view="secondary"
                    href={data.href}
                    title={itemTitle}
                    onClick={data.action}
                    className={b('item', {'prev-current': isPrevCurrent})}
                >
                    {item}
                </Link>
            );
        }

        return (
            <BreadcrumbsButton key={data.text} title={itemTitle} onClick={data.action}>
                {item}
            </BreadcrumbsButton>
        );
    }

    return (
        <div title={itemTitle} className={b('item', {current: true})}>
            {item}
        </div>
    );
}

export const BreadcrumbsItem = React.memo(Item) as typeof Item & {displayName: string};

BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
