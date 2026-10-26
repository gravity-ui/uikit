import {
    TEST_WRAPPER_CLASS,
    mountFixturesBuilder,
} from '@gravity-ui/playwright-tools/component-tests';
import type {MountTestArgs} from '@gravity-ui/playwright-tools/component-tests';
import {expectScreenshotFixturesBuilder} from '@gravity-ui/playwright-tools/fixtures';
import type {ExpectScreenshotTestArgs} from '@gravity-ui/playwright-tools/fixtures';
import {test as base} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

import {stabilizeFloatingUi} from '../actions/stabilize-floating-ui';
import {waitForFonts} from '../actions/wait-for-fonts';
import {waitForImages} from '../actions/wait-for-images';

export type {MountFn as MountFixture} from '@gravity-ui/playwright-tools/component-tests';

type Fixtures = ExpectScreenshotTestArgs & MountTestArgs;

const onBeforeScreenshot = async (page: Page) => {
    await waitForImages(page);
    await waitForFonts(page);
    await stabilizeFloatingUi(page);
};

const expectScreenshotFixtures = expectScreenshotFixturesBuilder({
    themes: ['light', 'dark'],
    onBeforeScreenshot,
    onSwitchTheme: async (theme, page) => {
        await page.emulateMedia({colorScheme: theme});
    },
    // Default to component wrapper for component testing
    getDefaultLocator: (page) => page.locator(`.${TEST_WRAPPER_CLASS}`),
});

const mountFixtures = mountFixturesBuilder();

export const test = base.extend<Fixtures>({
    ...expectScreenshotFixtures,
    ...mountFixtures,
});

export {expect} from '@playwright/experimental-ct-react';
