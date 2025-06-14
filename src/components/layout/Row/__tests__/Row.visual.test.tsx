import {smokeTest, test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {RowStories} from './stories';

test.describe('Row', {tag: '@Row'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            smokeTest(
                `render story <Default> - ${breakpointName}`,
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<RowStories.Default />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            smokeTest(
                `render story <ZeroSpacings> - ${breakpointName}`,
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<RowStories.ZeroSpacings />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );
        },
    );
});
