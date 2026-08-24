import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

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

    test('smoke empty', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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

    test('smoke with value', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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

    test('smoke with error', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
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

    test(
        'smoke inside error placement tooltip',
        {tag: ['@smoke']},
        async ({mount, page, expectScreenshot}) => {
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
        },
    );

    test(
        'smoke inside error placement tooltip with clear button',
        {tag: ['@smoke']},
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
