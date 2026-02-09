import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {RadioGroupProps} from '../RadioGroup';

export const sizeCases: Cases<RadioGroupProps['size']> = ['m', 'l'];
export const directionCases: Cases<RadioGroupProps['direction']> = ['vertical', 'horizontal'];
