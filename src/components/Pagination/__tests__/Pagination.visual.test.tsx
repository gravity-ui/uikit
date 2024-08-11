import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {PaginationQa, getPaginationPageQa, getPaginationPageSizeOptionQa} from '../constants';

import {PaginationStateWrap} from './helpers';

test.describe('Pagination', {tag: '@Pagination'}, () => {
    const defaultProps = {
        page: 1,
        pageSize: 100,
        total: 950,
    } as const;

    createSmokeScenarios(defaultProps, {}).forEach(([title, details, props]) => {
        test(`regular ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).hover();

            await expectScreenshot({
                screenshotPostfix: 'hover on page 2 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).click();

            await expectScreenshot({
                screenshotPostfix: 'click on page 2 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).hover();

            await expectScreenshot({
                screenshotPostfix: 'hover on page 10 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).click();

            await expectScreenshot({
                screenshotPostfix: 'click on page 10 button',
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

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).hover();

            await expectScreenshot({
                screenshotPostfix: 'hover on page 2 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).click();

            await expectScreenshot({
                screenshotPostfix: 'click on page 2 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).hover();

            await expectScreenshot({
                screenshotPostfix: 'hover on page 10 button',
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).click();

            await expectScreenshot({
                screenshotPostfix: 'click on page 10 button',
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

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator(`button[data-qa="${PaginationQa.PaginationButtonNext}"]`).hover();

            await expectScreenshot({
                screenshotPostfix: 'hover on next page button',
            });

            await root.locator(`button[data-qa="${PaginationQa.PaginationButtonNext}"]`).click();

            await expectScreenshot({
                screenshotPostfix: 'click on next page button',
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

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root
                .locator(`span[data-qa="${PaginationQa.PaginationInput}"]`)
                .locator(`input`)
                .focus();

            await expectScreenshot({
                screenshotPostfix: 'focus on input',
            });

            await page.keyboard.type('10');

            await expectScreenshot({
                screenshotPostfix: 'after type page number',
            });

            await page.keyboard.press('Enter');

            await expectScreenshot({
                screenshotPostfix: 'after type enter',
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

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator(`button[data-qa="${PaginationQa.PaginationPageSizer}"]`).click();

            await expectScreenshot({
                screenshotPostfix: 'after click on page size select',
            });

            await page.locator(`[data-qa="${getPaginationPageSizeOptionQa(50)}"]`).hover();

            await expectScreenshot({
                screenshotPostfix: 'after hover option',
            });

            await page.locator(`[data-qa="${getPaginationPageSizeOptionQa(50)}"]`).click();

            await expectScreenshot({
                screenshotPostfix: 'after select option',
            });
        });
    });
});
