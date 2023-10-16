import React from 'react';

import {CircleInfoFill, TriangleExclamationFill} from '@gravity-ui/icons';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Icon} from '../../Icon';
import {RadioButton} from '../RadioButton';
import type {RadioButtonOption} from '../RadioButton';

export function RadioButtonShowcase() {
    const options: RadioButtonOption[] = [
        {value: 'Value 1', content: 'Value 1'},
        {value: 'Value 2', content: 'Value 2'},
        {value: 'Value 3', content: 'Value 3', disabled: true},
    ];

    const iconOptions: RadioButtonOption[] = [
        {value: 'Value 1', content: <Icon data={TriangleExclamationFill} />},
        {value: 'Value 2', content: <Icon data={CircleInfoFill} />},
    ];

    return (
        <Showcase>
            <ShowcaseItem title="Default">
                <RadioButton defaultValue={options[0].value} options={options} />
            </ShowcaseItem>

            <ShowcaseItem title="Icons">
                <RadioButton defaultValue={iconOptions[0].value} options={iconOptions} />
            </ShowcaseItem>

            <ShowcaseItem title="disabled">
                <RadioButton defaultValue={options[0].value} options={options} disabled />
            </ShowcaseItem>

            <ShowcaseItem title="size">
                <div>
                    <p>s</p>
                    <div>
                        <RadioButton defaultValue={options[0].value} options={options} size="s" />
                    </div>
                    <p>m</p>
                    <div>
                        <RadioButton defaultValue={options[0].value} options={options} size="m" />
                    </div>
                    <p>l</p>
                    <div>
                        <RadioButton defaultValue={options[0].value} options={options} size="l" />
                    </div>
                    <p>xl</p>
                    <div>
                        <RadioButton defaultValue={options[0].value} options={options} size="xl" />
                    </div>
                </div>
            </ShowcaseItem>
            <ShowcaseItem title="width">
                <div style={{width: 140, border: '2px dashed gray'}}>
                    <p>
                        <RadioButton>
                            <RadioButton.Option value="1" content="none" />
                            <RadioButton.Option value="2" content="none********" />
                        </RadioButton>
                    </p>
                    <p>
                        <RadioButton width="auto">
                            <RadioButton.Option value="1" content="auto" />
                            <RadioButton.Option value="2" content="auto********" />
                        </RadioButton>
                    </p>
                    <p>
                        <RadioButton width="max">
                            <RadioButton.Option value="1" content="max" />
                            <RadioButton.Option value="2" content="max" />
                        </RadioButton>
                    </p>
                </div>
            </ShowcaseItem>
        </Showcase>
    );
}
