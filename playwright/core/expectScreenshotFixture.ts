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
        const captureScreenshot = async (theme: string) => {
            const body = page.locator('body');

            await body.evaluate((el: HTMLElement | SVGElement, newTheme: string) => {
                el.setAttribute('class', `g-root g-root_theme_${newTheme}`);
            }, theme);

            return (component || page.locator('.playwright-wrapper-test')).screenshot({
                animations: 'disabled',
                ...pageScreenshotOptions,
            });
        };

        const nameScreenshot =
            testInfo.titlePath.slice(1).join(' ') + (nameSuffix ? ` ${nameSuffix}` : '');

        expect(await captureScreenshot('dark')).toMatchSnapshot({
            name: `${nameScreenshot} dark.png`,
        });

        expect(await captureScreenshot('light')).toMatchSnapshot({
            name: `${nameScreenshot} light.png`,
        });
    };

    await use(expectScreenshot);
};
