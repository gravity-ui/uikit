import {CircleInfoFill, TriangleExclamationFill} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import type {SegmentedRadioGroupProps} from '../SegmentedRadioGroup';
import {SegmentedRadioGroup} from '../SegmentedRadioGroup';

export const IconOptionsGroup = ({width}: Pick<SegmentedRadioGroupProps, 'width'>) => (
    <SegmentedRadioGroup width={width} defaultValue="Value 1" size="s">
        <SegmentedRadioGroup.Option value="Value 1" title="Warning">
            <Icon data={TriangleExclamationFill} />
            <span>Warning</span>
        </SegmentedRadioGroup.Option>
        <SegmentedRadioGroup.Option value="Value 2" title="Info">
            <Icon data={CircleInfoFill} />
        </SegmentedRadioGroup.Option>
        <SegmentedRadioGroup.Option value="Value 3" content="Value 3" />
    </SegmentedRadioGroup>
);
