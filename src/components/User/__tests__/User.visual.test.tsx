import React from 'react';

import {test} from '~playwright/core';

import {UserStories} from './stories';

test.describe('User', () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserStories.Default />);
        await expectScreenshot({component});
    });

    test('render story: <Showcase>', async ({mount, expectScreenshot}) => {
        const component = await mount(<UserStories.UserShowcase />);
        await expectScreenshot({component});
    });
});
