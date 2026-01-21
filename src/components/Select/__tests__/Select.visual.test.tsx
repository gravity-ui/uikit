import {createSmokeScenarios} from 'src/stories/tests-factory/create-smoke-scenarios';
import {smokeTest, test} from '~playwright/core';
import type {MountFixture} from '~playwright/core';

import {Select} from '../Select';
import type {SelectOption, SelectProps} from '../types';

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

    smokeTest('empty', async ({mount, expectScreenshot}) => {
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

    smokeTest('non-empty single', async ({mount, expectScreenshot}) => {
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

    smokeTest('non-empty multiple', async ({mount, expectScreenshot}) => {
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

    smokeTest('with opened popup', async ({mount, expectScreenshot}) => {
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

    smokeTest('with filter', async ({mount, expectScreenshot}) => {
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

    smokeTest('with options', async ({mount, expectScreenshot}) => {
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
        });
    });
});
