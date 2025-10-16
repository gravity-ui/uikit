import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {SliderProps} from '../types';

export const sizeCases: Cases<SliderProps['size']> = ['s', 'm', 'l', 'xl'];
export const disabledCases: Cases<SliderProps['disabled']> = [true];
export const validationStateCases: Cases<SliderProps['validationState']> = ['invalid'];
export const hasTooltipCases: Cases<SliderProps['tooltipDisplay']> = ['on'];
export const marksCases: Cases<SliderProps['marks']> = [4, [10, 20, 50, 55, 65, 80]];
export const stepCases: Cases<SliderProps['step']> = [5];
export const availableValuesCases: CasesWithName<SliderProps['marks']> = [
    ['available values 10-20-50-55-65-80', [10, 20, 50, 55, 65, 80]],
];
export const startPointCases: Cases<SliderProps['startPoint']> = [50];
export const invertedCases: Cases<SliderProps['inverted']> = [true];
