import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {HideVeilShowcase, ResizableItemShowcase} from './components';

test.describe('Drawer', {tag: '@Drawer'}, () => {
    test('render with resizable prop', async ({mount, page, expectScreenshot}) => {
        await page.setViewportSize({width: 1200, height: 600});
        await mount(<ResizableItemShowcase />);

        const drawer = page.getByTestId('test-drawer');
        await expect(drawer).toBeVisible();
        expect(drawer).toHaveAttribute('data-floating-ui-status', 'open');

        await expectScreenshot({locator: drawer});

        const drawerItem = page.getByTestId('test-drawer-item');
        await expect(drawerItem).toBeVisible();
        await drawer.click();
        await expect(drawerItem).toBeHidden({
            timeout: 500,
        });
    });

    test('render with hideVeil prop', async ({mount, expectScreenshot, page}) => {
        await page.setViewportSize({width: 1200, height: 600});
        await mount(<HideVeilShowcase />);

        const drawer = page.getByTestId('test-drawer');
        await expect(drawer).toBeVisible();
        expect(drawer).toHaveAttribute('data-floating-ui-status', 'open');

        await expectScreenshot({locator: drawer});
    });
});
