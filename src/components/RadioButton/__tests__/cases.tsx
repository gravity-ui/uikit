import type {Cases} from '../../../stories/tests-factory/models';
import type {RadioButtonProps} from '../RadioButton';

export const sizeCases: Cases<RadioButtonProps['size']> = ['s', 'm', 'l', 'xl'];
export const widthCases: Cases<RadioButtonProps['width']> = ['auto', 'max'];
