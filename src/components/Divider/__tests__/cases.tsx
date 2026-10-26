import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {DividerProps} from '../Divider';

export const orientationCases: Cases<DividerProps['orientation']> = ['vertical', 'horizontal'];
