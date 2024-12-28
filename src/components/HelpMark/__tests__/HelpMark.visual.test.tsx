import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {HelpMark} from '../HelpMark';

test.describe('HelpMark', {tag: '@HelpMark'}, () => {
    smokeTest('', async ({mount, page, expectScreenshot}) => {
        const root = await mount(
            <div style={{minHeght: 500, minWidth: 500}}>
                <HelpMark qa="popover" buttonProps={{'data-qa': 'trigger'}}>
                    Test content
                </HelpMark>
            </div>,
        );

        await root.getByTestId('trigger').hover();
        await expect(page.getByTestId('popover-tooltip')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
