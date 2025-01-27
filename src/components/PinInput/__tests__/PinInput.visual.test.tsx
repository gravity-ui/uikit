import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {PinInputProps} from '../PinInput';
import {PinInput} from '../PinInput';

import {
    disabledCases,
    lengthCases,
    maskCases,
    noteCases,
    placeholderCases,
    responsiveCases,
    sizeCases,
    validationStateCases,
} from './cases';

test.describe('PinInput', {tag: '@PinInput'}, () => {
    const commonPropsCases = {
        placeholder: placeholderCases,
        length: lengthCases,
        disabled: disabledCases,
        responsive: responsiveCases,
        note: noteCases,
        mask: maskCases,
        size: sizeCases,
        validationState: validationStateCases,
    } as const;

    smokeTest('empty', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<PinInputProps>(
            {
                type: 'numeric',
                errorMessage: 'Test error message',
            },
            commonPropsCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <PinInput {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('number', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<PinInputProps>(
            {
                type: 'numeric',
                errorMessage: 'Test error message',
                value: ['1', '2', '3', '4'],
            },
            commonPropsCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <PinInput {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('alphabetic', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<PinInputProps>(
            {
                type: 'alphanumeric',
                errorMessage: 'Test error message',
                value: ['a', 'b', 'c', 'd'],
            },
            commonPropsCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <PinInput {...props} />
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
