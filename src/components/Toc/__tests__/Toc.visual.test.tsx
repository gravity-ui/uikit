import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {TestToc} from './helpers';

test.describe('Toc', {tag: '@Toc'}, () => {
    createSmokeScenarios({}, {}).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestToc {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'initial',
            });

            await root.locator(`ul li:nth-child(3)`).hover();

            await expectScreenshot({
                screenshotPostfix: 'after hover',
            });

            await root.locator(`ul li:nth-child(3)`).click();

            await expectScreenshot({
                screenshotPostfix: 'after click',
            });
        });
    });
});
