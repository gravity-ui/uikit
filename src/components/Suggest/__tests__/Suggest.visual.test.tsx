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

    test('render story: <WithLoading>', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 300}}>
                <SuggestStories.WithLoading />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await input.fill('e');

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
        await input.fill('a');
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
        await input.fill('a');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await expectScreenshot();
    });

    test('popup closes on Escape key', async ({mount, page}) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input');
        await input.click();
        await input.fill('a');

        await expect(page.locator('[role="listbox"]')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.locator('[role="listbox"]')).not.toBeVisible();
    });

    test('aria-activedescendant updates correctly', async ({mount, page}) => {
        await mount(
            <div style={{height: 400}}>
                <SuggestStories.Default />
            </div>,
        );

        const input = page.locator('input[role="combobox"]');
        await input.click();
        await input.fill('a');

        await expect(page.locator('[role="listbox"]')).toBeVisible();

        // Move mouse away so hover doesn't pre-activate an item
        await page.mouse.move(0, 0);
        await expect(input).not.toHaveAttribute('aria-activedescendant');

        await page.keyboard.press('ArrowDown');

        await page.waitForFunction(() => {
            const el = document.querySelector('input[role="combobox"]');
            return el?.getAttribute('aria-activedescendant') !== null;
        });

        const after = await input.getAttribute('aria-activedescendant');
        expect(after).toMatch(/list-item-0$/);
    });
});
