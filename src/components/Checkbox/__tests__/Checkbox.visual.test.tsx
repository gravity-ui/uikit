import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {CheckboxProps} from '../Checkbox';
import {Checkbox} from '../Checkbox';

import {checkedCases, disabledCases, indeterminateCases, sizeCases} from './cases';

test.describe('Checkbox', {tag: '@Checkbox'}, () => {
    const defaultProps: CheckboxProps = {
        name: '',
        value: '',
        content: 'Checkbox label',
    };

    createSmokeScenarios(
        defaultProps,
        {
            size: sizeCases,
            disabled: disabledCases,
            checked: checkedCases,
            indeterminate: indeterminateCases,
        },
        {
            scenarioName: 'selection',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Checkbox {...props} />);

            await expectScreenshot();
        });
    });
});
