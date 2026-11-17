import {expect} from '@playwright/experimental-ct-react';
import type {Locator} from '@playwright/test';

import {test} from '~playwright/core';

import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../../ListItemView/constants';

import {TestListWithSections} from './helpersPlaywright';

// The space above a header that follows other rows, where the separating line is drawn
const SEPARATOR_SPACE = 8;
// The inline padding of a row of the size: the header has the same one
const PADDING_INLINE = {s: 8, m: 12, l: 16, xl: 16} as const;

const middle = (locator: Locator) =>
    locator.evaluate((element) => {
        const {top, height} = element.getBoundingClientRect();
        return top + height / 2;
    });

test.describe('List section header', {tag: '@List'}, () => {
    for (const size of ['s', 'm', 'l', 'xl'] as const) {
        test(`has the height of a row of size ${size}, the text in the middle`, async ({
            mount,
            page,
        }) => {
            await mount(<TestListWithSections size={size} />);

            const [first, second] = await page.locator('.g-list-section-header').all();
            const row = await page.getByRole('option').first().boundingBox();
            const text = first.locator('.g-list-section-header__text');

            expect(row?.height).toBe(LIST_ITEM_VIEW_MIN_HEIGHT[size]);
            expect((await first.boundingBox())?.height).toBe(LIST_ITEM_VIEW_MIN_HEIGHT[size]);
            expect(await middle(text)).toBeCloseTo(await middle(first), 0);
            expect((await second.boundingBox())?.height).toBe(
                LIST_ITEM_VIEW_MIN_HEIGHT[size] + SEPARATOR_SPACE,
            );
        });

        test(`has the inline padding of a row of size ${size}`, async ({mount, page}) => {
            await mount(<TestListWithSections size={size} />);

            const header = page.locator('.g-list-section-header').first();
            const row = page.getByRole('option').first();
            const rowPadding = await row.evaluate((element) => {
                const {paddingInlineStart, paddingInlineEnd} = getComputedStyle(element);
                return {paddingInlineStart, paddingInlineEnd};
            });

            expect(rowPadding.paddingInlineStart).toBe(`${PADDING_INLINE[size]}px`);
            await expect(header).toHaveCSS('padding-inline-start', rowPadding.paddingInlineStart);
            await expect(header).toHaveCSS('padding-inline-end', rowPadding.paddingInlineEnd);
        });
    }
});
