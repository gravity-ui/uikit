import {smokeTest, test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {FlexStories} from './stories';

test.describe('Flex', {tag: '@Flex'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            smokeTest(
                `render story <Default> - ${breakpointName}`,
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

            smokeTest(
                `render story <FlexGap> - ${breakpointName}`,
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

            smokeTest(
                `render story <GapAndRowGap> - ${breakpointName}`,
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

            smokeTest(
                `render story <ChildrenWithBgColor>- ${breakpointName}`,
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

            smokeTest(
                `render story <WithNullChildren>- ${breakpointName}`,
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
