import {expect, smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {TabListProps} from '../types';

import {sizeCases, valueCases} from './cases';
import {TestCollapsedTabList, TestTabList, TestTabListWithCustomTabs} from './helpers';

test.describe('TabList', {tag: '@TabList'}, () => {
    smokeTest('', async ({mount, expectScreenshot}) => {
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

    smokeTest('without value', async ({mount, expectScreenshot}) => {
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

    smokeTest('with custom tab', async ({mount, expectScreenshot}) => {
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
            value: 'active',
            contentOverflow: 'collapse',
        },
        {
            value: valueCases,
        },
        {
            scenarioName: 'with contentOverflow="collapse"',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            const listToOpenQa = 'collapsed-tab-list-to-open-qa';

            const root = await mount(
                <TestCollapsedTabList title={title} listToOpenQa={listToOpenQa} {...props} />,
            );

            await root.getByTestId(listToOpenQa).locator('button.g-tab-list-dd-menu').click();

            await expect(page.locator(`div[role="menu"]`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
