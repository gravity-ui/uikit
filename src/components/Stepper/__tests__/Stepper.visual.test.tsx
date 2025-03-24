import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Stepper} from '../Stepper';
import type {StepperProps} from '../Stepper';
import type {StepperItemProps} from '../StepperItem';

import {sizeCases, viewCases} from './cases';
import {StepperStories} from './helpersPlaywright';

test.describe('Stepper', {tag: '@Stepper'}, () => {
    const defaultProps: Omit<StepperProps, 'children'> = {};
    const defaultStepItemProps: Omit<StepperItemProps, 'children'> = {};

    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<StepperStories.Default />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<StepperStories.View />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<StepperStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<StepperStories.Disabled />);

        await expectScreenshot();
    });

    test('render story: <CustomIcons>', async ({mount, expectScreenshot}) => {
        await mount(<StepperStories.CustomIcons />);

        await expectScreenshot();
    });

    test('render story: <CustomSeparator>', async ({mount, expectScreenshot}) => {
        await mount(<StepperStories.CustomSeparator />);

        await expectScreenshot();
    });

    test('render story: <InteractiveShowcase>', async ({mount, expectScreenshot}) => {
        await mount(<StepperStories.InteractiveShowcase />);

        await expectScreenshot();
    });

    test('render story: <WithFloatingElements>', async ({mount, expectScreenshot}) => {
        await mount(<StepperStories.WithFloatingElements />);

        await expectScreenshot();
    });

    createSmokeScenarios(
        defaultProps,
        {
            size: sizeCases,
        },
        {
            scenarioName: 'with different sizes',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '600px'}}>
                    <Stepper {...props}>
                        <Stepper.Item>Step 1</Stepper.Item>
                        <Stepper.Item>Step 2</Stepper.Item>
                        <Stepper.Item>Step 3</Stepper.Item>
                    </Stepper>
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios(
        defaultStepItemProps,
        {
            view: viewCases,
        },
        {
            scenarioName: 'with different views',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, expectScreenshot}) => {
            await mount(
                <div style={{width: '200px'}}>
                    <Stepper>
                        <Stepper.Item {...props}>Step 1</Stepper.Item>
                    </Stepper>
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
