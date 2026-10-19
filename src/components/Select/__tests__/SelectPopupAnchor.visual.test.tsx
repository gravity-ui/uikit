import {expect} from '@playwright/experimental-ct-react';
import type {Locator, Page} from '@playwright/test';

import {test} from '~playwright/core';

import {FLOATING_OFFSET} from '../../Popup/constants';
import {BORDER_WIDTH} from '../constants';

import {AnchorStand} from './anchorHelpersPlaywright';

// Where the popup stands is a matter of layout, so it is tested in the browser: no screenshots,
// the tests read the rectangles.

/** Longer than the press animation of the trigger and the open transition of the popup */
const SETTLE_TIME = 400;

const readRect = (locator: Locator) =>
    locator.evaluate((element) => {
        const {left, top, right, bottom, width} = element.getBoundingClientRect();
        return {left, top, right, bottom, width};
    });

// The positioned element is the parent of the popup content: its own transition does not move it
const getFloating = (page: Page) => page.getByTestId('select-popup').locator('..');

const getTrigger = (page: Page, customControl?: boolean) =>
    customControl ? page.getByTestId('custom-control') : page.locator('.g-select-control');

async function open(page: Page, trigger: Locator) {
    await trigger.click();
    await getFloating(page).waitFor();
    await page.waitForTimeout(SETTLE_TIME);
}

test.describe('Select popup anchor', {tag: '@Select'}, () => {
    test('opens right under the control, not under the error message', async ({mount, page}) => {
        await mount(<AnchorStand />);
        const trigger = getTrigger(page);
        await open(page, trigger);

        const control = await readRect(trigger);
        const popup = await readRect(getFloating(page));

        expect(popup.top - control.bottom).toBeCloseTo(FLOATING_OFFSET, 0);
    });

    test('flips right above the control', async ({mount, page}) => {
        await mount(<AnchorStand position="bottom" />);
        const trigger = getTrigger(page);
        await open(page, trigger);

        const control = await readRect(trigger);
        const popup = await readRect(getFloating(page));

        expect(control.top - popup.bottom).toBeCloseTo(FLOATING_OFFSET, 0);
    });

    for (const customControl of [false, true]) {
        test(`does not measure the pressed trigger${customControl ? ', custom control' : ''}`, async ({
            mount,
            page,
        }) => {
            await mount(<AnchorStand customControl={customControl} />);
            const trigger = getTrigger(page, customControl);
            const box = await trigger.boundingBox();

            if (!box) {
                throw new Error('No trigger');
            }

            // Hold the press until the trigger has shrunk: the popup opens while it grows back
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.waitForTimeout(SETTLE_TIME);
            await page.mouse.up();
            await expect(getFloating(page)).toHaveAttribute('data-floating-ui-status', 'open');

            const atOpen = await readRect(getFloating(page));
            await page.waitForTimeout(SETTLE_TIME);
            const settled = await readRect(getFloating(page));
            // The width comes from the root, as before: a custom control may be narrower
            const root = await readRect(page.locator('.g-select'));

            for (const key of ['left', 'top', 'width'] as const) {
                expect(atOpen[key]).toBeCloseTo(settled[key], 0);
            }
            expect(settled.left - root.left).toBeCloseTo(BORDER_WIDTH, 0);
            expect(settled.width).toBeCloseTo(root.width - 2 * BORDER_WIDTH, 0);
        });
    }

    for (const width of ['max', 300] as const) {
        test(`is as wide as the control, width ${width}`, async ({mount, page}) => {
            await mount(<AnchorStand width={width} />);
            const trigger = getTrigger(page);
            await open(page, trigger);

            const container = await readRect(page.locator('.g-select').locator('..'));
            const root = await readRect(page.locator('.g-select'));
            const control = await readRect(trigger);
            const popup = await readRect(getFloating(page));

            expect(control.width).toBeCloseTo(width === 'max' ? container.width : width, 0);
            expect(root.width).toBeCloseTo(control.width, 0);
            expect(popup.width).toBeCloseTo(control.width - 2 * BORDER_WIDTH, 0);
        });
    }
});
