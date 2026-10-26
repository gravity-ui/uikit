import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {SheetProps} from '../Sheet';

export const hideTopBarCases: Cases<SheetProps['hideTopBar']> = [true];
export const titleCases: Cases<SheetProps['title']> = ['Title'];
