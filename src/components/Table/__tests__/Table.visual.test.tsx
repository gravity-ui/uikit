import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {
    columnAlignCases,
    columnStickyCases,
    columnWidthCases,
    edgePaddingCases,
    emptyMessageCases,
    placeholderCases,
    rowDescriptorCases,
    verticalAlignCases,
    wordWrapCases,
} from './cases';
import type {TestTableColumnConfig} from './cases';
import {
    TableStories,
    TestEmptyTable,
    TestTable,
    TestTableWithActions,
    TestTableWithCopy,
    TestTableWithCustomColumnConfig,
    TestTableWithFilterableSettings,
    TestTableWithSelection,
    TestTableWithSettings,
    TestTableWithSortableSettings,
    TestTableWithSorting,
} from './helpersPlaywright';
import type {TestTableProps} from './helpersPlaywright';

test.describe('Table', {tag: '@Table'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.Default />);

        await expectScreenshot();
    });

    test('render story: <HOCWithTableSorting>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.HOCWithTableSorting />);

        await expectScreenshot();
    });

    createSmokeScenarios<TestTableColumnConfig>(
        {},
        {
            align: columnAlignCases,
            sticky: columnStickyCases,
            width: columnWidthCases,
            placeholder: placeholderCases,
        },
        {
            scenarioName: 'with column config',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestTableWithCustomColumnConfig columnConfig={props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {
            edgePadding: edgePaddingCases,
            verticalAlign: verticalAlignCases,
            wordWrap: wordWrapCases,
            getRowDescriptor: rowDescriptorCases,
        },
        {
            scenarioName: 'regular',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '500px'}}>
                    <TestTable {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {
            emptyMessage: emptyMessageCases,
        },
        {
            scenarioName: 'empty state',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<TestEmptyTable {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {
            verticalAlign: verticalAlignCases,
            wordWrap: wordWrapCases,
        },
        {
            scenarioName: 'with copy',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '500px'}}>
                    <TestTableWithCopy {...props} />
                </div>,
            );

            await root.locator('.g-table__copy').locator('nth=0').hover();

            await expectScreenshot({
                nameSuffix: 'after hover on first cell',
            });

            await root.locator('.g-table__copy button').locator('nth=0').hover();
            await expect(page.locator('.g-popup')).toBeVisible();

            await expectScreenshot({
                component: page.locator('body'),
                nameSuffix: 'after hover on first cell copy button',
            });

            await root.locator('.g-table__copy button').locator('nth=0').click();
            await expectScreenshot({
                component: page.locator('body'),
                nameSuffix: 'after click on first cell copy button',
            });
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {},
        {
            scenarioName: 'with actions',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '500px'}}>
                    <TestTableWithActions {...props} />
                </div>,
            );

            await expectScreenshot({});

            await root.locator('button').locator('nth=0').hover();

            await expectScreenshot({
                nameSuffix: 'after hover on action',
            });

            await root.locator('button').locator('nth=0').click();
            await expect(page.locator('.g-menu')).toBeVisible();

            await expectScreenshot({
                component: page.locator('body'),
                nameSuffix: 'after click on action',
            });
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {},
        {
            scenarioName: 'with selection',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '500px'}}>
                    <TestTableWithSelection {...props} />
                </div>,
            );

            await expectScreenshot({});

            await root.locator('input[type="checkbox"]').locator('nth=0').hover();

            await expectScreenshot({
                nameSuffix: 'hover on checkbox',
            });

            await root.locator('input[type="checkbox"]').locator('nth=0').click();

            await expectScreenshot({
                nameSuffix: 'after click on checkbox',
            });
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {},
        {
            scenarioName: 'with sorting',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestTableWithSorting {...props} />);

            await expectScreenshot({});

            await root.locator('.g-table__sort-indicator').locator('nth=0').click();

            await expectScreenshot({
                nameSuffix: 'asc sort',
            });

            await root.locator('.g-table__sort-indicator').locator('nth=0').click();

            await expectScreenshot({
                nameSuffix: 'desc sort',
            });
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {},
        {
            scenarioName: 'with settings',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<TestTableWithSettings {...props} />);

            await expectScreenshot({});

            await root.locator('button').locator('nth=0').hover();

            await expectScreenshot({
                nameSuffix: 'after hover on setting button',
            });

            await root.locator('button').locator('nth=0').click();
            await expect(page.locator('.g-popup')).toBeVisible();

            await expectScreenshot({
                component: page.locator('body'),
                nameSuffix: 'after click on setting button',
            });
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {},
        {
            scenarioName: 'with sortable settings',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<TestTableWithSortableSettings {...props} />);

            await expectScreenshot({});

            await root.locator('button').locator('nth=0').hover();

            await expectScreenshot({
                nameSuffix: 'after hover on setting button',
            });

            await root.locator('button').locator('nth=0').click();
            await expect(page.locator('.g-popup')).toBeVisible();

            await expectScreenshot({
                component: page.locator('body'),
                nameSuffix: 'after click on setting button',
            });
        });
    });

    createSmokeScenarios<TestTableProps>(
        {},
        {},
        {
            scenarioName: 'with filterable settings',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '600px', height: '600px'}}>
                    <TestTableWithFilterableSettings {...props} />
                </div>,
            );

            await expectScreenshot({});

            await root.locator('button').locator('nth=0').hover();

            await expectScreenshot({
                nameSuffix: 'after hover on setting button',
            });

            await root.locator('button').locator('nth=0').click();
            await expect(page.locator('.g-popup')).toBeVisible();

            await expectScreenshot({
                component: page.locator('body'),
                nameSuffix: 'after click on setting button',
            });

            await page.locator(`.g-popup`).locator(`input`).focus();

            await expectScreenshot({
                component: page.locator('body'),
                nameSuffix: 'focus on input',
            });

            await page.keyboard.type('Name');

            await expectScreenshot({
                component: page.locator('body'),
                nameSuffix: 'after type text',
            });
        });
    });
});
