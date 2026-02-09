import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {ProgressProps} from '../types';

export const sizeCases: Cases<ProgressProps['size']> = ['xs', 's', 'm'];
export const themeCases: Cases<ProgressProps['theme']> = [
    'default',
    'success',
    'warning',
    'danger',
    'info',
    'misc',
];
export const loadingCases: Cases<ProgressProps['loading']> = [true];
