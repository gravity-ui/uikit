import {expect, test} from '~playwright/core';

import {FLOATING_OFFSET} from '../../../Popup/constants';
import {BORDER_WIDTH} from '../../../utils/popupMiddlewares';

import {
    SuggestInitiallyOpen,
    SuggestStories,
    SuggestWithCustomControlAnchor,
    SuggestWithFocusablePopup,
    SuggestWithPlacement,
    SuggestWithPopupLayout,
} from './helpersPlaywright';

test('Suggest defaultOpen anchors to the field above its error and note', async ({mount, page}) => {
    await mount(<SuggestInitiallyOpen />);
    const input = page.getByTestId('initial-input').locator('.g-text-input__content');
    const popup = page.getByTestId('suggest-popup').locator('..');
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
        .toEqual({
            widthDifference: -2 * BORDER_WIDTH,
            leftDifference: BORDER_WIDTH,
            gap: FLOATING_OFFSET,
        });
});

for (const virtualized of [false, true]) {
    test(`Suggest scrolls only the list inside a custom popup, virtualized=${virtualized}`, async ({
        mount,
        page,
    }) => {
        await mount(<SuggestWithPopupLayout virtualized={virtualized} />);
        const list = page.getByRole('listbox');
        const popup = page.locator('.suggest-layout-popup');
        const header = page.getByTestId('layout-header');
        const footer = page.getByTestId('layout-footer');
        await expect(list).toBeVisible();
        await expect.poll(() => popup.evaluate((element) => element.clientHeight)).toBe(240);
        const popupBox = await popup.boundingBox();
        const headerBox = await header.boundingBox();
        const footerBox = await footer.boundingBox();
        if (!popupBox || !headerBox || !footerBox) {
            throw new Error('Popup, header and footer must have visible bounding boxes');
        }
        expect(footerBox.y + footerBox.height).toBeLessThanOrEqual(popupBox.y + popupBox.height);
        expect(await popup.evaluate((element) => element.scrollHeight - element.clientHeight)).toBe(
            0,
        );
        await list.evaluate((element) => element.scrollTo(0, 500));
        await expect.poll(() => list.evaluate((element) => element.scrollTop)).toBe(500);
        expect(await header.boundingBox()).toEqual(headerBox);
        expect(await footer.boundingBox()).toEqual(footerBox);
    });
}

test('Suggest retains its content during the closing transition', async ({mount, page}) => {
    await mount(<SuggestInitiallyOpen />);
    const input = page.getByRole('combobox');
    const popup = page.getByTestId('suggest-popup');
    await input.click();
    await expect(page.getByRole('option', {name: 'Earth'})).toBeVisible();
    await page.clock.install();
    await page.clock.pauseAt(new Date(Date.now() + 1000));

    await input.press('Escape');
    await expect(popup).toBeAttached();
    await expect(page.getByRole('option', {name: 'Earth'})).toBeAttached();
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await expect(input).not.toHaveAttribute('aria-controls');

    await page.clock.runFor(200);
    await expect(popup).not.toBeAttached();
});

for (const popupWidth of [undefined, 'fit', 300] as const) {
    test(`Suggest popup width: ${popupWidth ?? 'content'}`, async ({mount, page}) => {
        await mount(
            <SuggestInitiallyOpen
                popupWidth={popupWidth}
                options={[{value: 'earth', content: 'A very long planet name '.repeat(10)}]}
            />,
        );
        const popup = page.getByTestId('suggest-popup').locator('..');
        await expect(popup).toBeVisible();
        await expect
            .poll(() => popup.evaluate((element) => element.getBoundingClientRect().width))
            .toBeGreaterThan(0);
        const width = await popup.evaluate((element) => element.getBoundingClientRect().width);
        if (popupWidth === undefined) {
            expect(width).toBeGreaterThan(320);
            expect(width).toBeLessThanOrEqual((await page.evaluate(() => window.innerWidth)) * 0.9);
        } else {
            expect(width).toBeCloseTo(
                popupWidth === 'fit' ? 320 - 2 * BORDER_WIDTH : popupWidth,
                0,
            );
        }
    });
}

test('Suggest keeps its popup open when clicking field decorations', async ({mount, page}) => {
    await mount(<SuggestWithFocusablePopup />);
    await page.clock.install();
    const input = page.getByRole('combobox');
    await input.click();
    await expect(page.getByRole('listbox')).toBeVisible();
    for (const text of ['Search icon', 'Suffix', 'Planet']) {
        await page.getByText(text, {exact: true}).click({delay: 50});
        await page.clock.runFor(200);
        await expect(input).toBeFocused();
        await expect(input).toHaveAttribute('aria-expanded', 'true');
    }
});

test('Suggest allows Tab into custom popup content and closes on leaving', async ({
    mount,
    page,
}) => {
    await mount(<SuggestWithFocusablePopup />);
    await page.clock.install();
    const input = page.getByRole('combobox');
    await input.click();
    const retry = page.getByRole('button', {name: 'Retry'});
    await expect(retry).toBeVisible();
    await input.press('Tab');
    await page.clock.runFor(200);
    await expect(retry).toBeFocused();
    await retry.press('Enter');
    await expect(page.getByTestId('retry-count')).toHaveText('1');
    await expect(page.getByRole('listbox')).toBeVisible();
    await retry.press('Tab');
    await expect(page.getByRole('button', {name: 'Next field'})).toBeFocused();
    await expect(page.getByRole('listbox')).toBeHidden();
});

for (const {placement, expected} of [
    {placement: 'auto' as const, expected: 'right'},
    {
        placement: ['bottom-start', 'right-start'] as ['bottom-start', 'right-start'],
        expected: 'right-start',
    },
]) {
    test(`Suggest respects popupPlacement=${placement}`, async ({mount, page}) => {
        await mount(<SuggestWithPlacement popupPlacement={placement} />);
        const popup = page.getByTestId('suggest-popup').locator('..');
        await expect(popup).toHaveAttribute('data-floating-ui-placement', expected);
    });
}

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

test('Suggest custom TextArea filters replies on typing and replaces the entire text', async ({
    mount,
    page,
}) => {
    await mount(<SuggestStories.CustomInput />);
    const input = page.getByRole('textbox', {name: 'Reply'});
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await input.click();
    await expect(page.getByRole('listbox')).toBeVisible();
    await expect(input).toHaveValue('');
    await expect(page.getByRole('option')).toHaveCount(10);
    await input.press('Escape');
    await expect(page.getByRole('listbox')).toBeHidden();
    await input.fill('thank');
    await expect(page.getByRole('option')).toHaveCount(4);
    await input.pressSequentially(' you for your');
    await expect(page.getByRole('option')).toHaveCount(2);

    await input.fill('  RESOLVED  ');
    await expect(page.getByRole('option')).toHaveCount(1);
    await expect(page.getByRole('option')).toContainText('The issue has been resolved.');
    const text = await page.getByRole('option').first().innerText();
    await input.press('Home');
    await input.press('Alt+ArrowDown');
    await input.press('Alt+Enter');

    await expect(input).toHaveValue(text);
    await expect(input).toBeFocused();
    await expect(page.getByRole('listbox')).toBeHidden();

    await input.fill('No matching reply');
    await expect(page.getByRole('option')).toHaveCount(0);
    await expect(page.getByText('No matching replies', {exact: true})).toBeVisible();

    await input.fill('');
    await input.click();
    await expect(page.getByRole('option')).toHaveCount(10);
    await input.fill('resolved');
    await page.getByRole('option').first().click();
    await expect(input).toHaveValue(text);
    await expect(page.getByRole('listbox')).toBeHidden();
});

test('Suggest anchors a custom control popup to its own wrapper', async ({mount, page}) => {
    await mount(<SuggestWithCustomControlAnchor />);
    await page.getByRole('combobox', {name: 'Custom control'}).click();
    const anchor = page.locator('.custom-control-anchor');
    const popup = page.getByTestId('suggest-popup').locator('..');
    await expect(popup).toBeVisible();
    await expect
        .poll(async () => {
            const anchorBox = await anchor.boundingBox();
            const popupBox = await popup.boundingBox();
            if (!anchorBox || !popupBox) return null;
            return {
                widthDifference: Math.round(popupBox.width - anchorBox.width),
                leftDifference: Math.round(popupBox.x - anchorBox.x),
                gap: Math.round(popupBox.y - anchorBox.y - anchorBox.height),
            };
        })
        .toEqual({
            widthDifference: -2 * BORDER_WIDTH,
            leftDifference: BORDER_WIDTH,
            gap: FLOATING_OFFSET,
        });
});
