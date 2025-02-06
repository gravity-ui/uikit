import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import type {TestTableColumnConfig} from './cases';
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
import type {TestTableProps} from './helpersPlaywright';
import {
    TableStories,
    TestTable,
    TestTableWithCustomColumnConfig,
    TestTableWithSettings,
} from './helpersPlaywright';

test.describe('Table', {tag: '@Table'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.Default />);

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('render story: <EmptyDefault>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.EmptyDefault />);

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('render story: <EmptyCustom>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.EmptyCustom />);

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('render story: <Adaptive>', async ({mount, page, expectScreenshot}) => {
        const size = page.viewportSize();
        if (size) {
            await page.setViewportSize({
                width: 1000,
                height: size.height,
            });
        }

        await mount(<TableStories.Adaptive />, {
            width: 'auto',
        });

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('render story: <RowInteractive>', async ({mount, page, expectScreenshot}) => {
        await mount(<TableStories.RowInteractive />);

        await page.getByRole('row').nth(3).hover();

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('render story: <HOCWithTableSorting>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.HOCWithTableSorting />);

        await expectScreenshot({
            themes: ['light'],
        });
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
        const root = await mount(<TableStories.HOCWithTableCopy />);

        await root.locator('.g-table__copy').locator('nth=0').hover();

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with actions', async ({mount, page, expectScreenshot}) => {
        const root = await mount(<TableStories.HOCWithTableActions />);

        await root.locator('button').locator('nth=0').click();

        await expectScreenshot({
            themes: ['light'],
            component: page.locator('body'),
        });
    });

    smokeTest('with checkbox', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.HOCWithTableSelection />);

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

    smokeTest('with table settings', async ({mount, page, expectScreenshot}) => {
        const root = await mount(<TableStories.HOCWithTableSettingsFactory />);

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
                <TableStories.HOCWithFilterableTableSettings />
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
