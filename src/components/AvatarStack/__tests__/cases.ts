import type {Cases} from '../../../stories/tests-factory/models';
import type {AvatarStackProps} from '../types';

export const sizeCases: Cases<AvatarStackProps['size']> = ['xs', 's', 'm', 'l', 'xl'];
export const overlapSizeCases: Cases<AvatarStackProps['overlapSize']> = ['s', 'm', 'l'];
export const maxCases: Cases<AvatarStackProps['max']> = [1];
