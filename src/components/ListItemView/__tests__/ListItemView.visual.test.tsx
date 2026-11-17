import {expect} from '@playwright/experimental-ct-react';
import type {Locator} from '@playwright/test';

import {test} from '~playwright/core';

import {LIST_ITEM_VIEW_MIN_HEIGHT} from '../constants';

import {CssApiRows, MinHeightRows, SizeRows} from './helpersPlaywright';

const LINE_HEIGHT = {s: 18, m: 18, l: 18, xl: 20} as const;
const PADDING_INLINE = {s: 8, m: 12, l: 16, xl: 16} as const;

const middle = (locator: Locator) =>
    locator.evaluate((element) => {
        const {top, height} = element.getBoundingClientRect();
        return top + height / 2;
    });

test.describe('ListItemView', {tag: '@ListItemView'}, () => {
    test('the CSS API wins over the size of the row', async ({mount, page}) => {
        await mount(<CssApiRows />);

        for (const qa of ['row-s', 'row-m', 'row-l', 'row-xl', 'row-default']) {
            const row = page.getByTestId(qa);
            expect((await row.boundingBox())?.height, qa).toBe(48);
            await expect(row, qa).toHaveCSS('padding-inline-start', '20px');
            await expect(row, qa).toHaveCSS('padding-block-start', '3px');
            await expect(row, qa).toHaveCSS('border-start-start-radius', '0px');
        }
        // The section header of a list follows the same variables
        const header = page.getByTestId('header');
        expect((await header.boundingBox())?.height).toBe(48);
        await expect(header).toHaveCSS('padding-inline-start', '20px');
    });

    test('the inline padding follows the size of the row', async ({mount, page}) => {
        await mount(<SizeRows />);

        for (const size of ['s', 'm', 'l', 'xl'] as const) {
            const row = page.getByTestId(`row-${size}`);
            await expect(row, size).toHaveCSS('padding-inline-start', `${PADDING_INLINE[size]}px`);
            await expect(row, size).toHaveCSS('padding-inline-end', `${PADDING_INLINE[size]}px`);
        }
        // A row without a size has the paddings of `m`
        await expect(page.getByTestId('row-default')).toHaveCSS(
            'padding-inline-start',
            `${PADDING_INLINE.m}px`,
        );
        // A container row lays out nothing and has no paddings of its own
        await expect(page.getByTestId('row-container')).toHaveCSS('padding-inline-start', '0px');
    });

    test('a row has the height of a control of its size, the text in the middle', async ({
        mount,
        page,
    }) => {
        await mount(<SizeRows />);

        for (const size of ['s', 'm', 'l', 'xl'] as const) {
            const row = page.getByTestId(`row-${size}`);
            const text = page.getByTestId(`text-${size}`);
            expect((await row.boundingBox())?.height, size).toBe(LIST_ITEM_VIEW_MIN_HEIGHT[size]);
            expect(await middle(text), size).toBeCloseTo(await middle(row), 0);
        }
        expect((await page.getByTestId('row-default').boundingBox())?.height).toBe(
            LIST_ITEM_VIEW_MIN_HEIGHT.m,
        );
    });

    test('a second line grows the row by its line height', async ({mount, page}) => {
        await mount(<SizeRows />);

        for (const size of ['s', 'm', 'l', 'xl'] as const) {
            const row = page.getByTestId(`described-${size}`);
            expect((await row.boundingBox())?.height, size).toBe(
                LIST_ITEM_VIEW_MIN_HEIGHT[size] + LINE_HEIGHT[size],
            );
        }
    });

    test('the block padding follows a min-height of the CSS API', async ({mount, page}) => {
        await mount(<MinHeightRows />);

        for (const size of ['s', 'm', 'l', 'xl'] as const) {
            const row = page.getByTestId(`row-${size}`);
            expect((await row.boundingBox())?.height, size).toBe(48);
            await expect(row, size).toHaveCSS(
                'padding-block-start',
                `${(48 - LINE_HEIGHT[size]) / 2}px`,
            );
        }
    });
});
