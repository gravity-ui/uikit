import React from 'react';

import {test} from '~playwright/core';

import {TextInputStories} from './helpersPlaywright';

test.describe('TextInput', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.Default />);

        await expectScreenshot();
    });

    test('render story: <AllShowcases>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.AllShowcases />);

        await expectScreenshot();
    });

    test('render story: <CustomShowcases>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.CustomShowcases />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.View />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Pin>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.Pin />);

        await expectScreenshot();
    });

    test('render story: <ValidationState>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.ValidationState />);

        await expectScreenshot();
    });

    test('render story: <ErrorPlacement>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.ErrorPlacement />);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.Disabled />);

        await expectScreenshot();
    });

    test('render story: <HasClear>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.HasClear />);

        await expectScreenshot();
    });

    test('render story: <WithNote>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithNote />);

        await expectScreenshot();
    });

    test('render story: <WithEndContent>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithEndContent />);

        await expectScreenshot();
    });

    test('render story: <WithStartContent>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithStartContent />);

        await expectScreenshot();
    });

    test('render story: <WithLabel>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithLabel />);

        await expectScreenshot();
    });

    test('render story: <WithEmailType>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithEmailType />);

        await expectScreenshot();
    });

    test('render story: <WithNumberType>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithNumberType />);

        await expectScreenshot();
    });

    test('render story: <WithPasswordType>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithPasswordType />);

        await expectScreenshot();
    });

    test('render story: <WithSearchType>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithSearchType />);

        await expectScreenshot();
    });

    test('render story: <WithTelType>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithTelType />);

        await expectScreenshot();
    });

    test('render story: <WithTextType>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithTextType />);

        await expectScreenshot();
    });

    test('render story: <WithUrlType>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.WithUrlType />);

        await expectScreenshot();
    });

    test('render story: <Custom>', async ({mount, expectScreenshot}) => {
        await mount(<TextInputStories.Custom />);

        await expectScreenshot();
    });
});
