import type * as React from 'react';

import {smokeTest, test} from '~playwright/core';

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
    const defaultWrapStyle: React.CSSProperties = {
        width: 300,
        height: 50,
        paddingBottom: 20,
    };

    const defaultProps: SliderProps = {
        value: 40,
        min: 0,
        max: 100,
        onUpdate: () => {},
    };

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            disabled: disabledCases,
            validationState: validationStateCases,
            hasTooltip: hasTooltipCases,
            marksCount: marksCountCases,
            step: stepCases,
            availableValues: availableValuesCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={defaultWrapStyle}>
                            <Slider {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with error', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SliderProps>(
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
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={defaultWrapStyle}>
                            <Slider {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    const defaultRangeProps: SliderProps = {
        value: [20, 40],
        min: 0,
        max: 100,
        onUpdate: () => {},
    };

    smokeTest('range value', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SliderProps>(defaultRangeProps, {
            size: sizeCases,
            disabled: disabledCases,
            validationState: validationStateCases,
            hasTooltip: hasTooltipCases,
            marksCount: marksCountCases,
            step: stepCases,
            availableValues: availableValuesCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={defaultWrapStyle}>
                            <Slider {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('range value with error', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<SliderProps>(
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
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div style={defaultWrapStyle}>
                            <Slider {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
