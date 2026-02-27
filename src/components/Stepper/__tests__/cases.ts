import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {StepperProps} from '../Stepper';
import type {StepperItemProps} from '../StepperItem';

export const sizeCases: Cases<StepperProps['size']> = ['s', 'm', 'l'];
export const viewCases: Cases<StepperItemProps['view']> = ['idle', 'error', 'success'];
