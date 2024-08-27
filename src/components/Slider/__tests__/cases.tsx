import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {SliderProps} from '../types';

export const sizeCases: Cases<SliderProps['size']> = ['s', 'm', 'l', 'xl'];
export const disabledCases: Cases<SliderProps['disabled']> = [true];
export const validationStateCases: Cases<SliderProps['validationState']> = ['invalid'];
export const hasTooltipCases: Cases<SliderProps['hasTooltip']> = [true];
export const marksCountCases: Cases<SliderProps['marksCount']> = [4];
export const stepCases: Cases<SliderProps['step']> = [5];
export const availableValuesCases: CasesWithName<SliderProps['availableValues']> = [
    ['10-20-50-55-65-80', [10, 20, 50, 55, 65, 80]],
];
