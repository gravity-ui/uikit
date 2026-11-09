import {expect, test} from '~playwright/core';

import {SuggestStories} from './helpersPlaywright';

test.describe('Suggest', () => {
    test('render story: <Default>', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{width: 400, height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await input.fill('ar');

        await expectScreenshot({themes: ['light']});
    });

    test('render story: <CustomPopupContent>', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.CustomPopupContent />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await input.fill('ar');

        await expectScreenshot({themes: ['light']});
    });

    test('render story: <LoadingStates>', async ({mount, expectScreenshot, page}) => {
        await mount(<SuggestStories.LoadingStates />);
        await expect(page.getByRole('listbox')).toBeVisible();
        await expect(page.locator('.g-suggest__loader')).toHaveCount(2);
        await expectScreenshot({themes: ['light']});
    });

    test('keyboard navigation: ArrowDown activates item', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await mount(
            <div style={{width: 400, height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await input.fill('a');
        await page.keyboard.press('ArrowDown');

        await expectScreenshot({themes: ['light']});
    });
});
