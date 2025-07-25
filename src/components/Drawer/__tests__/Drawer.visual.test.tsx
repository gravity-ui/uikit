import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {DrawerStories} from './helpersPlaywright';

test.describe('Drawer', {tag: '@Drawer'}, () => {
    test('render story: <ResizableItem>', async ({mount, page, expectScreenshot, defaultDelay}) => {
        const root = await mount(<DrawerStories.ResizableItem />, {width: 1200, height: 720});

        await defaultDelay();

        await expectScreenshot();

        await expect(page.getByTestId('drawer-item')).toBeVisible();
        await root.getByTestId('drawer').click();
        await expect(page.getByTestId('drawer-item')).toBeHidden({
            timeout: 500,
        });
    });

    test('render story: <HideVeil>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DrawerStories.HideVeil />, {width: 1200, height: 720});

        await defaultDelay();

        await expectScreenshot();
    });

    test('render story: <DisablePortal>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DrawerStories.DisablePortal />, {width: 1200, height: 720});

        await defaultDelay();

        await expectScreenshot();
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DrawerStories.Showcase />, {width: 1200, height: 720});

        await defaultDelay();

        await expectScreenshot();
    });
});
