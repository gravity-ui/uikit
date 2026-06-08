import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {CONTROL_ERROR_ICON_QA} from '../../utils';
import type {TextAreaProps} from '../TextArea';
import {TextArea} from '../TextArea';

import {
    disabledCases,
    errorPlacementCases,
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
                errorPlacement: errorPlacementCases,
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

    test(
        'smoke inside error placement tooltip',
        {tag: ['@smoke']},
        async ({mount, page, expectScreenshot}) => {
            const props: TextAreaProps = {
                ...defaultProps,
                value: 'Text',
                validationState: 'invalid',
                errorMessage: 'Test error message',
                errorPlacement: 'inside',
            };

            const root = await mount(
                <div style={{width: 250}}>
                    <TextArea {...props} />
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
            const props: TextAreaProps = {
                ...defaultProps,
                value: 'Text',
                validationState: 'invalid',
                errorMessage: 'Test error message',
                errorPlacement: 'inside',
                hasClear: true,
            };

            await mount(<TextArea {...props} />);

            await expectScreenshot({
                themes: ['light'],
            });
        },
    );

    test(
        'smoke inside error placement with clear and sizes/views',
        {tag: ['@smoke']},
        async ({mount, expectScreenshot}) => {
            const smokeScenarios = createSmokeScenarios(
                {
                    ...defaultProps,
                    value: 'Text',
                    validationState: 'invalid',
                    errorMessage: 'Test error message',
                    errorPlacement: 'inside',
                    hasClear: true,
                } as const,
                {
                    size: sizeCases,
                    view: viewCases,
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
        },
    );
});
