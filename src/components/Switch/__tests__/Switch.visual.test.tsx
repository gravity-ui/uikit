import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SwitchProps} from '../Switch';
import {Switch} from '../Switch';

import {disabledCases, indeterminateCases, sizeCases} from './cases';

test.describe('Switch', {tag: '@Switch'}, () => {
    const defaultProps: SwitchProps = {
        content: 'label',
    };

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            disabled: disabledCases,
            indeterminate: indeterminateCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Switch {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    smokeTest('checked', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                checked: true,
            },
            {
                size: sizeCases,
                disabled: disabledCases,
                indeterminate: indeterminateCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Switch {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });
});
