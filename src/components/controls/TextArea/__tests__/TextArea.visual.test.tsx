import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../../stories/tests-factory/create-smoke-scenarios';
import type {TextAreaProps} from '../TextArea';
import {TextArea} from '../TextArea';

import {
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
    const defaultProps: TextAreaProps = {
        placeholder: 'Placeholder',
    };

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

            await expectScreenshot({});

            await root.locator('textarea').hover();

            await expectScreenshot({
                nameSuffix: 'hovered',
            });

            await root.locator('textarea').fill('Text');

            await expectScreenshot({
                nameSuffix: 'filled',
            });

            await root.locator('textarea').blur();

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
        {
            scenarioName: 'with error',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TextArea {...props} />);

            await expectScreenshot({});

            await root.locator('textarea').hover();

            await expectScreenshot({
                nameSuffix: 'hovered',
            });

            await root.locator('textarea').fill('Text');

            await expectScreenshot({
                nameSuffix: 'filled',
            });

            await root.locator('textarea').blur();

            await expectScreenshot({
                nameSuffix: 'after blur',
            });
        });
    });
});
