import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {ClipboardButton} from '../ClipboardButton';

import {defaultProps, sizeCases, viewCases} from './cases';

test.describe('ClipboardButton', {tag: '@ClipboardButton'}, () => {
    createSmokeScenarios(
        {
            ...defaultProps,
        } as const,
        {
            size: sizeCases,
            view: viewCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{padding: '40px'}}>
                    <ClipboardButton {...props} />
                </div>,
            );

            await root.locator("button[type='button']").hover();

            await expectScreenshot({screenshotPostfix: 'init'});

            // wait for render tooltip
            await page.waitForTimeout(2000);

            await expectScreenshot({screenshotPostfix: 'before copy'});

            await root.locator("button[type='button']").click();

            await expectScreenshot({screenshotPostfix: 'after copy'});
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            hasTooltip: true,
            tooltipInitialText: 'Tooltip initial text',
            tooltipSuccessText: 'Tooltip success text',
        } as const,
        {
            size: sizeCases,
            view: viewCases,
        },
    ).forEach(([title, details, props]) => {
        test(`custom tooltip ${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{padding: '100px'}}>
                    <ClipboardButton {...props} />
                </div>,
            );

            await root.locator("button[type='button']").hover();

            await expectScreenshot({screenshotPostfix: 'init'});

            // wait for render tooltip
            await page.waitForTimeout(2000);

            await expectScreenshot({screenshotPostfix: 'before copy'});

            await root.locator("button[type='button']").click();

            await expectScreenshot({screenshotPostfix: 'after copy'});
        });
    });

    //
});
