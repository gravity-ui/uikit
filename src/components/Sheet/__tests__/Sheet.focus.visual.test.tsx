import {expect, test} from '~playwright/core';

import {Select} from '../../Select';
import {MobileProvider} from '../../mobile';

import {FocusTestSheet, FocusTestSheetInModal, TestSheet} from './helpers';

test.describe('Sheet keyboard access', {tag: '@Sheet'}, () => {
    test('focuses the sheet, traps Tab in both directions, and restores focus after Escape', async ({
        mount,
        page,
    }) => {
        await mount(<FocusTestSheet />);
        const trigger = page.getByRole('button', {name: 'Open sheet', exact: true});
        const background = page.getByRole('button', {name: 'Background action'});
        await trigger.click();
        const dialog = page.getByRole('dialog', {name: 'Parent'});
        const first = dialog.getByRole('button', {name: 'First action'});
        const last = dialog.getByRole('button', {name: 'Last action'});

        await expect(dialog).toBeFocused();
        await expect(background).toHaveCount(0);
        await page.keyboard.press('Tab');
        await expect(first).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(last).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(first).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
        await expect(background).toHaveCount(1);
    });

    test('closes through the visually hidden dismiss control', async ({mount, page}) => {
        await mount(<FocusTestSheet />);
        const trigger = page.getByRole('button', {name: 'Open sheet', exact: true});
        await trigger.click();
        const dialog = page.getByRole('dialog', {name: 'Parent'});
        await expect(dialog).toBeVisible();

        await page.getByRole('button', {name: 'Close'}).first().focus();
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
            await mount(<FocusTestSheet sibling={sibling} />);
            const trigger = page.getByRole('button', {name: 'Open sheet', exact: true});
            await trigger.click();
            const nestedTrigger = page.getByRole('button', {name: 'Open nested sheet'});
            await nestedTrigger.click();
            const nested = page.getByRole('dialog', {name: 'Nested'});
            const nestedAction = nested.getByRole('button', {name: 'Nested action'});

            await expect(nested).toBeFocused();
            await page.keyboard.press('Tab');
            await expect(nestedAction).toBeFocused();
            await page.keyboard.press('Tab');
            await expect(nestedAction).toBeFocused();

            await page.keyboard.press('Escape');

            await expect(nested).toHaveCount(0);
            await expect(nestedTrigger).toBeFocused();
            await expect(page.getByRole('dialog', {name: 'Parent'})).toBeVisible();

            await page.keyboard.press('Escape');

            await expect(page.getByRole('dialog', {name: 'Parent'})).toHaveCount(0);
            await expect(trigger).toBeFocused();
        });
    }

    test('keeps focus outside when modal is disabled', async ({mount, page}) => {
        await mount(<FocusTestSheet modal={false} />);
        const trigger = page.getByRole('button', {name: 'Open sheet', exact: true});
        await trigger.click();
        await expect(trigger).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', {name: 'Background action'})).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog', {name: 'Parent'})).toBeVisible();
    });

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
        await mount(<FocusTestSheetInModal />);
        const modalTrigger = page.getByRole('button', {name: 'Open modal'});
        await modalTrigger.click();
        const modal = page.getByRole('dialog', {name: 'Modal'});
        await expect(modal).toBeFocused();
        const sheetTrigger = page.getByRole('button', {name: 'Open sheet in modal'});
        await sheetTrigger.click();
        const sheet = page.getByRole('dialog', {name: 'Inside modal'});
        const first = sheet.getByRole('button', {name: 'First sheet action'});
        const last = sheet.getByRole('button', {name: 'Last sheet action'});

        await expect(sheet).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(first).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(last).toBeFocused();
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

    test('selects an option of the mobile Select with the keyboard', async ({mount, page}) => {
        await mount(
            <MobileProvider mobile>
                <Select
                    placeholder="Select type"
                    options={[
                        {value: 'bug', content: 'Bug'},
                        {value: 'task', content: 'Task'},
                    ]}
                />
            </MobileProvider>,
        );
        const trigger = page.getByRole('combobox');
        await trigger.click();
        const dialog = page.getByRole('dialog');
        const list = dialog.getByRole('combobox');
        await expect(list).toBeFocused();

        await page.keyboard.press('ArrowDown');

        const taskId = await dialog.getByRole('option', {name: 'Task'}).getAttribute('id');
        await expect(list).toHaveAttribute('aria-activedescendant', taskId ?? '');

        await page.keyboard.press('Enter');

        await expect(dialog).toHaveCount(0);
        await expect(trigger).toHaveText('Task');
        await expect(trigger).toBeFocused();
    });
});
