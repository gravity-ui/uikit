import React from 'react';

import {test} from '~playwright/core';

import {CardStories} from './helpersPlaywright';

test.describe('Card', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Theme>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.Theme />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.View />);

        await expectScreenshot();
    });

    test('render story: <ActionType>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.ActionType />);

        await expectScreenshot();
    });

    test('render story: <SelectionType>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.SelectionType />);

        await expectScreenshot();
    });

    test('render story: <Custom>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.Custom />);

        await expectScreenshot();
    });
});
