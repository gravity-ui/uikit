import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {PinInputProps} from '../PinInput';

import {maskCases, placeholderCases, sizeCases, validationStateCases} from './cases';
import {
    TestPinInput,
    TestPinInputWithErrorMessage,
    TestPinInputWithNote,
} from './helpersPlaywright';

test.describe('PinInput', {tag: '@PinInput'}, () => {
    createSmokeScenarios<PinInputProps>(
        {
            type: 'numeric',
        },
        {
            placeholder: placeholderCases,
            mask: maskCases,
            size: sizeCases,
            validationState: validationStateCases,
        },
        {
            scenarioName: 'numeric',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestPinInput {...props} />);

            await expectScreenshot({});

            await page.keyboard.type('1');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                nameSuffix: 'after type one symbol',
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
                nameSuffix: 'after type code',
            });
        });
    });

    createSmokeScenarios<PinInputProps>(
        {
            type: 'alphanumeric',
        },
        {
            placeholder: placeholderCases,
            mask: maskCases,
            size: sizeCases,
            validationState: validationStateCases,
        },
        {
            scenarioName: 'alphanumeric',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestPinInput {...props} />);

            await expectScreenshot({});

            await page.keyboard.type('1');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                nameSuffix: 'after type one symbol',
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
                nameSuffix: 'after type code',
            });
        });
    });

    createSmokeScenarios<PinInputProps>(
        {
            disabled: true,
        },
        {},
        {
            scenarioName: 'disabled',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestPinInput {...props} />);

            await expectScreenshot({});
        });
    });

    createSmokeScenarios<PinInputProps>(
        {
            type: 'numeric',
        } as const,
        {
            placeholder: placeholderCases,
            mask: maskCases,
            size: sizeCases,
            validationState: validationStateCases,
        },
        {
            scenarioName: 'with note',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestPinInputWithNote {...props} />);

            await expectScreenshot({});

            await page.keyboard.type('1');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                nameSuffix: 'after type one symbol',
            });
        });
    });

    createSmokeScenarios<PinInputProps>(
        {
            type: 'numeric',
        } as const,
        {
            placeholder: placeholderCases,
            mask: maskCases,
            size: sizeCases,
        },
        {
            scenarioName: 'with error message',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await mount(<TestPinInputWithErrorMessage {...props} />);

            await expectScreenshot({});

            await page.keyboard.type('1');

            // wait focus next input
            await page.waitForTimeout(1000);

            await expectScreenshot({
                nameSuffix: 'after type one symbol',
            });
        });
    });
});
