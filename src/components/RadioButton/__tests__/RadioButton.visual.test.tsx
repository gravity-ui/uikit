import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {RadioButtonOption, RadioButtonProps} from '../RadioButton';
import {RadioButton} from '../RadioButton';

import {sizeCases, widthCases} from './cases';

test.describe('RadioButton', {tag: '@RadioButton'}, () => {
    const options: RadioButtonOption[] = [
        {value: 'Value 1', content: 'Value 1'},
        {value: 'Value 2', content: 'Value 2'},
        {value: 'Value 3', content: 'Value 3', disabled: true},
    ];

    const defaultProps: RadioButtonProps = {
        value: 'Value 1',
        options,
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        width: widthCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '500px', height: '50px'}}>
                    <RadioButton {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            disabled: true,
        },
        {},
    ).forEach(([title, details, props]) => {
        test(`disabled ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<RadioButton {...props} />);

            await expectScreenshot();
        });
    });
});
