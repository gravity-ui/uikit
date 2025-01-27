import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';
import type {CardProps} from '../Card';

export const sizeCases: Array<CardProps['size']> = ['m', 'l'];

export const disabledCases: CasesWithName<CardProps['disabled']> = [['disabled', true]];

export const selectedCases: CasesWithName<CardProps['selected']> = [['selected', true]];

export const selectionViewCases: Cases<CardProps['view']> = ['outlined', 'clear'];
export const containerViewCases: Cases<CardProps['view']> = ['outlined', 'filled', 'raised'];

export const themeCases: Cases<CardProps['theme']> = [
    'normal',
    'info',
    'success',
    'warning',
    'danger',
    'utility',
];
