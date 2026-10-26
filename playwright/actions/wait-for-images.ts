import type {Page} from '@playwright/test';

export async function waitForImages(page: Page) {
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
}
