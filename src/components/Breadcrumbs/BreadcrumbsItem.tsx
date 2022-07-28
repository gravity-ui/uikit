import * as React from 'react';
import {Link} from '../Link';
import {block} from '../utils/cn';
import type {BreadcrumbsItem as IBreadcrumbsItem, BreadcrumbsProps} from './Breadcrumbs';

interface Props {
    data: IBreadcrumbsItem;
    isCurrent: boolean;
    isPrevCurrent: boolean;
    renderItem?: BreadcrumbsProps['renderItemContent'] | BreadcrumbsProps['renderRootContent'];
}

const b = block('breadcrumbs');

export const BreadcrumbsItem = React.memo(function BreadcrumbsItem({
    data,
    isCurrent,
    isPrevCurrent,
    renderItem,
}: Props) {
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
});

BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
