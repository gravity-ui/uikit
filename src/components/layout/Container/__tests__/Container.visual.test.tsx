import React from 'react';

import {smokeTest, test} from '~playwright/core';

import {DEFAULT_LAYOUT_THEME} from '../../constants';

import {ContainerStories} from './stories';

test.describe('Container', {tag: '@Container'}, () => {
    const RESERVE_SPACING_PX = 5;

    Object.entries(DEFAULT_LAYOUT_THEME.breakpoints).forEach(
        ([breakpointName, breakpointWidthPx]) => {
            smokeTest(
                `render story <Default> - ${breakpointName}`,
                async ({mount, expectScreenshot}) => {
                    const props = {
                        spaceRow: {m: '1'},
                        maxWidth: 'l',
                    } as const;

                    await mount(
                        <div style={{width: breakpointWidthPx + RESERVE_SPACING_PX}}>
                            <ContainerStories.Default {...props} />
                        </div>,
                    );

                    await expectScreenshot();
                },
            );
        },
    );
});
