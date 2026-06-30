import type {Page} from '@playwright/test';

export async function waitForFonts(page: Page) {
    await page.evaluate(() => document.fonts.ready);
}
