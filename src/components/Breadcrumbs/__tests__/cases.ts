import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {BreadcrumbsProps} from '../Breadcrumbs';

export const disabledCases: Cases<BreadcrumbsProps['disabled']> = [true];

export const popupPlacementCases: Cases<BreadcrumbsProps['popupPlacement']> = [
    'top',
    'right',
    'left',
    'bottom',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
    'auto',
    'auto-start',
    'auto-end',
];
