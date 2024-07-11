import React from 'react';

import {test} from '~playwright/core';

import {DEFAULT_SHEET_QA} from '../__stories__/constants';

import {SheetStories} from './helpersPlaywright';

test.describe('Button', () => {
    test('render story: <Default>', async ({page, mount, expectScreenshot}) => {
        await mount(<SheetStories.DefaultShowcaseStories />);

        await page.getByRole('button').click();

        await expect(page.locator(`[data-qa]=${DEFAULT_SHEET_QA}`)).toBeVisible();

        await expectScreenshot({animations: 'disabled'});
    });
});
