import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SliderProps} from '../Slider';
import {Slider} from '../Slider';

import {
    availableValuesCases,
    disabledCases,
    hasTooltipCases,
    marksCountCases,
    sizeCases,
    stepCases,
    validationStateCases,
} from './cases';

test.describe('Slider', {tag: '@Slider'}, () => {
    const defaultProps: SliderProps<number> = {
        value: 40,
        min: 0,
        max: 100,
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        disabled: disabledCases,
        validationState: validationStateCases,
        hasTooltip: hasTooltipCases,
        marksCount: marksCountCases,
        step: stepCases,
        availableValues: availableValuesCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: 300, height: 50}}>
                    <Slider {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            validationState: 'invalid',
            errorMessage: 'Error message',
        },
        {
            hasTooltip: hasTooltipCases,
            marksCount: marksCountCases,
            step: stepCases,
        },
    ).forEach(([title, details, props]) => {
        test(`with error ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: 300, height: 200}}>
                    <Slider {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });

    const defaultRangeProps: SliderProps<[number, number]> = {
        value: [20, 40],
        min: 0,
        max: 100,
    };

    createSmokeScenarios(defaultRangeProps, {
        size: sizeCases,
        disabled: disabledCases,
        validationState: validationStateCases,
        hasTooltip: hasTooltipCases,
        marksCount: marksCountCases,
        step: stepCases,
        availableValues: availableValuesCases,
    }).forEach(([title, details, props]) => {
        test(`range ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: 300, height: 50}}>
                    <Slider {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });
    createSmokeScenarios(
        {
            ...defaultRangeProps,
            validationState: 'invalid',
            errorMessage: 'Error message',
        },
        {
            hasTooltip: hasTooltipCases,
            marksCount: marksCountCases,
            step: stepCases,
        },
    ).forEach(([title, details, props]) => {
        test(`range with error ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: 300, height: 200}}>
                    <Slider {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });
});
