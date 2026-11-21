import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import type {TestSuggestProps} from './TestSuggest';
import {TestSuggest} from './TestSuggest';

const QA_SUGGEST_POPUP = 'qa-suggest-popup';
const QA_SUGGEST_TEXT_INPUT = 'qa-suggest-text-input';

test.describe('Suggest', {tag: '@Suggest'}, () => {
    const defaultProps: TestSuggestProps = {
        value: 'Earth',
        qa: QA_SUGGEST_TEXT_INPUT,
        popupQa: QA_SUGGEST_POPUP,
    };

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestSuggestProps>(defaultProps, {
            size: ['s', 'm', 'l', 'xl'],
            disabled: [true],
            hasClear: [true],
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <TestSuggest {...props} />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({themes: ['light']});
    });

    test('smoke opened', {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestSuggestProps>(defaultProps, {
            popupWidth: [
                ['fit', 'fit'],
                ['auto', 'auto'],
                ['number', 256],
            ],
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title} style={{height: 200}}>
                        <h4>{title}</h4>
                        <TestSuggest {...props} />
                    </div>
                ))}
            </div>,
        );

        await page.getByRole('textbox').first().click();
        await expect(page.getByTestId(QA_SUGGEST_POPUP).first()).toBeVisible();

        await expectScreenshot({themes: ['light']});
    });

    test('smoke customPopup', {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestSuggestProps>(defaultProps, {
            customPopup: [true],
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title} style={{height: 200}}>
                        <h4>{title}</h4>
                        <TestSuggest {...props} />
                    </div>
                ))}
            </div>,
        );

        await page.getByRole('textbox').first().click();
        await expect(page.getByTestId(QA_SUGGEST_POPUP).first()).toBeVisible();

        await expectScreenshot({themes: ['light']});
    });
});
