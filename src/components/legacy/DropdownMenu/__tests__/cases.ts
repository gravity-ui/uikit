import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {DropdownMenuItemProps} from '../DropdownMenuItem';

export const sizeCases: Cases<DropdownMenuItemProps<unknown>['size']> = ['s', 'm', 'l', 'xl'];
