import {test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {FlexStories} from './stories';

test.describe('Flex', {tag: '@Flex'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            test(
                `smoke render story <Default> - ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const props = {
                        alignItems: 'center',
                        justifyContent: 'center',
                    } as const;

                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<FlexStories.Default {...props} />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            test(
                `smoke render story <FlexGap> - ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const props = {
                        gap: {s: '1', m: '6'},
                    } as const;

                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<FlexStories.FlexGap {...props} />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            test(
                `smoke render story <GapAndRowGap> - ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const props = {
                        gap: {s: '1', m: '6'},
                        gapRow: {s: '6', m: '1'},
                    } as const;

                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<FlexStories.GapAndRowGap {...props} />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            test(
                `smoke render story <ChildrenWithBgColor>- ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<FlexStories.ChildrenWithBgColor />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            test(
                `smoke render story <WithNullChildren>- ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<FlexStories.WithNullChildren />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );
        },
    );
});
