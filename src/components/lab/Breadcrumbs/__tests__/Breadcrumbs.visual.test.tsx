import React from 'react';

import {expect, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../../stories/tests-factory/create-smoke-scenarios';
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
            disabled: disabledCases,
        },
        {
            scenarioName: 'with text items',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '200px', padding: '100px'}}>
                    <TestBreadcrumbsWithTextItems {...props} />
                </div>,
            );

            await expectScreenshot();

            if (props.disabled) {
                return;
            }

            await root.locator('ol li').locator('nth=2').hover();

            await expectScreenshot({
                nameSuffix: 'hovered',
            });

            await root.locator('button').hover();

            await expectScreenshot({
                nameSuffix: 'hovered more button',
            });

            await root.locator('button').click();

            await expect(page.locator(`ul[role="menu"]`)).toBeVisible();

            await expectScreenshot({
                nameSuffix: 'after click on more button',
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
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '200px'}}>
                    <TestBreadcrumbsWithLinkItems {...props} />
                </div>,
            );

            await expectScreenshot();
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
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '400px'}}>
                    <TestBreadcrumbsWithCustomIcons {...props} />
                </div>,
            );

            await expectScreenshot();
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
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '400px'}}>
                    <TestBreadcrumbsWithCustomSeparator {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });
});
