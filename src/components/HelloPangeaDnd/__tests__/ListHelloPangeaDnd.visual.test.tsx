import {expect} from '@playwright/experimental-ct-react';
import type {Locator, Page} from '@playwright/test';

import {test} from '~playwright/core';

import {SheetKitFlat, SheetKitVirtual} from './helpersPlaywright';

/** The sheet slides in: wait until the handle stops moving */
async function getSettledCenter(handle: Locator) {
    let previous = '';
    await expect
        .poll(
            async () => {
                const current = JSON.stringify(await handle.boundingBox());
                const settled = current === previous && current !== 'null';
                previous = current;
                return settled;
            },
            {intervals: [100]},
        )
        .toBe(true);
    const box = JSON.parse(previous) as {x: number; y: number; width: number; height: number};
    return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

/**
 * Where the dragged element is: under the pointer (no transformed ancestor shifts its
 * position: fixed) and the topmost element there
 */
function readDragged(page: Page, x: number, y: number) {
    return page.evaluate(
        ({px, py}) => {
            const dragged = Array.from(
                document.querySelectorAll<HTMLElement>('[data-rfd-draggable-id]'),
            ).find((element) => element.style.position === 'fixed');
            const rect = dragged?.getBoundingClientRect();
            // The dragged element takes no pointer events, and elementFromPoint skips such
            // elements: turn them on for the measurement
            const muted: HTMLElement[] = [];
            for (let element = dragged ?? null; element; element = element.parentElement) {
                if (getComputedStyle(element).pointerEvents === 'none') {
                    muted.push(element);
                    element.style.setProperty('pointer-events', 'auto', 'important');
                }
            }
            const topmost = document.elementFromPoint(px, py);
            muted.forEach((element) => element.style.removeProperty('pointer-events'));
            return {
                underPointer: Boolean(
                    rect &&
                        py >= rect.top &&
                        py <= rect.bottom &&
                        px >= rect.left &&
                        px <= rect.right,
                ),
                onTop: Boolean(dragged && topmost && dragged.contains(topmost)),
            };
        },
        {px: x, py: y},
    );
}

async function dragWithMouse(page: Page) {
    const {x, y} = await getSettledCenter(page.locator('.g-hello-pangea-dnd__handle').nth(1));
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 10, {steps: 5});
    await page.mouse.move(x, y + 30, {steps: 5});
    const result = await readDragged(page, x, y + 30);
    await page.mouse.up();
    return result;
}

/** The touch sensor of the library: a long press, then the move */
async function dragWithTouch(page: Page) {
    const {x, y} = await getSettledCenter(page.locator('.g-hello-pangea-dnd__handle').nth(1));
    const client = await page.context().newCDPSession(page);
    const touch = (type: 'touchStart' | 'touchMove' | 'touchEnd', touchY: number) =>
        client.send('Input.dispatchTouchEvent', {
            type,
            touchPoints: type === 'touchEnd' ? [] : [{x, y: touchY}],
        });
    await touch('touchStart', y);
    await page.waitForTimeout(300);
    for (let step = 1; step <= 8; step++) {
        await touch('touchMove', y + step * 4);
    }
    const result = await readDragged(page, x, y + 32);
    await touch('touchEnd', y + 32);
    const dragEnded = await expect
        .poll(() => page.locator('[data-drag-active]').count())
        .toBe(0)
        .then(() => true);
    return {...result, dragEnded};
}

test.describe('ListHelloPangeaDnd', {tag: '@HelloPangeaDnd'}, () => {
    test('inside a Sheet the dragged row follows the mouse above the sheet', async ({
        mount,
        page,
    }) => {
        await mount(<SheetKitFlat />);
        expect(await dragWithMouse(page)).toEqual({underPointer: true, onTop: true});
    });

    test('inside a Sheet, virtualized: the clone follows the mouse above the sheet', async ({
        mount,
        page,
    }) => {
        await mount(<SheetKitVirtual />);
        expect(await dragWithMouse(page)).toEqual({underPointer: true, onTop: true});
    });

    test.describe('touch', () => {
        test.use({hasTouch: true});

        test('inside a Sheet the dragged row follows the finger and the drag ends', async ({
            mount,
            page,
        }) => {
            await mount(<SheetKitFlat />);
            expect(await dragWithTouch(page)).toEqual({
                underPointer: true,
                onTop: true,
                dragEnded: true,
            });
        });
    });
});
