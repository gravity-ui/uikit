import React from 'react';

import {test} from '~playwright/core';

import {LabelStories} from './helpersPlaywright';

test.describe('Label', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Theme>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Theme />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Icon>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Icon />);

        await expectScreenshot();
    });

    test('render story: <Interactive>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Interactive />);

        await expectScreenshot();
    });

    test('render story: <LinkWrapper>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.LinkWrapper />);

        await expectScreenshot();
    });

    test('render story: <ShowcaseStory>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.ShowcaseStory />);

        await expectScreenshot();
    });

    test('render story: <Value>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Value />);

        await expectScreenshot();
    });

    test('render story: <Copy>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Copy />);

        await expectScreenshot();
    });

    test('render story: <Close>', async ({mount, expectScreenshot}) => {
        await mount(<LabelStories.Close />);

        await expectScreenshot();
    });
});
