import {test} from '~playwright/core';

import {MobileFilePreview} from './helpersPlaywright';

test.describe('FilePreview', {tag: '@FilePreview'}, () => {
    test('mobile actions menu', {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
        await mount(<MobileFilePreview />);

        await page.getByRole('button').click();
        await page.getByText('Copy link').waitFor();

        // The sheet of the menu is a portal outside of the mounted component
        await expectScreenshot({themes: ['light'], locator: page});
    });
});
