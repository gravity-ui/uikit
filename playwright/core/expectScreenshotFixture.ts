import {expect} from '@playwright/experimental-ct-react';

import type {ExpectScreenshotFixture, PlaywrightFixture} from './types';

export const expectScreenshotFixture: PlaywrightFixture<ExpectScreenshotFixture> = async (
    {page},
    use,
    testInfo,
) => {
    const expectScreenshot: ExpectScreenshotFixture = async ({
        component,
        screenshotName,
        ...pageScreenshotOptions
    } = {}) => {
        const captureScreenshot = async (theme: string) => {
            const root = page.locator('#root');

            await root.evaluate((el, theme) => {
                el.classList.value = `g-root ${theme}`;
            }, theme);

            return (component || page.locator('.playwright-wrapper-test')).screenshot({
                animations: 'disabled',
                ...pageScreenshotOptions,
            });
        };

        expect(await captureScreenshot('g-root_theme_dark')).toMatchSnapshot({
            name: `${screenshotName || testInfo.title}-dark.png`,
        });

        expect(await captureScreenshot('g-root_theme_light')).toMatchSnapshot({
            name: `${screenshotName || testInfo.title}-light.png`,
        });
    };

    await use(expectScreenshot);
};
