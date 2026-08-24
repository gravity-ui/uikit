import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {CheckboxProps} from '../Checkbox';

export const sizeCases: Array<CheckboxProps['size']> = ['m', 'l'];

export const disabledCases: Cases<CheckboxProps['disabled']> = [true];

export const checkedCases: Cases<CheckboxProps['checked']> = [true];

export const indeterminateCases: Cases<CheckboxProps['indeterminate']> = [true];
