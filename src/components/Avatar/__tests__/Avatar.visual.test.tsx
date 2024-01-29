import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {Icon, Image, ImageFallback, Showcase, Text, TextInitials, WithBorder} from './stories';

test.describe('Avatar', () => {
    test('render story: <Image>', async ({mount}) => {
        const component = await mount(<Image />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <ImageFallback>', async ({mount, browserName}) => {
        test.skip(browserName === 'webkit', 'Test is flaky for webkit');

        const component = await mount(<ImageFallback />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Icon>', async ({mount}) => {
        const component = await mount(<Icon />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Text>', async ({mount}) => {
        const component = await mount(<Text />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <TextInitials>', async ({mount}) => {
        const component = await mount(<TextInitials />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <WithBorder>', async ({mount}) => {
        const component = await mount(<WithBorder />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Showcase>', async ({mount}) => {
        const component = await mount(<Showcase />);

        await expect(component).toHaveScreenshot();
    });
});
