import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {UserAvatar} from '../../../../UserAvatar';
import {Flex} from '../../../../layout';
import {ListItemView, ListItemViewProps} from '../ListItemView';

export default {
    title: 'ListComposable/ListItemView',
    component: ListItemView,
} as Meta;

const title = 'title';
const subtitle = 'subtitle';

const stories: ListItemViewProps[] = [
    {
        title,
        activeOnHover: false,
        subtitle,
        disabled: true,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        title,
        subtitle,
        activeOnHover: false,
    },
    {
        title,
        subtitle,
        selected: true,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        title,
        selected: true,
        disabled: true,
        height: 60,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        title,
    },
    {
        title,
        subtitle,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
        indentation: 1,
    },
    {
        title: 'Group 1',
    },
];

const DefaultTemplate: StoryFn<ListItemViewProps> = () => (
    <Flex direction="column" width={300}>
        {stories.map((props, i) => (
            <ListItemView key={i} {...props} />
        ))}
    </Flex>
);
export const Examples = DefaultTemplate.bind({});
