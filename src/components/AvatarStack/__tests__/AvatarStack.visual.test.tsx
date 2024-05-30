import React from 'react';

import {composeStories} from '@storybook/react';

import {test} from '~playwright/core';

import * as CSFStories from '../__stories__/AvatarStack.stories';

const AvatarStackStories = composeStories(CSFStories);

test.describe('AvatarStack', () => {
    test('single avatar', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.SingleItem randomAvatar={false} />);

        await expectScreenshot();
    });
});
