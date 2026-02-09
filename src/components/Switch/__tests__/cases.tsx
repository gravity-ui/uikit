import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {SwitchProps} from '../Switch';

export const disabledCases: Cases<SwitchProps['disabled']> = [true];
export const indeterminateCases: Cases<SwitchProps['indeterminate']> = [true];
export const sizeCases: Cases<SwitchProps['size']> = ['s', 'm', 'l'];
