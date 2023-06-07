import React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import {useArgs} from '@storybook/client-api';
import type {ComponentStory, Meta, StoryFn} from '@storybook/react';

import {UserAvatar} from '../UserAvatar';
import type {UserAvatarProps} from '../UserAvatar';

import {getAvatarSrcSet} from './getAvatarSrcSet';

const imgUrl =
    'https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50';

export default {
    title: 'Components/UserAvatar',
    component: UserAvatar,
} as Meta;

export const Default: StoryFn<UserAvatarProps> = (args) => (
    <UserAvatar {...args} onClick={() => alert('click')} />
);
Default.args = {imgUrl};

export const Size: StoryFn<UserAvatarProps> = (args) => (
    <div>
        <UserAvatar {...args} size="xs" />
        <UserAvatar {...args} size="s" />
        <UserAvatar {...args} size="m" />
        <UserAvatar {...args} size="l" />
        <UserAvatar {...args} size="xl" />
    </div>
);
Size.args = {imgUrl};

const randomAvatars = faker.helpers
    .uniqueArray(() => faker.datatype.number({min: 20, max: 500}), 30)
    .reduce(
        (sizes, num) => ({
            ...sizes,
            [num]: faker.image.cats(num, Math.round((num / 640) * 480)),
        }),
        {},
    );
export const WithSrcSet: ComponentStory<typeof UserAvatar> = (args) => {
    const [, setArgs] = useArgs();

    React.useEffect(() => {
        if (args.size) {
            setArgs({srcSet: getAvatarSrcSet(args.size, randomAvatars)});
        }
    }, [args.size, setArgs]);

    return <UserAvatar {...args} />;
};
WithSrcSet.args = {
    imgUrl: faker.image.cats(),
    size: 'xl',
};
