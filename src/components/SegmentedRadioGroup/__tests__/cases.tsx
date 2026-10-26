import type {Cases} from '@gravity-ui/playwright-tools/component-tests';

import type {SegmentedRadioGroupProps} from '../SegmentedRadioGroup';

export const sizeCases: Cases<SegmentedRadioGroupProps['size']> = ['s', 'm', 'l', 'xl'];
export const widthCases: Cases<SegmentedRadioGroupProps['width']> = ['auto', 'max'];
