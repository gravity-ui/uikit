import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

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
            locator: sheetLocator,
            options: {animations: 'disabled'},
        });
    });

    createSmokeScenarios<Partial<Omit<SheetProps, 'visible' | 'onClose'>>>(
        {},
        {
            hideTopBar: hideTopBarCases,
            title: titleCases,
        },
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(<TestSheet {...props} />, {
                rootStyle: {
                    padding: 0,
                    width: '100%',
                    minHeight: '500px',
                },
            });

            await root.locator('button').click();
            await expect(page.locator(`[data-qa='${QASheet.content}']`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
