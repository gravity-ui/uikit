'use client';

import * as React from 'react';

import {Link} from '../../Link';
import {block} from '../../utils/cn';

import type {BreadcrumbsItem as IBreadcrumbsItem} from './Breadcrumbs';
import {BreadcrumbsButton} from './BreadcrumbsButton';
import type {
    RenderBreadcrumbsItem,
    RenderBreadcrumbsItemContent,
    RenderBreadcrumbsRootContent,
} from './types';

export interface Props<T extends IBreadcrumbsItem = IBreadcrumbsItem> {
    item: T;
    isCurrent: boolean;
    isPrevCurrent: boolean;
    renderItemContent?: RenderBreadcrumbsItemContent<T> | RenderBreadcrumbsRootContent<T>;
    renderItem?: RenderBreadcrumbsItem<T>;
}

const b = block('breadcrumbs-legacy');

function Item<T extends IBreadcrumbsItem = IBreadcrumbsItem>({
    item,
    isCurrent,
    isPrevCurrent,
    renderItemContent,
    renderItem,
}: Props<T>) {
    const children = renderItemContent
        ? renderItemContent(item, isCurrent, isPrevCurrent)
        : item.text;

    if (renderItem) {
        return renderItem({item, children, isCurrent, isPrevCurrent});
    }

    const itemTitle = item.title || item.text;

    if (isPrevCurrent || !isCurrent) {
        if (item.href !== undefined) {
            return (
                <Link
                    key={item.text}
                    view="secondary"
                    href={item.href}
                    title={itemTitle}
                    onClick={item.action}
                    className={b('item', {'prev-current': isPrevCurrent})}
                >
                    {children}
                </Link>
            );
        }

        return (
            <BreadcrumbsButton key={item.text} title={itemTitle} onClick={item.action}>
                {children}
            </BreadcrumbsButton>
        );
    }

    return (
        <div title={itemTitle} className={b('item', {current: true})}>
            {children}
        </div>
    );
}

export const BreadcrumbsItem = React.memo(Item) as typeof Item & {displayName: string};

BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
