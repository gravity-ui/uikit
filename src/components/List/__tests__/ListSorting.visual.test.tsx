import {expect, test} from '~playwright/core';

import {SortableListInSheet} from './SortableListInSheet';

test.use({viewport: {width: 390, height: 844}, hasTouch: true});

for (const virtualized of [false, true]) {
    test.describe(`sorting in Sheet, virtualized=${virtualized}`, () => {
        test('keeps the keyboard drag preview above the sheet and saves the order', async ({
            page,
            mount,
        }) => {
            await mount(<SortableListInSheet virtualized={virtualized} />);
            await page.getByRole('button', {name: 'Open sheet'}).click();
            const first = page.getByRole('listitem').filter({hasText: 'one'});
            await first.getByRole('button').focus();
            await page.keyboard.press('Space');
            const preview = page.locator('.g-list__item_dragging');
            await expect(preview).toHaveCSS('z-index', '100001');
            await expect(page.getByText('You have lifted an item in position 1')).toBeAttached();
            await expect(preview).toHaveCSS('position', 'fixed');
            await expect
                .poll(() =>
                    preview.evaluate((node) => {
                        const rect = node.getBoundingClientRect();
                        // DnD disables pointer events on the preview. Enable hit testing only
                        // for this assertion to verify that the Sheet does not cover it.
                        const pointerEvents = node.style.pointerEvents;
                        const style = node.style;
                        style.pointerEvents = 'auto';
                        const visible = node.contains(
                            document.elementFromPoint(
                                rect.x + rect.width / 2,
                                rect.y + rect.height / 2,
                            ),
                        );
                        style.pointerEvents = pointerEvents;
                        return visible;
                    }),
                )
                .toBe(true);
            await page.keyboard.press('ArrowDown');
            await expect(page.getByText(/to position 2/)).toBeAttached();
            await page.keyboard.press('Space');
            await expect(page.getByRole('status')).toHaveText('0:1');
            await expect(page.getByRole('listitem')).toHaveText(['two', 'one', 'three']);
            await expect(page.getByRole('listitem').first()).not.toHaveCSS('z-index', '100001');
        });

        test('keeps the touch drag preview visible and saves the order', async ({page, mount}) => {
            await mount(<SortableListInSheet virtualized={virtualized} />);
            await page.getByRole('button', {name: 'Open sheet'}).click();
            const handle = page.getByRole('listitem').filter({hasText: 'one'}).getByRole('button');
            const box = await handle.boundingBox();
            if (!box) throw new Error('Drag handle is not visible');
            const x = box.x + box.width / 2;
            const y = box.y + box.height / 2;
            await handle.evaluate(
                (node, point) => {
                    node.dispatchEvent(
                        new TouchEvent('touchstart', {
                            bubbles: true,
                            cancelable: true,
                            touches: [
                                new Touch({
                                    identifier: 1,
                                    target: node,
                                    clientX: point.x,
                                    clientY: point.y,
                                }),
                            ],
                        }),
                    );
                },
                {x, y},
            );
            const preview = page.locator('.g-list__item_dragging');
            await expect(preview).toHaveCSS('z-index', '100001');
            await expect(page.getByText('You have lifted an item in position 1')).toBeAttached();
            for (const offset of [10, 20, 30, 40, 50]) {
                // The original handle is removed by renderClone; exercise the window
                // touch sensor independently of Chromium's detached touch target behavior.
                await page.evaluate(
                    (point) => {
                        document.body.dispatchEvent(
                            new TouchEvent('touchmove', {
                                bubbles: true,
                                cancelable: true,
                                touches: [
                                    new Touch({
                                        identifier: 1,
                                        target: document.body,
                                        clientX: point.x,
                                        clientY: point.y,
                                    }),
                                ],
                            }),
                        );
                    },
                    {x, y: y + offset},
                );
                await page.evaluate(() => new Promise(requestAnimationFrame));
            }
            await expect
                .poll(() =>
                    preview.evaluate((node) => {
                        const rect = node.getBoundingClientRect();
                        // DnD disables pointer events on the preview. Enable hit testing only
                        // for this assertion to verify that the Sheet does not cover it.
                        const pointerEvents = node.style.pointerEvents;
                        const style = node.style;
                        style.pointerEvents = 'auto';
                        const visible = node.contains(
                            document.elementFromPoint(
                                rect.x + rect.width / 2,
                                rect.y + rect.height / 2,
                            ),
                        );
                        style.pointerEvents = pointerEvents;
                        return visible;
                    }),
                )
                .toBe(true);
            await expect(page.getByText(/to position 2/)).toBeAttached();
            await page.evaluate(() =>
                document.body.dispatchEvent(
                    new TouchEvent('touchend', {bubbles: true, cancelable: true, touches: []}),
                ),
            );
            await expect(page.getByRole('status')).toHaveText('0:1');
            await expect(page.getByRole('listitem')).toHaveText(['two', 'one', 'three']);
        });
    });
}
