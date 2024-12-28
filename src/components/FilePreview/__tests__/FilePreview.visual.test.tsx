import {test} from '~playwright/core';

import {FilePreviewStories} from './helpersPlaywright';

test.describe('FilePreview', {tag: '@FilePreview'}, () => {
    test(`render story: <Default>`, async ({mount, expectScreenshot}) => {
        await mount(<FilePreviewStories.Default />);

        await expectScreenshot({});
    });

    test(`render story: <Collage>`, async ({mount, expectScreenshot}) => {
        await mount(<FilePreviewStories.Collage />);

        await expectScreenshot({});
    });
});
