import {expect} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

import {test} from '~playwright/core';

import {SheetKitFlat, SheetKitVirtual} from './helpersPlaywright';

/**
 * Drags the second row by its handle with the mouse and reads the dragged element: it must follow
 * the pointer (no transformed ancestor shifts its position: fixed) and be the topmost element there
 */
async function dragSecondRow(page: Page) {
    const handle = page.locator('.g-hello-pangea-dnd__handle').nth(1);
    await expect(handle).toBeVisible();
    // The sheet slides in
    await page.waitForTimeout(500);
    const box = await handle.boundingBox();
    if (!box) {
        throw new Error('The handle has no box');
    }
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 10, {steps: 5});
    await page.mouse.move(x, y + 30, {steps: 5});

    const result = await page.evaluate(
        ({px, py}) => {
            const dragged = Array.from(
                document.querySelectorAll<HTMLElement>('[data-rfd-draggable-id]'),
            ).find((element) => element.style.position === 'fixed');
            const rect = dragged?.getBoundingClientRect();
            // The dragged element and the container of the clone take no pointer events, and
            // elementFromPoint skips such elements: turn them on for the measurement
            const muted: HTMLElement[] = [];
            for (let el = dragged ?? null; el; el = el.parentElement) {
                if (getComputedStyle(el).pointerEvents === 'none') {
                    muted.push(el);
                    el.style.setProperty('pointer-events', 'auto', 'important');
                }
            }
            const topmost = document.elementFromPoint(px, py);
            muted.forEach((el) => el.style.removeProperty('pointer-events'));
            return {
                underPointer: Boolean(rect && py >= rect.top && py <= rect.bottom),
                onTop: Boolean(dragged && topmost && dragged.contains(topmost)),
            };
        },
        {px: x, py: y + 30},
    );
    await page.mouse.up();
    return result;
}

test.describe('ListHelloPangeaDnd', {tag: '@HelloPangeaDnd'}, () => {
    test('inside a Sheet the dragged row follows the pointer above the sheet', async ({
        mount,
        page,
    }) => {
        await mount(<SheetKitFlat />);
        expect(await dragSecondRow(page)).toEqual({underPointer: true, onTop: true});
    });

    test('inside a Sheet, virtualized: the clone follows the pointer above the sheet', async ({
        mount,
        page,
    }) => {
        await mount(<SheetKitVirtual />);
        expect(await dragSecondRow(page)).toEqual({underPointer: true, onTop: true});
    });
});
