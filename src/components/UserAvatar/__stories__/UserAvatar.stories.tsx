import React from 'react';
import {Meta, Story} from '@storybook/react';

import {UserAvatar, UserAvatarProps} from '../UserAvatar';

const imgUrl =
    'https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50';

export default {
    title: 'Components/UserAvatar',
    component: UserAvatar,
} as Meta;

export const Default: Story<UserAvatarProps> = (args) => (
    <UserAvatar {...args} onClick={() => alert('click')} />
);
Default.args = {imgUrl};

export const Size: Story<UserAvatarProps> = (args) => (
    <div>
        <UserAvatar {...args} size="xs" />
        <UserAvatar {...args} size="s" />
        <UserAvatar {...args} size="m" />
        <UserAvatar {...args} size="l" />
        <UserAvatar {...args} size="xl" />
    </div>
);
Size.args = {imgUrl};
