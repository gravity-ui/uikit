import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {actionsCases, isClosableCases, themeCases, titleCases} from './cases';
import {ToasterQA} from './constants';
import {TestToaster, TestToasterWithIcons} from './helpers';

test.describe('Toaster', {tag: '@Toaster'}, () => {
    createSmokeScenarios(
        {
            name: 'toast',
            content: <div>toast content</div>,
        },
        {
            title: titleCases,
            theme: themeCases,
            actions: actionsCases,
            isClosable: isClosableCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(<TestToaster toastProps={props} />);

            await root.locator(`button[data-qa="${ToasterQA.trigger}"]`).click();

            // wait show toast & end animations
            await page.waitForTimeout(2000);

            await expectScreenshot({
                screenshotPostfix: 'toast',
            });
        });
    });

    createSmokeScenarios(
        {
            name: 'toast',
            content: <div>toast content</div>,
        },
        {
            title: titleCases,
            theme: themeCases,
            actions: actionsCases,
            isClosable: isClosableCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with icons ${title}`, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(<TestToasterWithIcons toastProps={props} />);

            await root.locator(`button[data-qa="${ToasterQA.trigger}"]`).click();

            // wait show toast & end animations
            await page.waitForTimeout(2000);

            await expectScreenshot({
                screenshotPostfix: 'toast',
            });
        });
    });
});
