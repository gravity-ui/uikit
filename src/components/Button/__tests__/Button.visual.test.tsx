import React from 'react';

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

test.describe('Button', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<Default />);

        await expectScreenshot();
    });

    test('render story: <Selected>', async ({mount, expectScreenshot}) => {
        await mount(<Selected />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<Size />);

        await expectScreenshot();
    });

    test('render story: <Icon>', async ({mount, expectScreenshot}) => {
        await mount(<Icon />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<View />);

        await expectScreenshot();
    });

    test('render story: <Disabled>', async ({mount, expectScreenshot}) => {
        await mount(<Disabled />);

        await expectScreenshot();
    });

    test('render story: <Link>', async ({mount, expectScreenshot}) => {
        await mount(<Link />);

        await expectScreenshot();
    });

    test('render story: <Loading>', async ({mount, expectScreenshot}) => {
        await mount(<Loading />);

        await expectScreenshot();
    });

    test('render story: <Pin>', async ({mount, expectScreenshot}) => {
        await mount(<Pin />);

        await expectScreenshot();
    });

    test('render story: <Width>', async ({mount, expectScreenshot}) => {
        await mount(<Width />);

        await expectScreenshot();
    });
});
