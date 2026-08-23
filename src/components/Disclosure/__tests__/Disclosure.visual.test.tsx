import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import type {DisclosureProps} from '../Disclosure';
import {Disclosure} from '../Disclosure';

import {arrowPositionCases, disabledCases, sizeCases} from './cases';
import {DisclosureAnimationTest} from './helpersPlaywright';

test.describe('Disclosure', {tag: '@Disclosure'}, () => {
    test('height transition completes and unmounts', async ({mount, page}) => {
        await page.emulateMedia({reducedMotion: 'no-preference'});
        await mount(<DisclosureAnimationTest />);

        const host = page.locator('[data-qa="animation-test"]');
        await host.evaluate((element) => {
            element.setAttribute('data-transition-count', '0');
            element.addEventListener('transitionend', (event) => {
                if (
                    (event.target as HTMLElement).classList.contains(
                        'g-disclosure__content-container',
                    ) &&
                    (event as TransitionEvent).propertyName === 'height'
                ) {
                    element.setAttribute(
                        'data-transition-count',
                        String(Number(element.getAttribute('data-transition-count')) + 1),
                    );
                }
            });
        });
        const summary = host.getByRole('button', {name: 'Toggle'});
        await summary.click();

        const details = host.getByRole('region');
        const container = host.locator('.g-disclosure__content-container');
        await expect.poll(() => host.getAttribute('data-transition-count')).toBe('1');
        await expect.poll(() => container.evaluate((element) => element.style.height)).toBe('');
        await expect(container).toHaveCSS('overflow', 'visible');

        await summary.click();

        await expect.poll(() => host.getAttribute('data-transition-count')).toBe('2');
        await expect(details).toHaveCount(0);
    });

    test('height transition adapts when content grows while entering', async ({mount, page}) => {
        await page.emulateMedia({reducedMotion: 'no-preference'});
        await page.addStyleTag({
            content: `
                .g-disclosure__content-container {
                    transition-duration: 1s !important;
                }
            `,
        });
        await mount(<DisclosureAnimationTest />);

        const host = page.locator('[data-qa="animation-test"]');
        const container = host.locator('.g-disclosure__content-container');
        const content = host.locator('[data-qa="animation-content"]');

        await host.getByRole('button', {name: 'Toggle'}).click();
        const initialTargetHeight = await container.evaluate((element) =>
            Number.parseFloat(element.style.height),
        );

        await content.evaluate((element) => {
            const contentElement = element;
            contentElement.style.height = '120px';
        });
        const resizedHeight = await host
            .locator('.g-disclosure__content-wrapper')
            .evaluate((element) => (element as HTMLElement).offsetHeight);

        expect(resizedHeight).toBeGreaterThan(initialTargetHeight);

        await container.evaluate((element) => {
            element.getAnimations().forEach((animation) => animation.finish());
        });

        await expect
            .poll(() => container.evaluate((element) => Number.parseFloat(element.style.height)))
            .toBe(resizedHeight);
        await expect
            .poll(() =>
                container.evaluate((element) =>
                    element
                        .getAnimations()
                        .some(
                            (animation) =>
                                animation.playState !== 'finished' &&
                                animation.playState !== 'idle' &&
                                'transitionProperty' in animation &&
                                animation.transitionProperty === 'height',
                        ),
                ),
            )
            .toBe(true);

        await container.evaluate((element) => {
            element.getAnimations().forEach((animation) => {
                if (animation.playState !== 'idle' && animation.playState !== 'finished') {
                    animation.finish();
                }
            });
        });
        await expect.poll(() => container.evaluate((element) => element.style.height)).toBe('');
    });

    test('collapses the complete public details box when kept mounted', async ({mount, page}) => {
        await page.emulateMedia({reducedMotion: 'no-preference'});
        await page.addStyleTag({
            content: `
                .disclosure-details-box-test {
                    margin-block: 7px 11px;
                    border-block: 2px solid transparent;
                    padding-block: 5px 13px;
                }

                .g-disclosure__content-container {
                    transition-duration: 1s !important;
                }
            `,
        });
        await mount(
            <div data-qa="box-model-test">
                <Disclosure summary="Toggle" keepMounted={true}>
                    <Disclosure.Details qa="styled-details" className="disclosure-details-box-test">
                        <div style={{height: 24}}>Content</div>
                    </Disclosure.Details>
                </Disclosure>
            </div>,
        );

        const host = page.locator('[data-qa="box-model-test"]');
        const summary = host.getByRole('button', {name: 'Toggle'});
        const details = host.locator('[data-qa="styled-details"]');
        const container = host.locator('.g-disclosure__content-container');
        const fullDetailsHeight = await details.evaluate((element) => {
            const detailsElement = element as HTMLElement;
            const style = window.getComputedStyle(detailsElement);

            return (
                detailsElement.offsetHeight +
                Number.parseFloat(style.marginTop) +
                Number.parseFloat(style.marginBottom)
            );
        });

        await expect
            .poll(() => container.evaluate((element) => element.getBoundingClientRect().height))
            .toBe(0);

        await summary.click();

        await expect
            .poll(() =>
                container.evaluate((element) => Number.parseFloat(element.style.height) || 0),
            )
            .toBe(fullDetailsHeight);

        await container.evaluate((element) => {
            element.getAnimations().forEach((animation) => {
                if (animation.playState !== 'idle' && animation.playState !== 'finished') {
                    animation.finish();
                }
            });
        });
        await expect.poll(() => container.evaluate((element) => element.style.height)).toBe('');

        await summary.click();

        await expect.poll(() => container.evaluate((element) => element.style.height)).toBe('0px');
        await container.evaluate((element) => {
            element.getAnimations().forEach((animation) => {
                if (animation.playState !== 'idle' && animation.playState !== 'finished') {
                    animation.finish();
                }
            });
        });
        await expect
            .poll(() => container.evaluate((element) => element.getBoundingClientRect().height))
            .toBe(0);
        await expect(details).toHaveAttribute('aria-hidden', 'true');
        await expect(details).toHaveAttribute('inert');
    });

    test('reduced motion unmounts without a transition event', async ({mount, page}) => {
        await page.emulateMedia({reducedMotion: 'reduce'});
        await mount(<DisclosureAnimationTest />);

        const host = page.locator('[data-qa="animation-test"]');
        await host.evaluate((element) => {
            element.setAttribute('data-transition-count', '0');
            element.addEventListener('transitionend', (event) => {
                if (
                    (event.target as HTMLElement).classList.contains(
                        'g-disclosure__content-container',
                    )
                ) {
                    element.setAttribute(
                        'data-transition-count',
                        String(Number(element.getAttribute('data-transition-count')) + 1),
                    );
                }
            });
        });
        const summary = host.getByRole('button', {name: 'Toggle'});

        await summary.click();
        await expect(host.getByRole('region')).toBeVisible();

        await summary.click();
        await expect(host.getByRole('region')).toHaveCount(0);
        await expect(host).toHaveAttribute('data-transition-count', '0');
    });

    test('disabled CSS transitions unmount without a transition event', async ({mount, page}) => {
        await page.emulateMedia({reducedMotion: 'no-preference'});
        await page.addStyleTag({
            content: `
                .g-disclosure__content-container {
                    transition: none !important;
                }
            `,
        });
        await mount(<DisclosureAnimationTest />);

        const host = page.locator('[data-qa="animation-test"]');
        await host.evaluate((element) => {
            element.setAttribute('data-transition-count', '0');
            element.addEventListener('transitionend', (event) => {
                if (
                    (event.target as HTMLElement).classList.contains(
                        'g-disclosure__content-container',
                    )
                ) {
                    element.setAttribute(
                        'data-transition-count',
                        String(Number(element.getAttribute('data-transition-count')) + 1),
                    );
                }
            });
        });
        const summary = host.getByRole('button', {name: 'Toggle'});
        const container = host.locator('.g-disclosure__content-container');

        await summary.click();
        await expect.poll(() => container.evaluate((element) => element.style.height)).toBe('');
        await expect(host.getByRole('region')).toBeVisible();

        await summary.click();
        await expect(host.getByRole('region')).toHaveCount(0);
        await expect(host).toHaveAttribute('data-transition-count', '0');
    });

    test('smoke smoke, collapsed', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: DisclosureProps = {
            summary: <div>Summary</div>,
            children: <div>Content</div>,
            expanded: false,
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            disabled: disabledCases,
            arrowPosition: arrowPositionCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Disclosure {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    test('smoke smoke, expanded', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const defaultProps: DisclosureProps = {
            summary: <div>Summary</div>,
            children: <div>Content</div>,
            expanded: true,
        };

        const smokeScenarios = createSmokeScenarios(defaultProps, {
            size: sizeCases,
            disabled: disabledCases,
            arrowPosition: arrowPositionCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Disclosure {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
