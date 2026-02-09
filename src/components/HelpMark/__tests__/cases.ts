import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {HelpMarkProps} from '../HelpMark';

export const placementCases: Cases<NonNullable<HelpMarkProps['popoverProps']>['placement']> = [
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
