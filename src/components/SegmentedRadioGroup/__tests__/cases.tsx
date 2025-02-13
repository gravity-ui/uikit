import type {Cases} from '../../../stories/tests-factory/models';
import type {SegmentedRadioGroupProps} from '../SegmentedRadioGroup';

export const sizeCases: Cases<SegmentedRadioGroupProps['size']> = ['s', 'm', 'l', 'xl'];
export const widthCases: Cases<SegmentedRadioGroupProps['width']> = ['auto', 'max'];
