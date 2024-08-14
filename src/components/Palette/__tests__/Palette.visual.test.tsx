import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {PaletteProps} from '../Palette';

import {columnsCases, sizeCases} from './cases';
import {TestPalette} from './helpersPlaywright';

test.describe('Palette', {tag: '@Palette'}, () => {
    const defaultProps: PaletteProps = {};

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        columns: columnsCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestPalette {...props} />);

            await expectScreenshot();

            await root.locator('button').locator('nth=0').focus();

            await expectScreenshot({screenshotPostfix: 'after focus'});

            await root.locator('button').locator('nth=0').click();

            await expectScreenshot({screenshotPostfix: 'after click'});
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            disabled: true,
        },
        {},
    ).forEach(([title, details, props]) => {
        test(`disabled ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestPalette {...props} />);

            await expectScreenshot();
        });
    });
});
