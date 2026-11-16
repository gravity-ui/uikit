import {expect, test} from '~playwright/core';

import {SuggestWithLabel} from './helpersPlaywright';

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
