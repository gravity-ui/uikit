import type {BreadcrumbsProps} from './Breadcrumbs';
import {b} from './utils';

type Props = Pick<BreadcrumbsProps, 'separator'>;

export function BreadcrumbsSeparator({separator}: Props) {
    return (
        <div aria-hidden={true} className={b('divider')}>
            {separator ?? '/'}
        </div>
    );
}

BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
