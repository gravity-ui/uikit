import {test} from '~playwright/core';

import {AlertStories} from './helpersPlaywright';

test.describe('Alert', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Theme>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Theme />);

        await expectScreenshot();
    });

    test('render story: <CustomIcon>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.CustomIcon />);

        await expectScreenshot();
    });

    test('render story: <Corners>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Corners />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.View />);

        await expectScreenshot();
    });

    test('render story: <Layout>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Layout />);

        await expectScreenshot();
    });

    test('render story: <Actions>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Actions />);

        await expectScreenshot();
    });

    test('render story: <Align>', async ({mount, expectScreenshot}) => {
        await mount(<AlertStories.Align />);

        await expectScreenshot();
    });
});
