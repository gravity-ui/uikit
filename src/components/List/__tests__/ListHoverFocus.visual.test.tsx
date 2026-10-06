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

test.describe('List: focus under virtualization', {tag: '@List'}, () => {
    test('the focus follows a hover that unmounts the focused row', async ({mount, page}) => {
        await mount(<ScrollTestList virtualized activeItemId="Item 1" />);
        await getRow(page, 'Item 1').focus();
        // The wheel takes the focused row out of the window of the virtualizer
        await page.getByRole('listbox').evaluate((root) => root.scrollTo({top: 3000}));
        await expect(getRow(page, 'Item 1')).toBeAttached();

        const {x, y} = await getPointInList(page);
        await page.mouse.move(x, y);

        await expect.poll(() => readActive(page)).not.toBe('Item 1');
        await expect(getRow(page, 'Item 1')).not.toBeAttached();
        expect((await readState(page)).activeFocused).toBe(true);

        // The keyboard keeps working
        const before = await readActive(page);
        await page.keyboard.press('ArrowDown');
        await expect.poll(() => readActive(page)).not.toBe(before);
        expect((await readState(page)).activeFocused).toBe(true);
    });

    for (const [name, leave] of [
        ['Tab', (page: Page) => page.keyboard.press('Tab')],
        ['a click outside', (page: Page) => page.mouse.click(1200, 20)],
    ] as const) {
        test(`the focus that left by ${name} is not brought back by hover`, async ({
            mount,
            page,
        }) => {
            await mount(<ScrollTestList virtualized activeItemId="Item 1" />);
            await getRow(page, 'Item 1').focus();

            await leave(page);
            expect((await readState(page)).focusInside).toBe(false);

            const {x, y} = await getPointInList(page);
            await page.mouse.move(x, y);
            await expect.poll(() => readActive(page)).not.toBe('Item 1');
            expect((await readState(page)).focusInside).toBe(false);
        });
    }
});

// A row removed from the items takes the focus with it
test.describe('List: focus of a removed row', {tag: '@List'}, () => {
    for (const [name, moveOn] of [
        ['a click outside', (page: Page) => page.mouse.click(1200, 20)],
        [
            'focus elsewhere',
            (page: Page) =>
                page.evaluate(() => {
                    const button = document.createElement('button');
                    document.body.append(button);
                    // The button is far below the list: the page must not scroll to it
                    button.focus({preventScroll: true});
                }),
        ],
    ] as const) {
        test(`hover does not take the focus back after ${name}`, async ({mount, page}) => {
            await mount(<ScrollTestList activeItemId="Item 1" />);
            await getRow(page, 'Item 1').focus();
            await page.evaluate(() => window.scrollTestControls.remove('Item 1'));
            await expect(getRow(page, 'Item 1')).not.toBeAttached();

            await moveOn(page);

            const {x, y} = await getPointInList(page);
            await page.mouse.move(x, y);
            await expect.poll(() => readActive(page)).not.toBeNull();
            expect((await readState(page)).focusInside).toBe(false);
        });
    }
});

test.describe('List: hover after a change from the outside', {tag: '@List'}, () => {
    test('a move over the hovered row takes the activity back', async ({mount, page}) => {
        await mount(<ScrollTestList activeItemId="Item 1" />);
        const {x, y} = await getPointInList(page);
        await page.mouse.move(x, y);
        const hovered = await readRowAt(page, x, y);
        await expect.poll(() => readActive(page)).toBe(hovered);

        await page.evaluate(() => window.scrollTestControls.activate('Item 1'));
        await expect.poll(() => readActive(page)).toBe('Item 1');

        await page.mouse.move(x, y + 2);
        await expect.poll(() => readActive(page)).toBe(hovered);
    });
});
