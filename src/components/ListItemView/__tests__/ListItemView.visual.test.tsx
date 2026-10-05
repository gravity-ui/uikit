import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {CssApiRows} from './helpersPlaywright';

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
    });
});
