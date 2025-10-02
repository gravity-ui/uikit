import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {CheckboxProps} from '../Checkbox';
import {Checkbox} from '../Checkbox';

import {disabledCases, sizeCases, validationStateCases} from './cases';

test.describe('Checkbox', {tag: '@Checkbox'}, () => {
    const defaultProps: CheckboxProps = {
        name: '',
        value: '',
        content: 'Checkbox label',
    };

    const commonPropsCases = {
        size: sizeCases,
        validationState: validationStateCases,
    } as const;

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<CheckboxProps>(
            {
                name: '',
                value: '',
                content: 'Checkbox label',
            },
            {
                size: sizeCases,
                disabled: disabledCases,
                validationState: validationStateCases,
            },
            {},
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Checkbox {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('checked', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<CheckboxProps>(
            {
                ...defaultProps,
                checked: true,
            },
            {
                ...commonPropsCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Checkbox {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('indeterminate', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<CheckboxProps>(
            {
                ...defaultProps,
                indeterminate: true,
            },
            {
                ...commonPropsCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Checkbox {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
