import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {MobileProvider} from '../../mobile';
import {Modal} from '../Modal';

import {ModalQa} from './constants';
import {getModalLayoutMetrics} from './helpers';

test.describe('Modal', {tag: '@Modal'}, () => {
    test('smoke', {tag: ['@smoke']}, async ({mount, page, expectScreenshot}) => {
        await page.setViewportSize({width: 500, height: 500});

        await mount(
            <div>
                <div>page content</div>
                <Modal open qa={ModalQa.content}>
                    <div style={{padding: 10}}>Modal content</div>
                </Modal>
            </div>,
        );

        await expect(page.getByTestId(ModalQa.content)).toBeVisible();

        await expectScreenshot({
            locator: page,
        });
    });

    test('constrains horizontally overflowing content to the overlay', async ({mount, page}) => {
        const modalMargin = 24;

        await page.setViewportSize({width: 400, height: 500});

        await mount(
            <Modal
                open
                contentOverflow="auto"
                qa={ModalQa.content}
                style={{'--g-modal-margin': `${modalMargin}px`} as React.CSSProperties}
            >
                <div style={{width: 600}}>Wide modal content</div>
            </Modal>,
        );

        const overlay = page.getByTestId(ModalQa.content);
        const aligner = overlay.locator('.g-modal__content-aligner');
        const content = overlay.locator('.g-modal__content');

        await expect(overlay).toHaveAttribute('data-floating-ui-status', 'open');
        await expect(aligner).toHaveClass(/g-modal__content-aligner_has-scroll/);

        const metrics = await getModalLayoutMetrics(overlay);

        expect(metrics.alignerClientWidth).toBe(metrics.overlayClientWidth);
        expect(metrics.contentMarginInlineStart).toBe(modalMargin);
        expect(metrics.contentMarginInlineEnd).toBe(modalMargin);
        expect(
            Math.abs(
                metrics.contentClientWidth +
                    metrics.contentMarginInlineStart +
                    metrics.contentMarginInlineEnd -
                    metrics.alignerClientWidth,
            ),
        ).toBeLessThanOrEqual(1);
        expect(metrics.contentScrollWidth).toBeGreaterThan(metrics.contentClientWidth);
        expect(metrics.overlayScrollWidth - metrics.overlayClientWidth).toBeLessThanOrEqual(1);

        const scrollLeft = await content.evaluate((element) => {
            const scrollElement = element;
            scrollElement.scrollLeft = scrollElement.scrollWidth;
            return scrollElement.scrollLeft;
        });

        expect(scrollLeft).toBeGreaterThan(0);
    });

    test('preserves intrinsic width when content overflow is visible', async ({mount, page}) => {
        await page.setViewportSize({width: 400, height: 500});

        await mount(
            <Modal open contentOverflow="visible" qa={ModalQa.content}>
                <div style={{width: 600}}>Wide modal content</div>
            </Modal>,
        );

        const overlay = page.getByTestId(ModalQa.content);
        const aligner = overlay.locator('.g-modal__content-aligner');

        await expect(overlay).toHaveAttribute('data-floating-ui-status', 'open');
        await expect(aligner).not.toHaveClass(/g-modal__content-aligner_has-scroll/);

        const metrics = await getModalLayoutMetrics(overlay);

        expect(metrics.alignerClientWidth).toBeGreaterThan(metrics.overlayClientWidth);
    });

    test('constrains mobile modal content to the overlay', async ({mount, page}) => {
        await page.setViewportSize({width: 390, height: 844});

        await mount(
            <MobileProvider mobile __experimentalMobileModals>
                <Modal open qa={ModalQa.content}>
                    Mobile modal content
                </Modal>
            </MobileProvider>,
        );

        const overlay = page.getByTestId(ModalQa.content);
        const aligner = overlay.locator('.g-modal__content-aligner');

        await expect(overlay).toHaveAttribute('data-floating-ui-status', 'open');
        await expect(aligner).toHaveClass(/g-modal__content-aligner_has-scroll/);

        const metrics = await getModalLayoutMetrics(overlay);

        expect(metrics.alignerClientWidth).toBe(metrics.overlayClientWidth);
        expect(metrics.contentClientWidth).toBe(metrics.overlayClientWidth);
    });
});
