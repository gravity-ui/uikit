import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../../stories/tests-factory/create-smoke-scenarios';
import {CONTROL_ERROR_ICON_QA} from '../../utils';
import type {TextInputProps} from '../TextInput';
import {TextInput} from '../TextInput';

import {
    disabledCases,
    endContentCases,
    errorPlacementCases,
    hasClearCases,
    labelCases,
    noteCases,
    pinCases,
    sizeCases,
    startContentCases,
    validationStateCases,
    viewCases,
} from './cases';

test.describe('TextInput', {tag: '@TextInput'}, () => {
    const defaultProps: TextInputProps = {
        placeholder: 'Placeholder',
    };

    const commonPropCases = {
        pin: pinCases,
        size: sizeCases,
        view: viewCases,
        note: noteCases,
        validationState: validationStateCases,
        startContent: startContentCases,
        endContent: endContentCases,
        disabled: disabledCases,
        hasClear: hasClearCases,
        label: labelCases,
    } as const;

    smokeTest('empty', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TextInputProps>(
            {
                ...defaultProps,
            },
            commonPropCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextInput {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with value', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TextInputProps>(
            {
                ...defaultProps,
                value: 'Text',
            },
            commonPropCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextInput {...props} />
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
        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                value: 'Text',
                validationState: 'invalid',
                errorMessage: 'Test error message',
            } as const,
            {
                errorPlacement: errorPlacementCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TextInput {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('inside error placement tooltip', async ({mount, page, expectScreenshot}) => {
        const props: TextInputProps = {
            ...defaultProps,
            value: 'Text',
            validationState: 'invalid',
            errorMessage: 'Test error message',
            errorPlacement: 'inside',
        };

        const root = await mount(
            <div style={{width: 250}}>
                <TextInput {...props} />
            </div>,
            {
                width: 500,
            },
        );

        await root.getByTestId(CONTROL_ERROR_ICON_QA).hover();

        await expect(page.locator('.g-popup')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest(
        'inside error placement tooltip with clear button',
        async ({mount, expectScreenshot}) => {
            const props: TextInputProps = {
                ...defaultProps,
                value: 'Text',
                validationState: 'invalid',
                errorMessage: 'Test error message',
                errorPlacement: 'inside',
                hasClear: true,
            };

            await mount(<TextInput {...props} />);

            await expectScreenshot({
                themes: ['light'],
            });
        },
    );
});
