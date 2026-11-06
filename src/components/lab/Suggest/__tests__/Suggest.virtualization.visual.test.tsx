import {expect, test} from '~playwright/core';

import {SuggestPagination, SuggestStories} from './helpersPlaywright';

test('Suggest virtualization: scroll and select an option through the popup portal', async ({
    mount,
    page,
}) => {
    await mount(<SuggestStories.Virtualized />);
    const input = page.getByRole('combobox');
    await input.click();
    const list = page.getByRole('listbox');
    await expect(list).toBeVisible();
    await expect(page.getByRole('option', {name: 'Option 0', exact: true})).toBeVisible();
    expect(await page.getByRole('option').count()).toBeLessThan(100);
    await list.evaluate((element) => {
        element.scrollTo({top: 28000});
    });
    const option = page.getByRole('option', {name: 'Option 1000', exact: true});
    await expect(option).toBeVisible();
    await option.click();
    await expect(input).toHaveValue('Option 1000');
    await expect(input).toBeFocused();
    await expect(list).not.toBeVisible();
});

test.describe('Suggest pagination', () => {
    for (const virtualized of [false, true]) {
        test(`preserves scroll and highlight, virtualized=${virtualized}`, async ({
            mount,
            page,
        }) => {
            await mount(<SuggestPagination virtualized={virtualized} />);
            const input = page.getByRole('combobox');
            const list = page.getByRole('listbox');
            await input.focus();
            for (let index = 0; index < 40; index++) {
                await input.press('ArrowDown');
            }
            await expect(
                page.getByRole('option', {name: 'Option 39', exact: true}),
            ).toBeInViewport();
            await expect(input).toHaveAttribute('aria-activedescendant', /.+/);
            const activeId = (await input.getAttribute('aria-activedescendant')) ?? '';
            await list.evaluate((element) => {
                element.scrollTo(0, element.scrollHeight);
            });
            await expect(page.locator('[data-qa="load-requests"]')).toHaveText('0');
            const scrollTop = await list.evaluate((element) => element.scrollTop);
            expect(scrollTop).toBeGreaterThan(0);

            await page.getByRole('button', {name: 'Start loading'}).click();
            await expect(input).toHaveAttribute('aria-activedescendant', activeId);
            await expect.poll(() => list.evaluate((element) => element.scrollTop)).toBe(scrollTop);
            await list.evaluate((element) => {
                element.scrollTo(0, element.scrollHeight);
            });
            await expect(page.locator('.g-suggest__loader')).toBeVisible();
            await expect(page.locator('[data-qa="load-requests"]')).toHaveText('1');
            const loadingScrollTop = await list.evaluate((element) => element.scrollTop);

            await page.getByRole('button', {name: 'Finish loading'}).click();
            await expect(input).toHaveAttribute('aria-activedescendant', activeId);
            await expect
                .poll(() => list.evaluate((element) => element.scrollTop))
                .toBe(loadingScrollTop);
            await expect(page.locator('.g-suggest__loader')).toHaveCount(0);
            await expect(page.locator('[data-qa="load-requests"]')).toHaveText('1');
        });
    }
});
