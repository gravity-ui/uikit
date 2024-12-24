import React from 'react';

import {smokeTest, test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {FlexStories} from './stories';

test.describe('Flex', {tag: '@Flex'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            smokeTest(
                `render story <Default> - ${breakpointName}`,
                async ({mount, expectScreenshot}) => {
                    const props = {
                        alignItems: 'center',
                        justifyContent: 'center',
                    } as const;

                    await mount(
                        <div style={{width: breakpointWidthPx + RESERVE_SPACING_PX}}>
                            <FlexStories.Default {...props} />
                        </div>,
                    );

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            smokeTest(
                `render story <FlexGap> - ${breakpointName}`,
                async ({mount, expectScreenshot}) => {
                    const props = {
                        gap: {s: '1', m: '6'},
                    } as const;

                    await mount(
                        <div style={{width: breakpointWidthPx + RESERVE_SPACING_PX}}>
                            <FlexStories.FlexGap {...props} />
                        </div>,
                    );

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            smokeTest(
                `render story <GapAndRowGap> - ${breakpointName}`,
                async ({mount, expectScreenshot}) => {
                    const props = {
                        gap: {s: '1', m: '6'},
                        gapRow: {s: '6', m: '1'},
                    } as const;

                    await mount(
                        <div style={{width: breakpointWidthPx + RESERVE_SPACING_PX}}>
                            <FlexStories.GapAndRowGap {...props} />
                        </div>,
                    );

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            smokeTest(
                `render story <ChildrenWithBgColor>- ${breakpointName}`,
                async ({mount, expectScreenshot}) => {
                    await mount(
                        <div style={{width: breakpointWidthPx + RESERVE_SPACING_PX}}>
                            <FlexStories.ChildrenWithBgColor />
                        </div>,
                    );

                    await expectScreenshot({
                        themes: ['light'],
                    });
                },
            );

            smokeTest(
                `render story <WithNullChildren>- ${breakpointName}`,
                async ({mount, expectScreenshot}) => {
                    await mount(
                        <div style={{width: breakpointWidthPx + RESERVE_SPACING_PX}}>
                            <FlexStories.WithNullChildren />
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
