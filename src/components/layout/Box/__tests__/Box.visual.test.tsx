import {test} from '~playwright/core';

import {Box} from '../Box';

test.describe('Box', {tag: '@Box'}, () => {
    test('visible box', async ({mount, expectScreenshot}) => {
        await mount(
            <Box data-qa="visible-box" style={{border: '1px solid red', padding: '10px'}}>
                This Box should be visible
            </Box>,
        );

        await expectScreenshot();
    });

    test('hidden box', async ({mount, expectScreenshot}) => {
        await mount(
            <Box data-qa="hidden-box" hidden style={{border: '1px solid red', padding: '10px'}}>
                This Box should be hidden
            </Box>,
        );

        await expectScreenshot();
    });

    test('nested box with hidden parent', async ({mount, expectScreenshot}) => {
        await mount(
            <Box data-qa="parent-box" hidden style={{border: '1px solid red', padding: '10px'}}>
                <Box data-qa="child-box" style={{border: '1px solid blue', padding: '5px'}}>
                    This child Box should be hidden because parent is hidden
                </Box>
            </Box>,
        );

        await expectScreenshot();
    });
});
