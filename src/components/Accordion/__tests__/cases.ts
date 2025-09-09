import type {CasesWithName} from '../../../stories/tests-factory/models';
import type {AccordionProps} from '../types';

export const sizeCases: CasesWithName<AccordionProps['size']> = [
    ['m', 'm'],
    ['l', 'l'],
    ['xl', 'xl'],
];

export const viewCases: CasesWithName<AccordionProps['view']> = [
    ['solid', 'solid'],
    ['top-bottom', 'top-bottom'],
];

export const arrowPositionCases: CasesWithName<AccordionProps['arrowPosition']> = [
    ['start', 'start'],
    ['end', 'end'],
];

export const multipleCases: CasesWithName<boolean> = [['multiple', true]];
