import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {PopupProps} from '../Popup';

import {offsetCases, placementCases, strategyCases} from './cases';
import {VisualTestQA} from './constants';
import {TestPopup} from './helpers';

test.describe('Popup', {tag: '@Popup'}, () => {
    const defaultProps: PopupProps = {};

    createSmokeScenarios<PopupProps>(defaultProps, {
        offset: offsetCases,
        strategy: strategyCases,
    }).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div>
                    <h4>{title}</h4>
                    <TestPopup {...props} />
                </div>,
            );

            await expect(page.getByTestId(VisualTestQA.popupContent)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios<PopupProps>(
        defaultProps,
        {
            placement: placementCases,
        },
        {
            scenarioName: 'placement',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div>
                    <h4>{title}</h4>
                    <TestPopup {...props} />
                </div>,
            );

            await expect(page.getByTestId(VisualTestQA.popupContent)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios<PopupProps>(
        {
            ...defaultProps,
            hasArrow: true,
        },
        {
            placement: placementCases,
        },
        {
            scenarioName: 'placement with arrow',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            await mount(
                <div>
                    <h4>{title}</h4>
                    <TestPopup {...props} />
                </div>,
            );

            await expect(page.getByTestId(VisualTestQA.popupContent)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
