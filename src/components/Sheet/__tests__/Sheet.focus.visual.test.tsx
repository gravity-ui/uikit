import {expect, test} from '~playwright/core';

import {Select} from '../../Select';
import {MobileProvider} from '../../mobile';

import {FocusTestSheet} from './helpers';

test.describe('Sheet keyboard access', {tag: '@Sheet'}, () => {
    test('focuses content, traps Tab in both directions, and restores focus after Escape', async ({
        mount,
        page,
    }) => {
        await mount(<FocusTestSheet />);
        const trigger = page.getByRole('button', {name: 'Open sheet', exact: true});
        await trigger.click();
        const dialog = page.getByRole('dialog', {name: 'Parent'});
        const first = dialog.getByRole('button', {name: 'First action'});
        const last = dialog.getByRole('button', {name: 'Last action'});

        await expect(first).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(last).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(first).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
    });

    test('dismisses only the nested sheet and returns focus to its trigger', async ({
        mount,
        page,
    }) => {
        await mount(<FocusTestSheet />);
        await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
        const nestedTrigger = page.getByRole('button', {name: 'Open nested sheet'});
        await nestedTrigger.click();
        await expect(page.getByRole('button', {name: 'Nested action'})).toBeFocused();

        await page.keyboard.press('Escape');

        await expect(page.getByRole('dialog', {name: 'Nested'})).toHaveCount(0);
        await expect(nestedTrigger).toBeFocused();
        await expect(page.getByRole('dialog', {name: 'Parent'})).toBeVisible();
    });

    test('keeps focus in the topmost sibling sheet', async ({mount, page}) => {
        await mount(<FocusTestSheet sibling />);
        await page.getByRole('button', {name: 'Open sheet', exact: true}).click();
        const nestedTrigger = page.getByRole('button', {name: 'Open nested sheet'});
        await nestedTrigger.click();
        const nestedAction = page.getByRole('button', {name: 'Nested action'});
        await expect(nestedAction).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(nestedAction).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog', {name: 'Nested'})).toHaveCount(0);
        await expect(nestedTrigger).toBeFocused();
    });

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

    test('manages focus for the mobile Select sheet', async ({mount, page}) => {
        await mount(
            <MobileProvider mobile>
                <Select
                    placeholder="Select type"
                    filterable
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
        await expect(dialog.locator('input')).toBeFocused();

        await page.keyboard.press('Escape');

        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
    });
});
