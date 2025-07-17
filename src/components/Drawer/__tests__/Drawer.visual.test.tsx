import {test} from '~playwright/core';

import {DrawerStories} from './helpersPlaywright';

test.describe('DrawerStories', () => {
    test('render story: <ResizableItem>', async ({mount, expectScreenshot, defaultDelay}) => {
        await mount(<DrawerStories.ResizableItem />, {width: 1200, height: 720});

        await defaultDelay();

        await expectScreenshot();
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
