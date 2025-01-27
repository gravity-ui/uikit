import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../../stories/tests-factory/create-smoke-scenarios';
import {CONTROL_ERROR_ICON_QA} from '../../utils';
import type {PasswordInputProps} from '../PasswordInput';
import {PasswordInput} from '../PasswordInput';
import {PasswordInputQa} from '../constants';

import {
    disabledCases,
    endContentCases,
    errorPlacementCases,
    hasClearCases,
    hideCopyButtonCases,
    hideRevealButtonCases,
    labelCases,
    noteCases,
    pinCases,
    revealValueCases,
    sizeCases,
    startContentCases,
    validationStateCases,
    viewCases,
} from './cases';
import {PasswordInputStories} from './helpersPlaywright';

test.describe('PasswordInput', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<PasswordInputStories.Default />);

        await expectScreenshot();
    });

    const defaultProps: PasswordInputProps = {
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
        hideCopyButton: hideCopyButtonCases,
        hideRevealButton: hideRevealButtonCases,
        revealValue: revealValueCases,
    } as const;

    smokeTest('empty', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<PasswordInputProps>(
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
                            <PasswordInput {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<PasswordInputProps>(
            {
                ...defaultProps,
                value: 'password',
            },
            commonPropCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <PasswordInput {...props} />
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
                            <PasswordInput {...props} />
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
        const props: PasswordInputProps = {
            ...defaultProps,
            value: 'Text',
            validationState: 'invalid',
            errorMessage: 'Test error message',
            errorPlacement: 'inside',
        };

        const root = await mount(
            <div style={{width: 250}}>
                <PasswordInput {...props} />
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

    smokeTest('reveal button tooltip', async ({mount, page, expectScreenshot}) => {
        const props: PasswordInputProps = {
            ...defaultProps,
            value: 'Text',
            showRevealTooltip: true,
        };

        const root = await mount(
            <div style={{paddingBottom: 50, paddingRight: 50}}>
                <PasswordInput {...props} />
            </div>,
        );

        await root.getByTestId(PasswordInputQa.revealButton).hover();

        await expect(page.locator('.g-tooltip')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('copy button tooltip', async ({mount, page, expectScreenshot}) => {
        const props: PasswordInputProps = {
            ...defaultProps,
            value: 'Text',
            showCopyTooltip: true,
        };

        const root = await mount(
            <div style={{paddingBottom: 50, paddingRight: 50}}>
                <PasswordInput {...props} />
            </div>,
        );

        await root.getByTestId(PasswordInputQa.copyButton).hover();

        await expect(page.locator('.g-tooltip')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
