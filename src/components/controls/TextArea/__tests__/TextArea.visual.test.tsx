import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../../stories/tests-factory/create-smoke-scenarios';
import {TextArea} from '../TextArea';

import {
    defaultProps,
    defaultValueCases,
    errorPlacementCases,
    hasClearCases,
    maxRowsCases,
    minRowsCases,
    noteCases,
    pinCases,
    rowsCases,
    sizeCases,
    viewCases,
} from './cases';

test.describe('TextArea', {tag: '@TextArea'}, () => {
    const propCases = {
        defaultValue: defaultValueCases,
        pin: pinCases,
        size: sizeCases,
        view: viewCases,
        rows: rowsCases,
        minRows: minRowsCases,
        maxRows: maxRowsCases,
        note: noteCases,
        hasClear: hasClearCases,
    } as const;

    createSmokeScenarios(
        {
            ...defaultProps,
        },
        propCases,
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TextArea {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'initial',
            });

            await root.locator('textarea').hover();

            await expectScreenshot({
                screenshotPostfix: 'hover',
            });

            await root.locator('textarea').fill('Text');

            await expectScreenshot({
                screenshotPostfix: 'filled',
            });

            await root.locator('textarea').blur();

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
            await mount(<TextArea {...props} />);

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
            const root = await mount(<TextArea {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'initial',
            });

            await root.locator('textarea').hover();

            await expectScreenshot({
                screenshotPostfix: 'hover',
            });

            await root.locator('textarea').fill('Text');

            await expectScreenshot({
                screenshotPostfix: 'filled',
            });

            await root.locator('textarea').blur();

            await expectScreenshot({
                screenshotPostfix: 'blur',
            });
        });
    });
});
