import {expect, test} from '~playwright/core';

import {ScrollShadow} from '../ScrollShadow';

import {
    DynamicContent,
    DynamicDirection,
    ExistingScroller,
    OpaqueContent,
} from './helpersPlaywright';

test.describe('ScrollShadow', {tag: '@ScrollShadow'}, () => {
    test('block fade at mount, middle, and end with opaque content', async ({
        mount,
        expectScreenshot,
    }) => {
        const root = await mount(
            <div style={{padding: 24, background: 'var(--g-color-base-generic)'}}>
                <ScrollShadow
                    qa="shadow"
                    style={{width: 220, height: 160}}
                    role="region"
                    aria-label="Items"
                >
                    <OpaqueContent />
                </ScrollShadow>
            </div>,
        );
        const scroller = root.locator('[data-qa="shadow"]');

        await expect(scroller).toHaveClass(/g-scroll-shadow_bottom/);
        await expect(scroller).toHaveAttribute('tabindex', '0');
        await expectScreenshot();
        await scroller.evaluate((element) => {
            const node = element as HTMLDivElement;
            node.scrollTop = (node.scrollHeight - node.clientHeight) / 2;
            node.dispatchEvent(new Event('scroll', {bubbles: true}));
        });
        await expect(scroller).toHaveClass(/g-scroll-shadow_top/);
        await expectScreenshot();
        await scroller.evaluate((element) => {
            const node = element as HTMLDivElement;
            node.scrollTop = node.scrollHeight;
            node.dispatchEvent(new Event('scroll', {bubbles: true}));
        });
        await expect(scroller).not.toHaveClass(/g-scroll-shadow_bottom/);
        await expectScreenshot();
    });

    test('no overflow and disabled state have no fade', async ({mount, expectScreenshot}) => {
        const root = await mount(
            <div style={{display: 'flex', gap: 16}}>
                <ScrollShadow qa="no-overflow" style={{width: 220, height: 160}}>
                    Short content
                </ScrollShadow>
                <ScrollShadow disabled style={{width: 220, height: 160}}>
                    <OpaqueContent />
                </ScrollShadow>
            </div>,
        );

        await expect(root.locator('[data-qa="no-overflow"]')).not.toHaveAttribute('tabindex');
        await expectScreenshot();
    });

    test('inline fade follows RTL scroll position', async ({mount, expectScreenshot}) => {
        const root = await mount(
            <ScrollShadow qa="shadow" axis="inline" dir="rtl" style={{width: 220, height: 100}}>
                <div style={{width: 600, height: 80, background: 'var(--g-color-base-generic)'}} />
            </ScrollShadow>,
        );
        const scroller = root.locator('[data-qa="shadow"]');

        await expectScreenshot();
        await scroller.evaluate((element) => {
            const node = element as HTMLDivElement;
            node.scrollLeft = -150;
            node.dispatchEvent(new Event('scroll', {bubbles: true}));
        });
        await expectScreenshot();
        await scroller.evaluate((element) => {
            const node = element as HTMLDivElement;
            node.scrollLeft = -node.scrollWidth;
            node.dispatchEvent(new Event('scroll', {bubbles: true}));
        });
        await expectScreenshot();
    });

    test('both axes, position, and custom size', async ({mount, expectScreenshot}) => {
        const root = await mount(
            <div style={{display: 'flex', gap: 16}}>
                <ScrollShadow
                    qa="shadow"
                    axis="both"
                    style={{width: 220, height: 160, '--g-scroll-shadow-size': '40px'}}
                >
                    <div
                        style={{width: 480, height: 360, background: 'var(--g-color-base-generic)'}}
                    />
                </ScrollShadow>
                <ScrollShadow position="start" style={{width: 180, height: 160}}>
                    <OpaqueContent />
                </ScrollShadow>
                <ScrollShadow position="end" style={{width: 180, height: 160}}>
                    <OpaqueContent />
                </ScrollShadow>
            </div>,
        );
        await root.locator('[data-qa="shadow"]').evaluate((element) => {
            const node = element as HTMLDivElement;
            node.scrollLeft = 100;
            node.scrollTop = 100;
            node.dispatchEvent(new Event('scroll', {bubbles: true}));
        });

        await expectScreenshot();
    });

    for (const writingMode of ['vertical-rl', 'vertical-lr', 'sideways-lr'] as const) {
        test(`maps ${writingMode} on both axes`, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <ScrollShadow
                    qa="shadow"
                    axis="both"
                    style={{width: 220, height: 160, writingMode}}
                >
                    <div
                        style={{width: 480, height: 360, background: 'var(--g-color-base-generic)'}}
                    />
                </ScrollShadow>,
            );
            await root.locator('[data-qa="shadow"]').evaluate((element) => {
                const node = element as HTMLDivElement;
                node.scrollLeft = node.scrollWidth / 3;
                node.scrollTop = node.scrollHeight / 3;
                node.dispatchEvent(new Event('scroll', {bubbles: true}));
            });

            await expectScreenshot();
        });
    }

    test('fade follows content and viewport changes', async ({mount, expectScreenshot}) => {
        const root = await mount(<DynamicContent />);
        await expectScreenshot();
        await root.locator('button').click();
        await expectScreenshot();
        await root.locator('button').click();
        await expectScreenshot();
    });

    test('hook attaches to an existing scroll element', async ({mount, expectScreenshot}) => {
        await mount(<ExistingScroller />);
        await expectScreenshot();
    });

    test('ancestor direction can change without remounting the scroller', async ({
        mount,
        expectScreenshot,
    }) => {
        const root = await mount(<DynamicDirection />);
        await expectScreenshot();
        await root.locator('button').click();
        await expectScreenshot();
    });
});
