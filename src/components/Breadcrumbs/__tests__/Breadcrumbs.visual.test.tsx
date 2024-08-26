import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {BreadcrumbsQa} from '../constants';
import {Breadcrumbs, FirstDisplayedItemsCount, LastDisplayedItemsCount} from '../index';

import type {Props} from './cases';
import {
    firstDisplayedItemsCountCases,
    lastDisplayedItemsCountCases,
    popupPlacementCases,
    popupStyleCases,
} from './cases';
import {TestBreadcrumbsWithCustomRenderers} from './helpersPlaywright';

const action = () => {};

test.describe('Breadcrumbs', {tag: '@Breadcrumbs'}, () => {
    const defaultProps: Props = {
        items: [
            {
                text: 'Root',
                action,
            },
            {
                text: 'Region',
                action,
            },
            {
                text: 'Country',
                action,
            },
            {
                text: 'City',
                action,
            },
            {
                text: 'District',
                action,
            },
            {
                text: 'Street',
                action,
            },
        ],
        lastDisplayedItemsCount: LastDisplayedItemsCount.One,
        firstDisplayedItemsCount: FirstDisplayedItemsCount.Zero,
    };

    createSmokeScenarios(
        defaultProps,
        {
            lastDisplayedItemsCount: lastDisplayedItemsCountCases,
            firstDisplayedItemsCount: firstDisplayedItemsCountCases,
            popupStyle: popupStyleCases,
            popupPlacement: popupPlacementCases,
        },
        {
            scenarioName: 'many-items',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '200px', padding: '100px'}}>
                    <Breadcrumbs {...props} />
                </div>,
            );

            await expectScreenshot({});

            // wait show more items trigger & calculate widths
            await page.waitForTimeout(2000);

            await root.getByTestId(BreadcrumbsQa.ITEM).locator('nth=1').hover();

            await expectScreenshot({nameSuffix: 'after hover on secondary item'});

            await expect(root.getByTestId(BreadcrumbsQa.MORE_ITEMS_TRIGGER)).toBeVisible();

            await root.getByTestId(BreadcrumbsQa.MORE_ITEMS_TRIGGER).click();

            await expect(page.getByTestId(BreadcrumbsQa.MORE_ITEMS_MENU)).toBeVisible({
                timeout: 1000,
            });

            await expectScreenshot({nameSuffix: 'after click more items'});

            page.getByTestId(BreadcrumbsQa.MORE_ITEMS_MENU).locator('li').locator('nth=1').hover();

            await expectScreenshot({nameSuffix: 'after hover on more item'});

            page.getByTestId(BreadcrumbsQa.MORE_ITEMS_MENU).locator('li').locator('nth=1').click();

            await expectScreenshot({nameSuffix: 'after click on more item'});
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            items: [
                {
                    text: 'Root',
                    action,
                },
                {
                    text: 'Region',
                    action,
                },
            ],
        },
        {
            lastDisplayedItemsCount: lastDisplayedItemsCountCases,
            firstDisplayedItemsCount: firstDisplayedItemsCountCases,
            popupStyle: popupStyleCases,
            popupPlacement: popupPlacementCases,
        },
        {
            scenarioName: 'two-items',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '200px', padding: '100px'}}>
                    <Breadcrumbs {...props} />
                </div>,
            );

            await expectScreenshot({});

            // wait show more items trigger & calculate widths
            await page.waitForTimeout(2000);

            await root.getByTestId(BreadcrumbsQa.ITEM).locator('nth=0').hover();

            await expectScreenshot({nameSuffix: 'after hover on first item'});

            await expect(root.getByTestId(BreadcrumbsQa.MORE_ITEMS_TRIGGER)).not.toBeVisible();
        });
    });

    createSmokeScenarios(
        defaultProps,
        {},
        {
            scenarioName: 'custom-renderers',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '200px', padding: '100px'}}>
                    <TestBreadcrumbsWithCustomRenderers {...props} />
                </div>,
            );

            await expectScreenshot({});

            // wait show more items trigger & calculate widths
            await page.waitForTimeout(2000);

            await root.getByTestId(BreadcrumbsQa.ITEM).locator('nth=1').hover();

            await expectScreenshot({nameSuffix: 'after hover on secondary item'});

            await expect(root.getByTestId(BreadcrumbsQa.MORE_ITEMS_TRIGGER)).toBeVisible();

            await root.getByTestId(BreadcrumbsQa.MORE_ITEMS_TRIGGER).click();

            await expect(page.getByTestId(BreadcrumbsQa.MORE_ITEMS_MENU)).toBeVisible({
                timeout: 1000,
            });

            await expectScreenshot({nameSuffix: 'after click more items'});

            page.getByTestId(BreadcrumbsQa.MORE_ITEMS_MENU).locator('li').locator('nth=1').hover();

            await expectScreenshot({nameSuffix: 'after hover on more item'});

            page.getByTestId(BreadcrumbsQa.MORE_ITEMS_MENU).locator('li').locator('nth=1').click();

            await expectScreenshot({nameSuffix: 'after click on more item'});
        });
    });
});
