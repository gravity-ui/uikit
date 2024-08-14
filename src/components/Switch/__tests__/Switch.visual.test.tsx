import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SwitchProps} from '../Switch';
import {Switch} from '../Switch';

import {sizeCases} from './cases';

test.describe('Switch', {tag: '@Switch'}, () => {
    const defaultProps: SwitchProps = {
        content: 'label',
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Switch {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator('label').focus();

            await expectScreenshot({
                screenshotPostfix: 'after hover',
            });

            await root.locator('label').click();

            await expectScreenshot({
                screenshotPostfix: 'after click',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            indeterminate: true,
        },
        {
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`indeterminate ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Switch {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            root.locator('label').focus();

            await expectScreenshot({
                screenshotPostfix: 'after hover',
            });

            root.locator('label').click();

            await expectScreenshot({
                screenshotPostfix: 'after click',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            defaultChecked: true,
        },
        {
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`default checked ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<Switch {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });
        });
    });
});
