import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {PaginationQa, getPaginationPageQa, getPaginationPageSizeOptionQa} from '../constants';
import type {PaginationProps} from '../types';

import {PaginationStateWrap} from './helpers';

test.describe('Pagination', {tag: '@Pagination'}, () => {
    const defaultProps: Omit<PaginationProps, 'onUpdate'> = {
        page: 1,
        pageSize: 100,
        total: 950,
    };

    createSmokeScenarios(defaultProps, {}).forEach(([title, details, props]) => {
        test(`regular ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({});

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on page 2 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on page 2 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on page 10 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on page 10 button',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            compact: false,
        },
        {},
    ).forEach(([title, details, props]) => {
        test(`not compact ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({});

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on page 2 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on page 2 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on page 10 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on page 10 button',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            showPages: false,
        },
        {},
    ).forEach(([title, details, props]) => {
        test(`without pages ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({});

            await root.locator(`button[data-qa="${PaginationQa.PaginationButtonNext}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on next page button',
            });

            await root.locator(`button[data-qa="${PaginationQa.PaginationButtonNext}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on next page button',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            showInput: true,
        },
        {},
    ).forEach(([title, details, props]) => {
        test(`with page input ${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({});

            await root
                .locator(`span[data-qa="${PaginationQa.PaginationInput}"]`)
                .locator(`input`)
                .focus();

            await expectScreenshot({
                nameSuffix: 'focus on input',
            });

            await page.keyboard.type('10');

            await expectScreenshot({
                nameSuffix: 'after type page number',
            });

            await page.keyboard.press('Enter');

            await expectScreenshot({
                nameSuffix: 'after type enter',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            pageSizeOptions: [20, 50, 100],
        },
        {},
    ).forEach(([title, details, props]) => {
        test(`with page size select ${title}`, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(
                <div style={{width: '500px', height: '500px'}}>
                    <PaginationStateWrap {...props} />
                </div>,
            );

            await expectScreenshot({});

            await root.locator(`button[data-qa="${PaginationQa.PaginationPageSizer}"]`).click();

            await expectScreenshot({
                nameSuffix: 'after click on page size select',
            });

            await page.locator(`[data-qa="${getPaginationPageSizeOptionQa(50)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'after hover option',
            });

            await page.locator(`[data-qa="${getPaginationPageSizeOptionQa(50)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'after select option',
            });
        });
    });
});
