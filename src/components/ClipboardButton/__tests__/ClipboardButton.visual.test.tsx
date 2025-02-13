import {smokeTest, test} from '~playwright/core';

import type {ClipboardButtonProps} from '../ClipboardButton';
import {ClipboardButton} from '../ClipboardButton';

test.use({
    permissions: ['clipboard-write'],
});

test.describe('ClipboardButton', {tag: '@ClipboardButton'}, () => {
    const defaultProps: ClipboardButtonProps = {
        text: 'Text',
        onCopy: () => {},
    };

    smokeTest('with string text', async ({mount, page, expectScreenshot}) => {
        const root = await mount(
            <div style={{padding: '100px'}}>
                <ClipboardButton {...defaultProps} hasTooltip />
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });

        await root.locator("button[type='button']").hover();

        // wait for render tooltip
        await page.waitForTimeout(1000);

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'after hover',
        });

        await root.locator("button[type='button']").click();

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'after copy',
        });
    });

    smokeTest('with function text', async ({mount, page, expectScreenshot}) => {
        const getText = () => 'Dynamic Text';
        const root = await mount(
            <div style={{padding: '100px'}}>
                <ClipboardButton {...defaultProps} text={getText} hasTooltip />
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });

        await root.locator("button[type='button']").hover();

        // wait for render tooltip
        await page.waitForTimeout(1000);

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'after hover',
        });

        await root.locator("button[type='button']").click();

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'after copy',
        });
    });
});
