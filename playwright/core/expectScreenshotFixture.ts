import {expect} from '@playwright/experimental-ct-react';

import type {ExpectScreenshotFixture, PlaywrightFixture} from './types';

export const expectScreenshotFixture: PlaywrightFixture<ExpectScreenshotFixture> = async (
    {page},
    use,
    testInfo,
) => {
    const expectScreenshot: ExpectScreenshotFixture = async ({
        component,
        nameSuffix,
        ...pageScreenshotOptions
    } = {}) => {
        const captureScreenshot = async () => {
            return (component || page.locator('.playwright-wrapper-test')).screenshot({
                animations: 'disabled',
                ...pageScreenshotOptions,
            });
        };

        const nameScreenshot =
            testInfo.titlePath.slice(1).join(' ') + (nameSuffix ? ` ${nameSuffix}` : '');

        await page.emulateMedia({colorScheme: 'light'});

        expect(await captureScreenshot()).toMatchSnapshot({
            name: `${nameScreenshot} light.png`,
        });

        await page.emulateMedia({colorScheme: 'dark'});

        expect(await captureScreenshot()).toMatchSnapshot({
            name: `${nameScreenshot} dark.png`,
        });
    };

    await use(expectScreenshot);
};
