import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {HelpMark} from '../HelpMark';

test.describe('HelpMark', {tag: '@HelpMark'}, () => {
    smokeTest('', async ({mount, page, expectScreenshot}) => {
        const root = await mount(
            <div style={{minHeight: 500, minWidth: 500}}>
                <HelpMark
                    qa="popover"
                    buttonProps={{
                        // @ts-expect-error Object literal may only specify known properties, and ''data-qa'' does not exist in type 'ButtonHTMLAttributes<HTMLButtonElement>'
                        'data-qa': 'trigger',
                    }}
                >
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
