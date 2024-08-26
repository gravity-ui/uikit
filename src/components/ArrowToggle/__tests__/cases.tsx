import type {Cases} from '../../../stories/tests-factory/models';
import type {ArrowToggleProps} from '../ArrowToggle';

export const sizeCases: Cases<ArrowToggleProps['size']> = [10, 20, 30, 40, 50, 100];
export const directionCases: Cases<ArrowToggleProps['direction']> = [
    'top',
    'left',
    'bottom',
    'right',
];
