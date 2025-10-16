import type {Cases} from '../../../stories/tests-factory/models';
import type {StepperProps} from '../Stepper';
import type {StepperItemProps} from '../StepperItem';

export const sizeCases: Cases<StepperProps['size']> = ['s', 'm', 'l'];
export const viewCases: Cases<StepperItemProps['view']> = ['idle', 'error', 'success'];
