import {expect, test} from '~playwright/core';

import {SheetInModal, StackedSheets, TestSheet} from './helpers';

test.describe('Sheet keyboard access', {tag: '@Sheet'}, () => {
    test('focuses the sheet, traps Tab in both directions, and restores focus after Escape', async ({
        mount,
        page,
    }) => {
        await mount(<StackedSheets />);
        const trigger = page.getByRole('button', {name: 'Open parent'});
        const background = page.getByRole('button', {name: 'Background action'});
        await trigger.click();
        const dialog = page.getByRole('dialog', {name: 'Parent'});
        const first = dialog.getByRole('button', {name: 'First action'});
        const last = dialog.getByRole('button', {name: 'Last action'});
        const close = dialog.getByRole('button', {name: 'Close'}).last();

        await expect(dialog).toBeFocused();
        await expect(background).toHaveCount(0);
        await page.keyboard.press('Tab');
        await expect(first).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(close).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(last).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(close).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(first).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
        await expect(background).toHaveCount(1);
    });

    test('closes through the visually hidden dismiss control reached by Tab', async ({
        mount,
        page,
    }) => {
        await mount(<StackedSheets />);
        const trigger = page.getByRole('button', {name: 'Open parent'});
        await trigger.click();
        const dialog = page.getByRole('dialog', {name: 'Parent'});
        const close = dialog.getByRole('button', {name: 'Close'}).last();
        // The initial focus lands a frame later and would take the focus back
        await expect(dialog).toBeFocused();

        await page.keyboard.press('Shift+Tab');
        await expect(close).toBeFocused();
        await expect(close).toBeInViewport();
        await page.keyboard.press('Enter');

        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
    });

    for (const {name, sibling} of [
        {name: 'nested', sibling: false},
        {name: 'sibling', sibling: true},
    ]) {
        test(`keeps focus in the topmost ${name} sheet and dismisses one sheet per Escape`, async ({
            mount,
            page,
        }) => {
            await mount(<StackedSheets sibling={sibling} />);
            const trigger = page.getByRole('button', {name: 'Open parent'});
            await trigger.click();
            const childTrigger = page.getByRole('button', {name: 'Open child'});
            await childTrigger.click();
            const child = page.getByRole('dialog', {name: 'Child'});
            const childAction = child.getByRole('button', {name: 'Child action'});

            await expect(child).toBeFocused();
            await page.keyboard.press('Tab');
            await expect(childAction).toBeFocused();
            await page.keyboard.press('Tab');
            await expect(child.getByRole('button', {name: 'Close'}).last()).toBeFocused();
            await page.keyboard.press('Tab');
            await expect(childAction).toBeFocused();

            await page.keyboard.press('Escape');

            await expect(child).toHaveCount(0);
            await expect(childTrigger).toBeFocused();
            await expect(page.getByRole('dialog', {name: 'Parent'})).toBeVisible();

            await page.keyboard.press('Escape');

            await expect(page.getByRole('dialog', {name: 'Parent'})).toHaveCount(0);
            await expect(trigger).toBeFocused();
        });
    }

    test('does not draw a focus ring around a sheet that takes focus itself', async ({
        mount,
        page,
    }) => {
        await mount(<TestSheet />);
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        const dialog = page.getByRole('dialog');

        await expect(dialog).toBeFocused();
        await expect(dialog).toHaveCSS('outline-style', 'none');
    });

    test('shares focus and Escape handling with the Modal it is opened in', async ({
        mount,
        page,
    }) => {
        await mount(<SheetInModal />);
        const modalTrigger = page.getByRole('button', {name: 'Open modal'});
        await modalTrigger.click();
        const modal = page.getByRole('dialog', {name: 'Modal'});
        await expect(modal).toBeFocused();
        const sheetTrigger = page.getByRole('button', {name: 'Open sheet'});
        await sheetTrigger.click();
        const sheet = page.getByRole('dialog', {name: 'Inside modal'});
        const first = sheet.getByRole('button', {name: 'First sheet action'});
        const last = sheet.getByRole('button', {name: 'Last sheet action'});
        const close = sheet.getByRole('button', {name: 'Close'}).last();

        await expect(sheet).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(first).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(close).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(last).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(close).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(first).toBeFocused();

        await page.keyboard.press('Escape');

        await expect(sheet).toHaveCount(0);
        await expect(sheetTrigger).toBeFocused();
        await expect(modal).toBeVisible();

        await page.keyboard.press('Escape');

        await expect(modal).toHaveCount(0);
        await expect(modalTrigger).toBeFocused();
    });
});
