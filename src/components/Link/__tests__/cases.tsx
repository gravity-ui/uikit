import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {LinkProps} from '../Link';

export const underlineCases: Cases<LinkProps['underline']> = [true];
export const visitableCases: Cases<LinkProps['visitable']> = [true];
export const viewCases: Cases<LinkProps['view']> = ['normal', 'primary', 'secondary'];
