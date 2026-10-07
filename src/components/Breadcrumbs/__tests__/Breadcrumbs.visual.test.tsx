import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import type {BreadcrumbsProps} from '../Breadcrumbs';
import {Breadcrumbs} from '../Breadcrumbs';

import {disabledCases, popupPlacementCases} from './cases';
import {
    TestBreadcrumbsWithCustomIcons,
    TestBreadcrumbsWithCustomSeparator,
    TestBreadcrumbsWithLinkItems,
    TestBreadcrumbsWithTextItems,
} from './helpersPlaywright';

test.describe('Breadcrumbs', {tag: '@Breadcrumbs'}, () => {
    const defaultProps: Omit<BreadcrumbsProps, 'children'> = {};

    test('copies the selected path without line breaks', async ({mount, page}) => {
        const root = await mount(
            <div>
                <div style={{width: '600px'}}>
                    <TestBreadcrumbsWithLinkItems />
                </div>
                <textarea aria-label="Pasted path" />
            </div>,
        );
        const list = root.getByRole('list');
        await expect(list.getByRole('link')).toHaveCount(3);

        await list.evaluate((element) => {
            const range = document.createRange();
            range.selectNodeContents(element);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        });
        await page.keyboard.press('ControlOrMeta+C');
        const textarea = root.getByRole('textbox');
        await textarea.focus();
        await page.keyboard.press('ControlOrMeta+V');
        await expect(textarea).toHaveValue('Home/Components/Breadcrumbs');
    });

    for (const direction of ['ltr', 'rtl'] as const) {
        for (const withEndContent of [false, true]) {
            test(`truncates a long last item when resized (${direction}, endContent=${withEndContent})`, async ({
                mount,
            }) => {
                const root = await mount(
                    <div dir={direction} style={{display: 'flex', width: '1000px'}}>
                        <Breadcrumbs endContent={withEndContent ? <button>Action</button> : null}>
                            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="/components">Components</Breadcrumbs.Item>
                            <Breadcrumbs.Item>
                                {'Long last breadcrumb name '.repeat(30)}
                            </Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>,
                );
                const list = root.getByRole('list');
                const current = list.locator('[aria-current="page"]');

                for (const width of [1000, 320, 160, 800]) {
                    await root.evaluate((element, nextWidth) => {
                        element.style.setProperty('width', `${nextWidth}px`);
                    }, width);
                    await expect(list.locator('.g-breadcrumbs__item_calculating')).toHaveCount(0);
                    await expect
                        .poll(() =>
                            list.evaluate((element) => element.scrollWidth <= element.clientWidth),
                        )
                        .toBe(true);
                    await expect
                        .poll(() =>
                            current.evaluate(
                                (element) => element.scrollWidth > element.clientWidth,
                            ),
                        )
                        .toBe(true);
                    await expect(current).toHaveCSS('text-overflow', 'ellipsis');

                    // The last item should use all space left by the other visible items.
                    await expect
                        .poll(() =>
                            list.evaluate((element) => {
                                const occupiedWidth = Array.from(element.children).reduce(
                                    (sum, child) => sum + child.getBoundingClientRect().width,
                                    0,
                                );
                                return Math.abs(element.clientWidth - occupiedWidth);
                            }),
                        )
                        .toBeLessThanOrEqual(1);
                }
            });
        }
    }

    createSmokeScenarios(
        defaultProps,
        {
            popupPlacement: popupPlacementCases,
        },
        {
            scenarioName: 'with text items',
        },
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
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
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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
