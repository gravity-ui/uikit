import {CircleInfoFill, TriangleExclamationFill} from '@gravity-ui/icons';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Icon} from '../../Icon';
import {SegmentedRadioGroup} from '../SegmentedRadioGroup';

export function SegmentedRadioGroupShowcase() {
    const options = [
        <SegmentedRadioGroup.Option key="Value 1" value="Value 1">
            Value 1
        </SegmentedRadioGroup.Option>,
        <SegmentedRadioGroup.Option key="Value 2" value="Value 2">
            Value 2
        </SegmentedRadioGroup.Option>,
        <SegmentedRadioGroup.Option key="Value 3" value="Value 3" disabled>
            Value 3
        </SegmentedRadioGroup.Option>,
    ];

    const iconOptions = [
        <SegmentedRadioGroup.Option key="Value 1" value="Value 1" title="Warning">
            <Icon data={TriangleExclamationFill} />
            <span>Warning</span>
        </SegmentedRadioGroup.Option>,
        <SegmentedRadioGroup.Option key="Value 2" value="Value 2" title="Info">
            <Icon data={CircleInfoFill} />
        </SegmentedRadioGroup.Option>,
    ];

    return (
        <Showcase>
            <ShowcaseItem title="Default">
                <SegmentedRadioGroup defaultValue="Value 1">{options}</SegmentedRadioGroup>
            </ShowcaseItem>

            <ShowcaseItem title="Icons">
                <SegmentedRadioGroup defaultValue="Value 1">{iconOptions}</SegmentedRadioGroup>
            </ShowcaseItem>

            <ShowcaseItem title="disabled">
                <SegmentedRadioGroup defaultValue="Value 1" disabled>
                    {options}
                </SegmentedRadioGroup>
            </ShowcaseItem>

            <ShowcaseItem title="size">
                <div>
                    <p>s</p>
                    <div>
                        <SegmentedRadioGroup defaultValue="Value 1" size="s">
                            {options}
                        </SegmentedRadioGroup>
                    </div>
                    <p>m</p>
                    <div>
                        <SegmentedRadioGroup defaultValue="Value 1" size="m">
                            {options}
                        </SegmentedRadioGroup>
                    </div>
                    <p>l</p>
                    <div>
                        <SegmentedRadioGroup defaultValue="Value 1" size="l">
                            {options}
                        </SegmentedRadioGroup>
                    </div>
                    <p>xl</p>
                    <div>
                        <SegmentedRadioGroup defaultValue="Value 1" size="xl">
                            {options}
                        </SegmentedRadioGroup>
                    </div>
                </div>
            </ShowcaseItem>
            <ShowcaseItem title="width">
                <div style={{width: 140, border: '2px dashed gray'}}>
                    <div style={{marginBlock: '1em'}}>
                        <SegmentedRadioGroup>
                            <SegmentedRadioGroup.Option value="1" content="none" />
                            <SegmentedRadioGroup.Option value="2" content="none********" />
                        </SegmentedRadioGroup>
                    </div>
                    <div style={{marginBlock: '1em'}}>
                        <SegmentedRadioGroup width="auto">
                            <SegmentedRadioGroup.Option value="1" content="auto" />
                            <SegmentedRadioGroup.Option value="2" content="auto********" />
                        </SegmentedRadioGroup>
                    </div>
                    <div style={{marginBlock: '1em'}}>
                        <SegmentedRadioGroup width="max">
                            <SegmentedRadioGroup.Option value="1" content="max" />
                            <SegmentedRadioGroup.Option value="2" content="max" />
                        </SegmentedRadioGroup>
                    </div>
                </div>
            </ShowcaseItem>
        </Showcase>
    );
}
