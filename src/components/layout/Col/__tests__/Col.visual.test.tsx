import React from 'react';

import {test} from '~playwright/core';

import {ColStories} from './stories';

test.describe('Col', {tag: '@Col'}, () => {
    test('render story <Static>', async ({mount, expectScreenshot}) => {
        await mount(<ColStories.Static space={3} />);

        await expectScreenshot();
    });

    test('render story <Dynamic>', async ({mount, expectScreenshot}) => {
        await mount(<ColStories.Dynamic space={2} />);

        await expectScreenshot();
    });

    test('render story <DynamicWithOverriddenBreakpoints>', async ({mount, expectScreenshot}) => {
        await mount(<ColStories.DynamicWithOverriddenBreakpoints space={2} />);

        await expectScreenshot();
    });

    test('render story <AllMods>', async ({mount, expectScreenshot}) => {
        const props = {
            xxl: '1',
            xl: '2',
            l: '4',
            m: '6',
            s: '12',
            space: 3,
        } as const;

        await mount(<ColStories.AllMods {...props} />);

        await expectScreenshot();
    });
});
