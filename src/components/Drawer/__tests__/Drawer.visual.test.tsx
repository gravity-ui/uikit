import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {HideVeilShowcase, ResizableItemShowcase} from './components';

test.describe('Drawer', {tag: '@Drawer'}, () => {
    test('render with resizable prop', async ({mount, page, expectScreenshot, defaultDelay}) => {
        await mount(<ResizableItemShowcase />, {width: 1200, height: 720});

        await defaultDelay();

        await expectScreenshot();

        await expect(page.getByTestId('drawer-item')).toBeVisible();
        await page.getByTestId('drawer').click();
        await expect(page.getByTestId('drawer-item')).toBeHidden({
            timeout: 500,
        });
    });

    test('render with hideVeil prop', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<HideVeilShowcase />, {width: 1200, height: 720});

        await defaultDelay();

        await expectScreenshot();
    });
});
