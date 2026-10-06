import {expect} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

import {test} from '~playwright/core';

import {ScrollTestList} from './scrollHelpersPlaywright';

// Rows that come under a pointer at rest and rows the virtualizer unmounts are a matter of layout,
// so it is tested in the browser: no screenshots, the tests read the active row and the focus.

const readState = (page: Page) =>
    page.getByRole('listbox').evaluate((root) => {
        const active = root.querySelector<HTMLElement>('[data-active]');
        return {
            active: active?.textContent ?? null,
            activeFocused: active !== null && document.activeElement === active,
            focusInside: root.contains(document.activeElement),
        };
    });

const readActive = async (page: Page) => (await readState(page)).active;

/** The rows that came under the pointer are given the time to take the activity — and have not */
async function expectActiveToStay(page: Page, expected: string) {
    await expect.poll(() => readActive(page)).toBe(expected);
    await page.waitForTimeout(100);
    expect(await readActive(page)).toBe(expected);
}

const getRow = (page: Page, id: string) => page.getByRole('option', {name: id, exact: true});

async function getPointInList(page: Page) {
    const box = await page.getByRole('listbox').boundingBox();
    if (!box) {
        throw new Error('The list is not shown');
    }
    return {x: box.x + 40, y: box.y + 100};
}

const readRowAt = (page: Page, x: number, y: number) =>
    page.evaluate(
        ([left, top]) =>
            document.elementFromPoint(left, top)?.closest('[role="option"]')?.textContent ?? null,
        [x, y],
    );

test.beforeEach(async ({page}) => {
    // Away from where the list is mounted
    await page.mouse.move(1200, 20);
});

for (const virtualized of [false, true]) {
    test.describe(
        `List: hover without pointer movement (${virtualized ? 'virtualized' : 'plain'})`,
        {tag: '@List'},
        () => {
            test('keys move the activity under a pointer at rest', async ({mount, page}) => {
                await mount(<ScrollTestList virtualized={virtualized} activeItemId="Item 1" />);
                const {x, y} = await getPointInList(page);
                await page.mouse.move(x, y);
                await getRow(page, 'Item 1').focus();

                for (const expected of ['Item 11', 'Item 21', 'Item 31']) {
                    await page.keyboard.press('PageDown');
                    await expectActiveToStay(page, expected);
                }

                await page.keyboard.press('End');
                await expectActiveToStay(page, 'Item 200');

                // The pointer moves: the row under it takes the activity and the focus
                await page.mouse.move(x, y + 2);
                const underPointer = await readRowAt(page, x, y + 2);
                await expect.poll(() => readActive(page)).toBe(underPointer);
                expect((await readState(page)).activeFocused).toBe(true);
            });
        },
    );
}
