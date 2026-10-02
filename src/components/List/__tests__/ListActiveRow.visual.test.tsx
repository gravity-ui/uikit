import {expect} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

import {test} from '~playwright/core';

import {ScrollTestList} from './scrollHelpersPlaywright';
import type {ScrollTestControls} from './scrollHelpersPlaywright';

/**
 * The scroll of the list is a matter of layout, so it is tested where there is one: in the
 * browser, with no screenshots — the tests read where the rows are.
 */

/** The list starts far enough down the page to hang off the edge of the viewport */
const OFF_THE_EDGE = 560;

interface View {
    /** The id of the active row */
    active: string | null;
    scrollTop: number;
    /** The active row is whole inside the root of the list */
    inRoot: boolean;
    /** The active row is whole inside the viewport of the page */
    inViewport: boolean;
    /** How far the bottom of the active row is from the bottom edge of the root */
    toBottomEdge: number | null;
    /** How far the top of the active row is from the top edge of the root */
    toTopEdge: number | null;
    pageScroll: number;
}

function readView(page: Page): Promise<View> {
    return page.evaluate(() => {
        const root = document.querySelector<HTMLElement>('[role="listbox"]');
        const row = root?.querySelector<HTMLElement>('[data-active]') ?? null;
        if (!root) {
            throw new Error('The list is not rendered');
        }
        const rootRect = root.getBoundingClientRect();
        const rowRect = row?.getBoundingClientRect();
        return {
            active: row ? (row.textContent ?? '').split(' — ')[0] : null,
            scrollTop: Math.round(root.scrollTop),
            inRoot: Boolean(
                rowRect && rowRect.top >= rootRect.top - 1 && rowRect.bottom <= rootRect.bottom + 1,
            ),
            inViewport: Boolean(
                rowRect && rowRect.top >= -1 && rowRect.bottom <= window.innerHeight + 1,
            ),
            toBottomEdge: rowRect ? Math.round(rootRect.bottom - rowRect.bottom) : null,
            toTopEdge: rowRect ? Math.round(rowRect.top - rootRect.top) : null,
            pageScroll: Math.round(window.scrollY),
        };
    });
}

/** Drives the list from the page, without moving the pointer */
function control<K extends keyof ScrollTestControls>(
    page: Page,
    method: K,
    arg: Parameters<ScrollTestControls[K]>[0],
) {
    return page.evaluate(
        ({name, value}) => {
            const controls = (
                window as unknown as {scrollTestControls: Record<string, (arg: unknown) => void>}
            ).scrollTestControls;
            controls[name](value);
        },
        {name: method, value: arg},
    );
}

/** The row becomes active and ends up whole inside the root of the list */
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

function getRow(page: Page, id: string) {
    // A row that wraps carries more text after its id
    return page.getByRole('option', {name: new RegExp(`^${id}( —|$)`)});
}

/** Puts the root where a test needs it, before anything in the list is active */
async function scrollRootTo(page: Page, scrollTop: number) {
    await page.locator('[role="listbox"]').evaluate((root, top) => {
        root.scrollTo({top});
    }, scrollTop);
    await expect.poll(async () => (await readView(page)).scrollTop).toBe(scrollTop);
    // The scroll event is dispatched with the next frame
    await page.waitForTimeout(100);
}

/** Turns the wheel over the list, the way a reader scrolls it, and returns where the list stopped */
async function wheelOverList(page: Page, deltaY: number) {
    await movePointerOverList(page);
    const before = (await readView(page)).scrollTop;
    await page.mouse.wheel(0, deltaY);
    await expect.poll(async () => (await readView(page)).scrollTop).not.toBe(before);
    let previous = -1;
    await expect
        .poll(
            async () => {
                const current = (await readView(page)).scrollTop;
                const settled = current === previous;
                previous = current;
                return settled;
            },
            {intervals: [100]},
        )
        .toBe(true);
    return previous;
}

/** A point inside the row that is cut by the bottom edge of the root, in its visible part */
async function getCutRow(page: Page) {
    return page.evaluate(() => {
        const root = document.querySelector<HTMLElement>('[role="listbox"]');
        if (!root) {
            throw new Error('The list is not rendered');
        }
        const rootRect = root.getBoundingClientRect();
        const cut = Array.from(root.querySelectorAll<HTMLElement>('[role="option"]')).find(
            (option) => {
                const rect = option.getBoundingClientRect();
                return rect.top < rootRect.bottom - 4 && rect.bottom > rootRect.bottom + 4;
            },
        );
        if (!cut) {
            throw new Error('No row is cut by the bottom edge');
        }
        const rect = cut.getBoundingClientRect();
        return {
            id: (cut.textContent ?? '').split(' — ')[0],
            x: rect.left + 40,
            y: (rect.top + rootRect.bottom) / 2,
        };
    });
}

/** Away from the list */
async function movePointerAway(page: Page) {
    await page.mouse.move(1200, 20);
}

/** Over the list, without making any row active (the tests that use it turn `activateOnHover` off) */
async function movePointerOverList(page: Page) {
    const box = await page.locator('[role="listbox"]').boundingBox();
    if (!box) {
        throw new Error('The list is not rendered');
    }
    await page.mouse.move(box.x + 40, box.y + 40);
}

for (const virtualized of [false, true]) {
    test.describe(
        `List: the active row is kept in view (${virtualized ? 'virtualized' : 'plain'})`,
        {
            tag: '@List',
        },
        () => {
            test.beforeEach(async ({page}) => {
                await movePointerAway(page);
            });

            test('mounting with an active row far below brings it into view', async ({
                mount,
                page,
            }) => {
                await mount(<ScrollTestList virtualized={virtualized} activeItemId="Item 150" />);

                await expectActiveInView(page, 'Item 150');
                expect((await readView(page)).pageScroll).toBe(0);
            });

            test('a controlled change brings the row in by the nearest edge', async ({
                mount,
                page,
            }) => {
                await mount(<ScrollTestList virtualized={virtualized} activeItemId="Item 1" />);
                await expectActiveInView(page, 'Item 1');

                await control(page, 'activate', 'Item 150');
                await expectActiveInView(page, 'Item 150');
                await expect.poll(async () => (await readView(page)).toBottomEdge).toBe(0);

                // A row above the viewport comes in by the top edge
                await control(page, 'activate', 'Item 100');
                await expectActiveInView(page, 'Item 100');
                await expect.poll(async () => (await readView(page)).toTopEdge).toBe(0);
            });

            test('a row already in view is left where it is', async ({mount, page}) => {
                await mount(<ScrollTestList virtualized={virtualized} activeItemId="Item 150" />);
                await expectActiveInView(page, 'Item 150');
                const {scrollTop} = await readView(page);

                await control(page, 'activate', 'Item 147');
                await expectActiveInView(page, 'Item 147');

                await expectScrollTopToStay(page, scrollTop);
            });

            test('the keyboard scrolls the root and leaves the page alone', async ({
                mount,
                page,
            }) => {
                // The lower part of the list is below the edge of the viewport: `scrollIntoView` would
                // drag the page to show the row
                await mount(
                    <ScrollTestList
                        virtualized={virtualized}
                        activeItemId="Item 1"
                        top={OFF_THE_EDGE}
                    />,
                );
                await getRow(page, 'Item 1').focus();

                await page.keyboard.press('End');

                await expectActiveInView(page, 'Item 200');
                await expect(getRow(page, 'Item 200')).toBeFocused();
                expect((await readView(page)).pageScroll).toBe(0);
            });

            test('typeahead scrolls the root', async ({mount, page}) => {
                await mount(<ScrollTestList virtualized={virtualized} activeItemId="Item 1" />);
                await getRow(page, 'Item 1').focus();

                await page.keyboard.type('Item 15');

                await expectActiveInView(page, 'Item 15');
            });

            test.describe('a row that asked for the activity itself does not scroll', () => {
                test('a row activated by hover stays where it is', async ({mount, page}) => {
                    await mount(<ScrollTestList virtualized={virtualized} />);
                    await scrollRootTo(page, 14);
                    const cut = await getCutRow(page);

                    await page.mouse.move(cut.x, cut.y);

                    await expect.poll(async () => (await readView(page)).active).toBe(cut.id);
                    await expectScrollTopToStay(page, 14);
                });

                test('a row activated by a click stays where it is', async ({mount, page}) => {
                    await mount(
                        <ScrollTestList virtualized={virtualized} activateOnHover={false} />,
                    );
                    await scrollRootTo(page, 14);
                    const cut = await getCutRow(page);

                    await page.mouse.click(cut.x, cut.y);

                    await expect.poll(async () => (await readView(page)).active).toBe(cut.id);
                    await expectScrollTopToStay(page, 14);
                });
            });

            test.describe('the pointer over the list', () => {
                test('a controlled change does not move the rows under the pointer', async ({
                    mount,
                    page,
                }) => {
                    await mount(
                        <ScrollTestList
                            virtualized={virtualized}
                            activeItemId="Item 1"
                            activateOnHover={false}
                        />,
                    );
                    await movePointerOverList(page);

                    await control(page, 'activate', 'Item 150');
                    await expect.poll(async () => (await readView(page)).active).toBe('Item 150');
                    await expectScrollTopToStay(page, 0);

                    // With the pointer gone the activity moves the list again
                    await movePointerAway(page);
                    await control(page, 'activate', 'Item 160');
                    await expectActiveInView(page, 'Item 160');
                });

                test('an activity that appears where there was none scrolls to its row', async ({
                    mount,
                    page,
                }) => {
                    await mount(
                        <ScrollTestList virtualized={virtualized} activateOnHover={false} />,
                    );
                    await movePointerOverList(page);

                    // Nothing is active, so there is no row under the pointer to hold on to: a list
                    // that got its rows after it was opened shows the one it was opened for
                    await control(page, 'activate', 'Item 150');

                    await expectActiveInView(page, 'Item 150');
                });

                test('a key scrolls the list all the same', async ({mount, page}) => {
                    await mount(
                        <ScrollTestList
                            virtualized={virtualized}
                            activeItemId="Item 1"
                            activateOnHover={false}
                        />,
                    );
                    await getRow(page, 'Item 1').focus();
                    await movePointerOverList(page);

                    await page.keyboard.press('End');

                    await expectActiveInView(page, 'Item 200');
                });
            });

            test.describe('rows that change under the same active row', () => {
                test('rows inserted above the active row bring it back into view', async ({
                    mount,
                    page,
                }) => {
                    await mount(
                        <ScrollTestList virtualized={virtualized} activeItemId="Item 150" />,
                    );
                    await expectActiveInView(page, 'Item 150');
                    const before = (await readView(page)).scrollTop;

                    await control(page, 'insertAbove', 30);

                    await expect
                        .poll(async () => (await readView(page)).scrollTop)
                        .toBeGreaterThan(before);
                    await expectActiveInView(page, 'Item 150');
                });

                test('a reader who scrolled away from the active row is not thrown back', async ({
                    mount,
                    page,
                }) => {
                    await mount(
                        <ScrollTestList
                            virtualized={virtualized}
                            activeItemId="Item 150"
                            activateOnHover={false}
                        />,
                    );
                    await expectActiveInView(page, 'Item 150');

                    // To the top of the list, say — and then the rows change
                    expect(await wheelOverList(page, -100000)).toBe(0);
                    await control(page, 'insertAbove', 30);

                    await expect(getRow(page, 'Earlier 200')).toBeVisible();
                    await expectScrollTopToStay(page, 0);
                });

                test('rows that arrive below leave the list where the reader put it', async ({
                    mount,
                    page,
                }) => {
                    await mount(
                        <ScrollTestList
                            virtualized={virtualized}
                            activeItemId="Item 150"
                            activateOnHover={false}
                        />,
                    );
                    await expectActiveInView(page, 'Item 150');

                    // A few pixels: the active row is still in view
                    const scrollTop = await wheelOverList(page, 20);
                    expect((await readView(page)).inRoot).toBe(true);
                    await control(page, 'append', 30);

                    await expectScrollTopToStay(page, scrollTop);
                });
            });
        },
    );
}

test.describe('List: the active row on a touch screen', {tag: '@List'}, () => {
    test.use({hasTouch: true});

    for (const virtualized of [false, true]) {
        test(`a tapped row stays where it is (${virtualized ? 'virtualized' : 'plain'})`, async ({
            mount,
            page,
        }) => {
            await mount(<ScrollTestList virtualized={virtualized} />);
            await scrollRootTo(page, 14);
            const cut = await getCutRow(page);

            // The finger leaves the list before the focus and the click arrive
            await page.touchscreen.tap(cut.x, cut.y);

            await expect.poll(async () => (await readView(page)).active).toBe(cut.id);
            await expectScrollTopToStay(page, 14);
        });
    }
});

test.describe('List: a root that is not positioned', {tag: '@List'}, () => {
    test('the row is brought to the edge of the root, wherever the root is on the page', async ({
        mount,
        page,
    }) => {
        // The rows of such a root are offset from an ancestor of the root, and the root itself is
        // far from the top of that ancestor: the way down to the root is not a part of the way to
        // the row
        await mount(<ScrollTestList activeItemId="Item 100" top={OFF_THE_EDGE} />);

        await expectActiveInView(page, 'Item 100');
        expect((await readView(page)).toBottomEdge).toBe(0);
    });
});

test.describe('List: a root that does not scroll', {tag: '@List'}, () => {
    test.beforeEach(async ({page}) => {
        await movePointerAway(page);
    });

    test('the keyboard shows the row with the page', async ({mount, page}) => {
        await mount(<ScrollTestList scrolling={false} activeItemId="Item 1" />);
        await getRow(page, 'Item 1').focus();

        await page.keyboard.press('End');

        await expect
            .poll(async () => {
                const view = await readView(page);
                return view.active === 'Item 200' && view.inViewport;
            })
            .toBe(true);
        expect((await readView(page)).pageScroll).toBeGreaterThan(0);
    });

    test('nothing but the keyboard moves the page', async ({mount, page}) => {
        // The active row is far below the viewport of the page from the start
        await mount(<ScrollTestList scrolling={false} activeItemId="Item 150" />);
        await expect.poll(async () => (await readView(page)).active).toBe('Item 150');

        await control(page, 'activate', 'Item 180');
        await expect.poll(async () => (await readView(page)).active).toBe('Item 180');
        await control(page, 'insertAbove', 30);
        await expect(getRow(page, 'Earlier 200')).toBeVisible();

        await page.waitForTimeout(250);
        expect((await readView(page)).pageScroll).toBe(0);
    });
});

test.describe('List: the scroll of the virtualization layer', {tag: '@List'}, () => {
    test.beforeEach(async ({page}) => {
        await movePointerAway(page);
    });

    test('rows of different height: a row far away is reached and stays in view', async ({
        mount,
        page,
    }) => {
        // The rows above it are not measured yet: the first scroll lands by the estimates
        await mount(<ScrollTestList virtualized wrap activeItemId="Item 150" />);

        await expectActiveInView(page, 'Item 150');
        // ...and the row does not drift away while the rows around it are measured
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
        await expectActiveInView(page, 'Item 1');

        await control(page, 'activate', 'Item 150');

        await expectActiveInView(page, 'Item 150');
    });

    test('keys pressed faster than the list settles end at the last row asked for', async ({
        mount,
        page,
    }) => {
        await mount(<ScrollTestList virtualized wrap activeItemId="Item 1" />);
        await getRow(page, 'Item 1').focus();

        for (let press = 0; press < 30; press += 1) {
            await page.keyboard.press('ArrowDown');
        }

        await expectActiveInView(page, 'Item 31');
        await page.waitForTimeout(400);
        expect((await readView(page)).inRoot).toBe(true);
    });

    test('apiRef of the wrapper scrolls to a row by its index', async ({mount, page}) => {
        await mount(<ScrollTestList virtualized />);

        await control(page, 'scrollToIndex', 149);

        await expect(getRow(page, 'Item 150')).toBeInViewport();
    });
});
