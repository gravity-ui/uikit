import type {Cases} from '../../../stories/tests-factory/models';
import type {RadioGroupProps} from '../RadioGroup';

export const sizeCases: Cases<RadioGroupProps['size']> = ['m', 'l'];
export const directionCases: Cases<RadioGroupProps['direction']> = ['vertical', 'horizontal'];
