import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {maskCases, placeholderCases, sizeCases, validationStateCases} from './cases';
import {
    TestPinInput,
    TestPinInputWithErrorMessage,
    TestPinInputWithNote,
} from './helpersPlaywright';

test.describe('PinInput', {tag: '@PinInput'}, () => {
    createSmokeScenarios(
        {
            type: 'numeric',
        } as const,
        {
            placeholder: placeholderCases,
            mask: maskCases,
            size: sizeCases,
            validationState: validationStateCases,
        },
    ).forEach(([title, details, props]) => {
        test(`numeric ${title}`, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestPinInput {...props} />);

            await expectScreenshot({});

            await page.keyboard.type('1');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                screenshotPostfix: 'after type one symbol',
            });

            await page.keyboard.type('2');

            // wait focus next input
            await page.waitForTimeout(1000);

            await page.keyboard.type('3');

            // wait focus next input
            await page.waitForTimeout(1000);

            await page.keyboard.type('4');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                screenshotPostfix: 'after type code',
            });
        });
    });

    createSmokeScenarios(
        {
            type: 'alphanumeric',
        } as const,
        {
            placeholder: placeholderCases,
            mask: maskCases,
            size: sizeCases,
            validationState: validationStateCases,
        },
    ).forEach(([title, details, props]) => {
        test(`alphanumeric ${title}`, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestPinInput {...props} />);

            await expectScreenshot({});

            await page.keyboard.type('1');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                screenshotPostfix: 'after type one symbol',
            });

            await page.keyboard.type('a');

            // wait focus next input
            await page.waitForTimeout(1000);

            await page.keyboard.type('b');

            // wait focus next input
            await page.waitForTimeout(1000);

            await page.keyboard.type('c');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                screenshotPostfix: 'after type code',
            });
        });
    });

    createSmokeScenarios(
        {
            disabled: true,
        },
        {},
    ).forEach(([title, details, props]) => {
        test(`disabled ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestPinInput {...props} />);

            await expectScreenshot({});
        });
    });

    createSmokeScenarios(
        {
            type: 'numeric',
        } as const,
        {
            placeholder: placeholderCases,
            mask: maskCases,
            size: sizeCases,
            validationState: validationStateCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with note ${title}`, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestPinInputWithNote {...props} />);

            await expectScreenshot({});

            await page.keyboard.type('1');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                screenshotPostfix: 'after type one symbol',
            });
        });
    });

    createSmokeScenarios(
        {
            type: 'numeric',
        } as const,
        {
            placeholder: placeholderCases,
            mask: maskCases,
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with error message ${title}`, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestPinInputWithErrorMessage {...props} />);

            await expectScreenshot({});

            await page.keyboard.type('1');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                screenshotPostfix: 'after type one symbol',
            });
        });
    });
});
