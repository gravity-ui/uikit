import {expect, test} from '~playwright/core';

import {MobileProvider} from '../../mobile';
import {Select} from '../Select';

const OPTIONS = [
    {value: 'bug', content: 'Bug'},
    {value: 'task', content: 'Task'},
];

test.describe('Select sheet', {tag: '@Select'}, () => {
    test('focuses the active option and selects another one with the keyboard', async ({
        mount,
        page,
    }) => {
        await mount(
            <MobileProvider mobile>
                <Select label="Type" options={OPTIONS} />
            </MobileProvider>,
        );
        const trigger = page.getByRole('combobox', {name: 'Type'});
        await trigger.click();
        const dialog = page.getByRole('dialog', {name: 'Type'});
        const list = dialog.getByRole('listbox', {name: 'Type'});

        await expect(list.getByRole('option', {name: 'Bug'})).toBeFocused();
        await page.keyboard.press('ArrowDown');
        await expect(list.getByRole('option', {name: 'Task'})).toBeFocused();
        await page.keyboard.press('Enter');

        await expect(dialog).toHaveCount(0);
        await expect(trigger).toHaveAccessibleName('Type');
        await expect(trigger).toContainText('Task');
        await expect(trigger).toBeFocused();
    });

    test('focuses the sheet itself and leaves the list to the filter', async ({mount, page}) => {
        await mount(
            <MobileProvider mobile>
                <Select label="Type" filterable options={OPTIONS} />
            </MobileProvider>,
        );
        await page.getByRole('combobox', {name: 'Type'}).click();
        const dialog = page.getByRole('dialog', {name: 'Type'});

        await expect(dialog).toBeFocused();
        await page.keyboard.press('Tab');
        const filter = dialog.getByRole('combobox');
        await expect(filter).toBeFocused();
        await page.keyboard.press('ArrowDown');

        const taskId = await dialog.getByRole('option', {name: 'Task'}).getAttribute('id');
        await expect(filter).toHaveAttribute('aria-activedescendant', taskId ?? '');
    });
});
