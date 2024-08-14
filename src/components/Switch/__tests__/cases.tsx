import type {Cases} from '../../../stories/tests-factory/models';
import type {SwitchProps} from '../Switch';

export const disabledCases: Cases<SwitchProps['disabled']> = [true];
export const sizeCases: Cases<SwitchProps['size']> = ['m', 'l'];
