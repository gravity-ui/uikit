import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {allowNotSelectedCases, directionCases, sizeCases} from './cases';
import {TestTabs, TestTabsWithCustomTabs} from './helpers';

test.describe('Tabs', {tag: '@Tabs'}, () => {
    createSmokeScenarios(
        {},
        {
            size: sizeCases,
            direction: directionCases,
            allowNotSelected: allowNotSelectedCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestTabs {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            root.locator(`[data-qa="2"]`).focus();

            await expectScreenshot({
                screenshotPostfix: 'after hover on tab',
            });
        });
    });

    createSmokeScenarios(
        {},
        {
            size: sizeCases,
            direction: directionCases,
            allowNotSelected: allowNotSelectedCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with custom tab ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestTabsWithCustomTabs {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            root.locator(`[data-qa="2"]`).focus();

            await expectScreenshot({
                screenshotPostfix: 'after hover on tab',
            });
        });
    });
});
