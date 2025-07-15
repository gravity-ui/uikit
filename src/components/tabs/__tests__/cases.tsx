import type {Cases} from '../../../stories/tests-factory/models';
import type {TabListProps} from '../types';

export const sizeCases: Cases<TabListProps['size']> = ['m', 'l', 'xl'];

export const valueCases: Cases<TabListProps['value']> = ['active', 'fifth'];
