import React from 'react';
import {Meta, Story} from '@storybook/react';
import {User, UserProps} from '../User';

export default {
    title: 'Components/User',
    component: User,
} as Meta;

export const Default: Story<UserProps> = (args) => <User {...args} />;
Default.args = {
    name: 'hugh',
    description: 'hugh.jass@ya.ru',
    imgUrl: 'https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50',
};
