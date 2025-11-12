import type {Cases} from '../../../stories/tests-factory/models';
import type {TableColumnSetupProps} from '../TableColumnSetup';

export const disabledCases: Cases<TableColumnSetupProps['disabled']> = [true];
export const showStatusCases: Cases<TableColumnSetupProps['showStatus']> = [true];
export const popupPlacementCases: Cases<TableColumnSetupProps['popupPlacement']> = [
    'auto',
    'auto-end',
    'auto-start',
    'bottom',
    'bottom-end',
    'bottom-start',
    'left',
    'left-end',
    'left-start',
    'right',
    'right-end',
    'right-start',
    'top',
    'top-end',
    'top-start',
];
