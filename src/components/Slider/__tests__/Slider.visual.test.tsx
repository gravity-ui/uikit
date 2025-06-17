import type * as React from 'react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Slider} from '../Slider';
import type {SliderProps} from '../types';

import {
    availableValuesCases,
    disabledCases,
    hasTooltipCases,
    invertedCases,
    marksCases,
    sizeCases,
    startPointCases,
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
            tooltipDisplay: hasTooltipCases,
            marks: marksCases,
            step: stepCases,
            startPoint: startPointCases,
            inverted: invertedCases,
        });

        const availableValuesScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                step: null,
                min: (availableValuesCases?.at(0)?.at(1) as number[]).at(0),
                max: (availableValuesCases?.at(0)?.at(1) as number[]).at(-1),
            },
            {
                marks: availableValuesCases,
            },
        );

        smokeScenarios.push(availableValuesScenarios[1]);

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
                tooltipDisplay: hasTooltipCases,
                marks: marksCases,
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
            tooltipDisplay: hasTooltipCases,
            marks: marksCases,
            step: stepCases,
        });

        const availableValuesScenario = createSmokeScenarios(
            {
                ...defaultRangeProps,
                step: null,
                min: (availableValuesCases?.at(0)?.at(1) as number[]).at(0),
                max: (availableValuesCases?.at(0)?.at(1) as number[]).at(-1),
            },
            {
                marks: availableValuesCases,
            },
        );

        smokeScenarios.push(availableValuesScenario[1]);

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
                tooltipDisplay: hasTooltipCases,
                marks: marksCases,
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
