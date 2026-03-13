import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {CheckboxProps} from '../Checkbox';
import {Checkbox} from '../Checkbox';

import {checkedCases, disabledCases, indeterminateCases, sizeCases} from './cases';

test.describe('Checkbox', {tag: '@Checkbox'}, () => {
    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<CheckboxProps>(
            {
                name: '',
                value: '',
                content: 'Checkbox label',
            },
            {
                size: sizeCases,
                disabled: disabledCases,
                checked: checkedCases,
                indeterminate: indeterminateCases,
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
});
