import {
    TEST_WRAPPER_CLASS,
    mountFixturesBuilder,
} from '@gravity-ui/playwright-tools/component-tests';
import type {MountTestArgs} from '@gravity-ui/playwright-tools/component-tests';
import {expectScreenshotFixturesBuilder} from '@gravity-ui/playwright-tools/fixtures';
import type {ExpectScreenshotTestArgs} from '@gravity-ui/playwright-tools/fixtures';
import {test as base} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

export type {MountFn as MountFixture} from '@gravity-ui/playwright-tools/component-tests';

type Fixtures = ExpectScreenshotTestArgs & MountTestArgs;

// Wait for loading of all the images and fonts
const onBeforeScreenshot = async (page: Page) => {
    const locators = await page.locator('img').all();
    await Promise.all(
        locators.map((locator) =>
            locator.evaluate(
                (image: HTMLImageElement) =>
                    image.complete ||
                    new Promise<unknown>((resolve) => image.addEventListener('load', resolve)),
            ),
        ),
    );

    // Wait for loading fonts
    await page.evaluate(() => document.fonts.ready);
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
