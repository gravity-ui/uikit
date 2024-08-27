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

            await expectScreenshot({});

            await root.locator('label').focus();

            await expectScreenshot({
                nameSuffix: 'after hover',
            });

            await root.locator('label').click();

            await expectScreenshot({
                nameSuffix: 'after click',
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
        {
            scenarioName: 'indeterminate',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Switch {...props} />);

            await expectScreenshot({});

            await root.locator('label').focus();

            await expectScreenshot({
                nameSuffix: 'after hover',
            });

            await root.locator('label').click();

            await expectScreenshot({
                nameSuffix: 'after click',
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
        {
            scenarioName: 'default checked',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Switch {...props} />);

            await expectScreenshot({});
        });
    });
});
