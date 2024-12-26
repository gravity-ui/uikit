import React from 'react';

import {test} from '~playwright/core';

import {UserLabelStories} from './stories';

test.describe('UserLabel', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Default />);
        await expectScreenshot({component});
    });

    test('render story: <Image>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Image />);
        await expectScreenshot({component});
    });

    test('render story: <Email>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Email />);
        await expectScreenshot({component});
    });

    test('render story: <Empty>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Empty />);
        await expectScreenshot({component});
    });

    test('render story: <LongText>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.LongText />, {width: 300});
        await expectScreenshot({component});
    });

    test('render story: <Clickable>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Clickable />);
        await expectScreenshot({component, nameSuffix: 'default'});

        await component.getByText('Charles Darwin').hover();
        await expectScreenshot({component, nameSuffix: 'hovered'});
    });

    test('render story: <Closable>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.Closable />);
        await expectScreenshot({component});
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserLabelStories.UserLabelShowcase />);
        await expectScreenshot({component});
    });
});
