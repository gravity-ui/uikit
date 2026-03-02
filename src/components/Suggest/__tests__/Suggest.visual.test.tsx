import {expect} from '@playwright/experimental-ct-react';

import {createSmokeScenarios} from 'src/stories/tests-factory/create-smoke-scenarios';
import {smokeTest, test} from '~playwright/core';

import type {Cases, CasesWithName} from '../../../stories/tests-factory/models';

import type {TestSuggestProps} from './TestSuggest';
import {TestSuggest} from './TestSuggest';

const QA_SUGGEST_POPUP = 'qa-suggest-popup';
const QA_SUGGEST_TEXT_INPUT = 'qa-suggest-text-input';

const sizeCases: Cases<TestSuggestProps['size']> = ['s', 'm', 'l', 'xl'];

const disabledCases: Cases<TestSuggestProps['disabled']> = [true];

const hasClearCases: Cases<TestSuggestProps['hasClear']> = [true];

const popupWidthCases: CasesWithName<TestSuggestProps['popupWidth']> = [
    ['fit', 'fit'],
    ['auto', 'auto'],
    ['number', 256],
];

const customPopupCases: Cases<TestSuggestProps['customPopup']> = [true];

test.describe('Suggest', {tag: '@Suggest'}, () => {
    const defaultProps: TestSuggestProps = {
        value: 'Earth',
        qa: QA_SUGGEST_TEXT_INPUT,
        popupQa: QA_SUGGEST_POPUP,
    };

    createSmokeScenarios<TestSuggestProps>(defaultProps, {
        disabled: disabledCases,
        hasClear: hasClearCases,
        size: sizeCases,
    }).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div style={{height: 512}}>
                    <h4>{title}</h4>
                    <TestSuggest {...props} />
                </div>,
            );

            await expect(page.getByTestId(QA_SUGGEST_TEXT_INPUT)).toBeVisible();

            await expectScreenshot({themes: ['light']});
        });
    });

    createSmokeScenarios<TestSuggestProps>(
        defaultProps,
        {popupWidth: popupWidthCases},
        {scenarioName: 'opened'},
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div style={{height: 512}}>
                    <h4>{title}</h4>
                    <TestSuggest {...props} />
                </div>,
            );

            await page.getByRole('textbox').click();
            await expect(page.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();

            await expectScreenshot({themes: ['light']});
        });
    });

    createSmokeScenarios<TestSuggestProps>(
        defaultProps,
        {customPopup: customPopupCases},
        {scenarioName: 'customPopup'},
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div style={{height: 512}}>
                    <h4>{title}</h4>
                    <TestSuggest {...props} />
                </div>,
            );

            await page.getByRole('textbox').click();
            await expect(page.getByTestId(QA_SUGGEST_POPUP)).toBeVisible();

            await expectScreenshot({themes: ['light']});
        });
    });
});
