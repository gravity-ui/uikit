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
    test('render story: <Default>', async ({mount}) => {
        const component = await mount(<Default />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Selected>', async ({mount}) => {
        const component = await mount(<Selected />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Size>', async ({mount}) => {
        const component = await mount(<Size />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Icon>', async ({mount}) => {
        const component = await mount(<Icon />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <View', async ({mount}) => {
        const component = await mount(<View />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Disabled>', async ({mount}) => {
        const component = await mount(<Disabled />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Link>', async ({mount}) => {
        const component = await mount(<Link />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Loading>', async ({mount}) => {
        const component = await mount(<Loading />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Pin>', async ({mount}) => {
        const component = await mount(<Pin />);

        await expect(component).toHaveScreenshot();
    });

    test('render story: <Width>', async ({mount}) => {
        const component = await mount(<Width />);

        await expect(component).toHaveScreenshot();
    });
});
