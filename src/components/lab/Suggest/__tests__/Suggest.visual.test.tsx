import {expect, test} from '~playwright/core';

import {FLOATING_OFFSET} from '../../../Popup/constants';

import {
    SuggestForm,
    SuggestInitiallyOpen,
    SuggestPagination,
    SuggestStories,
    SuggestWithLabel,
} from './helpersPlaywright';

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

    test('render story: <Sizes> size xl', async ({mount, expectScreenshot, page}) => {
        await mount(
            <div style={{height: 700}}>
                <SuggestStories.Sizes />
            </div>,
        );

        const inputs = page.locator('input');
        await inputs.nth(3).click();
        await expect(page.getByRole('listbox')).toBeVisible();

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

    test('render story: <LoadingStates>', async ({mount, expectScreenshot, page}) => {
        await mount(<SuggestStories.LoadingStates />);
        await expect(page.getByRole('listbox')).toBeVisible();
        await expect(page.locator('.g-suggest__loader')).toHaveCount(2);
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
        expect(after).toBe(await page.getByRole('option').first().getAttribute('id'));
    });
});

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

test.describe('Suggest form', () => {
    for (const {name, empty, activate} of [
        {name: 'Enter submits without an active option', empty: false, activate: false},
        {name: 'Enter submits when there are no results', empty: true, activate: false},
        {name: 'Enter selects an active option without submitting', empty: false, activate: true},
    ]) {
        test(name, async ({mount, page}) => {
            await mount(<SuggestForm empty={empty} />);
            const input = page.getByRole('combobox');
            await input.fill('ea');
            await expect(input).toHaveAttribute('aria-expanded', String(!empty));
            await expect(input).not.toHaveAttribute('aria-activedescendant');

            if (activate) {
                await input.press('ArrowDown');
                await expect(input).toHaveAttribute('aria-activedescendant', /.+/);
            }

            await input.press('Enter');
            await expect(page.getByTestId('submit-count')).toHaveText(activate ? '0' : '1');
            await expect(page.getByTestId('selected-value')).toHaveText(activate ? 'earth' : '');
        });
    }
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

test('Suggest list name stays equal to the label while typing', async ({mount, page}) => {
    await mount(<SuggestWithLabel />);
    await expect(page.getByRole('listbox')).toBeVisible();
    // Check Chromium's accessibility tree: jsdom gives a different result for a label referencing an input.
    const session = await page.context().newCDPSession(page);
    try {
        for (const value of ['earth', 'mars']) {
            await page.getByRole('combobox').fill(value);
            const {nodes} = await session.send('Accessibility.getFullAXTree');
            expect(nodes.find((node) => node.role?.value === 'listbox')?.name?.value).toBe(
                'Planet',
            );
        }
    } finally {
        await session.detach();
    }
});

test('Suggest defaultOpen anchors and fits the popup on mount', async ({mount, page}) => {
    await mount(<SuggestInitiallyOpen />);
    const input = page.getByTestId('initial-input');
    const popup = page.getByTestId('initial-popup');
    await expect(popup).toBeVisible();
    await expect(page.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    await expect
        .poll(async () => {
            const anchor = await input.boundingBox();
            const box = await popup.boundingBox();
            if (!anchor || !box) return null;
            return {
                widthDifference: Math.round(box.width - anchor.width),
                leftDifference: Math.round(box.x - anchor.x),
                gap: Math.round(box.y - anchor.y - anchor.height),
            };
        })
        .toEqual({widthDifference: 0, leftDifference: 0, gap: FLOATING_OFFSET});
});
