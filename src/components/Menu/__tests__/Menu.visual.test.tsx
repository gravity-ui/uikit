import {expect} from '@playwright/experimental-ct-react';
import type {Locator} from '@playwright/test';

import {test} from '~playwright/core';

import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../../ListItemView/constants';

import {InlineMenu} from './helpersPlaywright';

// The inline padding of an item, as of a row of the List of the size
const PADDING_INLINE = {s: 8, m: 12, l: 16, xl: 16} as const;

const middle = (locator: Locator) =>
    locator.evaluate((element) => {
        const {top, height} = element.getBoundingClientRect();
        return top + height / 2;
    });

test.describe('Menu', {tag: '@Menu'}, () => {
    for (const size of ['s', 'm', 'l', 'xl'] as const) {
        test(`an item has the height of a row of size ${size}, the text in the middle`, async ({
            mount,
            page,
        }) => {
            await mount(<InlineMenu size={size} />);

            const item = page.getByTestId('item');

            expect((await item.boundingBox())?.height).toBe(LIST_ITEM_VIEW_MIN_HEIGHT[size]);
            expect(await middle(page.getByTestId('text'))).toBeCloseTo(await middle(item), 0);
        });

        test(`an item has the inline padding of a row of size ${size}`, async ({mount, page}) => {
            await mount(<InlineMenu size={size} />);

            const item = page.getByTestId('item');

            await expect(item).toHaveCSS('padding-inline-start', `${PADDING_INLINE[size]}px`);
            await expect(item).toHaveCSS('padding-inline-end', `${PADDING_INLINE[size]}px`);
        });
    }
});
