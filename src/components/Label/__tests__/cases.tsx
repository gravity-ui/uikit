import type {Cases} from '../../../stories/tests-factory/models';
import type {LabelProps} from '../Label';

export const disabledCases: Cases<LabelProps['disabled']> = [true];
export const themeCases: Cases<LabelProps['theme']> = [
    'normal',
    'info',
    'danger',
    'warning',
    'success',
    'utility',
    'unknown',
    'clear',
];
export const sizeCases: Cases<LabelProps['size']> = ['xs', 's', 'm'];
export const interactiveCases: Cases<LabelProps['interactive']> = [true, 'hover', 'icon'];
