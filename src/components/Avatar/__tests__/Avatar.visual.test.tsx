import React from 'react';

import {test} from '~playwright/core';

import {AvatarStories} from './stories';

test.describe('Avatar', () => {
    test('render story: <Image>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.Image />);
        await expectScreenshot({component});
    });

    test('render story: <ImageFallback>', async ({browserName, mount, expectScreenshot}) => {
        test.skip(browserName === 'webkit', 'Test is flaky for webkit');

        const component = await mount(<AvatarStories.ImageFallback />);
        await expectScreenshot({component});
    });

    test('render story: <Icon>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.Icon />);
        await expectScreenshot({component});
    });

    test('render story: <Text>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.Text />);
        await expectScreenshot({component});
    });

    test('render story: <TextInitials>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.TextInitials />);
        await expectScreenshot({component});
    });

    test('render story: <WithBorder>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.WithBorder />);
        await expectScreenshot({component});
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStories.AvatarShowcase />);
        await expectScreenshot({component});
    });
});
