import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {PopoverProps} from '../Popover';

export const titleCases: Cases<PopoverProps['title']> = ['Title'];
export const hasArrowCases: Cases<PopoverProps['hasArrow']> = [true];
export const hasCloseCases: Cases<PopoverProps['hasClose']> = [true];
export const placementCases: Cases<PopoverProps['placement']> = [
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
export const offsetCases: CasesWithName<PopoverProps['offset']> = [['4-12', [4, 12]]];
export const strategyCases: Cases<PopoverProps['strategy']> = ['absolute', 'fixed'];
export const themeCases: Cases<PopoverProps['theme']> = ['info', 'special', 'announcement'];
export const sizeCases: Cases<PopoverProps['size']> = ['s', 'l'];
