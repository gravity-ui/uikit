import type {Cases, CasesWithName} from '@gravity-ui/playwright-tools/component-tests';

import type {IconProps} from '../Icon';

export const sizeCases: Cases<IconProps['size']> = [10, 20, 30];

export const colorCases: Cases<IconProps['color']> = ['primary', 'danger'];

export const styleCases: CasesWithName<IconProps['style']> = [
    ['color: var(--g-color-text-positive)', {color: 'var(--g-color-text-positive)'}],
];
