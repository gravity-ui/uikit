import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {expect, test} from '~playwright/core';

import type {EllipsisTextProps} from '../EllipsisText';
import {EllipsisText} from '../EllipsisText';

import {offsetEndCases, offsetStartCases, positionCases, separatorCases} from './cases';
import {TestEllipsisText} from './helpers';
import {EllipsisTextStories} from './stories';

test.describe('EllipsisText', {tag: '@EllipsisText'}, () => {
    test.describe('behavior', () => {
        // Clipboard contents are shared across browser contexts.
        test.describe.configure({mode: 'serial'});

        test('recalculates center truncation after width and text changes', async ({
            mount,
            page,
        }) => {
            const text = 'a-very-long-file-name-with-many-parts-and-an-extension.txt';
            const component = await mount(
                <div style={{width: 240, display: 'grid'}}>
                    <EllipsisText position="center">{text}</EllipsisText>
                </div>,
            );
            await page.evaluate(() => document.fonts.ready);
            const content = component.locator('.g-ellipsis-text__ellipsis-content');
            await expect(content).toContainText('…');
            const wideText = await content.innerText();

            await component.update(
                <div style={{width: 100, display: 'grid'}}>
                    <EllipsisText position="center">{text}</EllipsisText>
                </div>,
            );
            await expect
                .poll(async () => (await content.innerText()).length)
                .toBeLessThan(wideText.length);

            await component.update(
                <div style={{width: 240, display: 'grid'}}>
                    <EllipsisText position="center">{text}</EllipsisText>
                </div>,
            );
            await expect(content).toHaveText(wideText);

            await component.update(
                <div style={{width: 100, display: 'grid'}}>
                    <EllipsisText position="center">short</EllipsisText>
                </div>,
            );
            await expect(content).toHaveText('short');

            await component.update(
                <div style={{width: 100, display: 'grid'}}>
                    <EllipsisText position="center">
                        new-name-with-a-different-length.json
                    </EllipsisText>
                </div>,
            );
            await expect(content).toHaveText(/^new.*….*json$/);
            await expect
                .poll(() =>
                    content.evaluate((element) => {
                        const range = document.createRange();
                        range.selectNodeContents(element);
                        return range.getBoundingClientRect().width;
                    }),
                )
                .toBeLessThanOrEqual(101);
        });

        test('start truncation follows nested direction overrides', async ({mount}) => {
            const component = await mount(
                <div dir="rtl">
                    <div dir="ltr" style={{width: 100, display: 'grid'}}>
                        <EllipsisText position="start">a-very-long-file-name.txt</EllipsisText>
                    </div>
                </div>,
            );
            const content = component.locator('.g-ellipsis-text__ellipsis-content');
            await expect(content).toHaveCSS('direction', 'rtl');
            await expect(content).toHaveCSS('text-overflow', 'ellipsis');

            await component.update(
                <div dir="ltr">
                    <div dir="rtl" style={{width: 100, display: 'grid'}}>
                        <EllipsisText position="start">a-very-long-file-name.txt</EllipsisText>
                    </div>
                </div>,
            );
            await expect(content).toHaveCSS('direction', 'ltr');
        });

        for (const position of ['start', 'center', 'end'] as const) {
            test(`copies full and partial text with position ${position}`, async ({
                mount,
                page,
                context,
            }) => {
                await context.grantPermissions(['clipboard-read', 'clipboard-write']);
                const text = 'prefix-a-very-long-file-name-that-will-be-truncated.txt';
                const component = await mount(
                    <div style={{width: 180, display: 'grid'}}>
                        <EllipsisText position={position} offsetStart={4} offsetEnd={4}>
                            {text}
                        </EllipsisText>
                    </div>,
                );
                if (position === 'center') {
                    await expect(
                        component.locator('.g-ellipsis-text__ellipsis-content'),
                    ).toContainText('…');
                }

                await component.locator('.g-ellipsis-text').evaluate((element) => {
                    const range = document.createRange();
                    range.selectNodeContents(element);
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const selection = window.getSelection()!;
                    selection.removeAllRanges();
                    selection.addRange(range);
                });
                await page.keyboard.press('ControlOrMeta+c');
                await expect
                    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
                    .toBe(text);

                const partialText = await component
                    .locator('.g-ellipsis-text__ellipsis-content')
                    .evaluate((element) => {
                        const range = document.createRange();
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const node = document
                            .createTreeWalker(element, NodeFilter.SHOW_TEXT)
                            .nextNode()!;
                        range.setStart(node, 0);
                        range.setEnd(node, 2);
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const selection = window.getSelection()!;
                        selection.removeAllRanges();
                        selection.addRange(range);
                        return selection.toString();
                    });
                await page.keyboard.press('ControlOrMeta+c');
                await expect
                    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
                    .toBe(partialText);
            });
        }
    });

    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        const component = await mount(<EllipsisTextStories.Default />);
        await expectScreenshot({locator: component});
    });

    test('render story: <Positions>', async ({mount, expectScreenshot}) => {
        const component = await mount(<EllipsisTextStories.Positions />);
        await expectScreenshot({locator: component});
    });

    test('render story: <WithSeparator>', async ({mount, expectScreenshot}) => {
        const component = await mount(<EllipsisTextStories.WithSeparator />);
        await expectScreenshot({locator: component});
    });

    test('smoke', {tag: ['@smoke']}, async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<Partial<EllipsisTextProps>>(
            {},
            {
                position: positionCases,
                offsetStart: offsetStartCases,
                offsetEnd: offsetEndCases,
                separator: separatorCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestEllipsisText {...props} />
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
