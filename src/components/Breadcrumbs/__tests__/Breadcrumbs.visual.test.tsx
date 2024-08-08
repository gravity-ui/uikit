import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {BreadcrumbsQa} from '../constants';
import {Breadcrumbs} from '../index';

import {
    defaultProps,
    firstDisplayedItemsCountCases,
    lastDisplayedItemsCountCases,
    popupPlacementCases,
    popupStyleCases,
    renderItemDividerCases,
    renderRootContentCases,
} from './cases';

const action = () => {};

test.describe('Breadcrumbs', {tag: '@Breadcrumbs'}, () => {
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
        },
        {
            lastDisplayedItemsCount: lastDisplayedItemsCountCases,
            firstDisplayedItemsCount: firstDisplayedItemsCountCases,
            popupStyle: popupStyleCases,
            popupPlacement: popupPlacementCases,
            renderRootContent: renderRootContentCases,
            // renderItemContent: renderItemContentCases,
            renderItemDivider: renderItemDividerCases,
            // renderItem: renderItemCases,
        },
    ).forEach(([title, details, props]) => {
        test(`many-items-${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '200px', padding: '100px'}}>
                    <Breadcrumbs {...props} />
                </div>,
            );

            await expectScreenshot({screenshotPostfix: 'before click more items'});

            // wait show more items trigger & calculate widths
            await page.waitForTimeout(2000);

            await expect(
                root.locator(`[data-qa='${BreadcrumbsQa.MORE_ITEMS_TRIGGER}']`),
            ).toBeVisible();

            await root.locator(`[data-qa='${BreadcrumbsQa.MORE_ITEMS_TRIGGER}']`).click();

            await expect(page.locator(`[data-qa='${BreadcrumbsQa.MORE_ITEMS_MENU}']`)).toBeVisible({
                timeout: 1000,
            });

            await expectScreenshot({screenshotPostfix: 'after click more items'});
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
            renderRootContent: renderRootContentCases,
            // renderItemContent: renderItemContentCases,
            renderItemDivider: renderItemDividerCases,
            // renderItem: renderItemCases,
        },
    ).forEach(([title, details, props]) => {
        test(`two-items-${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{width: '200px', padding: '100px'}}>
                    <Breadcrumbs {...props} />
                </div>,
            );

            await expectScreenshot({screenshotPostfix: 'before click more items'});

            // wait show more items trigger & calculate widths
            await page.waitForTimeout(2000);

            await expect(
                root.locator(`[data-qa='${BreadcrumbsQa.MORE_ITEMS_TRIGGER}']`),
            ).not.toBeVisible();
        });
    });
});
