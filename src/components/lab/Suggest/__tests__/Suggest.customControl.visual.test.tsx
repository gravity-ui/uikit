import {expect, test} from '~playwright/core';

import {SuggestStories} from './helpersPlaywright';

test('Suggest custom TextArea preserves plain arrows and Enter while an option is active', async ({
    mount,
    page,
}) => {
    await mount(<SuggestStories.CustomInput />);
    const input = page.getByRole('textbox', {name: 'Reply'});
    await input.fill('Thank you\n');
    await input.press('Home');
    await input.press('ArrowUp');
    await expect
        .poll(() => input.evaluate((element: HTMLTextAreaElement) => element.selectionStart))
        .toBe(0);
    await expect(page.getByRole('listbox')).toBeVisible();

    await input.press('Alt+ArrowDown');
    await expect(input).toHaveAttribute(
        'aria-activedescendant',
        await page
            .getByRole('option')
            .first()
            .evaluate((element) => element.id),
    );
    await input.press('Enter');
    await expect(input).toHaveValue('\nThank you\n');
    await input.press('ArrowDown');
    await input.press('Home');
    await expect
        .poll(() => input.evaluate((element: HTMLTextAreaElement) => element.selectionStart))
        .toBe('\nThank you\n'.length);
    await expect(page.getByRole('listbox')).toBeVisible();
});

test('Suggest custom TextArea opens on click and applies the active option', async ({
    mount,
    page,
}) => {
    await mount(<SuggestStories.CustomInput />);
    const input = page.getByRole('textbox', {name: 'Reply'});
    await input.click();
    await expect(page.getByRole('listbox')).toBeVisible();
    const text = await page.getByRole('option').first().innerText();

    await input.press('Alt+ArrowDown');
    await input.press('Alt+Enter');

    await expect(input).toHaveValue(text);
    await expect(input).toBeFocused();
    await expect(page.getByRole('listbox')).toBeHidden();
});
