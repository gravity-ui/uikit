import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {GroupedSelect} from './rowHelpersPlaywright';

test.describe('Select rows', {tag: '@Select'}, () => {
    for (const size of ['s', 'm', 'l', 'xl'] as const) {
        test(`a row and a group header are as tall as the control, size ${size}`, async ({
            mount,
            page,
        }) => {
            await mount(<GroupedSelect size={size} />);
            const control = page.locator('.g-select-control');
            // Measured before the click: a pressed control is scaled down
            const controlHeight = (await control.boundingBox())?.height;
            await control.click();
            await page.getByTestId('select-popup').waitFor();
            const option = page.getByRole('option', {name: 'Apple'});
            const header = page.locator('.g-list-section-header').first();

            expect((await option.boundingBox())?.height).toBe(controlHeight);
            expect((await header.boundingBox())?.height).toBe(controlHeight);
        });
    }
});
