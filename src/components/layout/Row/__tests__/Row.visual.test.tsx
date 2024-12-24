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
                async ({mount, expectScreenshot}) => {
                    await mount(
                        <div style={{width: breakpointWidthPx + RESERVE_SPACING_PX}}>
                            <RowStories.Default />
                        </div>,
                    );

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            smokeTest(
                `render story <ZeroSpacings> - ${breakpointName}`,
                async ({mount, expectScreenshot}) => {
                    await mount(
                        <div style={{width: breakpointWidthPx + RESERVE_SPACING_PX}}>
                            <RowStories.ZeroSpacings />
                        </div>,
                    );

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );
        },
    );
});
