import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Slider} from '../Slider';
import type {SliderProps} from '../types';

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
    const defaultProps: SliderProps = {
        value: 40,
        min: 0,
        max: 100,
        onUpdate: () => {},
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

    createSmokeScenarios<SliderProps>(
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
        {
            scenarioName: 'with error',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: 300, height: 200}}>
                    <Slider {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });

    const defaultRangeProps: SliderProps = {
        value: [20, 40],
        min: 0,
        max: 100,
        onUpdate: () => {},
    };

    createSmokeScenarios<SliderProps>(
        defaultRangeProps,
        {
            size: sizeCases,
            disabled: disabledCases,
            validationState: validationStateCases,
            hasTooltip: hasTooltipCases,
            marksCount: marksCountCases,
            step: stepCases,
            availableValues: availableValuesCases,
        },
        {
            scenarioName: 'range',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: 300, height: 50}}>
                    <Slider {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });

    createSmokeScenarios<SliderProps>(
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
        {
            scenarioName: 'range with error',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: 300, height: 200}}>
                    <Slider {...props} />
                </div>,
            );

            await expectScreenshot();
        });
    });
});
