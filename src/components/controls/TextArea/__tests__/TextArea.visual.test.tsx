import React from 'react';

import {test} from '~playwright/core';

import {TextAreaStories} from './helpersPlaywright';

test.describe('TextArea', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.Default />);

        await expectScreenshot();
    });

    test('render story: <AllShowcases>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.AllShowcases />);

        await expectScreenshot();
    });

    test('render story: <CustomShowcases>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.CustomShowcases />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.View />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Pin>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.Pin />);

        await expectScreenshot();
    });

    test('render story: <ValidationState>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.ValidationState />);

        await expectScreenshot();
    });

    test('render story: <ErrorPlacement>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.ErrorPlacement />);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.Disabled />);

        await expectScreenshot();
    });

    test('render story: <HasClear>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.HasClear />);

        await expectScreenshot();
    });

    test('render story: <WithNote>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.WithNote />);

        await expectScreenshot();
    });

    test('render story: <Rows>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.Rows />);

        await expectScreenshot();
    });

    test('render story: <Custom>', async ({mount, expectScreenshot}) => {
        await mount(<TextAreaStories.Custom />);

        await expectScreenshot();
    });
});
