import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {ModalProps} from '../Modal';

import {ModalQa} from './constants';
import {TestModal} from './helpersPlaywright';

test.describe('Modal', {tag: '@Modal'}, () => {
    const defaultProps: ModalProps = {};

    createSmokeScenarios(defaultProps, {}).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            await mount(<TestModal {...props} />);

            await page.getByTestId(ModalQa.trigger).click();

            await expect(page.getByTestId(ModalQa.content)).toBeVisible();

            await expectScreenshot({
                component: page,
            });
        });
    });
});
