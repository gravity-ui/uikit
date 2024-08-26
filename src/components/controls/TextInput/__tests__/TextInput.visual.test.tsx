import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../../stories/tests-factory/create-smoke-scenarios';
import type {TextInputProps} from '../TextInput';
import {TextInput} from '../TextInput';

import {
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
    const defaultProps: TextInputProps = {
        placeholder: 'Placeholder',
    };

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

    createSmokeScenarios(defaultProps, propCases).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TextInput {...props} />);

            await expectScreenshot({});

            await root.locator('input').hover();

            await expectScreenshot({
                nameSuffix: 'hovered',
            });

            await root.locator('input').fill('Text');

            await expectScreenshot({
                nameSuffix: 'filled',
            });

            await root.locator('input').blur();

            await expectScreenshot({
                nameSuffix: 'after blur',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            disabled: true,
        },
        propCases,
        {
            scenarioName: 'disabled',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
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
        {
            scenarioName: 'with error',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TextInput {...props} />);

            await expectScreenshot({});

            await root.locator('input').hover();

            await expectScreenshot({
                nameSuffix: 'hovered',
            });

            await root.locator('input').fill('Text');

            await expectScreenshot({
                nameSuffix: 'filled',
            });

            await root.locator('input').blur();

            await expectScreenshot({
                nameSuffix: 'after blur',
            });
        });
    });
});
