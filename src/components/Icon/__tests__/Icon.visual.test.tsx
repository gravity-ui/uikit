import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {sizeCases} from './cases';
import {TestIcon} from './helpersPlaywright';

test.describe('Icon', {tag: '@Icon'}, () => {
    createSmokeScenarios(
        {},
        {
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestIcon {...props} />);

            await expectScreenshot();
        });
    });
});
