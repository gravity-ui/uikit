import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {TabsProps} from '../Tabs';
import {TabsDirection} from '../Tabs';

export const sizeCases: Cases<TabsProps['size']> = ['m', 'l', 'xl'];
export const directionCases: Cases<TabsProps['direction']> = [
    TabsDirection.Horizontal,
    TabsDirection.Vertical,
];
