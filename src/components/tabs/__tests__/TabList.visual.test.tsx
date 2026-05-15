import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import type {TabListProps} from '../types';

import {sizeCases, valueCases} from './cases';
import {
    TestTabList,
    TestTabListCollapse,
    TestTabListContentOverflow,
    TestTabListScroll,
    TestTabListWithCustomTabs,
} from './helpers';

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

    test(
        'smoke with contentOverflow scroll',
        {tag: ['@smoke']},
        async ({mount, page, expectScreenshot}) => {
            await mount(<TestTabListScroll />);

            await expectScreenshot({
                name: 'with-contentOverflow-scroll-value-active',
                themes: ['light'],
            });

            await page.getByRole('tab', {name: 'One More Long Text Tab To Show'}).click();

            await expectScreenshot({
                name: 'with-contentOverflow-scroll-value-fifth',
                themes: ['light'],
            });
        },
    );

    test(
        'smoke with contentOverflow collapse',
        {tag: ['@smoke']},
        async ({mount, page, expectScreenshot}) => {
            await mount(<TestTabListCollapse />);

            await expectScreenshot({
                name: 'with-contentOverflow-collapse-initial',
                themes: ['light'],
            });

            await page.locator('button.g-tab-list-collapse-item').click();

            await expect(page.locator('div[role="menu"]')).toBeVisible();

            await expectScreenshot({
                name: 'with-contentOverflow-collapse-menu-open',
                themes: ['light'],
            });

            await page.getByRole('menuitem', {name: 'One More Long Text Tab To Show'}).click();

            await expectScreenshot({
                name: 'with-contentOverflow-collapse-value-fifth',
                themes: ['light'],
            });
        },
    );

    createSmokeScenarios<TabListProps>(
        {
            contentOverflow: 'collapse',
            defaultValue: 'active',
        },
        {
            value: valueCases,
        },
        {
            scenarioName: 'with contentOverflow',
        },
    ).forEach(([title, props]) => {
        test('smoke ' + title, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
            const listToOpenQa = 'collapsed-tab-list-to-open-qa';

            const root = await mount(
                <TestTabListContentOverflow title={title} listToOpenQa={listToOpenQa} {...props} />,
            );

            await root.getByTestId(listToOpenQa).locator('button.g-tab-list-collapse-item').click();

            await expect(page.locator(`div[role="menu"]`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
