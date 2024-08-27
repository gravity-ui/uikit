import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {ClipboardButtonProps} from '../ClipboardButton';
import {ClipboardButton} from '../ClipboardButton';

import {sizeCases, viewCases} from './cases';

test.describe('ClipboardButton', {tag: '@ClipboardButton'}, () => {
    const defaultProps: ClipboardButtonProps = {
        text: 'Text',
        onCopy: () => {},
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        view: viewCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{padding: '40px'}}>
                    <ClipboardButton {...props} />
                </div>,
            );

            await root.locator("button[type='button']").hover();

            await expectScreenshot({});

            // wait for render tooltip
            await page.waitForTimeout(1000);

            await expectScreenshot({nameSuffix: 'after hover'});

            await root.locator("button[type='button']").click();

            await expectScreenshot({nameSuffix: 'after copy'});
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
        {
            scenarioName: 'custom tooltip',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{padding: '100px'}}>
                    <ClipboardButton {...props} />
                </div>,
            );

            await root.locator("button[type='button']").hover();

            await expectScreenshot({});

            // wait for render tooltip
            await page.waitForTimeout(1000);

            await expectScreenshot({nameSuffix: 'after hover'});

            await root.locator("button[type='button']").click();

            await expectScreenshot({nameSuffix: 'after copy'});
        });
    });
});
