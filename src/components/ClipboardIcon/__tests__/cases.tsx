import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {ClipboardIconProps} from '../ClipboardIcon';

export const sizeCases: Array<ClipboardIconProps['size']> = [10, 20, 30];

export const statusCases: Cases<ClipboardIconProps['status']> = ['pending', 'success', 'error'];
