import {expect} from '@playwright/experimental-ct-react';
import type {Locator} from '@playwright/test';

import {test} from '~playwright/core';

import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../../ListItemView/constants';

import {InlineMenu} from './helpersPlaywright';

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
    }
});
