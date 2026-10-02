import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import {DefinitionList} from '../DefinitionList';
import type {DefinitionListProps} from '../types';

import {DefinitionListStories} from './stories';

test.describe('DefinitionList touch interactions', {tag: '@DefinitionList'}, () => {
    test.use({hasTouch: true, isMobile: true});

    test('shows the copy button without hover or focus', async ({mount, page}) => {
        const component = await mount(
            <DefinitionList>
                <DefinitionList.Item name="Name" copyText="Value">
                    Value
                </DefinitionList.Item>
            </DefinitionList>,
        );

        expect(await page.evaluate(() => window.matchMedia('(hover: none)').matches)).toBe(true);

        const copyButton = component.getByRole('button');
        await expect(copyButton).not.toBeFocused();
        await expect(copyButton).toHaveCSS('opacity', '1');
    });
});

// Test is flaky. Screenshot height randomly changes by 6px.
test.describe.skip('DefinitionList', {tag: '@DefinitionList'}, () => {
    test('render story <Default>', async ({mount, expectScreenshot}) => {
        await mount(<DefinitionListStories.Default />);

        await expectScreenshot();
    });

    createSmokeScenarios<Omit<DefinitionListProps, 'children'>>(
        {},
        {
            direction: ['vertical', 'horizontal'],
        },
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
            await mount(
                <div>
                    <h4>{title}</h4>
                    <DefinitionListStories.Default {...props} />
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios<Omit<DefinitionListProps, 'children'>>(
        {
            responsive: true,
        },
        {
            nameMaxWidth: [100],
            contentMaxWidth: [100],
        },
        {
            scenarioName: 'responsive',
        },
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
            const size = page.viewportSize();
            if (size) {
                await page.setViewportSize({
                    width: 1000,
                    height: size.height,
                });
            }

            await mount(
                <div>
                    <h4>{title}</h4>
                    <DefinitionListStories.Default {...props} />
                </div>,
                {width: 'auto'},
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
