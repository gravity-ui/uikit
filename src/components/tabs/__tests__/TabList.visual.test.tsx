import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import type {TabListProps} from '../types';

import {sizeCases, valueCases} from './cases';
import {TestCollapsedTabList, TestTabList, TestTabListWithCustomTabs} from './helpers';

test.describe('TabList', {tag: '@TabList'}, () => {
    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TabListProps>(
            {
                value: 'active',
            },
            {
                size: sizeCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestTabList {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke without value', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TabListProps>({}, {});

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestTabList {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with custom tab', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TabListProps>(
            {
                value: 'active',
            },
            {
                size: sizeCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestTabListWithCustomTabs {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    createSmokeScenarios<TabListProps>(
        {
            contentOverflow: 'collapse',
            defaultValue: 'active',
        },
        {
            value: valueCases,
        },
        {
            scenarioName: 'with contentOverflow="collapse"',
        },
    ).forEach(([title, props]) => {
        test('smoke ' + title, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
            const listToOpenQa = 'collapsed-tab-list-to-open-qa';

            const root = await mount(
                <TestCollapsedTabList title={title} listToOpenQa={listToOpenQa} {...props} />,
            );

            await root.getByTestId(listToOpenQa).locator('button.g-tab-list-collapse-item').click();

            await expect(page.locator(`div[role="menu"]`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
