import React from 'react';

import {test} from '~playwright/core';

import {ClipboardButtonStories} from './helpersPlaywright';

const mountOptions = {};

test.describe('ClipboardButton', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<ClipboardButtonStories.Default />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <CustomTooltipText>', async ({mount, expectScreenshot}) => {
        await mount(<ClipboardButtonStories.CustomTooltipText />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<ClipboardButtonStories.View />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<ClipboardButtonStories.Size />, mountOptions);

        await expectScreenshot();
    });
});
