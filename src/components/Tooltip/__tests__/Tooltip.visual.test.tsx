import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

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
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div>
                    <h4>{title}</h4>
                    <div
                        style={{
                            padding: '25px 100px',
                        }}
                    >
                        <TestTooltip {...props} />
                    </div>
                </div>,
            );

            await root.getByTestId(TooltipQA.trigger).hover();

            await expect(page.getByTestId(TooltipQA.tooltipContent)).toBeVisible({
                timeout: 3000,
            });

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
