import React from 'react';

import {test} from '~playwright/core';

import {SliderStories} from './helpersPlaywright';

test.describe('Slider', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Default />);

        await expectScreenshot();
    });

    test('render story: <DefaultRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.DefaultRange />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Size />);

        await expectScreenshot();
    });

    test('render story: <SizeRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.SizeRange />);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Disabled />);

        await expectScreenshot();
    });

    test('render story: <DisabledRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.DisabledRange />);

        await expectScreenshot();
    });

    test('render story: <Error>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Error />);

        await expectScreenshot();
    });

    test('render story: <ErrorRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.ErrorRange />);

        await expectScreenshot();
    });

    test('render story: <Tooltip>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.Tooltip />);

        await expectScreenshot();
    });

    test('render story: <TooltipRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.TooltipRange />);

        await expectScreenshot();
    });

    test('render story: <MarksCount>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.MarksCount />);

        await expectScreenshot();
    });

    test('render story: <MarksCountRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.MarksCountRange />);

        await expectScreenshot();
    });

    test('render story: <AvailableValues>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.AvailableValues />);

        await expectScreenshot();
    });

    test('render story: <AvailableValuesRange>', async ({mount, expectScreenshot}) => {
        await mount(<SliderStories.AvailableValuesRange />);

        await expectScreenshot();
    });
});
