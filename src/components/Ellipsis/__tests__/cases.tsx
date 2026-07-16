import type {Cases, CasesWithName} from '@gravity-ui/playwright-tools/component-tests';

import type {EllipsisProps} from '../Ellipsis';

export const positionCases: Cases<EllipsisProps['position']> = ['start', 'center', 'end'];

export const offsetStartCases: Cases<EllipsisProps['offsetStart']> = [0, 4];
export const offsetEndCases: Cases<EllipsisProps['offsetEnd']> = [0, 7];

export const separatorCases: CasesWithName<EllipsisProps['separator']> = [
    ['none', ''],
    ['slash', '/'],
    ['multiple', ['.', '/', '-']],
];
