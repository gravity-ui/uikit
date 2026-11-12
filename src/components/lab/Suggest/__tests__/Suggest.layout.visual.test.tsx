import {expect, test} from '~playwright/core';

import {FLOATING_OFFSET} from '../../../Popup/constants';
import {BORDER_WIDTH} from '../../../utils/popupMiddlewares';

import {
    SuggestInitiallyOpen,
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
