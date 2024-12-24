import React from 'react';

import {smokeTest, test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {RowStories} from './stories';

test.describe('Row', {tag: '@Row'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            smokeTest(
                `render story <Default> - ${breakpointName}`,
                async ({page, mount, expectScreenshot}) => {
                    const viewport = page.viewportSize();
                    if (viewport) {
                        await page.setViewportSize({
                            width: breakpointWidthPx + RESERVE_SPACING_PX,
                            height: viewport.height,
                        });
                    }

                    await mount(<RowStories.Default />);

                    await expectScreenshot();
                },
            );

            smokeTest(
                `render story <ZeroSpacings> - ${breakpointName}`,
                async ({page, mount, expectScreenshot}) => {
                    const viewport = page.viewportSize();
                    if (viewport) {
                        await page.setViewportSize({
                            width: breakpointWidthPx + RESERVE_SPACING_PX,
                            height: viewport.height,
                        });
                    }

                    await mount(<RowStories.ZeroSpacings />);

                    await expectScreenshot();
                },
            );
        },
    );
});
