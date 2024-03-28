import React from 'react';

import {test} from '~playwright/core';

import {ButtonStories} from './helpersPlaywright';

test.describe('Button', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Selected>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Selected />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Icon>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Icon />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.View />);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Disabled />);

        await expectScreenshot();
    });

    test('render story: <Link>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Link />);

        await expectScreenshot();
    });

    test('render story: <Loading>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Loading />);

        await expectScreenshot();
    });

    test('render story: <Pin>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Pin />);

        await expectScreenshot();
    });

    test('render story: <Width>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.Width />);

        await expectScreenshot();
    });

    test('render story: <InsideText>', async ({mount, expectScreenshot}) => {
        await mount(<ButtonStories.InsideText />);

        await expectScreenshot();
    });
});
