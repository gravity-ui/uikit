import React from 'react';

import {test} from '~playwright/core';

import {AvatarStackStories} from './stories';

test.describe('AvatarStack', () => {
    test('single avatar', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.SingleItem randomAvatar={false} />);

        await expectScreenshot();
    });

    test('default more component', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.MoreButton randomAvatar={false} />);

        await expectScreenshot();
    });

    test('edge case with more button omit', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.MoreButtonOmit randomAvatar={false} />);

        await expectScreenshot();
    });

    test('custom more button', async ({mount, expectScreenshot}) => {
        const component = await mount(<AvatarStackStories.CustomMoreButton randomAvatar={false} />);

        await component.getByRole('button', {name: 'Rest of the users'}).hover();

        await expectScreenshot();
    });
});
