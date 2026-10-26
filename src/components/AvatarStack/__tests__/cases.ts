import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {AvatarStackProps} from '../types';

export const sizeCases: Cases<AvatarStackProps['size']> = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl'];
export const moreVariantCases: Cases<AvatarStackProps['moreVariant']> = ['counter', 'dots'];
export const overlapSizeCases: Cases<AvatarStackProps['overlapSize']> = ['s', 'm', 'l'];
export const maxCases: Cases<AvatarStackProps['max']> = [1];
