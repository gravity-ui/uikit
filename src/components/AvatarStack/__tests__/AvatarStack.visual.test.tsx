import React from 'react';

import {test} from '~playwright/core';

import {AvatarStackStories} from './stories';

test.describe('AvatarStack', () => {
    test('single avatar', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.SingleItem randomAvatar={false} />);

        await expectScreenshot();
    });
});
