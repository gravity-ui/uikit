import * as React from 'react';
import {Link} from '../Link';
import {block} from '../utils/cn';
import type {BreadcrumbsItem as IBreadcrumbsItem, BreadcrumbsProps} from './Breadcrumbs';

interface Props extends IBreadcrumbsItem {
    isCurrent: boolean;
    isPrevCurrent: boolean;
    renderItem?: BreadcrumbsProps['renderItemContent'] | BreadcrumbsProps['renderRootContent'];
}

const b = block('breadcrumbs');

export const BreadcrumbsItem = React.memo(function BreadcrumbsItem({
    isCurrent,
    isPrevCurrent,
    text,
    action,
    href,
    renderItem,
}: Props) {
    const data: IBreadcrumbsItem = {
        text,
        href,
        action,
    };

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
});

BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
