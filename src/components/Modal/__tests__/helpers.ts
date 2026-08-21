import type {Locator} from '@playwright/test';

export function getModalLayoutMetrics(overlay: Locator) {
    return overlay.evaluate((overlayElement) => {
        const alignerElement = overlayElement.querySelector<HTMLElement>(
            '.g-modal__content-aligner',
        );
        const contentElement = overlayElement.querySelector<HTMLElement>('.g-modal__content');

        if (!alignerElement || !contentElement) {
            throw new Error('Modal layout elements are missing');
        }

        const contentStyle = getComputedStyle(contentElement);
        const parsedMaxWidth = Number.parseFloat(contentStyle.maxWidth);

        return {
            overlayClientWidth: overlayElement.clientWidth,
            overlayScrollWidth: overlayElement.scrollWidth,
            alignerClientWidth: alignerElement.clientWidth,
            contentClientWidth: contentElement.clientWidth,
            contentScrollWidth: contentElement.scrollWidth,
            contentMarginInlineStart: Number.parseFloat(contentStyle.marginInlineStart),
            contentMarginInlineEnd: Number.parseFloat(contentStyle.marginInlineEnd),
            contentMaxWidth: Number.isNaN(parsedMaxWidth) ? null : parsedMaxWidth,
        };
    });
}
