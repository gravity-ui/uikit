import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

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
        test(`smoke regular ${title}`, {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).hover();

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).click();

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).hover();

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).click();

            await expectScreenshot({
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
        test(`smoke not compact ${title}`, {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
            const root = await mount(<PaginationStateWrap {...props} />);

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).hover();

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(2)}"]`).click();

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).hover();

            await expectScreenshot({
                themes: ['light'],
            });

            await root.locator(`button[data-qa="${getPaginationPageQa(10)}"]`).click();

            await expectScreenshot({
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
        test(
            `smoke without pages ${title}`,
            {tag: ['@smoke']},
            async ({mount, expectScreenshot}) => {
                const root = await mount(<PaginationStateWrap {...props} />);

                await expectScreenshot({
                    themes: ['light'],
                });

                await root
                    .locator(`button[data-qa="${PaginationQa.PaginationButtonNext}"]`)
                    .hover();

                await expectScreenshot({
                    themes: ['light'],
                });

                await root
                    .locator(`button[data-qa="${PaginationQa.PaginationButtonNext}"]`)
                    .click();

                await expectScreenshot({
                    themes: ['light'],
                });
            },
        );
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            showInput: true,
        },
        {},
    ).forEach(([title, props]) => {
        test(
            `smoke with page input ${title}`,
            {tag: ['@smoke']},
            async ({mount, page, expectScreenshot}) => {
                const root = await mount(<PaginationStateWrap {...props} />);

                await expectScreenshot({
                    themes: ['light'],
                });

                await root
                    .locator(`span[data-qa="${PaginationQa.PaginationInput}"]`)
                    .locator(`input`)
                    .focus();

                await expectScreenshot({
                    themes: ['light'],
                });

                await page.keyboard.type('10');

                await expectScreenshot({
                    themes: ['light'],
                });

                await page.keyboard.press('Enter');

                await expectScreenshot({
                    themes: ['light'],
                });
            },
        );
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            pageSizeOptions: [20, 50, 100],
        },
        {},
    ).forEach(([title, props]) => {
        test(
            `smoke with page size select ${title}`,
            {tag: ['@smoke']},
            async ({mount, page, expectScreenshot}) => {
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
                    themes: ['light'],
                });

                await page.locator(`[data-qa="${getPaginationPageSizeOptionQa(50)}"]`).hover();

                await expectScreenshot({
                    themes: ['light'],
                });

                await page.locator(`[data-qa="${getPaginationPageSizeOptionQa(50)}"]`).click();

                await expectScreenshot({
                    themes: ['light'],
                });
            },
        );
    });
});
