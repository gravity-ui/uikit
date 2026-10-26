import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {MobileProvider} from '../../mobile';
import type {HelpMarkProps} from '../HelpMark';
import {HelpMark} from '../HelpMark';

import {placementCases} from './cases';
import {HelpMarkStories} from './stories';

test.describe('HelpMark', {tag: '@HelpMark'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<HelpMarkStories.Default />);

        await expectScreenshot();
    });

    test('render story: <InsideText>', async ({mount, expectScreenshot}) => {
        await mount(<HelpMarkStories.InsideText />);

        await expectScreenshot();
    });

    test('renders sheet instead of popover on mobile', async ({mount, page, expectScreenshot}) => {
        await page.setViewportSize({width: 500, height: 500});

        const root = await mount(
            <MobileProvider mobile>
                <HelpMark qa="trigger" popoverProps={{qa: 'popover'}} sheetProps={{qa: 'sheet'}}>
                    Test content
                </HelpMark>
            </MobileProvider>,
            {
                rootStyle: {
                    padding: '100px',
                    width: '100%',
                    minHeight: '500px',
                },
            },
        );

        await root.getByTestId('trigger').click();

        await expect(page.getByTestId('sheet')).toBeVisible();
        await expect(page.getByTestId('popover')).toHaveCount(0);

        await expectScreenshot({locator: page});
    });

    createSmokeScenarios<NonNullable<HelpMarkProps['popoverProps']>>(
        {
            qa: 'popover',
        },
        {
            placement: placementCases,
        },
    ).forEach(([title, popoverProps]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div>
                    <h4>{title}</h4>
                    <div style={{padding: 100}}>
                        <HelpMark qa="trigger" popoverProps={popoverProps}>
                            Test content
                        </HelpMark>
                    </div>
                </div>,
            );

            await root.getByTestId('trigger').hover();
            await expect(page.getByTestId('popover')).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
