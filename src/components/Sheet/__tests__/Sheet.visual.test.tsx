import {expect} from '@playwright/test';

import {test} from '~playwright/core';

import {DEFAULT_SHEET_QA} from '../__stories__/constants';

import {SheetStories} from './helpersPlaywright';

test.describe('Sheet', () => {
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
});
