import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {FilePreviewWithAllActions} from './helpers';
import {FilePreviewStories} from './helpersPlaywright';

test.describe('FilePreview', {tag: '@FilePreview'}, () => {
    test(`render story: <Default>`, async ({mount, expectScreenshot}) => {
        await mount(<FilePreviewStories.Default />);

        await expectScreenshot({});
    });

    test(`render story: <Collage>`, async ({mount, page, expectScreenshot}) => {
        await mount(<FilePreviewStories.Collage />);

        // wait download image
        await page.waitForLoadState('networkidle');

        await expectScreenshot({});
    });

    smokeTest('actions', async ({mount, page, expectScreenshot}) => {
        await mount(
            <div style={{padding: 50}}>
                <FilePreviewWithAllActions />
            </div>,
        );

        await page.getByTestId('file-preview').hover();

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'actions',
        });

        await page.locator('button[aria-label="Close"]').hover();
        await expect(page.getByTestId('action-1-tooltip')).toBeVisible({
            timeout: 3000,
        });

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'action-tooltip',
        });
    });
});
