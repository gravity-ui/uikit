import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {PopupProps} from '../Popup';

export const hasArrowCases: Cases<PopupProps['hasArrow']> = [true];
export const placementCases: Cases<PopupProps['placement']> = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
];
export const offsetCases: CasesWithName<PopupProps['offset']> = [['4-12', [4, 12]]];
export const strategyCases: Cases<PopupProps['strategy']> = ['absolute', 'fixed'];
