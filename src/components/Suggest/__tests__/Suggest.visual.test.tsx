import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {
    customPopupCases,
    disabledCases,
    hasClearCases,
    pinCases,
    popupWidthCases,
    sizeCases,
} from './cases';
import {VisualTestQA} from './constants';
import type {TestSuggestProps} from './helpersPlaywright';
import {TestSuggest} from './helpersPlaywright';

test.describe('Suggest', {tag: '@Suggest'}, () => {
    const defaultProps: TestSuggestProps = {};

    createSmokeScenarios<TestSuggestProps>(defaultProps, {
        size: sizeCases,
        pin: pinCases,
        disabled: disabledCases,
        hasClear: hasClearCases,
    }).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div>
                    <h4>{title}</h4>
                    <TestSuggest {...props} />
                </div>,
            );

            await expect(page.getByTestId(VisualTestQA.input)).toBeVisible();

            await expectScreenshot({themes: ['light']});
        });
    });

    createSmokeScenarios<TestSuggestProps>(
        defaultProps,
        {
            popupWidth: popupWidthCases,
        },
        {scenarioName: 'opened'},
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div style={{height: 420}}>
                    <h4>{title}</h4>
                    <TestSuggest {...props} />
                </div>,
            );

            await page.getByRole('textbox').click();
            await expect(page.getByTestId(VisualTestQA.popup)).toBeVisible();

            await expectScreenshot({themes: ['light']});
        });
    });

    createSmokeScenarios<TestSuggestProps>(
        defaultProps,
        {
            customPopup: customPopupCases,
        },
        {scenarioName: 'custom popup'},
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div style={{height: 460}}>
                    <h4>{title}</h4>
                    <TestSuggest {...props} />
                </div>,
            );

            await page.getByRole('textbox').click();
            await expect(page.getByTestId(VisualTestQA.popup)).toBeVisible();

            await expectScreenshot({themes: ['light']});
        });
    });
});
