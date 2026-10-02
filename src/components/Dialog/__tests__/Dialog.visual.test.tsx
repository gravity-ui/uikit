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
    size?: DialogProps['maxWidth'];

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
    [
        {name: 'without header', header: false, footer: true, close: false, empty: false},
        {name: 'without footer', header: true, footer: false, close: true, empty: false},
        {name: 'without close button', header: true, footer: true, close: false, empty: false},
        {name: 'with empty body', header: true, footer: true, close: true, empty: true},
    ].forEach(({name, header, footer, close, empty}) => {
        test(`layout ${name}`, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 1000, height: 600});
            await mount(
                <Dialog hasCloseButton={close} open>
                    {header && <Dialog.Header caption="Dialog title" />}
                    <Dialog.Body>{empty ? null : 'Dialog content'}</Dialog.Body>
                    {footer && <Dialog.Footer textButtonApply="Apply" />}
                </Dialog>,
            );

            const dialog = page.locator('.g-dialog');
            if (!header) {
                await expect(dialog).toHaveCSS('padding-block-start', '20px');
            }
            if (!footer) {
                await expect(dialog).toHaveCSS('padding-block-end', '24px');
            }
            await expectScreenshot({locator: page, themes: ['light']});
        });
    });

    test('keeps missing-section padding inside the mobile viewport', async ({mount, page}) => {
        await page.setViewportSize({width: 600, height: 900});
        await mount(
            <MobileProvider mobile __experimentalMobileModals>
                <Dialog hasCloseButton={false} open>
                    <Dialog.Body>Dialog content</Dialog.Body>
                </Dialog>
            </MobileProvider>,
        );

        const dialog = page.locator('.g-dialog');
        await expect(dialog).toHaveCSS('padding-block-start', '20px');
        await expect(dialog).toHaveCSS('padding-block-end', '24px');
        expect(await dialog.evaluate((element) => element.getBoundingClientRect().height)).toBe(
            900,
        );
    });

    test('lets className override missing-section padding', async ({mount, page}) => {
        await mount(
            <Dialog className="custom-dialog-padding" hasCloseButton={false} open>
                <Dialog.Body>Dialog content</Dialog.Body>
            </Dialog>,
        );
        await page.addStyleTag({content: '.custom-dialog-padding {padding-block: 7px 9px}'});

        const dialog = page.locator('.g-dialog');
        await expect(dialog).toHaveCSS('padding-block-start', '7px');
        await expect(dialog).toHaveCSS('padding-block-end', '9px');
    });

    test('keeps a multiline header visible while the body scrolls', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await page.setViewportSize({width: 1000, height: 600});
        await page.addStyleTag({content: '* { box-sizing: border-box }'});
        await mount(
            <Dialog maxWidth="s" fullWidth contentOverflow="auto" open>
                <Dialog.Header caption="A long dialog caption that wraps across multiple lines when the body is taller than the available viewport" />
                <Dialog.Body>
                    <div style={{height: 900}}>Scrollable content</div>
                </Dialog.Body>
            </Dialog>,
        );

        const header = page.locator('.g-dialog-header');
        const body = page.locator('.g-dialog-body');
        await expect(header).toHaveCSS('box-sizing', 'content-box');
        await expect(body).toHaveCSS('box-sizing', 'content-box');
        const sizes = await header.evaluate((element) => ({
            header: element.getBoundingClientRect().height,
            caption: element.querySelector('.g-dialog-header__caption')?.getBoundingClientRect()
                .height,
        }));
        expect(sizes.caption).toBeDefined();
        expect(sizes.header).toBeGreaterThanOrEqual((sizes.caption ?? 0) + 20);
        await expectScreenshot({locator: page, themes: ['light']});
    });

    test('fills the mobile viewport regardless of desktop width constraints', async ({
        mount,
        page,
        expectScreenshot,
    }) => {
        await page.setViewportSize({width: 600, height: 900});

        await mount(
            <MobileProvider mobile __experimentalMobileModals>
                <Dialog maxWidth="s" fullWidth open>
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

        const alignment = await page.locator('.g-dialog').evaluate((dialog) => {
            const caption = dialog.querySelector('.g-dialog-header__caption');
            const closeButton = dialog.querySelector('.g-dialog-btn-close');
            if (!caption || !closeButton) {
                throw new Error('Mobile dialog header or close button is missing');
            }
            const captionRect = caption.getBoundingClientRect();
            const buttonRect = closeButton.getBoundingClientRect();
            return {
                captionCenter: captionRect.top + captionRect.height / 2,
                buttonCenter: buttonRect.top + buttonRect.height / 2,
            };
        });
        expect(Math.abs(alignment.captionCenter - alignment.buttonCenter)).toBeLessThanOrEqual(1);

        await expectScreenshot({locator: page, themes: ['light']});
    });

    test('keeps full-width dialog inside the overlay on viewport resize', async ({mount, page}) => {
        await page.setViewportSize({width: 1000, height: 600});

        await mount(
            <Dialog contentOverflow="auto" fullWidth maxWidth="m" open>
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
                <Dialog maxWidth={size} fullWidth open>
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

            if (bodyHasBorder) {
                await expect(page.locator('.g-dialog-body')).toHaveCSS(
                    'padding-block-start',
                    '4px',
                );
            }
        });
    });
});
