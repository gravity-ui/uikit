import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';
import type {Page} from '@playwright/test';

import type {MountFixture} from '~playwright/core';
import {test} from '~playwright/core';

import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {Select} from '../Select';
import {SelectQa} from '../constants';
import type {SelectOption, SelectProps, SelectSize} from '../types';

import {
    baseOptions,
    disabledCases,
    filterPlaceholderCases,
    hasClearCases,
    labelCases,
    loadingCases,
    multipleValueCases,
    openCases,
    optionsCases,
    pinCases,
    popupWidthCases,
    singleValueCases,
    sizeCases,
    validationStateCases,
    viewCases,
    widthCases,
} from './cases';

test.describe('Select', {tag: '@Select'}, () => {
    const defaultProps: SelectProps = {
        placeholder: 'Placeholder',
    };

    test('smoke empty', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SelectProps>(
            {
                ...defaultProps,
                errorPlacement: 'outside',
            },
            {
                size: sizeCases,
                view: viewCases,
                pin: pinCases,
                disabled: disabledCases,
                width: widthCases,
                label: labelCases,
                validationState: validationStateCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Select {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke non-empty single', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SelectProps>(
            {
                ...defaultProps,
                hasClear: true,
                multiple: false,
                options: baseOptions,
                width: 200,
            },
            {
                value: singleValueCases,
                open: openCases,
            },
        );

        await mount(
            <div style={{height: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Select {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke non-empty multiple', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SelectProps>(
            {
                ...defaultProps,
                hasClear: true,
                hasCounter: true,
                multiple: true,
                options: baseOptions,
                width: 200,
            },
            {
                value: multipleValueCases,
                open: openCases,
                hasClear: hasClearCases,
            },
        );

        await mount(
            <div style={{height: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Select {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with opened popup', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SelectProps>(
            {
                ...defaultProps,
                open: true,
                options: [
                    {value: 'value-1', content: 'First option'},
                    {value: 'value-2', content: 'Second option'},
                ],
                popupPlacement: 'bottom-start',
            },
            {
                popupWidth: popupWidthCases,
            },
        );

        await mount(
            <div style={{width: 300}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title} style={{height: 130}}>
                        <h4>{title}</h4>
                        <div>
                            <Select {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with filter', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SelectProps>(
            {
                ...defaultProps,
                open: true,
                options: [
                    {value: 'value-1', content: 'First option'},
                    {value: 'value-2', content: 'Second option'},
                ],
                popupPlacement: 'bottom-start',
                filterable: true,
            },
            {
                loading: loadingCases,
                filterPlaceholder: filterPlaceholderCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title} style={{height: 175}}>
                        <h4>{title}</h4>
                        <div>
                            <Select {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with options', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SelectProps>(
            {
                ...defaultProps,
                open: true,
            },
            {
                options: optionsCases,
            },
        );

        await mount(
            <div style={{height: 600}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title} style={{height: 150}}>
                        <h4>{title}</h4>
                        <div>
                            <Select {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    // A popup short enough to scroll: the rows of the list keep their heights instead of being
    // squeezed into it
    test(
        'grouped list in a scrolling popup',
        {tag: ['@Select']},
        async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 320, height: 220});

            await mount(
                <div style={{height: 32}}>
                    <Select
                        open
                        width={180}
                        placeholder="Placeholder"
                        options={[
                            {
                                label: 'Group 1',
                                options: [
                                    {value: '1-1', content: 'First option'},
                                    {value: '1-2', content: 'Second option'},
                                ],
                            },
                            {
                                label: 'Group 2',
                                options: [
                                    {value: '2-1', content: 'Third option'},
                                    {value: '2-2', content: 'Fourth option'},
                                ],
                            },
                            {
                                label: 'Group 3',
                                options: [
                                    {value: '3-1', content: 'Fifth option'},
                                    {value: '3-2', content: 'Sixth option'},
                                ],
                            },
                        ]}
                    />
                </div>,
            );

            // The popup lives in a portal outside the mounted wrapper, so the whole page is the shot
            await expectScreenshot({themes: ['light'], locator: page});
        },
    );

    // No screenshots: the radii are read from computed styles
    test.describe('the corners of the popup', () => {
        const sizes: SelectSize[] = ['s', 'm', 'l', 'xl'];
        // The popup's border is outside its box, the control's is inside
        const POPUP_RING = 1;

        const readCorners = (page: Page) =>
            page.getByTestId(SelectQa.POPUP).evaluate((popup) => {
                const list = popup.querySelector('[role="listbox"]');
                const row = popup.querySelector('[role="option"]');
                if (!list || !row) {
                    throw new Error('The popup has no list');
                }
                // The border of the filter input is on one of its wrappers
                let filter = popup.querySelector('input') as Element | null;
                while (filter && parseFloat(getComputedStyle(filter).borderTopLeftRadius) === 0) {
                    filter = filter.parentElement;
                }
                return {
                    smallestRadius: parseFloat(
                        getComputedStyle(popup).getPropertyValue('--g-border-radius-xs'),
                    ),
                    popupRadius: parseFloat(getComputedStyle(popup).borderTopLeftRadius),
                    listRadius: parseFloat(getComputedStyle(list).borderTopLeftRadius),
                    listClip: getComputedStyle(list).clipPath,
                    rowRadius: parseFloat(getComputedStyle(row).borderTopLeftRadius),
                    filterRadius: filter
                        ? parseFloat(getComputedStyle(filter).borderTopLeftRadius)
                        : null,
                };
            });

        for (const size of sizes) {
            test(`repeat the corners of the control, size ${size}`, async ({mount, page}) => {
                await mount(
                    <div style={{height: 120}}>
                        <Select open size={size} options={baseOptions} />
                    </div>,
                );
                await page.getByRole('option').first().waitFor();

                // The control's border is on the button's ::before
                const controlRadius = await page
                    .getByRole('combobox')
                    .evaluate((button) =>
                        parseFloat(getComputedStyle(button, '::before').borderTopLeftRadius),
                    );
                const corners = await readCorners(page);

                expect(corners.popupRadius + POPUP_RING).toBe(controlRadius);
                expect(corners.rowRadius).toBe(Math.max(corners.smallestRadius, controlRadius / 2));
                // The radius clips the rows at the popup's corners, clip-path clips the scrollbar
                expect(corners.listRadius).toBe(corners.popupRadius);
                expect(corners.listClip).toBe('border-box');
            });
        }

        test('the filter is as round as the rows', async ({mount, page}) => {
            await mount(
                <div style={{height: 160}}>
                    <Select open filterable size="l" options={baseOptions} />
                </div>,
            );
            await page.getByRole('option').first().waitFor();

            const corners = await readCorners(page);

            expect(corners.filterRadius).toBe(corners.rowRadius);
        });

        test('take the radius set through popupClassName, the rows and the filter follow', async ({
            mount,
            page,
        }) => {
            // Prepended so that the consumer's styles cannot win by source order
            await page.evaluate(() => {
                const style = document.createElement('style');
                style.textContent = '.custom-popup {--g-popup-border-radius: 15px;}';
                document.head.prepend(style);
            });

            await mount(
                <div style={{height: 160}}>
                    <Select open filterable popupClassName="custom-popup" options={baseOptions} />
                </div>,
            );
            await page.getByRole('option').first().waitFor();

            const corners = await readCorners(page);

            expect(corners.popupRadius).toBe(15);
            expect(corners.rowRadius).toBe((15 + POPUP_RING) / 2);
            expect(corners.filterRadius).toBe(corners.rowRadius);
        });

        test('take the radius of the rows set through popupClassName', async ({mount, page}) => {
            // Prepended so that the consumer's styles cannot win by source order
            await page.evaluate(() => {
                const style = document.createElement('style');
                style.textContent = '.custom-popup {--g-list-item-view-border-radius: 1px;}';
                document.head.prepend(style);
            });

            await mount(
                <div style={{height: 120}}>
                    <Select open popupClassName="custom-popup" options={baseOptions} />
                </div>,
            );
            await page.getByRole('option').first().waitFor();

            const corners = await readCorners(page);

            expect(corners.rowRadius).toBe(1);
        });

        test('take the radius set above for every popup, the rows follow', async ({
            mount,
            page,
        }) => {
            await page.evaluate(() => {
                const style = document.createElement('style');
                style.textContent = ':root {--g-popup-border-radius: 8px;}';
                document.head.append(style);
            });

            await mount(
                <div style={{height: 120}}>
                    <Select open options={baseOptions} />
                </div>,
            );
            await page.getByRole('option').first().waitFor();

            const corners = await readCorners(page);

            expect(corners.popupRadius).toBe(8);
            expect(corners.rowRadius).toBe((8 + POPUP_RING) / 2);
        });

        test('stay round when the border of the popup is removed with a unitless zero', async ({
            mount,
            page,
        }) => {
            // A unitless 0 is not a length inside calc()
            await page.evaluate(() => {
                const style = document.createElement('style');
                style.textContent = ':root {--g-popup-border-width: 0;}';
                document.head.append(style);
            });

            await mount(
                <div style={{height: 120}}>
                    <Select open size="l" options={baseOptions} />
                </div>,
            );
            await page.getByRole('option').first().waitFor();

            const controlRadius = await page
                .getByRole('combobox')
                .evaluate((button) =>
                    parseFloat(getComputedStyle(button, '::before').borderTopLeftRadius),
                );
            const corners = await readCorners(page);

            expect(corners.popupRadius).toBe(controlRadius - POPUP_RING);
            expect(corners.rowRadius).toBe(controlRadius / 2);
        });
    });

    test.describe('option states', () => {
        const render = (mount: MountFixture, props?: SelectProps) => {
            const {options: propsOptions, ...restProps} = props || {};
            const options = (propsOptions || baseOptions) as SelectOption[];

            return mount(
                <div style={{height: 120}}>
                    <Select open={true} value={[options?.[1].value]} {...restProps}>
                        {options.map((option) => {
                            return (
                                <Select.Option
                                    key={option.value}
                                    value={option.value}
                                    content={option.content}
                                />
                            );
                        })}
                    </Select>
                </div>,
            );
        };

        test.describe('single', () => {
            test('should activate selected option by default', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount);
                const selectedOption = page.locator('[aria-selected="true"]');
                await selectedOption.hover();
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should activate selected option on hover', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount);
                const unselectedOption = page.getByText(baseOptions[0].content as string);
                await unselectedOption.hover();
                const selectedOption = page.locator('[aria-selected="true"]');
                await selectedOption.hover();
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should activate selected option on navigation', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount);
                const control = page.getByRole('combobox');
                await control.click();
                await control.press('ArrowDown');
                await control.press('ArrowUp');
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should activate unselected option on hover', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount);
                const unselectedOption = page.getByText(baseOptions[2].content as string);
                await unselectedOption.hover();
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should activate unselected option on navigation', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount);
                const control = page.getByRole('combobox');
                await control.click();
                await control.press('ArrowDown');
                await expectScreenshot({
                    themes: ['light'],
                });
            });
        });

        test.describe('multiple', () => {
            test('should activate first selected option by default', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount, {multiple: true});
                const selectedOption = page.locator('[aria-selected="true"]');
                await selectedOption.hover();
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should activate selected option on hover', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount, {multiple: true});
                const unselectedOption = page.getByText(baseOptions[0].content as string);
                await unselectedOption.hover();
                const selectedOption = page.locator('[aria-selected="true"]');
                await selectedOption.hover();
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should activate selected option on navigation', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount, {multiple: true});
                const control = page.getByRole('combobox');
                await control.click();
                await control.press('ArrowDown');
                await control.press('ArrowUp');
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should activate unselected option on hover', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount, {multiple: true});
                const unselectedOption = page.getByText(baseOptions[2].content as string);
                await unselectedOption.hover();
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should activate unselected option on navigation', async ({
                expectScreenshot,
                mount,
                page,
            }) => {
                await render(mount, {multiple: true});
                const control = page.getByRole('combobox');
                await control.click();
                await control.press('ArrowDown');
                await expectScreenshot({
                    themes: ['light'],
                });
            });

            test('should select option and display it', async ({mount, page}) => {
                const options = [
                    {value: 'option-1', content: 'First Option'},
                    {value: 'option-2', content: 'Second Option'},
                    {value: 'option-3', content: 'Third Option'},
                    {value: 'option-4', content: 'Fourth Option'},
                    {value: 'option-5', content: 'Fifth Option'},
                    {value: 'option-6', content: 'Sixth Option'},
                    {value: 'option-7', content: 'Seventh Option'},
                    {value: 'option-8', content: 'Eighth Option'},
                    {value: 'option-9', content: 'Ninth Option'},
                    {value: 'option-10', content: 'Tenth Option'},
                ];

                await mount(
                    <div style={{padding: 20, height: 300}}>
                        <ListVirtualizer>
                            <Select placeholder="Choose an option" options={options} width={200} />
                        </ListVirtualizer>
                    </div>,
                );

                await page.click('[class*="g-select-control"]');

                await page.waitForSelector('[class*="g-select-list"]');

                await page.click('text=Second Option');

                await page.waitForTimeout(100);

                const selectedText = await page.textContent('[class*="g-select-control"]');
                if (!selectedText?.includes('Second Option')) {
                    throw new Error('Selected option is not displayed in the control');
                }
            });
        });
    });
});
