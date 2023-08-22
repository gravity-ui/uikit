import React from 'react';

import {CircleInfoFill, TriangleExclamationFill} from '@gravity-ui/icons';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Icon} from '../../Icon';
import {cn} from '../../utils/cn';
import {RadioButton} from '../RadioButton';
import type {RadioButtonOption} from '../RadioButton';

import './RadioButtonShowcase.scss';

const b = cn('radio-button-showcase');

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
        <Showcase title="RadioButton" className={b()}>
            <ShowcaseItem title="options">
                <RadioButton name="group1" defaultValue={options[0].value} options={options} />
            </ShowcaseItem>

            <ShowcaseItem title="options as children">
                <RadioButton name="group2" defaultValue={options[0].value}>
                    <RadioButton.Option content={options[0].content} value={options[0].value} />
                    <RadioButton.Option content={options[1].content} value={options[1].value} />
                    <RadioButton.Option
                        content={options[2].content}
                        value={options[2].value}
                        disabled
                    />
                </RadioButton>
            </ShowcaseItem>

            <ShowcaseItem title="options as icon">
                <RadioButton
                    name="group7"
                    defaultValue={iconOptions[0].value}
                    options={iconOptions}
                />
            </ShowcaseItem>

            <ShowcaseItem title="disabled">
                <RadioButton
                    name="group2"
                    defaultValue={options[0].value}
                    options={options}
                    disabled
                />
            </ShowcaseItem>

            <ShowcaseItem title="size">
                <div className={b('grid')}>
                    <div>s</div>
                    <div>
                        <RadioButton
                            name="group3"
                            defaultValue={options[0].value}
                            options={options}
                            size="s"
                        />
                    </div>
                    <div>m</div>
                    <div>
                        <RadioButton
                            name="group4"
                            defaultValue={options[0].value}
                            options={options}
                            size="m"
                        />
                    </div>
                    <div>l</div>
                    <div>
                        <RadioButton
                            name="group5"
                            defaultValue={options[0].value}
                            options={options}
                            size="l"
                        />
                    </div>
                    <div>xl</div>
                    <div>
                        <RadioButton
                            name="group6"
                            defaultValue={options[0].value}
                            options={options}
                            size="xl"
                        />
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
