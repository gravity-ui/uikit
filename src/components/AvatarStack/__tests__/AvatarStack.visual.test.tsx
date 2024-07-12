import React from 'react';

import {test} from '~playwright/core';

import {AvatarStackStories} from './stories';

test.describe('AvatarStack', () => {
    test('render story <SingleItem>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.SingleItem randomAvatar={false} />);

        await expectScreenshot();
    });

    test('render story <MoreButton>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.MoreButton randomAvatar={false} />);

        await expectScreenshot();
    });

    test('render story <MoreButtonOmit>', async ({mount, expectScreenshot}) => {
        await mount(<AvatarStackStories.MoreButtonOmit randomAvatar={false} />);

        await expectScreenshot();
    });
});
