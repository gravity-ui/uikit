import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

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
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
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
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
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
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
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
