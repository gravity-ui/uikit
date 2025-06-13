import {smokeTest, test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {ColStories} from './stories';

test.describe('Col', {tag: '@Col'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            smokeTest(
                `render story <Static> - ${breakpointName}`,
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<ColStories.Static space={3} />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            smokeTest(
                `render story <Dynamic> - ${breakpointName}`,
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<ColStories.Dynamic space={2} />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            smokeTest(
                `render story <AllMods> - ${breakpointName}`,
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    const props = {
                        xxl: '1',
                        xl: '2',
                        l: '4',
                        m: '6',
                        s: '12',
                        space: 3,
                    } as const;

                    await mount(
                        <div>
                            <ColStories.AllMods {...props} />
                        </div>,
                        {width: 'auto'},
                    );

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );
        },
    );
});
