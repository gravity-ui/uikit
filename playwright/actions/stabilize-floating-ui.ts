import type {Page} from '@playwright/test';

const STABILIZER_ID = '__floating-stabilizer';
const FLOATING_SELECTOR = '[data-floating-ui-status]';

/**
 * Converts floating-ui's GPU-composited transform positioning to CPU-rendered top/left.
 *
 * At DPR >= 1.5, floating-ui sets `transform: translate()` + `willChange: 'transform'`,
 * promoting the element to a GPU compositor layer. GPU-rasterized text anti-aliasing
 * is non-deterministic across screenshots, causing Playwright's stability loop
 * (which requires two consecutive identical screenshots) to never converge.
 *
 * The previous stabilization style tag is removed first so `getComputedStyle` reads
 * the real floating-ui transform (needed when a test takes multiple screenshots).
 * CSS custom properties on elements survive React re-renders; the `<style>` tag with
 * `!important` overrides inline styles even if `autoUpdate` triggers during the pause.
 */
export async function stabilizeFloatingUi(page: Page) {
    await page.evaluate(
        ({stabilizerId, floatingSelector}) => {
            document.getElementById(stabilizerId)?.remove();

            document.querySelectorAll<HTMLElement>(floatingSelector).forEach((el) => {
                const matrix = new DOMMatrix(getComputedStyle(el).transform);
                el.style.setProperty('--_floating-left', `${matrix.m41}px`);
                el.style.setProperty('--_floating-top', `${matrix.m42}px`);
            });

            const style = document.createElement('style');
            style.id = stabilizerId;
            style.textContent = `${floatingSelector} {
                transform: none !important;
                will-change: auto !important;
                top: var(--_floating-top, 0px) !important;
                left: var(--_floating-left, 0px) !important;
            }`;
            document.head.appendChild(style);
        },
        {stabilizerId: STABILIZER_ID, floatingSelector: FLOATING_SELECTOR},
    );
}
