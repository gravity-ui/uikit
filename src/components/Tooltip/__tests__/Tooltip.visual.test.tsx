import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {TooltipProps} from '../Tooltip';

import {placementCases} from './cases';
import {TooltipQA} from './constants';
import {TestTooltip} from './helpers';

test.describe('Tooltip', {tag: '@Tooltip'}, () => {
    createSmokeScenarios<TooltipProps>(
        {
            children: <div>text</div>,
        },
        {
            placement: placementCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<TestTooltip {...props} />);

            await root.getByTestId(TooltipQA.trigger).hover();

            await expect(page.getByTestId(TooltipQA.tooltipContent)).toBeVisible({
                timeout: 3000,
            });

            await expectScreenshot({});
        });
    });
});
