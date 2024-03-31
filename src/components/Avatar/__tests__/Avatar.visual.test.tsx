import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {AvatarStories} from './stories';

test.describe('Avatar', () => {
    test('render story: <Image>', async ({mount}) => {
        const component = await mount(<AvatarStories.Image />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <ImageFallback>', async ({mount, browserName}) => {
        test.skip(browserName === 'webkit', 'Test is flaky for webkit');

        const component = await mount(<AvatarStories.ImageFallback />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Icon>', async ({mount}) => {
        const component = await mount(<AvatarStories.Icon />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Text>', async ({mount}) => {
        const component = await mount(<AvatarStories.Text />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <TextInitials>', async ({mount}) => {
        const component = await mount(<AvatarStories.TextInitials />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <WithBorder>', async ({mount}) => {
        const component = await mount(<AvatarStories.WithBorder />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Showcase>', async ({mount}) => {
        const component = await mount(<AvatarStories.AvatarShowcase />);

        await expect(component).toHaveScreenshot();
    });
});
