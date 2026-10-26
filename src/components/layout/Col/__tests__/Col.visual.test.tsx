import {test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {ColStories} from './stories';

test.describe('Col', {tag: '@Col'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            test(
                `smoke render story <Static> - ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<ColStories.Static gap="spacing-3" />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            test(
                `smoke render story <Dynamic> - ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<ColStories.Dynamic gap="spacing-2" />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            test(
                `smoke render story <AllMods> - ${breakpointName}`,
                {tag: ['@smoke']},
                async ({mount, expectScreenshot, page}) => {
                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    const props = {
                        '2xl': '1',
                        xl: '2',
                        l: '4',
                        m: '6',
                        s: '12',
                        gap: 'spacing-3',
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
