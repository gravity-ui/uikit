import {expect} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

import {test} from '~playwright/core';

import {ScrollTestList} from './scrollHelpersPlaywright';

// The scroll of the list is a matter of layout, so it is tested in the browser: no screenshots,
// the tests read where the rows are.

const OFF_THE_EDGE = 560;

function readView(page: Page) {
    return page.getByRole('listbox').evaluate((root) => {
        // The scrollport of the root: its box without the borders
        const top = root.getBoundingClientRect().top + root.clientTop;
        const rootRect = {top, bottom: top + root.clientHeight};
        const rowRect = root.querySelector('[data-active]')?.getBoundingClientRect();
        return {
            active: root.querySelector('[data-active]')?.textContent?.split(' — ')[0] ?? null,
            scrollTop: Math.round(root.scrollTop),
            pageScroll: Math.round(window.scrollY),
            inRoot: Boolean(
                rowRect && rowRect.top >= rootRect.top - 1 && rowRect.bottom <= rootRect.bottom + 1,
            ),
            inViewport: Boolean(
                rowRect && rowRect.top >= -1 && rowRect.bottom <= window.innerHeight + 1,
            ),
            toTopEdge: rowRect ? Math.round(rowRect.top - rootRect.top) : null,
            toBottomEdge: rowRect ? Math.round(rootRect.bottom - rowRect.bottom) : null,
        };
    });
}

const activate = (page: Page, id: string) =>
    page.evaluate((value) => window.scrollTestControls.activate(value), id);

const insertRowsAbove = (page: Page) =>
    page.evaluate(() => window.scrollTestControls.insertAbove());

async function expectActiveInView(page: Page, id: string) {
    await expect
        .poll(async () => {
            const view = await readView(page);
            return view.active === id && view.inRoot;
        })
        .toBe(true);
}

/** The list is given the time to scroll — and has not */
async function expectScrollTopToStay(page: Page, scrollTop: number) {
    await page.waitForTimeout(250);
    expect((await readView(page)).scrollTop).toBe(scrollTop);
}

// A row that wraps carries more text after its id
const getRow = (page: Page, id: string) =>
    page.getByRole('option', {name: new RegExp(`^${id}( —|$)`)});

async function movePointerOverList(page: Page) {
    const box = await page.getByRole('listbox').boundingBox();
    if (box) {
        await page.mouse.move(box.x + 40, box.y + 40);
    }
}

/**
 * The root is scrolled so that its bottom edge cuts a row in half. The gesture lands on the visible
 * half and makes the row active — and the list must not scroll to show the rest of it
 */
async function expectGestureNotToScroll(
    page: Page,
    gesture: (x: number, y: number) => Promise<void>,
) {
    const cut = await page.getByRole('listbox').evaluate((root) => {
        const bottom = root.getBoundingClientRect().top + root.clientTop + root.clientHeight;
        const rect = Array.from(root.querySelectorAll('[role="option"]'))
            .map((option) => option.getBoundingClientRect())
            .find((row) => row.bottom > bottom + 1);
        if (!rect) {
            throw new Error('No row below the bottom edge');
        }
        const middle = rect.top + rect.height / 2;
        root.scrollTo({top: Math.round(middle - bottom)});
        // The middle of the row is at the edge now: a quarter of a row above it is the row still
        return {x: rect.left + 40, y: bottom - rect.height / 4, scrollTop: root.scrollTop};
    });
    // The scroll event is dispatched with the next frame
    await page.waitForTimeout(100);

    await gesture(cut.x, cut.y);

    await expect.poll(async () => (await readView(page)).active).not.toBeNull();
    await expectScrollTopToStay(page, Math.round(cut.scrollTop));
}

test.beforeEach(async ({page}) => {
    // Away from where the list is mounted
    await page.mouse.move(1200, 20);
});

for (const virtualized of [false, true]) {
    test.describe(
        `List: the active row is kept in view (${virtualized ? 'virtualized' : 'plain'})`,
        {tag: '@List'},
        () => {
            test('the root scrolls to the active row by the nearest edge', async ({
                mount,
                page,
            }) => {
                // The root is far from the top of the ancestor its rows are offset from
                await mount(
                    <ScrollTestList
                        virtualized={virtualized}
                        activeItemId="Item 150"
                        top={OFF_THE_EDGE}
                    />,
                );
                await expectActiveInView(page, 'Item 150');
                await expect.poll(async () => (await readView(page)).toBottomEdge).toBe(0);
                const {scrollTop} = await readView(page);

                // A row already in view
                await activate(page, 'Item 147');
                await expectActiveInView(page, 'Item 147');
                await expectScrollTopToStay(page, scrollTop);

                // A row above the viewport
                await activate(page, 'Item 100');
                await expectActiveInView(page, 'Item 100');
                await expect.poll(async () => (await readView(page)).toTopEdge).toBe(0);
                expect((await readView(page)).pageScroll).toBe(0);
            });

            test('the keyboard scrolls the root and leaves the page alone', async ({
                mount,
                page,
            }) => {
                // The lower part of the list is below the viewport: `scrollIntoView` would drag
                // the page
                await mount(
                    <ScrollTestList
                        virtualized={virtualized}
                        activeItemId="Item 1"
                        activateOnHover={false}
                        top={OFF_THE_EDGE}
                    />,
                );
                await getRow(page, 'Item 1').focus();
                // A key scrolls even while the pointer is over the list
                await movePointerOverList(page);

                await page.keyboard.type('Item 15');
                await expectActiveInView(page, 'Item 15');

                await page.keyboard.press('End');
                await expectActiveInView(page, 'Item 200');
                await expect(getRow(page, 'Item 200')).toBeFocused();
                expect((await readView(page)).pageScroll).toBe(0);
            });
        },
    );
}

// Whether to scroll is decided before the list picks how, so a plain list is enough here
test.describe('List: what does not scroll', {tag: '@List'}, () => {
    test('a row activated by hover', async ({mount, page}) => {
        await mount(<ScrollTestList />);

        await expectGestureNotToScroll(page, (x, y) => page.mouse.move(x, y));
    });

    test('a row activated by a click', async ({mount, page}) => {
        await mount(<ScrollTestList activateOnHover={false} />);

        await expectGestureNotToScroll(page, (x, y) => page.mouse.click(x, y));
    });

    test.describe('on a touch screen', () => {
        test.use({hasTouch: true});

        test('a tapped row', async ({mount, page}) => {
            await mount(<ScrollTestList />);

            // The finger leaves the list before the focus and the click arrive
            await expectGestureNotToScroll(page, (x, y) => page.touchscreen.tap(x, y));
        });
    });

    test('a controlled change while the pointer is over the list', async ({mount, page}) => {
        await mount(<ScrollTestList activeItemId="Item 1" activateOnHover={false} />);
        await movePointerOverList(page);

        await activate(page, 'Item 150');
        await expect.poll(async () => (await readView(page)).active).toBe('Item 150');
        await expectScrollTopToStay(page, 0);

        await page.mouse.move(1200, 20);
        await activate(page, 'Item 160');
        await expectActiveInView(page, 'Item 160');
    });

    test('a controlled change scrolls under the pointer when nothing was active', async ({
        mount,
        page,
    }) => {
        await mount(<ScrollTestList activateOnHover={false} />);
        await movePointerOverList(page);

        await activate(page, 'Item 150');

        await expectActiveInView(page, 'Item 150');
    });
});

test.describe('List: a root that does not scroll', {tag: '@List'}, () => {
    test('a key shows the row with the page', async ({mount, page}) => {
        await mount(<ScrollTestList scrolling={false} activeItemId="Item 1" />);
        await getRow(page, 'Item 1').focus();

        await page.keyboard.press('End');

        await expect
            .poll(async () => {
                const view = await readView(page);
                return view.active === 'Item 200' && view.inViewport;
            })
            .toBe(true);
    });

    test('nothing but a key moves the page', async ({mount, page}) => {
        // The active row is far below the viewport of the page from the start
        await mount(<ScrollTestList scrolling={false} activeItemId="Item 150" />);

        await activate(page, 'Item 180');
        await expect.poll(async () => (await readView(page)).active).toBe('Item 180');
        await insertRowsAbove(page);
        await expect(getRow(page, 'Earlier 1')).toBeVisible();

        await page.waitForTimeout(250);
        expect((await readView(page)).pageScroll).toBe(0);
    });
});

// On a plain list the scroll anchoring of the browser keeps the rows in place by itself
test.describe('List: rows that change under the active row (virtualized)', {tag: '@List'}, () => {
    test('rows inserted above bring the active row back into view', async ({mount, page}) => {
        await mount(<ScrollTestList virtualized activeItemId="Item 150" />);
        await expectActiveInView(page, 'Item 150');
        const before = (await readView(page)).scrollTop;

        await insertRowsAbove(page);

        await expect.poll(async () => (await readView(page)).scrollTop).toBeGreaterThan(before);
        await expectActiveInView(page, 'Item 150');
    });

    test('a reader who scrolled away is not thrown back', async ({mount, page}) => {
        await mount(<ScrollTestList virtualized activeItemId="Item 150" activateOnHover={false} />);
        await expectActiveInView(page, 'Item 150');

        await movePointerOverList(page);
        await page.mouse.wheel(0, -100000);
        await expect.poll(async () => (await readView(page)).scrollTop).toBe(0);
        await insertRowsAbove(page);

        await expect(getRow(page, 'Earlier 1')).toBeVisible();
        await expectScrollTopToStay(page, 0);
    });
});

test.describe('List: the scroll of the virtualization layer', {tag: '@List'}, () => {
    test('rows of different height: a far row stays in view', async ({mount, page}) => {
        // The rows above it are not measured yet: the first scroll lands by the estimates
        await mount(<ScrollTestList virtualized wrap activeItemId="Item 150" />);

        await expectActiveInView(page, 'Item 150');
        await page.waitForTimeout(400);
        expect((await readView(page)).inRoot).toBe(true);
    });

    test('the index of a row counts the section headers above it', async ({mount, page}) => {
        await mount(<ScrollTestList virtualized sections activeItemId="Item 150" />);

        await expectActiveInView(page, 'Item 150');
    });

    test('a row at the bottom edge is not cut by the padding of the root', async ({
        mount,
        page,
    }) => {
        await mount(<ScrollTestList virtualized padding={16} activeItemId="Item 1" />);

        await activate(page, 'Item 150');

        await expectActiveInView(page, 'Item 150');
    });

    test('keys pressed faster than the list settles end at the last row', async ({mount, page}) => {
        await mount(<ScrollTestList virtualized wrap activeItemId="Item 1" />);
        await getRow(page, 'Item 1').focus();

        for (let press = 0; press < 30; press += 1) {
            await page.keyboard.press('ArrowDown');
        }

        await expectActiveInView(page, 'Item 31');
        await page.waitForTimeout(400);
        expect((await readView(page)).inRoot).toBe(true);
    });
});
