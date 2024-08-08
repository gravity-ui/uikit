import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Checkbox} from '../Checkbox';

import {checkedCases, defaultProps, disabledCases, indeterminateCases, sizeCases} from './cases';

test.describe('Checkbox', {tag: '@Checkbox'}, () => {
    createSmokeScenarios(
        {
            ...defaultProps,
        } as const,
        {
            size: sizeCases,
            disabled: disabledCases,
            checked: checkedCases,
            indeterminate: indeterminateCases,
        },
    ).forEach(([title, details, props]) => {
        test(`selection ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<Checkbox {...props} />);

            await expectScreenshot();
        });
    });
});
