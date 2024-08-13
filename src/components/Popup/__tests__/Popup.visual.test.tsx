import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {PopupProps} from '../Popup';

import {hasArrowCases, offsetCases, placementCases, strategyCases} from './cases';
import {VisualTestQA} from './constants';
import {VisualTestPopup} from './helpers';

test.describe('Popup', {tag: '@Popup'}, () => {
    const defaultProps: PopupProps = {};

    createSmokeScenarios(defaultProps, {
        hasArrow: hasArrowCases,
        placement: placementCases,
        offset: offsetCases,
        strategy: strategyCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<VisualTestPopup {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            await root.locator(`button[data-qa="${VisualTestQA.trigger}"]`).click();

            await expect(page.locator(`[data-qa="${VisualTestQA.popupContent}"]`)).toBeVisible();

            await expectScreenshot({
                screenshotPostfix: 'opened state',
            });
        });
    });
});
