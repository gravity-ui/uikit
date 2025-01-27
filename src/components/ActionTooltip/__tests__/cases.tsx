import type {Cases} from '../../../stories/tests-factory/models';
import type {ActionTooltipProps} from '../ActionTooltip';

export const placementCases: Cases<ActionTooltipProps['placement']> = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
];
