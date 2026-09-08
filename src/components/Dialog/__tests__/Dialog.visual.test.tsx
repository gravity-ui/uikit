import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import {getModalLayoutMetrics} from '../../Modal/__tests__/helpers';
import {MobileProvider} from '../../mobile';
import {Dialog} from '../Dialog';
import type {DialogProps} from '../Dialog';
import type {DialogBodyProps} from '../DialogBody/DialogBody';
import type {DialogFooterProps} from '../DialogFooter/DialogFooter';
import type {DialogHeaderProps} from '../DialogHeader/DialogHeader';

import {
    bodyContentCases,
    bodyHasBorderCases,
    footerLoadingCases,
    footerPresetCases,
    footerShowErrorCases,
    footerTextButtonApplyCases,
    footerTextButtonCancelCases,
    headerCaptionCases,
    headerInsertAfterCases,
    headerInsertBeforeCases,
    sizeCases,
} from './cases';

interface AllDialogProps {
    size?: DialogProps['size'];

    headerCaption?: DialogHeaderProps['caption'];
    headerInsertBefore?: DialogHeaderProps['insertBefore'];
    headerInsertAfter?: DialogHeaderProps['insertAfter'];

    bodyHasBorder?: DialogBodyProps['hasBorders'];
    bodyContent?: DialogBodyProps['children'];

    footerShowError?: DialogFooterProps['showError'];
    footerPreset?: DialogFooterProps['preset'];
    footerLoading?: DialogFooterProps['loading'];
    footerTextButtonCancel?: DialogFooterProps['textButtonCancel'];
    footerTextButtonApply?: DialogFooterProps['textButtonApply'];
}

test.describe('Dialog', {tag: '@Dialog'}, () => {
    test('fills the mobile viewport regardless of desktop width constraints', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await page.setViewportSize({width: 600, height: 900});

        await mount(
            <MobileProvider mobile __experimentalMobileModals>
                <Dialog maxWidth="s" fullWidth onClose={() => {}} open>
                    <Dialog.Header caption="Mobile dialog" />
                    <Dialog.Body>Dialog content</Dialog.Body>
                    <Dialog.Footer textButtonApply="Apply" textButtonCancel="Cancel" />
                </Dialog>
            </MobileProvider>,
        );

        const overlay = page.locator('.g-modal');

        await expect(overlay).toHaveAttribute('data-floating-ui-status', 'open');

        const layout = await overlay.evaluate((overlayElement) => {
            const contentElement = overlayElement.querySelector<HTMLElement>('.g-modal__content');
            const dialogElement = overlayElement.querySelector<HTMLElement>('.g-dialog');

            if (!contentElement || !dialogElement) {
                throw new Error('Dialog layout elements are missing');
            }

            return {
                overlayClientWidth: overlayElement.clientWidth,
                overlayClientHeight: overlayElement.clientHeight,
                contentClientWidth: contentElement.clientWidth,
                contentClientHeight: contentElement.clientHeight,
                contentClipPath: getComputedStyle(contentElement).clipPath,
                dialogClientHeight: dialogElement.clientHeight,
            };
        });

        expect(layout.contentClientWidth).toBe(layout.overlayClientWidth);
        expect(layout.contentClientHeight).toBe(layout.overlayClientHeight);
        expect(layout.dialogClientHeight).toBe(layout.overlayClientHeight);
        expect(layout.contentClipPath).toBe('inset(0px)');

        await expectScreenshot({locator: page, themes: ['light']});
    });

    test('keeps full-width dialog inside the overlay on viewport resize', async ({mount, page}) => {
        await page.setViewportSize({width: 1000, height: 600});

        await mount(
            <Dialog contentOverflow="auto" fullWidth maxWidth="m" onClose={() => {}} open>
                <div style={{width: 600}}>Wide dialog content</div>
            </Dialog>,
        );

        const overlay = page.locator('.g-modal');
        const content = overlay.locator('.g-modal__content');

        await expect(overlay).toHaveAttribute('data-floating-ui-status', 'open');

        const wideMetrics = await getModalLayoutMetrics(overlay);

        expect(wideMetrics.contentMaxWidth).toBeGreaterThan(0);
        expect(wideMetrics.contentClientWidth).toBe(wideMetrics.contentMaxWidth);

        await page.setViewportSize({width: 400, height: 600});

        const narrowMetrics = await getModalLayoutMetrics(overlay);

        expect(narrowMetrics.alignerClientWidth).toBe(narrowMetrics.overlayClientWidth);
        expect(
            Math.abs(
                narrowMetrics.contentClientWidth +
                    narrowMetrics.contentMarginInlineStart +
                    narrowMetrics.contentMarginInlineEnd -
                    narrowMetrics.alignerClientWidth,
            ),
        ).toBeLessThanOrEqual(1);
        expect(
            narrowMetrics.overlayScrollWidth - narrowMetrics.overlayClientWidth,
        ).toBeLessThanOrEqual(1);

        const scrollOwner = await page
            .locator('.g-modal__content, .g-dialog')
            .evaluateAll((items) => {
                const element = items.find((item) => {
                    const style = getComputedStyle(item);
                    return (
                        item.scrollWidth > item.clientWidth &&
                        (style.overflowX === 'auto' || style.overflowX === 'scroll')
                    );
                });

                if (!element) {
                    return null;
                }

                element.scrollLeft = element.scrollWidth;

                return {
                    className: element.className,
                    scrollLeft: element.scrollLeft,
                };
            });

        expect(scrollOwner).not.toBeNull();
        expect(scrollOwner?.scrollLeft).toBeGreaterThan(0);

        await page.setViewportSize({width: 1000, height: 600});

        expect((await getModalLayoutMetrics(overlay)).contentClientWidth).toBe(
            wideMetrics.contentClientWidth,
        );
        await expect(content).toBeVisible();
    });

    createSmokeScenarios(
        {
            size: 's',

            headerCaption: 'Dialog.Header',

            bodyContent: 'Dialog.Body',

            footerTextButtonApply: 'apply',
            footerTextButtonCancel: 'cancel',
        } as AllDialogProps,
        {
            size: sizeCases,

            headerCaption: headerCaptionCases,
            headerInsertBefore: headerInsertBeforeCases,
            headerInsertAfter: headerInsertAfterCases,

            bodyHasBorder: bodyHasBorderCases,
            bodyContent: bodyContentCases,

            footerShowError: footerShowErrorCases,
            footerPreset: footerPresetCases,
            footerLoading: footerLoadingCases,
            footerTextButtonCancel: footerTextButtonCancelCases,
            footerTextButtonApply: footerTextButtonApplyCases,
        },
    ).forEach(([title, props]) => {
        test(`smoke ${title}`, {tag: ['@smoke']}, async ({page, mount, expectScreenshot}) => {
            await page.setViewportSize({width: 1000, height: 600});

            const {
                size,
                headerCaption,
                headerInsertBefore,
                headerInsertAfter,
                bodyHasBorder,
                bodyContent,
                footerLoading,
                footerPreset,
                footerShowError,
                footerTextButtonCancel,
                footerTextButtonApply,
            } = props;

            await mount(
                <Dialog size={size} onClose={() => {}} open onEnterKeyDown={() => {}}>
                    {(headerCaption || headerInsertBefore || headerInsertAfter) && (
                        <Dialog.Header
                            caption={headerCaption}
                            insertAfter={headerInsertAfter}
                            insertBefore={headerInsertBefore}
                        />
                    )}
                    <Dialog.Body hasBorders={bodyHasBorder}>{bodyContent}</Dialog.Body>
                    <Dialog.Footer
                        loading={footerLoading}
                        preset={footerPreset}
                        showError={footerShowError}
                        textButtonApply={footerTextButtonApply}
                        textButtonCancel={footerTextButtonCancel}
                        errorText="Error text"
                    />
                </Dialog>,
            );

            await expectScreenshot({
                locator: page,
                themes: ['light'],
            });
        });
    });
});
