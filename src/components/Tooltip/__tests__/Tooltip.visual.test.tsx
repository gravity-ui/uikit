import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import type {TooltipProps} from '../Tooltip';

import {TooltipOverToaster} from './TooltipOverToaster';
import {placementCases} from './cases';
import {TooltipQA} from './constants';
import {TestTooltip} from './helpers';

test.describe('Tooltip', {tag: '@Tooltip'}, () => {
    test('appears above an overlapping toast', async ({mount, page, expectScreenshot}) => {
        await page.setViewportSize({width: 640, height: 320});
        await mount(
            <div>
                <TooltipOverToaster />
            </div>,
        );

        const toast = page.locator('[data-toast]');
        const tooltip = page.getByTestId(TooltipQA.overlapTooltip);

        await expect(toast).toBeVisible();
        await expect(toast.getByRole('button', {name: 'Details'})).toBeVisible();
        await expect(toast).toHaveCSS('opacity', '1');
        await expect(tooltip).toBeVisible();

        const toastBox = await toast.boundingBox();
        const tooltipBox = await tooltip.boundingBox();
        if (!toastBox || !tooltipBox) {
            throw new Error('Expected visible toast and tooltip bounding boxes');
        }

        const overlapLeft = Math.max(toastBox.x, tooltipBox.x);
        const overlapTop = Math.max(toastBox.y, tooltipBox.y);
        const overlapRight = Math.min(toastBox.x + toastBox.width, tooltipBox.x + tooltipBox.width);
        const overlapBottom = Math.min(
            toastBox.y + toastBox.height,
            tooltipBox.y + tooltipBox.height,
        );

        expect(overlapRight - overlapLeft).toBeGreaterThan(10);
        expect(overlapBottom - overlapTop).toBeGreaterThan(10);

        const tooltipIsOnTop = await page.evaluate(
            ({x, y, selector}) => document.elementFromPoint(x, y)?.closest(selector) !== null,
            {
                x: (overlapLeft + overlapRight) / 2,
                y: (overlapTop + overlapBottom) / 2,
                selector: `[data-qa="${TooltipQA.overlapTooltip}"]`,
            },
        );
        expect(tooltipIsOnTop).toBe(true);

        await expectScreenshot({
            locator: page,
            themes: ['light'],
            options: {clip: {x: 200, y: 190, width: 440, height: 130}},
        });
    });

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
