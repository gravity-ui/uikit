import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {PopupProps} from '../Popup';

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
export const offsetCases: CasesWithName<PopupProps['offset']> = [
    ['10-25', {mainAxis: 10, crossAxis: 25}],
];
export const strategyCases: Cases<PopupProps['strategy']> = ['absolute', 'fixed'];
