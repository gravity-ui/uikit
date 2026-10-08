import {expect} from '@playwright/experimental-ct-react';
import type {Locator} from '@playwright/test';

import {test} from '~playwright/core';

import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../../ListItemView/constants';

import {TestListWithSections} from './helpersPlaywright';

// The space above a header that follows other rows, where the separating line is drawn
const SEPARATOR_SPACE = 8;

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
    }
});
