import {smokeTest, test} from '~playwright/core';

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

    createSmokeScenarios(defaultProps, {}).forEach(([title, props]) => {
        smokeTest(`regular ${title}`, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on page 2 button',
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on page 2 button',
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on page 10 button',
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on page 10 button',
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            compact: false,
        },
        {},
    ).forEach(([title, props]) => {
        smokeTest(`not compact ${title}`, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on page 2 button',
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on page 2 button',
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on page 10 button',
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on page 10 button',
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            showPages: false,
        },
        {},
    ).forEach(([title, props]) => {
        smokeTest(`without pages ${title}`, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${PaginationQa.PaginationButtonNext}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'hover on next page button',
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${PaginationQa.PaginationButtonNext}"]`).click();

            await expectScreenshot({
                nameSuffix: 'click on next page button',
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            showInput: true,
        },
        {},
    ).forEach(([title, props]) => {
        smokeTest(`with page input ${title}`, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({
                themes: ['light'],
            });

            await root
                .locator(`span[data-qa="${PaginationQa.PaginationInput}"]`)
                .locator(`input`)
                .focus();

            await expectScreenshot({
                nameSuffix: 'focus on input',
                themes: ['light'],
            });

            await page.keyboard.type('10');

            await expectScreenshot({
                nameSuffix: 'after type page number',
                themes: ['light'],
            });

            await page.keyboard.press('Enter');

            await expectScreenshot({
                nameSuffix: 'after type enter',
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            pageSizeOptions: [20, 50, 100],
        },
        {},
    ).forEach(([title, props]) => {
        smokeTest(`with page size select ${title}`, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(
                <div style={{width: '500px', height: '500px'}}>
                    <PaginationStateWrap {...props} />
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${PaginationQa.PaginationPageSizer}"]`).click();

            await expectScreenshot({
                nameSuffix: 'after click on page size select',
                themes: ['light'],
            });

            await page.locator(`[data-qa="${getPaginationPageSizeOptionQa(50)}"]`).hover();

            await expectScreenshot({
                nameSuffix: 'after hover option',
                themes: ['light'],
            });

            await page.locator(`[data-qa="${getPaginationPageSizeOptionQa(50)}"]`).click();

            await expectScreenshot({
                nameSuffix: 'after select option',
                themes: ['light'],
            });
        });
    });
});
