import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {RadioGroupOption, RadioGroupProps} from '../RadioGroup';
import {RadioGroup} from '../RadioGroup';

import {directionCases, sizeCases} from './cases';

test.describe('RadioGroup', {tag: '@RadioGroup'}, () => {
    const options: RadioGroupOption[] = [
        {value: 'Value 1', content: 'Value 1'},
        {value: 'Value 2', content: 'Value 2'},
        {value: 'Value 3', content: 'Value 3', disabled: true},
    ];

    const defaultProps: RadioGroupProps = {
        value: 'Value 1',
        options,
    };

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<RadioGroupProps>(defaultProps, {
            size: sizeCases,
            direction: directionCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <RadioGroup {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('disabled', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<RadioGroupProps>(
            {
                ...defaultProps,
                disabled: true,
            },
            {
                size: sizeCases,
                direction: directionCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <RadioGroup {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
