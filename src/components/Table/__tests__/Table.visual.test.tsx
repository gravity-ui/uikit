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

test.describe('Table', {tag: '@Table'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.Default />);

        await expectScreenshot();
    });

    test('render story: <HOCWithTableSorting>', async ({mount, expectScreenshot}) => {
        await mount(<TableStories.HOCWithTableSorting />);

        await expectScreenshot();
    });

    createSmokeScenarios(
        {},
        {
            align: columnAlignCases,
            sticky: columnStickyCases,
            width: columnWidthCases,
            placeholder: placeholderCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with column config ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestTableWithCustomColumnConfig columnConfig={props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {},
        {
            edgePadding: edgePaddingCases,
            verticalAlign: verticalAlignCases,
            wordWrap: wordWrapCases,
            getRowDescriptor: rowDescriptorCases,
        },
    ).forEach(([title, details, props]) => {
        test(`regular ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '500px'}}>
                    <TestTable {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {},
        {
            emptyMessage: emptyMessageCases,
        },
    ).forEach(([title, details, props]) => {
        test(`empty state ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<TestEmptyTable {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {},
        {
            verticalAlign: verticalAlignCases,
            wordWrap: wordWrapCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with copy ${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '500px'}}>
                    <TestTableWithCopy {...props} />
                </div>,
            );

            await root.locator('.g-table__copy').locator('nth=0').hover();

            await expectScreenshot({
                screenshotPostfix: 'hover on first cell',
            });

            await root.locator('.g-table__copy button').locator('nth=0').hover();
            await expect(page.locator('.g-popup')).toBeVisible();

            await expectScreenshot({
                component: page.locator('body'),
                screenshotPostfix: 'after hover on first cell copy button',
            });

            await root.locator('.g-table__copy button').locator('nth=0').click();
            await expectScreenshot({
                component: page.locator('body'),
                screenshotPostfix: 'after click on first cell copy button',
            });
        });
    });

    createSmokeScenarios({}, {}).forEach(([title, details, props]) => {
        test(`with actions ${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '500px'}}>
                    <TestTableWithActions {...props} />
                </div>,
            );

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator('button').locator('nth=0').hover();

            await expectScreenshot({
                screenshotPostfix: 'hover on action',
            });

            await root.locator('button').locator('nth=0').click();
            await expect(page.locator('.g-menu')).toBeVisible();

            await expectScreenshot({
                component: page.locator('body'),
                screenshotPostfix: 'after click on action',
            });
        });
    });

    createSmokeScenarios({}, {}).forEach(([title, details, props]) => {
        test(`with selection ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '500px'}}>
                    <TestTableWithSelection {...props} />
                </div>,
            );

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator('input[type="checkbox"]').locator('nth=0').hover();

            await expectScreenshot({
                screenshotPostfix: 'hover on checkbox',
            });

            await root.locator('input[type="checkbox"]').locator('nth=0').click();

            await expectScreenshot({
                screenshotPostfix: 'after click on checkbox',
            });
        });
    });

    createSmokeScenarios({}, {}).forEach(([title, details, props]) => {
        test(`with sorting ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<TestTableWithSorting {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator('.g-table__sort-indicator').locator('nth=0').click();

            await expectScreenshot({
                screenshotPostfix: 'asc sort',
            });

            await root.locator('.g-table__sort-indicator').locator('nth=0').click();

            await expectScreenshot({
                screenshotPostfix: 'desc sort',
            });
        });
    });

    createSmokeScenarios({}, {}).forEach(([title, details, props]) => {
        test(`with settings ${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<TestTableWithSettings {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator('button').locator('nth=0').hover();

            await expectScreenshot({
                screenshotPostfix: 'after hover on setting button',
            });

            await root.locator('button').locator('nth=0').click();
            await expect(page.locator('.g-popup')).toBeVisible();

            await expectScreenshot({
                component: page.locator('body'),
                screenshotPostfix: 'after click on setting button',
            });
        });
    });

    createSmokeScenarios({}, {}).forEach(([title, details, props]) => {
        test(
            `with sortable settings ${title}`,
            details,
            async ({mount, page, expectScreenshot}) => {
                const root = await mount(<TestTableWithSortableSettings {...props} />);

                await expectScreenshot({
                    screenshotPostfix: 'init',
                });

                await root.locator('button').locator('nth=0').hover();

                await expectScreenshot({
                    screenshotPostfix: 'after hover on setting button',
                });

                await root.locator('button').locator('nth=0').click();
                await expect(page.locator('.g-popup')).toBeVisible();

                await expectScreenshot({
                    component: page.locator('body'),
                    screenshotPostfix: 'after click on setting button',
                });
            },
        );
    });

    createSmokeScenarios({}, {}).forEach(([title, details, props]) => {
        test(
            `with filterable settings ${title}`,
            details,
            async ({mount, page, expectScreenshot}) => {
                const root = await mount(
                    <div style={{width: '600px', height: '600px'}}>
                        <TestTableWithFilterableSettings {...props} />
                    </div>,
                );

                await expectScreenshot({
                    screenshotPostfix: 'init',
                });

                await root.locator('button').locator('nth=0').hover();

                await expectScreenshot({
                    screenshotPostfix: 'after hover on setting button',
                });

                await root.locator('button').locator('nth=0').click();
                await expect(page.locator('.g-popup')).toBeVisible();

                await expectScreenshot({
                    component: page.locator('body'),
                    screenshotPostfix: 'after click on setting button',
                });

                await page.locator(`.g-popup`).locator(`input`).focus();

                await expectScreenshot({
                    component: page.locator('body'),
                    screenshotPostfix: 'focus on input',
                });

                await page.keyboard.type('Name');

                await expectScreenshot({
                    component: page.locator('body'),
                    screenshotPostfix: 'after type text',
                });
            },
        );
    });
});
