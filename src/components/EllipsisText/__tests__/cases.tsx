import type {Cases, CasesWithName} from '@gravity-ui/playwright-tools/component-tests';

import type {EllipsisTextProps} from '../EllipsisText';

export const positionCases: Cases<EllipsisTextProps['position']> = ['start', 'center', 'end'];

export const offsetStartCases: Cases<EllipsisTextProps['offsetStart']> = [0, 4];
export const offsetEndCases: Cases<EllipsisTextProps['offsetEnd']> = [0, 7];

export const separatorCases: CasesWithName<EllipsisTextProps['separator']> = [
    ['none', ''],
    ['slash', '/'],
    ['multiple', ['.', '/', '-']],
];
