import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import type {PopupProps} from '../Popup';

import {offsetCases, placementCases, strategyCases} from './cases';
import {VisualTestQA} from './constants';
import {TestPopup} from './helpers';

test.describe('Popup', {tag: '@Popup'}, () => {
    const defaultProps: PopupProps = {};

    const layerCases: {title: string; props: PopupProps; expectedZIndex: string}[] = [
        {title: 'shared token', props: {}, expectedZIndex: '3210'},
        {title: 'explicit zero', props: {zIndex: 0}, expectedZIndex: '0'},
        {title: 'explicit value', props: {zIndex: 4567}, expectedZIndex: '4567'},
        {
            title: 'floatingStyles override',
            props: {zIndex: 4567, floatingStyles: {zIndex: 6789}},
            expectedZIndex: '6789',
        },
    ];

    for (const {title, props, expectedZIndex} of layerCases) {
        test(`respect layer precedence: ${title}`, async ({mount, page}) => {
            await mount(<TestPopup {...props} />);
            await page.addStyleTag({content: '.g-root { --g-layer-popup: 3210; }'});

            const popup = page.getByTestId(VisualTestQA.popupContent);
            await expect(popup).toBeVisible();
            await expect(popup.locator('..')).toHaveCSS('z-index', expectedZIndex);
        });
    }

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
