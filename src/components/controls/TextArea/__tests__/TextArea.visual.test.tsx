import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import type {TextAreaProps} from '../TextArea';
import {TextArea} from '../TextArea';

import {
    disabledCases,
    hasClearCases,
    maxRowsCases,
    minRowsCases,
    noteCases,
    pinCases,
    rowsCases,
    sizeCases,
    testValue,
    validationStateCases,
    valueCases,
    viewCases,
} from './cases';

test.describe('TextArea', {tag: '@TextArea'}, () => {
    const defaultProps: TextAreaProps = {
        placeholder: 'Placeholder',
    };

    const commonPropCases = {
        pin: pinCases,
        size: sizeCases,
        view: viewCases,
        rows: rowsCases,
        minRows: minRowsCases,
        maxRows: maxRowsCases,
        note: noteCases,
        hasClear: hasClearCases,
        disabled: disabledCases,
        validationState: validationStateCases,
    } as const;

    test('smoke empty', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, commonPropCases);

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextArea {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with value', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                value: testValue,
            },
            commonPropCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextArea {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke with error', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                validationState: 'invalid',
                errorMessage: 'Test error message',
            } as const,
            {
                value: valueCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextArea {...props} />
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
