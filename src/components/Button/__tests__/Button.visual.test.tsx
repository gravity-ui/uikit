import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {
    Default,
    Disabled,
    Icon,
    Link,
    Loading,
    Pin,
    Selected,
    Size,
    View,
    Width,
} from './helpersPlaywright';

import {test} from '~playwright/core';

test.describe('Button', () => {
    test('render stories: <Default>', async ({mount}) => {
        const component = await mount(<Default />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <Selected>', async ({mount}) => {
        const component = await mount(<Selected />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <Size>', async ({mount}) => {
        const component = await mount(<Size />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <Icon>', async ({mount}) => {
        const component = await mount(<Icon />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <View', async ({mount}) => {
        const component = await mount(<View />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <Disabled>', async ({mount}) => {
        const component = await mount(<Disabled />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <Link>', async ({mount}) => {
        const component = await mount(<Link />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <Loading>', async ({mount}) => {
        const component = await mount(<Loading />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <Pin>', async ({mount}) => {
        const component = await mount(<Pin />);

        await expect(component).toHaveScreenshot();
    });

    test('render stories: <Width>', async ({mount}) => {
        const component = await mount(<Width />);

        await expect(component).toHaveScreenshot();
    });
});
