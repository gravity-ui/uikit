import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {UserAvatar} from '../../../../UserAvatar';
import {Flex} from '../../../../layout';
import {ListItemView as ListItemViewComponent, ListItemViewProps} from '../ListItemView';

export default {
    title: 'Unstable/useList/ListItemView',
    component: ListItemViewComponent,
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
        size: 'l',
        subtitle,
        selected: true,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        id: '4',
        title,
        disabled: true,
        size: 'xl',
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
        size: 'l',
        subtitle,
        startSlot: (
            <UserAvatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
        indentation: 1,
        selected: true,
    },
    {
        id: '7',
        expanded: true,
        selectable: false,
        size: 'xl',
        title: 'Group 1',
    },
];

const ListItemViewTemplate: StoryFn<ListItemViewProps> = () => (
    <Flex direction="column" width={300}>
        {stories.map((props, i) => (
            <ListItemViewComponent key={i} {...props} />
        ))}
    </Flex>
);
export const ListItemView = ListItemViewTemplate.bind({});