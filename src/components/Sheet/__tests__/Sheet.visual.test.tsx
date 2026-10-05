import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import type {SheetProps} from '../Sheet';
import {DEFAULT_SHEET_QA} from '../__stories__/constants';
import {SheetQa} from '../constants';

import {hideTopBarCases, titleCases} from './cases';
import {QASheet} from './constants';
import {TestSheet} from './helpers';
import {SheetStories} from './helpersPlaywright';

// iPhone-like safe-area insets: sides wider than the 10px fallback, bottom > 0
const NOTCH_DEVICE_SAFE_AREA_INSETS = {top: 50, left: 44, right: 44, bottom: 34};

test.describe('Sheet', {tag: '@Sheet'}, () => {
    test('render story: <Default>', async ({page, mount, expectScreenshot}) => {
        await mount(<SheetStories.Default />);

        await page.getByRole('button').click();

        const sheetLocator = page.locator(`[data-qa=${DEFAULT_SHEET_QA}]`);

        await expect(sheetLocator).toBeVisible();

        await expectScreenshot({
            locator: sheetLocator,
            options: {animations: 'disabled'},
        });
    });

    test('safe-area: content padding on a device with a notch', async ({
        page,
        mount,
        expectScreenshot,
    }) => {
        await page.setViewportSize({width: 390, height: 844});

        // Set real env(safe-area-inset-*) via experimental CDP method
        const cdpSession = await page.context().newCDPSession(page);
        await cdpSession.send('Emulation.setSafeAreaInsetsOverride', {
            insets: NOTCH_DEVICE_SAFE_AREA_INSETS,
        });

        const root = await mount(<TestSheet />, {
            rootStyle: {
                padding: 0,
                width: '100%',
                minHeight: '844px',
            },
        });

        await root.locator('button').click();
        await expect(page.locator(`[data-qa='${QASheet.content}']`)).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('viewport resize: keeps the top edge and follows the new bottom at once', async ({
        page,
        mount,
    }) => {
        await page.setViewportSize({width: 390, height: 844});

        const root = await mount(<TestSheet alwaysFullHeight />, {
            rootStyle: {padding: 0, width: '100%', minHeight: '844px'},
        });

        await root.locator('button').click();
        // Resizes are deferred until the open transition ends.
        await page
            .getByTestId(SheetQa.VEIL)
            .evaluate(
                (veil) =>
                    new Promise((resolve) =>
                        veil.addEventListener('transitionend', resolve, {once: true}),
                    ),
            );

        const sheetTop = page.getByTestId(SheetQa.TOP);
        const contentArea = page.getByTestId(SheetQa.CONTENT_AREA);
        const getEdges = async () => {
            const [top, content] = await Promise.all([
                sheetTop.boundingBox(),
                contentArea.boundingBox(),
            ]);

            return {
                top: Math.round(top?.y ?? 0),
                bottom: Math.round((content?.y ?? 0) + (content?.height ?? 0)),
            };
        };

        expect(await getEdges()).toEqual({top: 84, bottom: 844});

        await page.setViewportSize({width: 390, height: 464});
        await page.evaluate(
            () => new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve))),
        );

        expect(await getEdges()).toEqual({top: 84, bottom: 464});
    });

    createSmokeScenarios<Partial<Omit<SheetProps, 'visible' | 'onClose'>>>(
        {},
        {
            hideTopBar: hideTopBarCases,
            title: titleCases,
        },
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(<TestSheet {...props} />, {
                rootStyle: {
                    padding: 0,
                    width: '100%',
                    minHeight: '500px',
                },
            });

            await root.locator('button').click();
            await expect(page.locator(`[data-qa='${QASheet.content}']`)).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
