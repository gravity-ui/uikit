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

            await expectScreenshot({});

            root.getByTestId('2').focus();

            await expectScreenshot({
                nameSuffix: 'after hover on tab',
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
        {
            scenarioName: 'with custom tab',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestTabsWithCustomTabs {...props} />);

            await expectScreenshot({});

            root.getByTestId('2').focus();

            await expectScreenshot({
                nameSuffix: 'after hover on tab',
            });
        });
    });
});
