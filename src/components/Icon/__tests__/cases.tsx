import type {Cases} from '../../../stories/tests-factory/models';
import type {IconProps} from '../Icon';

export const sizeCases: Cases<IconProps['size']> = [10, 20, 30];

export const colorCases: Cases<IconProps['color']> = [
    'var(--g-color-text-primary)',
    'var(--g-color-text-danger)',
];

export const styleCases: Cases<IconProps['style']> = [{color: 'var(--g-color-text-positive)'}];
