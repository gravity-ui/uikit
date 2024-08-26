import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Select} from '../Select';
import {SelectQa} from '../constants';
import type {SelectProps} from '../types';

import {
    errorPlacementCases,
    filterPlaceholderCases,
    hasCounterCases,
    labelCases,
    pinCases,
    placeholderLabelCases,
    popupPlacementCases,
    popupWidthCases,
    sizeCases,
    validationStateCases,
    viewCases,
    widthCases,
} from './cases';
import {SelectTestQA, getSelectOptionTestQA} from './constants';
import {TestSelectWithFilter} from './helpers';

test.describe('Select', {tag: '@Select'}, () => {
    const defaultProps: SelectProps<string> = {
        value: ['val1'],
        qa: SelectTestQA.trigger,
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        view: viewCases,
        pin: pinCases,
        width: widthCases,
        popupWidth: popupWidthCases,
        validationState: validationStateCases,
        label: labelCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(
                <div style={{width: 300}}>
                    <Select {...props}>
                        <Select.Option
                            value="val1"
                            content="Value1"
                            qa={getSelectOptionTestQA('val1')}
                        />
                        <Select.Option
                            value="val2"
                            content="Value2"
                            qa={getSelectOptionTestQA('val2')}
                        />
                        <Select.Option
                            value="val3"
                            content="Value3"
                            qa={getSelectOptionTestQA('val3')}
                        />
                        <Select.Option
                            value="val4"
                            content="Value4"
                            qa={getSelectOptionTestQA('val4')}
                            disabled
                        />
                        <Select.OptionGroup label="Group 1">
                            <Select.Option
                                value="val5"
                                content="Value5"
                                qa={getSelectOptionTestQA('val5')}
                            />
                            <Select.Option
                                value="val6"
                                content="Value6"
                                qa={getSelectOptionTestQA('val6')}
                                disabled
                            />
                        </Select.OptionGroup>
                    </Select>
                </div>,
            );

            await expectScreenshot();

            await root.getByTestId(SelectTestQA.trigger).hover();

            await expectScreenshot({
                nameSuffix: 'after hover on trigger',
            });

            await root.getByTestId(SelectTestQA.trigger).click();

            await expectScreenshot({
                component: page,
                nameSuffix: 'after click on trigger',
            });

            await page.getByTestId(getSelectOptionTestQA('val2')).hover();

            await expectScreenshot({
                component: page,
                nameSuffix: 'after hover on item',
            });
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            hasClear: true,
        },
        {},
        {
            scenarioName: 'clear button',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <Select {...props}>
                    <Select.Option
                        value="val1"
                        content="Value1"
                        qa={getSelectOptionTestQA('val1')}
                    />
                </Select>,
            );

            await expectScreenshot();

            await root.getByTestId(SelectTestQA.trigger).hover();

            await expectScreenshot({
                nameSuffix: 'after hover on trigger',
            });

            await root.getByTestId(SelectQa.CLEAR).hover();

            await expectScreenshot({
                nameSuffix: 'after hover on clear button',
            });
        });
    });

    createSmokeScenarios<SelectProps<string>>(
        {
            qa: defaultProps.qa,
        },
        {
            placeholder: placeholderLabelCases,
        },
        {
            scenarioName: 'empty state',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Select {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            popupPlacement: popupPlacementCases,
        },
        {
            scenarioName: 'popup placement',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(
                <div style={{padding: 200}}>
                    <Select {...props}>
                        <Select.Option
                            value="val1"
                            content="Value 1"
                            qa={getSelectOptionTestQA('val1')}
                        />
                        <Select.Option
                            value="val2"
                            content="Value 2"
                            qa={getSelectOptionTestQA('val2')}
                        />
                    </Select>
                </div>,
            );

            await root.getByTestId(SelectTestQA.trigger).click();

            await expectScreenshot({
                component: page,
            });
        });
    });

    createSmokeScenarios<SelectProps<string>>(
        {
            ...defaultProps,
            errorMessage: 'Error message',
            validationState: 'invalid',
        },
        {
            errorPlacement: errorPlacementCases,
        },
        {
            scenarioName: 'error state',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            await mount(
                <Select {...props}>
                    <Select.Option
                        value="val1"
                        content="Value 1"
                        qa={getSelectOptionTestQA('val1')}
                    />
                    <Select.Option
                        value="val2"
                        content="Value 2"
                        qa={getSelectOptionTestQA('val2')}
                    />
                </Select>,
            );

            await expectScreenshot();
        });
    });

    createSmokeScenarios<SelectProps<string>>(
        {
            value: ['val1', 'val5'],
            qa: SelectTestQA.trigger,
            multiple: true,
        },
        {
            hasCounter: hasCounterCases,
            validationState: validationStateCases,
        },
        {
            scenarioName: 'multiple',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(
                <div style={{width: 300}}>
                    <Select {...props}>
                        <Select.Option
                            value="val1"
                            content="Value1"
                            qa={getSelectOptionTestQA('val1')}
                        />
                        <Select.Option
                            value="val2"
                            content="Value2"
                            qa={getSelectOptionTestQA('val2')}
                        />
                        <Select.Option
                            value="val3"
                            content="Value3"
                            qa={getSelectOptionTestQA('val3')}
                        />
                        <Select.Option
                            value="val4"
                            content="Value4"
                            qa={getSelectOptionTestQA('val4')}
                            disabled
                        />
                        <Select.OptionGroup label="Group 1">
                            <Select.Option
                                value="val5"
                                content="Value5"
                                qa={getSelectOptionTestQA('val5')}
                            />
                            <Select.Option
                                value="val6"
                                content="Value6"
                                qa={getSelectOptionTestQA('val6')}
                                disabled
                            />
                        </Select.OptionGroup>
                    </Select>
                </div>,
            );

            await expectScreenshot();

            await root.getByTestId(SelectTestQA.trigger).hover();

            await expectScreenshot({
                nameSuffix: 'after hover on trigger',
            });

            await root.getByTestId(SelectTestQA.trigger).click();

            await expectScreenshot({
                component: page,
                nameSuffix: 'after click on trigger',
            });

            await page.getByTestId(getSelectOptionTestQA('val2')).hover();

            await expectScreenshot({
                component: page,
                nameSuffix: 'after hover on item',
            });
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            filterPlaceholder: filterPlaceholderCases,
        },
        {
            scenarioName: 'with filter',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(<TestSelectWithFilter {...props} />);

            await root.getByTestId(SelectTestQA.trigger).click();

            await expectScreenshot({
                component: page,
            });

            await page.locator('input').focus();

            await page.keyboard.type('val');

            await expectScreenshot({
                component: page,
                nameSuffix: 'after type filter value',
            });
        });
    });
});
