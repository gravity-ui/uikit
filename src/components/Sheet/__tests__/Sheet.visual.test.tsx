import React from 'react';

import {expect, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SheetProps} from '../Sheet';
import {DEFAULT_SHEET_QA} from '../__stories__/constants';

import {hideTopBarCases, titleCases} from './cases';
import {QASheet} from './constants';
import {TestSheet} from './helpers';
import {SheetStories} from './helpersPlaywright';

test.describe('Sheet', {tag: '@Sheet'}, () => {
    test('render story: <Default>', async ({page, mount, expectScreenshot}) => {
        await mount(<SheetStories.Default />);

        await page.getByRole('button').click();

        const sheetLocator = page.locator(`[data-qa=${DEFAULT_SHEET_QA}]`);

        await expect(sheetLocator).toBeVisible();

        await expectScreenshot({
            animations: 'disabled',
            component: sheetLocator,
        });
    });

    createSmokeScenarios<Partial<Omit<SheetProps, 'visible' | 'onClose'>>>(
        {},
        {
            hideTopBar: hideTopBarCases,
            title: titleCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(
                <div style={{width: '500px', height: '500px'}}>
                    <TestSheet {...props} />
                </div>,
            );

            await root.locator('button').click();
            await expect(page.locator(`[data-qa='${QASheet.content}']`)).toBeVisible();

            await expectScreenshot({});
        });
    });
});
