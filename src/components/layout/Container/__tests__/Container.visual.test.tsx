import {smokeTest, test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {ContainerStories} from './stories';

test.describe('Container', {tag: '@Container'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            smokeTest(
                `render story <Default> - ${breakpointName}`,
                async ({mount, expectScreenshot, page}) => {
                    const props = {
                        spaceRow: {m: '1'},
                        maxWidth: 'l',
                    } as const;

                    const size = page.viewportSize();
                    if (size) {
                        await page.setViewportSize({
                            width: Math.max(breakpointWidthPx, 320) + RESERVE_SPACING_PX,
                            height: size.height,
                        });
                    }

                    await mount(<ContainerStories.Default {...props} />, {width: 'auto'});

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );
        },
    );
});
