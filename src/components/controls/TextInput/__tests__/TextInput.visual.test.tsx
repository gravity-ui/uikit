import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../../stories/tests-factory/create-smoke-scenarios';
import {TextInput} from '../TextInput';

import {
    defaultProps,
    defaultValueCases,
    endContentCases,
    errorPlacementCases,
    hasClearCases,
    labelCases,
    noteCases,
    pinCases,
    sizeCases,
    startContentCases,
    viewCases,
} from './cases';

test.describe('TextInput', {tag: '@TextInput'}, () => {
    const propCases = {
        defaultValue: defaultValueCases,
        pin: pinCases,
        size: sizeCases,
        view: viewCases,
        note: noteCases,
        startContent: startContentCases,
        endContent: endContentCases,
        hasClear: hasClearCases,
        label: labelCases,
    } as const;

    createSmokeScenarios(
        {
            ...defaultProps,
        },
        propCases,
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TextInput {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'initial',
            });

            await root.locator('input').hover();

            await expectScreenshot({
                screenshotPostfix: 'hover',
            });

            await root.locator('input').fill('Text');

            await expectScreenshot({
                screenshotPostfix: 'filled',
            });

            await root.locator('input').blur();

            await expectScreenshot({
                screenshotPostfix: 'blur',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            disabled: true,
        },
        propCases,
    ).forEach(([title, details, props]) => {
        test(`disabled ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TextInput {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            validationState: 'invalid',
            errorMessage: 'Error message',
        } as const,
        {
            ...propCases,
            errorPlacement: errorPlacementCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with error ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TextInput {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'initial',
            });

            await root.locator('input').hover();

            await expectScreenshot({
                screenshotPostfix: 'hover',
            });

            await root.locator('input').fill('Text');

            await expectScreenshot({
                screenshotPostfix: 'filled',
            });

            await root.locator('input').blur();

            await expectScreenshot({
                screenshotPostfix: 'blur',
            });
        });
    });
});
