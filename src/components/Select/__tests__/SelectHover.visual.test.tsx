import {expect} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

import {test} from '~playwright/core';

import {HoverStand} from './hoverHelpersPlaywright';

// Rows that come under a pointer at rest are a matter of layout, so it is tested in the browser:
// no screenshots, the tests read the active option.

/** Longer than the open transition of the popup */
const SETTLE_TIME = 400;

const SELECTED = 882;

const readActive = (page: Page) =>
    page
        .getByRole('listbox')
        .locator('[data-active]')
        .evaluate((row) => row.textContent);

/** The rows that came under the pointer are given the time to take the activity — and have not */
async function expectActiveToStay(page: Page, expected: string) {
    await expect.poll(() => readActive(page)).toBe(expected);
    await page.waitForTimeout(100);
    expect(await readActive(page)).toBe(expected);
}

const readOptionAt = (page: Page, x: number, y: number) =>
    page.evaluate(
        ([left, top]) =>
            document.elementFromPoint(left, top)?.closest('[role="option"]')?.textContent ?? null,
        [x, y],
    );

const getTrigger = (page: Page) => page.locator('.g-select-control');

test.beforeEach(async ({page}) => {
    // Away from where the Select is mounted
    await page.mouse.move(1200, 20);
});

test.describe('Select: hover without pointer movement', {tag: '@Select'}, () => {
    test('a page key moves by a page under a pointer at rest', async ({mount, page}) => {
        await mount(<HoverStand selected={SELECTED} />);
        await getTrigger(page).click();
        await page.waitForTimeout(SETTLE_TIME);
        const box = await page.getByRole('option', {name: `Option ${SELECTED}`}).boundingBox();
        if (!box) {
            throw new Error('The selected option is not shown');
        }
        await page.mouse.move(box.x + 40, box.y + box.height / 2);
        await expect.poll(() => readActive(page)).toBe(`Option ${SELECTED}`);

        for (const step of [1, 2, 3]) {
            await page.keyboard.press('PageUp');
            await expectActiveToStay(page, `Option ${SELECTED - step * 10}`);
        }
    });

    test('a popup opened under a pointer at rest keeps the selected option active', async ({
        mount,
        page,
    }) => {
        await mount(<HoverStand selected={SELECTED} />);
        const box = await getTrigger(page).boundingBox();
        if (!box) {
            throw new Error('The trigger is not shown');
        }
        // Where the popup is about to open
        const x = box.x + 40;
        const y = box.y + box.height + 120;
        await page.mouse.move(x, y);

        await page.getByRole('combobox').focus();
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(SETTLE_TIME);
        expect(await readOptionAt(page, x, y)).not.toBeNull();
        expect(await readActive(page)).toBe(`Option ${SELECTED}`);

        // The pointer moves: the option under it takes the activity
        await page.mouse.move(x, y + 2);
        const underPointer = await readOptionAt(page, x, y + 2);
        await expect.poll(() => readActive(page)).toBe(underPointer);
    });
});
