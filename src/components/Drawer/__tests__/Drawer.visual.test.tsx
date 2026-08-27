import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {HideVeilShowcase, ResizableItemShowcase, ResizeOverIframeShowcase} from './components';

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

    test('should keep resizing while the pointer is over an iframe', async ({mount, page}) => {
        await page.setViewportSize({width: 1200, height: 600});
        await mount(<ResizeOverIframeShowcase />);

        const drawer = page.getByTestId('test-drawer');
        const item = drawer.locator('.g-drawer__item');
        const resizer = drawer.locator('.g-drawer__resizer');
        await expect(item).toBeVisible();

        const widthOf = async () => {
            const box = await item.boundingBox();
            return box ? Math.round(box.width) : -1;
        };
        // Assert deltas because the rendered item also includes the resizer gutter.
        const initialWidth = await widthOf();

        const handle = await resizer.boundingBox();
        if (!handle) {
            throw new Error('resizer is not rendered');
        }

        const startX = handle.x + handle.width / 2;
        const y = handle.y + handle.height / 2;

        await page.mouse.move(startX, y);
        await page.mouse.down();
        // maxSize stops the Drawer edge while the pointer continues into the iframe.
        await page.mouse.move(startX - 400, y, {steps: 20});

        await expect.poll(widthOf).toBe(initialWidth + 100);

        await page.mouse.up();
        await expect.poll(widthOf).toBe(initialWidth + 100);

        // Moving without a pressed button must not resize after pointerup over the iframe.
        await page.mouse.move(1100, y, {steps: 10});
        expect(await widthOf()).toBe(initialWidth + 100);
        await expect(item).toBeVisible();
    });
});
