import {block} from '../../utils/cn';

import type {BreadcrumbsProps} from './Breadcrumbs';

type Props = Pick<BreadcrumbsProps, 'renderItemDivider'>;

const b = block('breadcrumbs-legacy');

export function BreadcrumbsSeparator({renderItemDivider}: Props) {
    return (
        <div aria-hidden={true} className={b('divider')}>
            {renderItemDivider ? renderItemDivider() : '/'}
        </div>
    );
}

BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
