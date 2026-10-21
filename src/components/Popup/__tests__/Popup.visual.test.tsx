import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import type {PopupProps} from '../Popup';

import {offsetCases, placementCases, strategyCases} from './cases';
import {VisualTestQA} from './constants';
import {RapidReopenPopup, TestPopup} from './helpers';

test.describe('Popup', {tag: '@Popup'}, () => {
    const defaultProps: PopupProps = {};

    test('should remain visible when reopened during the close transition', async ({
        mount,
        page,
    }) => {
        await mount(<RapidReopenPopup />);

        const popup = page.getByTestId(VisualTestQA.popupContent);
        const floating = page.locator('[data-floating-ui-status]');
        const button = page.getByRole('button', {name: 'Open popup'});

        await expect(floating).toHaveAttribute('data-floating-ui-status', 'open');
        await expect(popup).toHaveCSS('opacity', '1');
        await page.clock.install();
        await page.clock.pauseAt(new Date());

        for (let attempt = 0; attempt < 3; attempt++) {
            await button.hover();
            await page.mouse.down();
            await expect(floating).toHaveAttribute('data-floating-ui-status', 'close');
            await page.mouse.up();
            await page.clock.runFor(200);

            await expect(floating).toHaveAttribute('data-floating-ui-status', 'open');
            await expect(popup).toHaveCSS('opacity', '1');
        }
    });

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
