import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {DisclosureProps} from '../Disclosure';

export const sizeCases: Cases<DisclosureProps['size']> = ['m', 'l', 'xl'];
export const arrowPositionCases: Cases<DisclosureProps['arrowPosition']> = [
    'left',
    'right',
    'start',
    'end',
];
export const disabledCases: Cases<DisclosureProps['disabled']> = [true];
