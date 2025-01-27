import {expect, smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {BreadcrumbsProps} from '../Breadcrumbs';

import {disabledCases, popupPlacementCases} from './cases';
import {
    TestBreadcrumbsWithCustomIcons,
    TestBreadcrumbsWithCustomSeparator,
    TestBreadcrumbsWithLinkItems,
    TestBreadcrumbsWithTextItems,
} from './helpersPlaywright';

test.describe('Breadcrumbs', {tag: '@Breadcrumbs'}, () => {
    const defaultProps: Omit<BreadcrumbsProps, 'children'> = {};

    createSmokeScenarios(
        defaultProps,
        {
            popupPlacement: popupPlacementCases,
        },
        {
            scenarioName: 'with text items',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '200px', padding: '100px'}}>
                    <TestBreadcrumbsWithTextItems {...props} />
                </div>,
            );

            await root.locator('button').click();

            await expect(page.locator(`div[role="menu"]`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            disabled: disabledCases,
        },
        {
            scenarioName: 'with link items',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '200px'}}>
                    <TestBreadcrumbsWithLinkItems {...props} />
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            disabled: disabledCases,
        },
        {
            scenarioName: 'with custom icons',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '400px'}}>
                    <TestBreadcrumbsWithCustomIcons {...props} />
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            disabled: disabledCases,
        },
        {
            scenarioName: 'with custom separator',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '400px'}}>
                    <TestBreadcrumbsWithCustomSeparator {...props} />
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
