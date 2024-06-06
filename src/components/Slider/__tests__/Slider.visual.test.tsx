import React from 'react';

import {test} from '~playwright/core';

import {SliderStories} from './helpersPlaywright';

const mountOptions = {
    wrapDivStyles: {
        minWidth: 300,
    },
};

test.describe('Slider', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Default />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <DefaultRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.DefaultRange />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Size />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <SizeRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.SizeRange />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Disabled />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <DisabledRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.DisabledRange />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <Error>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Error />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <ErrorRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.ErrorRange />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <Tooltip>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Tooltip />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <TooltipRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.TooltipRange />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <MarksCount>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.MarksCount />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <MarksCountRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.MarksCountRange />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <AvailableValues>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.AvailableValues />, mountOptions);

        await expectScreenshot();
    });

    test('render story: <AvailableValuesRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.AvailableValuesRange />, mountOptions);

        await expectScreenshot();
    });
});
