import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import type {DisclosureProps} from '../Disclosure';
import {Disclosure} from '../Disclosure';

import {arrowPositionCases, disabledCases, sizeCases} from './cases';
import {DisclosureAnimationTest} from './helpersPlaywright';

test.describe('Disclosure', {tag: '@Disclosure'}, () => {
    test('height transition adapts to content and unmounts', async ({mount, page}) => {
        await page.emulateMedia({reducedMotion: 'no-preference'});
        await mount(<DisclosureAnimationTest />);

        const host = page.locator('[data-qa="animation-test"]');
        await host.evaluate((element) => {
            element.setAttribute('data-transition-count', '0');
            element.addEventListener('transitionend', (event) => {
                if (
                    (event.target as HTMLElement).getAttribute('role') === 'region' &&
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
        await expect.poll(() => host.getAttribute('data-transition-count')).toBe('1');
        await expect(details).toHaveCSS('overflow', 'visible');
        await expect.poll(() => details.evaluate((element) => element.style.height)).toBe('');

        const initialHeight = await details.evaluate(
            (element) => element.getBoundingClientRect().height,
        );
        await host.getByRole('button', {name: 'Resize'}).click();

        await expect
            .poll(() => details.evaluate((element) => element.getBoundingClientRect().height))
            .toBeGreaterThan(initialHeight);
        await expect.poll(() => details.evaluate((element) => element.style.height)).toBe('');

        await summary.click();

        await expect.poll(() => host.getAttribute('data-transition-count')).toBe('2');
        await expect(details).toHaveCount(0);
    });

    test('reduced motion unmounts without a transition event', async ({mount, page}) => {
        await page.emulateMedia({reducedMotion: 'reduce'});
        await mount(<DisclosureAnimationTest />);

        const host = page.locator('[data-qa="animation-test"]');
        await host.evaluate((element) => {
            element.setAttribute('data-transition-count', '0');
            element.addEventListener('transitionend', () => {
                element.setAttribute(
                    'data-transition-count',
                    String(Number(element.getAttribute('data-transition-count')) + 1),
                );
            });
        });
        const summary = host.getByRole('button', {name: 'Toggle'});

        await summary.click();
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
