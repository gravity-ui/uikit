import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {RadioGroupOption, RadioGroupProps} from '../RadioGroup';
import {RadioGroup} from '../RadioGroup';

import {directionCases, sizeCases} from './cases';

test.describe('RadioGroup', {tag: '@RadioGroup'}, () => {
    const options: RadioGroupOption[] = [
        {value: 'Value 1', content: 'Value 1'},
        {value: 'Value 2', content: 'Value 2'},
        {value: 'Value 3', content: 'Value 3', disabled: true},
    ];

    const defaultProps: RadioGroupProps = {
        value: '1',
        options,
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        direction: directionCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<RadioGroup {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            disabled: true,
        },
        {
            size: sizeCases,
            direction: directionCases,
        },
    ).forEach(([title, details, props]) => {
        test(`disabled ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<RadioGroup {...props} />);

            await expectScreenshot();
        });
    });
});
