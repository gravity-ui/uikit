import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {UserAvatar} from '../../../../UserAvatar';
import {Flex} from '../../../../layout';
import {ListItemView, ListItemViewProps} from '../ListItemView';

export default {
    title: 'Unstable/useList/ListItemView',
    component: ListItemView,
} as Meta;

const title = 'title';
const subtitle = 'subtitle';

const stories: ListItemViewProps[] = [
    {
        id: '1',
        title,
        activeOnHover: false,
        subtitle,
        disabled: true,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        id: '2',
        title,
        subtitle,
        activeOnHover: false,
    },
    {
        id: '3',
        title,
        subtitle,
        selected: true,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        id: '4',
        title,
        selected: true,
        disabled: true,
        height: 60,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        id: '5',
        title,
    },
    {
        id: '6',
        title,
        subtitle,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
        indentation: 1,
    },
    {
        id: '7',
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
