import {expect, test} from '~playwright/core';

import {SuggestStories} from './helpersPlaywright';

test.describe('Suggest', () => {
    test('render story: <Default>', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await input.fill('ar');

        await expectScreenshot();
    });

    test('render story: <Default> with empty value and items', async ({
        mount,
        expectScreenshot,
        page,
    }) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input');
        await input.click();

        await expectScreenshot();
    });

    test('render story: <ShowOptionsOnEmptyValue>', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.ShowOptionsOnEmptyValue />
            </div>,
        );

        const input = page.locator('input');
        await input.click();

        await expectScreenshot();
    });

    test('render story: <CustomEmptyState>', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 300}}>
                <SuggestStories.CustomEmptyState />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await input.fill('xyz');

        await expectScreenshot();
    });

    test('render story: <PopupWidth> fit', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 600}}>
                <SuggestStories.PopupWidth />
            </div>,
        );

        const inputs = page.locator('input');
        await inputs.first().click();

        await expectScreenshot();
    });

    test('render story: <Sizes> size s', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 700}}>
                <SuggestStories.Sizes />
            </div>,
        );

        const inputs = page.locator('input');
        await inputs.first().click();

        await expectScreenshot();
    });

    test('render story: <Sizes> size m', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 700}}>
                <SuggestStories.Sizes />
            </div>,
        );

        const inputs = page.locator('input');
        await inputs.nth(1).click();

        await expectScreenshot();
    });

    test('render story: <Sizes> size l', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 700}}>
                <SuggestStories.Sizes />
            </div>,
        );

        const inputs = page.locator('input');
        await inputs.nth(2).click();

        await expectScreenshot();
    });

    test('render story: <Sizes> size xl', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 700}}>
                <SuggestStories.Sizes />
            </div>,
        );

        const inputs = page.locator('input');
        await inputs.nth(3).click();

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<SuggestStories.Disabled />);

        await expectScreenshot();
    });

    test('render story: <WithClearButton>', async ({mount, expectScreenshot}) => {
        await mount(<SuggestStories.WithClearButton />);

        await expectScreenshot();
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

        await expectScreenshot();
    });

    test('keyboard navigation: ArrowDown activates item', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await page.keyboard.press('ArrowDown');

        await expectScreenshot();
    });

    test('keyboard navigation: ArrowDown then ArrowDown moves to second item', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await expectScreenshot();
    });

    test('loading state shows loader', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 300}}>
                <SuggestStories.WithAsyncFetch />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await input.fill('e');

        // Wait a bit for loading to show
        await page.waitForTimeout(400);

        await expectScreenshot();
    });

    test('error state shows error message', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.WithErrorHandling />
            </div>,
        );

        // Error mode is enabled by default in the story; typing triggers the error
        const input = page.locator('input');
        await input.click();
        await input.fill('test');

        // Wait for the throttled fetch + the simulated 500 ms latency to settle,
        // plus the 300 ms delay before the loader/error placeholder renders.
        await page.waitForTimeout(1000);

        await expectScreenshot();
    });

    test('aria-activedescendant updates correctly', async ({mount, page}) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input[role="combobox"]');
        await input.click();
        // Default story has `showOptionsOnEmptyValue: false`, so type to populate options
        await input.fill('a');

        // Wait until options are rendered into the listbox
        await expect(page.locator('[role="listbox"]')).toBeVisible();

        const ariaDescendantBefore = await input.getAttribute('aria-activedescendant');
        expect(ariaDescendantBefore).toBeNull();

        await page.keyboard.press('ArrowDown');

        await page.waitForFunction(() => {
            const el = document.querySelector('input[role="combobox"]');
            return el?.getAttribute('aria-activedescendant') !== null;
        });

        const ariaDescendantAfter = await input.getAttribute('aria-activedescendant');
        expect(ariaDescendantAfter).toMatch(/list-item-0$/);
    });

    test('popup closes on Escape key', async ({mount, page}) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        // Default story has `showOptionsOnEmptyValue: false`, so type to open the popup
        await input.fill('a');

        await expect(page.locator('[role="listbox"]')).toBeVisible();

        await page.keyboard.press('Escape');

        await expect(page.locator('[role="listbox"]')).not.toBeVisible();
    });
});
