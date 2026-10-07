import type {BreadcrumbsProps} from './Breadcrumbs';
import {b} from './utils';

type Props = Pick<BreadcrumbsProps, 'separator'>;

export function BreadcrumbsSeparator({separator}: Props) {
    return (
        <span aria-hidden={true} className={b('divider')}>
            {separator ?? '/'}
        </span>
    );
}

BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
