import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {
    columnAlignCases,
    columnStickyCases,
    columnWidthCases,
    edgePaddingCases,
    placeholderCases,
    rowDescriptorCases,
    verticalAlignCases,
    wordWrapCases,
} from './cases';
import type {TestTableColumnConfig, TestTableProps} from './helpersPlaywright';
import {
    TableStories,
    TestTable,
    TestTableWithActions,
    TestTableWithCopy,
    TestTableWithCustomColumnConfig,
    TestTableWithFilterableSettings,
    TestTableWithSelection,
    TestTableWithSettings,
    TestTableWithSortableSettings,
} from './helpersPlaywright';

test.describe('Table', {tag: '@Table'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.Default />);

        await expectScreenshot();
    });

    test('render story: <HOCWithTableSorting>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.HOCWithTableSorting />);

        await expectScreenshot();
    });

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestTableProps>(
            {},
            {
                edgePadding: edgePaddingCases,
                verticalAlign: verticalAlignCases,
                wordWrap: wordWrapCases,
                getRowDescriptor: rowDescriptorCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestTable {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('column config', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestTableColumnConfig>(
            {},
            {
                align: columnAlignCases,
                sticky: columnStickyCases,
                width: columnWidthCases,
                placeholder: placeholderCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestTableWithCustomColumnConfig columnConfig={props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with copy', async ({mount, expectScreenshot}) => {
        const root = await mount(<TestTableWithCopy />);

        await root.locator('.g-table__copy').locator('nth=0').hover();

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with actions', async ({mount, page, expectScreenshot}) => {
        const root = await mount(<TestTableWithActions />);

        await root.locator('button').locator('nth=0').hover();

        await root.locator('button').locator('nth=0').click();
        await expect(page.locator('.g-menu')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
            component: page.locator('body'),
        });
    });

    smokeTest('with checkbox', async ({mount, expectScreenshot}) => {
        await mount(<TestTableWithSelection />);

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with settings', async ({mount, page, expectScreenshot}) => {
        const root = await mount(<TestTableWithSettings />);

        await root.locator('button').locator('nth=0').click();
        await expect(page.locator('.g-popup')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
            component: root,
        });
    });

    smokeTest('with sortable settings', async ({mount, page, expectScreenshot}) => {
        const root = await mount(<TestTableWithSortableSettings />);

        await root.locator('button').locator('nth=0').click();
        await expect(page.locator('.g-popup')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
            component: root,
        });
    });

    smokeTest('with filterable settings', async ({mount, page, expectScreenshot}) => {
        const root = await mount(
            <div style={{minHeight: 600}}>
                <TestTableWithFilterableSettings />
            </div>,
        );

        await root.locator('button').locator('nth=0').click();
        await expect(page.locator('.g-popup')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
            component: root,
        });
    });
});
