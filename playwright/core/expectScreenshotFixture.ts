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
                el.classList.value = `g-root g-root_theme_${theme}`;
            }, theme);

            return (component || page.locator('.playwright-wrapper-test')).screenshot({
                animations: 'disabled',
                ...pageScreenshotOptions,
            });
        };

        const nameScreenshot = testInfo.titlePath.slice(1).join(' ');

        expect(await captureScreenshot('dark')).toMatchSnapshot({
            name: `${screenshotName || nameScreenshot} dark.png`,
        });

        expect(await captureScreenshot('light')).toMatchSnapshot({
            name: `${screenshotName || nameScreenshot} light.png`,
        });
    };

    await use(expectScreenshot);
};
