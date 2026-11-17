import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import type {TabListProps} from '../types';

import {sizeCases, valueCases} from './cases';
import {tab1, tab2} from './constants';
import {
    ControlledTabs,
    TestTabList,
    TestTabListCollapse,
    TestTabListCollapseSelectedAsTrigger,
    TestTabListContentOverflow,
    TestTabListScroll,
    TestTabListWithCustomTabs,
} from './helpers';

const textSelectionCases = [
    {name: 'one tab', tabs: [tab1]},
    {name: 'two tabs', tabs: [tab1, tab2]},
];

test.describe('TabList', {tag: '@TabList'}, () => {
    textSelectionCases.forEach(({name, tabs}) => {
        test(`tab titles can be selected with the mouse: ${name}`, async ({mount, page}) => {
            await mount(<ControlledTabs value={tab1.value} tabs={tabs} />);

            for (const tab of tabs) {
                const title = page.getByRole('tab', {name: tab.title}).getByText(tab.title);
                const bounds = await title.boundingBox();

                if (!bounds) {
                    throw new Error('Tab title is not visible');
                }

                const y = bounds.y + bounds.height / 2;

                await page.mouse.move(bounds.x, y);
                await page.mouse.down();
                await page.mouse.move(bounds.x + bounds.width, y, {steps: 10});
                await page.mouse.up();

                await expect
                    .poll(() => page.evaluate(() => window.getSelection()?.toString()))
                    .toBe(tab.title);
            }

            if (tabs.length === 2) {
                const firstTab = page.getByRole('tab', {name: tab1.title});
                const secondTab = page.getByRole('tab', {name: tab2.title});

                await firstTab.click();
                await secondTab.click();

                await expect(secondTab).toHaveAttribute('aria-selected', 'true');
                await expect(firstTab).toHaveAttribute('aria-selected', 'false');
            }
        });
    });

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

            await page.locator('button.g-tab-more').click();

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

    test(
        'smoke with contentOverflow collapse selected as trigger',
        {tag: ['@smoke']},
        async ({mount, page, expectScreenshot}) => {
            await mount(<TestTabListCollapseSelectedAsTrigger />);

            // The collapse item should show active tab content as trigger (not "More")
            const collapseItem = page.locator('button.g-tab-more');
            await expect(collapseItem).toBeVisible();
            await expect(collapseItem).not.toContainText('More');

            await expectScreenshot({
                name: 'with-contentOverflow-collapse-selected-as-trigger-initial',
                themes: ['light'],
            });

            // Dropdown menu should open when collapse item is clicked
            await collapseItem.click();
            await expect(page.locator('div[role="menu"]')).toBeVisible();

            await expectScreenshot({
                name: 'with-contentOverflow-collapse-selected-as-trigger-menu-open',
                themes: ['light'],
            });

            // Other tab should be selected and rendered as trigger (not "More")
            await page.getByRole('menuitem', {name: 'First Tab'}).click();

            const newCollapseItem = page.locator('button.g-tab-more');
            await expect(newCollapseItem).toBeVisible();
            await expect(newCollapseItem).not.toContainText('More');

            await expectScreenshot({
                name: 'with-contentOverflow-collapse-selected-as-trigger-after-select',
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

            await root.getByTestId(listToOpenQa).locator('button.g-tab-more').click();

            await expect(page.locator(`div[role="menu"]`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
