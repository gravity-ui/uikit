import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {TooltipProps} from '../Tooltip';

export const placementCases: Cases<TooltipProps['placement']> = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
];
